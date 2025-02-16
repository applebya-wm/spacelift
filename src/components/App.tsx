import { motion, useAnimation, useScroll, useTransform } from 'motion/react'
import { debounce } from 'lodash'
import './App.css'
import logo from 'assets/spacelift-logo-transparent.png'
import hero from 'assets/hero-1.jpg'
import check from 'assets/check.png'
import facebook from 'assets/facebook.svg'
import arrowDown from 'assets/arrow-down.svg'
import instagram from 'assets/instagram.svg'
import star from 'assets/star.svg'
import couch from 'assets/couch.png'
import couchBg from 'assets/couch-bg.png'
import vanIsle from 'assets/van-isle.png'
import anySpace from 'assets/any-space.png'
import clean from 'assets/process/clean.png'
import declutter from 'assets/process/declutter.png'
import paint from 'assets/process/paint.png'
import merchandise from 'assets/process/merchandise.png'
import stage from 'assets/process/stage.png'
import organize from 'assets/process/organize.png'
import cleanBg from 'assets/clean.jpg'
import declutterBg from 'assets/declutter.jpg'
import paintBg from 'assets/paint.jpg'
import merchandiseBg from 'assets/merchandise.jpg'
import stageBg from 'assets/stage.jpg'
import organizeBg from 'assets/organize.jpg'
import {
  FormEvent,
  Fragment,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import homeSpace1 from 'assets/spaces/home-1.png'
import homeSpace2 from 'assets/spaces/home-2.jpg'
import homeSpace3 from 'assets/spaces/home-3.jpg'
import homeSpace4 from 'assets/spaces/home-4.jpg'
import homeSpace5 from 'assets/spaces/home-5.png'
import businessSpace1 from 'assets/spaces/business-1.png'
import businessSpace2 from 'assets/spaces/business-2.jpg'
import businessSpace3 from 'assets/spaces/business-3.png'
import businessSpace4 from 'assets/spaces/business-4.png'
import businessSpace5 from 'assets/spaces/business-5.png'
import realEstateSpace1 from 'assets/spaces/real-estate-1.png'
import realEstateSpace2 from 'assets/spaces/real-estate-2.jpg'
import realEstateSpace3 from 'assets/spaces/real-estate-3.png'
import realEstateSpace4 from 'assets/spaces/real-estate-4.png'
import realEstateSpace5 from 'assets/spaces/real-estate-5.png'
import storeDisplaysSpace1 from 'assets/spaces/store-displays-1.png'
import storeDisplaysSpace2 from 'assets/spaces/store-displays-2.png'
import storeDisplaysSpace3 from 'assets/spaces/store-displays-3.png'
import storeDisplaysSpace4 from 'assets/spaces/store-displays-4.png'
import storeDisplaysSpace5 from 'assets/spaces/store-displays-5.png'
import storeDisplaysSpace6 from 'assets/spaces/store-displays-6.png'
import anySpaceSpace1 from 'assets/spaces/any-space-1.png'
import anySpaceSpace2 from 'assets/spaces/any-space-2.png'
import anySpaceSpace3 from 'assets/spaces/any-space-3.png'
import anySpaceSpace4 from 'assets/spaces/any-space-4.png'

const Button =
  'sans-serif border border-gray-800 px-6 py-2 text-gray-700 bg-white tracking-wider inline-flex gap-2 text-sm uppercase items-center hover:bg-gray-100 transition-colors justify-center whitespace-nowrap'

const ButtonLarge = `${Button} text-lg px-12 py-3`
const ButtonLargeSecondary = `${ButtonLarge} bg-yellow-50 text-center`

const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61560538700519'
const INSTAGRAM_URL = 'https://www.instagram.com/spaceliftonline/'

const scrollToImage = (
  container: HTMLDivElement | null,
  directionOrIndex: 'prev' | 'next' | number
) => {
  if (!container) return
  const scrollAmount = container.clientWidth

  let newScrollPosition
  if (typeof directionOrIndex === 'number') {
    newScrollPosition = directionOrIndex * scrollAmount
  } else {
    newScrollPosition =
      directionOrIndex === 'next'
        ? container.scrollLeft + scrollAmount
        : container.scrollLeft - scrollAmount
  }

  container.scrollTo({ left: newScrollPosition, behavior: 'smooth' })
}

const Header = () => {
  // Track window width to determine if we're in mobile view
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const isMobile = windowWidth < 768

  const controls = useAnimation()
  const { scrollY } = useScroll()
  const widthEnd = 150
  const scrollEnd = 310
  const leftEnd = '1%'

  // Dynamic transforms for the logo (desktop only)
  const left = useTransform(scrollY, [0, scrollEnd], ['12%', leftEnd])
  const top = useTransform(scrollY, [0, scrollEnd], [70, 0])
  const width = useTransform(scrollY, [0, scrollEnd], [420, widthEnd])
  const opacity = useTransform(scrollY, [0, 80], [1, 0])

  // Static values for mobile
  const staticLeft = '10%'
  const staticTop = '-1rem'
  const staticWidth = 200
  const staticOpacity = 1

  // Choose dynamic values for desktop and static values for mobile
  const logoLeft = isMobile ? staticLeft : left
  const logoTop = isMobile ? staticTop : top
  const logoWidth = isMobile ? staticWidth : width
  const logoOpacity = isMobile ? staticOpacity : opacity

  // Background logo transforms (desktop only; still animated on mobile if desired)
  // const backLeft = useTransform(scrollY, [0, scrollEnd], ['-8%', '-10%'])
  const backWidth = useTransform(scrollY, [0, scrollEnd], [1200, 1200])
  const backTop = useTransform(scrollY, [0, scrollEnd], [-280, -400])
  const backOpacity = useTransform(
    scrollY,
    [0, scrollEnd],
    [isMobile ? 0 : 0.075, 0]
  )

  // State for mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false)

  // Navigation links array
  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#process', label: 'The Process' },
    { href: '#spaces', label: 'Any Space' }
  ]

  return (
    <header className="sans-serif fixed left-0 top-0 z-20 w-full md:bg-white/80 md:backdrop-blur-sm">
      {/* Container provides horizontal padding/margin at intermediate sizes */}
      <div className="px-4 lg:mx-auto">
        {/* Background logo */}
        <motion.img
          src={logo}
          alt="Background logo"
          width={1000}
          className="absolute -z-50 opacity-10 grayscale"
          style={{
            width: backWidth,
            top: backTop,
            opacity: backOpacity,
            pointerEvents: 'none'
          }}
        />

        {/* Logo: use animated transforms for desktop, static values for mobile */}
        <motion.div
          className="absolute hidden md:block"
          style={{ left: logoLeft, top: logoTop }}
          animate={isMobile ? undefined : controls}
        >
          <a href="#" className="mt-4 flex flex-col items-center md:mt-0">
            <motion.img src={logo} style={{ width: logoWidth }} alt="Logo" />
            <motion.div
              className="hidden justify-center text-sm tracking-widest text-gray-600 md:flex"
              style={{ opacity: logoOpacity }}
            >
              <span>TRANSFORMING SPACES</span>
            </motion.div>
          </a>
        </motion.div>

        {/* Desktop Navigation (unchanged from original) */}
        <nav className="hidden items-center justify-end gap-6 py-4 text-sm uppercase tracking-wider underline-offset-8 md:flex">
          {navLinks.map((item, index) => (
            <Fragment key={index}>
              <a
                href={item.href}
                className="text-gray-700 hover:cursor-pointer hover:text-gray-900 hover:underline"
              >
                {item.label}
              </a>
              {index < navLinks.length - 1 && (
                <span className="hidden text-gray-300 lg:block">•</span>
              )}
            </Fragment>
          ))}
          <a href="#contact" className={`${Button} ml-2 font-bold px-4`}>
            <span className="hidden lg:block">Book your</span> Estimate
          </a>
          <div className="hidden gap-2 xl:flex">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <img src={instagram} alt="Instagram" />
            </a>
          </div>
        </nav>

        {/* Hamburger button for mobile (always in top-right) */}
        <div className="absolute right-3 top-4 z-50 md:hidden ">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-50 border border-black bg-white p-2 focus:outline-none focus:ring-gray-600"
          >
            {menuOpen ? (
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="absolute z-10 top-0 right-0 -ml-8 flex h-screen w-screen flex-col items-center justify-center gap-12 bg-white py-4 pt-24 text-sm uppercase tracking-wider md:hidden">
            {navLinks.map((item, index) => (
              <Fragment key={index}>
                <a
                  href={item.href}
                  className="text-xl text-gray-700 hover:text-gray-900 hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Fragment>
            ))}
            <a
              href="#contact"
              className={`${Button} ml-2 font-bold`}
              onClick={() => setMenuOpen(false)}
            >
              Book Free Estimate
            </a>
            <div className="flex gap-2">
              <a
                href={FACEBOOK_URL}
                onClick={() => setMenuOpen(false)}
                target="_blank"
                rel="noreferrer"
              >
                <img src={facebook} alt="Facebook" />
              </a>
              <a
                href={INSTAGRAM_URL}
                onClick={() => setMenuOpen(false)}
                target="_blank"
                rel="noreferrer"
              >
                <img src={instagram} alt="Instagram" />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

const Tagline = () => (
  <h1 className="py-8 text-center text-3xl leading-loose tracking-wide text-white md:max-w-2xl md:py-0 md:text-left md:text-4xl md:text-black">
    We revitalize your{' '}
    <span className="sans-serif font-extralight">regular, unused, unloved</span>{' '}
    places into <span className="underline">amazin</span>g spaces.
  </h1>
)

const Hero = () => (
  <div className="flex h-screen flex-col-reverse md:flex-row md:pt-18">
    <div className="flex text-gray-700 md:flex-[2] md:flex-row md:pt-72 xl:flex-1">
      <div className="flex-1 flex flex-col justify-around pb-4 md:pb-10">
        <motion.div
          initial={{ marginLeft: -100, opacity: 0 }}
          animate={{ marginLeft: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="hidden max-w-3xl px-8 my-8 md:block md:px-12 xl:pl-24"
        >
          <Tagline />
        </motion.div>
        <div className="py-8 md:bg-gray-50 px-2 sm:px-8 md:px-8 lg:px-12 xl:pl-24">
          <div className="sans-serif grid max-w-xl grid-cols-2 gap-4 text-gray-500 md:flex md:justify-between">
            {['Home', 'Business', 'Real Estate', 'Any Space'].map(
              (item, index) => (
                <motion.div
                  key={index}
                  className="flex justify-center gap-2 uppercase tracking-wider lg:gap-4 text-xs"
                  initial={{ marginLeft: -100, opacity: 0 }}
                  animate={{ marginLeft: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.25 }}
                >
                  <span className="lg:text-sm">{item}</span>
                  <img
                    src={check}
                    className="size-4 sm:size-5"
                    alt="checkmark"
                  />
                </motion.div>
              )
            )}
          </div>
        </div>
        <div className="flex max-w-3xl justify-between gap-8 px-8 md:justify-around md:px-12 xl:pl-24 pt-4">
          <a href="#about" className={`${ButtonLarge} flex-1 font-bold`}>
            Learn More
            <img src={arrowDown} width="24" />
          </a>
          <a
            href="#contact"
            className={`${ButtonLargeSecondary} hidden flex-1 md:block border-0`}
          >
            Book Your Estimate
          </a>
        </div>
      </div>
    </div>
    <div
      className="flex flex-1 w-full items-center bg-black bg-opacity-50 bg-cover bg-blend-darken backdrop-blur-sm md:bg-opacity-0"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="mx-4 pt-24 text-center md:hidden w-full">
        <Tagline />
      </div>
    </div>
    <div className="pointer-events-none absolute top-0 flex h-0 w-full justify-center text-center md:hidden">
      <div className="z-40">
        <div className="relative px-4">
          <img className="top-1 h-28" src={logo} alt="Logo" />
        </div>
      </div>
    </div>
  </div>
)

const About = () => (
  <section
    id="about"
    className="relative md:scroll-mt-18 bg-gray-100 bg-[length:auto_370px,_100%_150px] bg-[position:right_bottom,_right_bottom,right_top_-10000px] bg-no-repeat pb-96 md:bg-[length:auto_450px,_100%_150px] md:bg-[position:right_bottom,_right_bottom,right_top_-90px] lg:pb-56"
    style={{
      backgroundImage: `url(${couch}), url(${couchBg}), url(${vanIsle})`
    }}
  >
    <div className="sans-serif my-8 sm:my-12 inline-block border border-l-0 border-gray-800 bg-white py-6 pl-8 pr-12 text-xl sm:text-2xl font-thin uppercase tracking-wider text-gray-700 sm:pl-12 sm:pr-20 md:text-3xl xl:pl-24">
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        What is Spacelift?
      </motion.h2>
    </div>
    <div className="px-8 sm:px-12 xl:pl-24">
      <div className="max-w-2xl sm:text-lg font-light leading-loose tracking-wide text-gray-700">
        Spacelift is your complete transformation design service for home /
        business / real estate. Any space, in any style.
        <br />
        <br />
        Cost-effective, reliable, and fully insured, we manage projects from
        start to success with personalized care at every step.
        <br />
        <br />
        Proudly based in southern Vancouver Island.
      </div>
      <div className="mt-12">
        <a href="#process" className={ButtonLarge}>
          View the process
          <img src={arrowDown} width="24" />
        </a>
      </div>
    </div>
    <div className="flex-1"></div>
  </section>
)

const TheProcess = () => {
  const stepsMap: { [key: string]: [string, string] } = {
    declutter: [declutter, declutterBg],
    organize: [organize, organizeBg],
    paint: [paint, paintBg],
    clean: [clean, cleanBg],
    stage: [stage, stageBg],
    merchandise: [merchandise, merchandiseBg]
  }

  const steps = Object.keys(stepsMap)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [selectedStep, setSelectedStep] =
    useState<keyof typeof stepsMap>('declutter')

  const isHoveringRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleHover = (stepIndex: number) => {
    isHoveringRef.current = true
    scrollToImage(containerRef.current, stepIndex)
    setSelectedStep(steps[stepIndex])
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isHoveringRef.current = false
    }, 500)
  }

  const handleScroll = () => {
    if (!containerRef.current || isHoveringRef.current) return
    const { scrollLeft, clientWidth } = containerRef.current
    const stepIndex = Math.round(scrollLeft / clientWidth)
    setSelectedStep(steps[stepIndex])
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id="process" className="relative flex md:scroll-mt-18 flex-col">
      <div className="sans-serif my-6 sm:my-12 inline-block self-center border  border-gray-800 bg-white py-6 px-8 text-xl sm:text-2xl font-thin uppercase tracking-wider text-gray-700 sm:px-20 md:text-3xl">
        <h2>The Process</h2>
      </div>
      <div className="mx-auto my-8 flex max-w-6xl flex-col justify-around gap-4 px-8 font-light leading-loose tracking-wide text-gray-700 sm:px-12 md:flex-row lg:my-16">
        <div className="flex flex-1 gap-8">
          <div className="font-serif text-4xl text-gray-300">1</div>
          <div className="sm:text-lg">
            We design a space perfectly-suited to fit your unique goals &amp;
            budget.
          </div>
        </div>
        <div className="flex flex-1 gap-6">
          <div className="font-serif text-4xl text-gray-300">2</div>
          <div className="sm:text-lg">
            Our process then takes over, to deliver incredible results and
            exceed expectations.
          </div>
        </div>
      </div>
      <div className="z-10 mx-auto -mb-18 grid grid-cols-3 gap-1 sm:gap-4 md:grid-cols-6 md:gap-8">
        {steps.map((step, index) => (
          <div
            key={`${step}-icon`}
            className={`sans-serif flex w-28 h-28 md:w-36 md:h-36 flex-1 flex-col items-center justify-center border border-gray-800 bg-white pt-4 pb-6 text-center text-xs sm:text-sm uppercase tracking-wide sm:tracking-wider hover:font-bold sm:hover:underline underline-offset-8 cursor-pointer ${
              selectedStep === step ? 'font-bold underline' : ''
            }`}
            onMouseEnter={() => handleHover(index)}
            onClick={() => handleHover(index)}
            onFocus={() => handleHover(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleHover(index)
              }
            }}
            tabIndex={0}
          >
            <img
              src={stepsMap[step][0]}
              alt={`${step} icon`}
              className="w-16 md:w-20 bg-black"
              loading="lazy"
            />
            <h4>{step}</h4>
          </div>
        ))}
      </div>
      <div
        className="h-96 xl:h-75vh hide-scrollbar overflow-x-scroll snap-x snap-mandatory"
        ref={containerRef}
      >
        <div className="flex h-full">
          {steps.map((step) => (
            <div
              key={`${step}-bg`}
              className="h-full w-full flex-shrink-0 snap-center"
            >
              <img
                src={stepsMap[step][1]}
                alt={`${step} background`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Space = ({
  title,
  description,
  images
}: {
  title: string
  description?: string
  images: string[]
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const handleScroll = () => {
    if (!containerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    setCanScrollPrev(scrollLeft > 0)
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      handleScroll()
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isFullWidth = !description

  return (
    <div>
      <div className="relative">
        <h3
          className={`border border-black sans-serif absolute bg-white px-4 py-2 md:px-8 md:py-3 text-center md:text-xl font-thin uppercase tracking-wider text-gray-700 ${
            isFullWidth
              ? 'top-8 md:top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              : 'top-3 left-3'
          }`}
        >
          {title}
        </h3>
        <div
          className={`border-0 lg:border border-t border-b hide-scrollbar flex snap-x snap-mandatory overflow-x-scroll aspect-video ${
            isFullWidth ? '' : 'border md:aspect-square'
          } border-black`}
          ref={containerRef}
        >
          {images.map((image, index) => (
            <div
              className="inline min-w-full snap-center bg-cover bg-center"
              key={index}
              style={{
                backgroundImage: `url(${image})`,
                scrollSnapAlign: 'center',
                height: '100%'
              }}
            />
          ))}

          <button
            className="absolute bottom-4 md:bottom-12 left-4 rounded-full bg-white p-2"
            onClick={() => scrollToImage(containerRef.current, 'prev')}
            aria-label="Scroll to previous image"
            disabled={!canScrollPrev}
          >
            <img
              src={arrowDown}
              width="24"
              className={`rotate-90 transition-opacity duration-500 ${
                canScrollPrev ? '' : 'opacity-25'
              }`}
              alt="Previous"
            />
          </button>
          <button
            className="absolute bottom-4 md:bottom-12 right-4 rounded-full bg-white p-2"
            onClick={() => scrollToImage(containerRef.current, 'next')}
            aria-label="Scroll to next image"
            disabled={!canScrollNext}
          >
            <img
              src={arrowDown}
              width="24"
              className={`-rotate-90  ${
                canScrollNext ? '' : 'opacity-25'
              } transition-opacity duration-500 `}
              alt="Next"
            />
          </button>
        </div>
      </div>
      {!!description && (
        <div className="pt-4 text-center font-light leading-loose tracking-wide text-gray-700 sm:px-10 md:pt-6 px-2 md:px-0">
          {description}
        </div>
      )}
    </div>
  )
}

const spaces: [string, string, string[]][] = [
  [
    'Home',
    "Whether it's a cozy living room or a vibrant kitchen, we bring tailored designs to elevate your everyday living.",
    [homeSpace1, homeSpace2, homeSpace3, homeSpace4, homeSpace5]
  ],
  [
    'Business',
    'Drive productivity and impresses clients. We specialize in modern, functional designs for businesses of all sizes.',
    [
      businessSpace1,
      businessSpace2,
      businessSpace3,
      businessSpace4,
      businessSpace5
    ]
  ],
  [
    'Real Estate',
    'Maximize property value with our expert staging services. We create inviting spaces that attract potential buyers.',
    [
      realEstateSpace1,
      realEstateSpace2,
      realEstateSpace3,
      realEstateSpace4,
      realEstateSpace5
    ]
  ],
  [
    'Store Displays',
    'Captivate customers with eye-catching store displays. Our designs enhance product visibility and drive sales.',
    [
      storeDisplaysSpace1,
      storeDisplaysSpace2,
      storeDisplaysSpace3,
      storeDisplaysSpace4,
      storeDisplaysSpace5,
      storeDisplaysSpace6
    ]
  ]
]

const Spaces = () => (
  <section id="spaces" className="relative md:scroll-mt-18">
    <div className="text-center lg:mb-24">
      <div className="sans-serif inline-block bg-white px-8 py-16 sm:py-20 text-lg sm:text-2xl font-thin uppercase tracking-wider text-gray-700 md:text-4xl lg:pb-20">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Any Space
          <span className="mx-2 mb-12 mt-0.5 text-gray-200 md:mx-6">•</span>
          Any Style
        </motion.h2>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 sm:px-12 pb-12 sm:pb-28 text-left md:grid-cols-2 md:gap-24">
        {spaces.map(([title, description, images]) => (
          <Space
            key={title}
            images={images}
            title={title}
            description={description}
          />
        ))}
      </div>
      <div className="max-w-6xl mx-auto">
        <Space
          title="Any Space"
          images={[
            anySpaceSpace1,
            anySpaceSpace2,
            anySpaceSpace3,
            anySpaceSpace4
          ]}
        />
      </div>
    </div>
  </section>
)

const CTA = () => (
  <section
    className="flex h-96 md:h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${anySpace})` }}
  >
    <div className="m-4 border bg-white/80 px-12 py-6 text-center text-lg font-light leading-loose tracking-wide text-gray-700 backdrop-blur-sm md:px-24 md:py-12">
      Have a unique space in mind?
      <br />
      Let us elevate it.
      <div className="mt-6">
        <a href="#contact" className={`${Button} ml-2 font-bold`}>
          Start your project
          <img src={arrowDown} width="24" />
        </a>
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="bg-gray-100">
    <div className="mx-auto flex max-w-6xl flex-col bg-gray-100 px-8 sm:px-12">
      <div className="mt-8 inline-flex justify-center gap-2 self-center py-4 px-6 bg-white bg-opacity-50 rounded-xl">
        <img src={star} alt="star" className="w-12 sm:w-18" />
        <img src={star} alt="star" className="w-12 sm:w-18" />
        <img src={star} alt="star" className="w-12 sm:w-18" />
        <img src={star} alt="star" className="w-12 sm:w-18" />
        <img src={star} alt="star" className="w-12 sm:w-18" />
      </div>
      <h2 className="mt-4 text-center text-lg sm:text-xl italic tracking-wide text-gray-600">
        Five-Star Customer Service
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:gap-x-20 sm:gap-y-16 py-12 md:grid-cols-3 lg:grid-cols-3">
        {[
          [
            'T. Malley',
            '“Completely transformed our space! The design was thoughtful, modern, and exactly what we needed. Couldn’t be happier!”'
          ],
          [
            'T. Deelstra',
            '“You did more than expected—your help staging our home was truly exceptional. I’m so happy to have you as my realtor!”'
          ],
          [
            'R. & J. Parker',
            '“Rose is the hardest worker I’ve ever known—thanks to her, we found our dream home and sold our place in just four days!”'
          ],
          [
            'M. Westgate',
            '“Rose brought our house to life with her keen eye for detail. Her enthusiasm and commitment made the process effortless!”'
          ],
          [
            'A. Scott',
            '“Rose works for you—hand-selecting homes that perfectly match your needs. I’ll definitely use her services again!”'
          ],
          [
            'M. Garcia',
            '“Rose was amazing—upfront, honest, and incredibly dedicated. She even cleaned and staged our home, selling it in just hours!”'
          ],
          [
            'M. Seel',
            '“Spacelift transformed our office! Their design gave us a competitive edge by boosting productivity and impressing clients. We couldn’t be happier!”'
          ],
          [
            'A. Johnson',
            '“Exceptional service and stunning results. Our new space is both beautiful and practical. Thank you, Spacelift!”'
          ],
          [
            'H. Smith',
            '“Spacelift transformed our home into a modern, stylish space. Their team was an absolute pleasure to work with, highly recommended!”'
          ]
        ].map(([name, quote]) => (
          <div key={name} className="flex flex-col">
            <div className="mb-2 text-lg italic text-gray-500">{name}</div>
            <div className="flex-1 border border-black bg-white px-6 py-4 text-sm italic leading-loose tracking-wide text-gray-700">
              <div>{quote}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const Question = ({
  title,
  children
}: {
  title: string
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mt-4">
      <h3
        className="mb-4 inline-flex cursor-pointer text-lg font-light text-gray-600 hover:underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{title}</div>
        <img
          src={arrowDown}
          width="24"
          className={`ml-4 inline-block ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </h3>
      {isOpen && (
        <motion.div
          className="border border-gray-800 bg-white p-6 text-sm leading-loose tracking-wide text-gray-800"
          initial={{ marginTop: -50, opacity: 0 }}
          animate={{ marginTop: 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

const FAQ = () => (
  <section className="bg-gray-100">
    <div className="mx-auto max-w-6xl px-8 pb-20 pt-12 sm:pt-24 sm:pb-36 sm:px-12">
      <h2 className="mb-12 sm:mb-16 text-2xl tracking-wide md:text-3xl">
        Frequently Asked Questions
      </h2>
      <Question title="What are the rates for your services?">
        Prices begin at $75.00 per hour (3 hour minimum). Jobs can vary
        depending on your needs and requirements.
      </Question>
      <Question title="Should I buy boxes, bins or containers?">
        These supplies can be costly but necessary. We are happy to work with
        items you may want to purchase or already have. Alternatively we can
        provide any needed items for an additional fee.
      </Question>
      <Question title="Is Spacelift fully insured and certified?">
        Absolutely! Spacelift is fully insured and certified, ensuring top-notch
        quality and peace of mind for all our clients. All of your information
        is confidential and secure.
      </Question>
      <Question title="Does your company offer moving services?">
        Unfortunately we do not offer physical moving and loading, but we are
        able to offer packing and unpacking services.
      </Question>
      <Question title="Do I need to be home for the Spacelift process?">
        No, not usually. Depending on the project scope we may need to spend
        some time together one-on-one sorting through items.
      </Question>
      <Question title="What happens to all the extra stuff I don't want?">
        We will take care of all your unwanted & unneeded items for you.
        <h5 className="mt-6 font-bold">DONATIONS:</h5>
        We will donate to organizations that make a difference in our community.
        <h5 className="mt-2 font-bold">REHOMED & REUSED:</h5>
        Your items can have a second chance and be rehomed and reused in a
        different project.
        <h5 className="mt-2 font-bold">RECYCLING, GARBAGE & HAULING:</h5>
        We are happy to take it away but additional dump fees and rates may
        apply.
      </Question>
      <Question title="Does your company offer interior or exterior painting?">
        From interior to exterior, little to big projects, we can fulfil your
        painting needs.
      </Question>
      <Question title="My back yard isn't working for me, is this a space you could help with?">
        Any space in any style. From inside to out we will work with any space
        you need.
      </Question>
    </div>
  </section>
)

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [question, setQuestion] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      setError('')
      setIsLoading(true)

      const response = await fetch('https://formcarry.com/s/VhZHRRwdqzu', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, question, message })
      })

      const data = await response.json()
      setIsLoading(false)

      if (data.code === 200) {
        setIsSuccess(true)
      } else {
        setError(data.message)
      }
    } catch (error: unknown) {
      setIsLoading(false)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  return (
    <section id="contact" className="flex md:scroll-mt-32">
      <div className="hidden flex-1 bg-[url('/src/assets/contact-bg.jpg')] bg-cover bg-center md:flex"></div>
      <div className="flex flex-[2] flex-col items-center p-8 leading-loose tracking-wide sm:p-12">
        <h2 className="sans-serif -mt-16 mb-6 inline border border-gray-800 bg-white px-8 py-4 text-center sm:text-xl w-full sm:w-auto font-thin uppercase tracking-wider sm:px-12 lg:-mt-24 lg:px-24 lg:py-8 lg:text-2xl">
          Start Your Spacelift
        </h2>

        {isSuccess ? (
          <div className="my-36 max-w-xl text-center">
            <h2 className="mb-8 text-xl">Thanks for getting in touch!</h2>
            <p>
              We&apos;ll get back to you within a few business days to discuss
              your Spacelift project.
              <br />
              <br />
              Your info:
              <br />
              <br />
              {name}
              <br />
              {email} / {phone}
              <br />
              <strong>Question:</strong> {question}
              <br />
              <strong>Message:</strong> {message}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="w-full sm:max-w-md">
            <label className="mt-4 block">
              <span className="text-gray-700">
                Name <sup className="text-red-400">*</sup>
              </span>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Your full name"
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full border border-gray-300 p-2"
                required
              />
            </label>
            <div className="flex-col md:flex-row gap-8">
              <label className="mt-6 block">
                <span className="text-gray-700">
                  Email <sup className="text-red-400">*</sup>
                </span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="your@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full border border-gray-300 p-2"
                  required
                />
              </label>
              <label className="mt-6 block">
                <span className="text-gray-700">Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  placeholder="123-456-7890"
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '')
                    if (value.length > 10) value = value.slice(0, 10)
                    const maskedValue = value.replace(
                      /(\d{3})(\d{0,3})(\d{0,4})/,
                      (match, p1, p2, p3) => {
                        if (p3) return `${p1}-${p2}-${p3}`
                        else if (p2) return `${p1}-${p2}`
                        else if (p1) return `${p1}`
                        return ''
                      }
                    )
                    setPhone(maskedValue)
                  }}
                  className="mt-2 block w-full border border-gray-300 p-2"
                />
              </label>
            </div>
            <label className="mt-6 block">
              <span className="text-gray-700">Have a question?</span>
              <input
                type="text"
                name="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-2 block w-full border border-gray-300 p-2"
              />
            </label>
            <label className="mt-6 block">
              <span className="text-gray-700">
                Tell us about your space <sup className="text-red-400">*</sup>
              </span>
              <textarea
                className="mt-2 block w-full border border-gray-300 p-2 text-sm"
                rows={5}
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
            {error && (
              <div className="mt-2 text-sm text-red-500">Error: {error}</div>
            )}
            <button
              className={`${ButtonLargeSecondary} mt-8 w-full rounded-full border border-gray-700`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="flex bg-black/90 text-white">
    <div className="hidden flex-1 items-center justify-center lg:flex lg:border-r-white">
      <div>
        <img src={logo} className="h-32 brightness-150 grayscale" />
        <div className="sans-serif flex justify-center text-xs tracking-widest ">
          <span className="mb-1">TRANSFORMING SPACES</span>
        </div>
      </div>
    </div>
    <div className="flex flex-[2] justify-between border-l border-l-white p-6 sm:px-12">
      <div className="flex flex-col gap-8 text-sm md:text-base">
        <div className="hidden font-thin tracking-wide md:block">
          Explore our projects on Facebook & Instagram!
        </div>
        <div className="flex-1 flex-col items-center gap-8 md:flex-row">
          <div className="flex gap-2">
            <a
              className="rounded-full border-2 border-white"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebook} />
            </a>
            <a
              className="rounded-full border-2 border-white"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagram} />
            </a>
          </div>
          <div className="hidden pt-2 tracking-wide text-white sm:block">
            @spaceliftonline
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-1 text-right">
        <div className="flex flex-1 flex-col">
          <a
            href="#"
            className="mb-2 inline-block text-sm tracking-wide underline underline-offset-8"
          >
            Back to top
            {/* <img src={arrowDown} width="24" className="rotate-90" /> */}
          </a>
        </div>
        <div className="mt-2 flex flex-col gap-2 text-sm tracking-wide text-gray-400">
          &copy; Spacelift {new Date().getFullYear()}
        </div>
      </div>
    </div>
  </footer>
)

const App = () => (
  <div className="relative overflow-hidden bg-white">
    <Header />
    <Hero />
    <About />
    <TheProcess />
    <Spaces />
    <Testimonials />
    <CTA />
    <FAQ />
    <Contact />
    <Footer />
  </div>
)

export default App
