/// <reference types="node" />
// Scoped to this file deliberately: adding "node" to tsconfig's `types` would
// make Node globals visible to every browser component too, which invites
// accidentally reaching for `process` in UI code.

import { readFileSync } from 'node:fs'

/**
 * Spacelift is run from the owner's home. No postal address or telephone number
 * appears anywhere on the site, and neither must ever be published in structured
 * data — a service-area business should express coverage with `areaServed`
 * instead.
 *
 * These are asserted rather than left as a comment because structured data is
 * easy to extend later by copying an example off the web, and every common
 * `LocalBusiness` example on the web includes a street address.
 */
describe('structured data', () => {
  const html = readFileSync('index.html', 'utf8')

  const graph = (() => {
    const match = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
    )
    if (!match) throw new Error('no JSON-LD block found in index.html')
    return JSON.parse(match[1])['@graph'] as Record<string, unknown>[]
  })()

  it('is valid JSON-LD describing the business and the site', () => {
    expect(graph.map((node) => node['@type'])).toEqual([
      'ProfessionalService',
      'WebSite'
    ])
  })

  it('never publishes a postal address or telephone number', () => {
    for (const node of graph) {
      expect(node).not.toHaveProperty('address')
      expect(node).not.toHaveProperty('telephone')
      expect(node).not.toHaveProperty('geo')
    }
  })

  it('states the service area instead', () => {
    const business = graph[0]
    expect(business.areaServed).toMatchObject({
      name: expect.stringMatching(/Vancouver Island/i)
    })
  })

  it('claims no ratings or reviews, which the site has no real source for', () => {
    for (const node of graph) {
      expect(node).not.toHaveProperty('aggregateRating')
      expect(node).not.toHaveProperty('review')
      expect(node).not.toHaveProperty('reviewCount')
    }
  })

  it('points at the canonical origin', () => {
    for (const node of graph) {
      const json = JSON.stringify(node)
      expect(json).not.toMatch(/http:\/\//)
      expect(json).not.toMatch(/www\.spacelift\.online/)
    }
  })
})
