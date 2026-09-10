// Publishes `dist/` to the `gh-pages` branch.
//
// This exists instead of a plain `gh-pages -d dist` because that command leaves
// dotfiles on the branch forever.
//
// `gh-pages` clears the branch before copying by globbing its `remove` pattern,
// which defaults to ".":
//
//     globby.sync(options.remove, { cwd: ... })      // gh-pages/lib/index.js
//
// That call passes no `dot` option, so globby's default of `dot: false` applies
// and the glob never enumerates anything beginning with a period — regardless
// of the `--dotfiles` flag, which only governs which *source* files get copied.
// Anything dot-prefixed that reaches the branch is therefore never removed
// again. Here that stranded nine source config files (`.eslintrc`,
// `.prettierrc`, `.vscode`, `.github`, and so on) from the first deploy in
// January 2025 until they were cleaned up in September 2026.
//
// REMOVE_PATTERN below enumerates ordinary files *and* dot-prefixed ones, so the
// branch is genuinely emptied before `dist/` is copied over it.
//
// The CLI cannot express this: `--remove` takes a single string, and the
// brace-expanded equivalent behaves differently — it matches only the dotfiles
// and silently stops matching regular files, which would strand every previous
// build's assets on the branch instead. Hence an array, hence this file.
//
//     node tools/deploy.mjs

import { publish } from 'gh-pages'
import { existsSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const dist = path.join(root, 'dist')

// Ordinary files, plus dot-prefixed files and directories, minus git's own
// internals — the dot patterns would otherwise sweep those up, since the glob
// runs inside the deploy clone rather than against the built output.
const REMOVE_PATTERN = ['.', '.*', '.*/**', '!.git', '!.git/**']

// --- guards ----------------------------------------------------------------

if (!existsSync(dist) || readdirSync(dist).length === 0) {
  console.error('dist/ is missing or empty — run `pnpm run build` first.')
  process.exit(1)
}

// The custom domain lives in dist/CNAME, written by the postbuild script.
// Publishing without it would drop spacelift.online back to the *.github.io
// default and take the site down until the next deploy.
if (!existsSync(path.join(dist, 'CNAME'))) {
  console.error(
    'dist/CNAME is missing — publishing would break the custom domain.'
  )
  process.exit(1)
}

const sha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], {
  cwd: root,
  encoding: 'utf8'
}).trim()

const dirty =
  execFileSync('git', ['status', '--porcelain'], {
    cwd: root,
    encoding: 'utf8'
  }).trim().length > 0

if (dirty) {
  console.warn(
    `warning: working tree is dirty — publishing a build from ${sha} plus uncommitted changes`
  )
}

// --- publish ---------------------------------------------------------------

console.log(`Publishing dist/ to gh-pages (from ${sha})…`)

// `publish` resolves its promise even when the underlying git work fails — its
// default callback only logs the error — so a broken push would exit 0. Pass an
// explicit callback and reject on it.
await new Promise((resolve, reject) => {
  publish(
    dist,
    {
      branch: 'gh-pages',
      message: `Deploy ${sha}`,
      remove: REMOVE_PATTERN,
      dotfiles: true
    },
    (error) => (error ? reject(error) : resolve())
  )
})

console.log('Published.')
