import './App.css'
import logo from 'assets/spacelift-logo-transparent.png'
import hero from 'assets/hero-1.png'
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
import market from 'assets/process/market.png'
import stage from 'assets/process/stage.png'
import organize from 'assets/process/organize.png'
import cleanBg from 'assets/clean.png'
import declutterBg from 'assets/declutter.png'
import paintBg from 'assets/paint.png'
import marketBg from 'assets/market.png'
import stageBg from 'assets/stage.png'
import organizeBg from 'assets/organize.png'
import { FormEvent, Fragment, ReactNode, useEffect, useState } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'motion/react'
import homeSpace from 'assets/spaces/home-1.png'
import businessSpace from 'assets/spaces/business-1.png'
import realEstateSpace from 'assets/spaces/real-estate-1.png'
import storeDisplaysSpace from 'assets/spaces/store-displays-1.png'
import windowFrontsSpace from 'assets/spaces/window-fronts-1.png'
import anySpaceSpace from 'assets/spaces/any-space-1.png'

const Button =
  'sans-serif border border-gray-800 px-8 py-2 text-gray-700 bg-white tracking-wider inline-flex gap-2 text-sm uppercase items-center hover:bg-gray-100 transition-colors justify-center'

const ButtonLarge = `${Button} text-lg px-12 py-3`
const ButtonLargeSecondary = `${ButtonLarge} bg-yellow-50 border-yellow-50`

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
  const widthEnd = 180
  const scrollEnd = 310
  const leftEnd = '2rem'

  // Dynamic transforms for the logo (desktop only)
  const left = useTransform(scrollY, [0, scrollEnd], ['12rem', leftEnd])
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
      <div className="flex justify-between px-8 lg:mx-auto lg:block">
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
          className="absolute"
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
        <nav className="mt-4 hidden items-center justify-end gap-6 py-4 text-sm uppercase tracking-wider underline-offset-8 md:flex">
          {navLinks.map((item, index) => (
            <Fragment key={index}>
              <a
                href={item.href}
                className="text-gray-700 hover:text-gray-900 hover:underline"
              >
                {item.label}
              </a>
              {index < navLinks.length - 1 && (
                <span className="text-gray-300">•</span>
              )}
            </Fragment>
          ))}
          <a href="#contact" className={`${Button} ml-2 font-bold`}>
            <span className="hidden lg:block">Your </span>Free Estimate
          </a>
          <div className="hidden gap-2 lg:flex">
            <a href="#">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="#">
              <img src={instagram} alt="Instagram" />
            </a>
          </div>
        </nav>

        {/* Hamburger button for mobile (always in top-right) */}
        <div className="absolute right-4 top-4 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-md bg-white p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            {menuOpen ? (
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                style={{ transform: 'translateY(-1px)' }}
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
          <nav className="mt-4 flex flex-col items-center justify-end gap-4 py-4 text-sm uppercase tracking-wider underline-offset-8 md:hidden">
            {navLinks.map((item, index) => (
              <Fragment key={index}>
                <a
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
                {index < navLinks.length - 1 && (
                  <span className="text-gray-300">•</span>
                )}
              </Fragment>
            ))}
            <a
              href="#contact"
              className={`${Button} ml-2 font-bold`}
              onClick={() => setMenuOpen(false)}
            >
              Your Free Estimate
            </a>
            <div className="flex gap-2">
              <a href="#" onClick={() => setMenuOpen(false)}>
                <img src={facebook} alt="Facebook" />
              </a>
              <a href="#" onClick={() => setMenuOpen(false)}>
                <img src={instagram} alt="Instagram" />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

const Hero = () => (
  <div className="flex h-screen flex-col-reverse pt-16 md:flex-row md:pt-24">
    <div className="flex-[2] pt-32 text-gray-700 md:flex-row md:pt-72 xl:flex-1">
      <motion.div
        initial={{ marginLeft: -100, opacity: 0 }}
        animate={{ marginLeft: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-3xl px-20 md:pl-12 xl:pl-24"
      >
        <h1 className="text-center text-4xl leading-loose tracking-wide md:text-left">
          We specialize in revitalizing {/* <br /> */}
          <span className="sans-serif font-extralight">
            regular, unused, unloved
          </span>{' '}
          places
          {/* <br /> */} into <span className="underline">amazin</span>g spaces.
        </h1>
      </motion.div>
      <div className="my-6 bg-gray-50 px-20 py-6 md:my-12 md:pl-12 xl:pl-24">
        <div className="sans-serif flex max-w-xl justify-between text-gray-500 lg:gap-6 xl:gap-8">
          {['Home', 'Business', 'Real-Estate', 'Any Space'].map(
            (item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 whitespace-nowrap text-sm uppercase tracking-wider lg:gap-4"
                initial={{ marginLeft: -100, opacity: 0 }}
                animate={{ marginLeft: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.25 }}
              >
                {item}
                <img src={check} className="size-4" />
              </motion.div>
            )
          )}
        </div>
      </div>
      <div className="flex max-w-3xl justify-between gap-8 px-20 md:justify-around md:pl-12 xl:pl-24">
        <a href="#about" className={`${ButtonLarge} flex-1`}>
          Learn More
          <img src={arrowDown} width="24" />
        </a>
        <a href="#contact" className={`${ButtonLargeSecondary} flex-1`}>
          Book an Estimate
        </a>
      </div>
    </div>
    <div
      className="-mb-24 flex flex-1 bg-cover"
      style={{ backgroundImage: `url(${hero})` }}
    >
      {/* <img src={hero} width="100%" /> */}
    </div>
  </div>
)

const About = () => (
  <section
    id="about"
    className="relative mt-12 scroll-mt-32 bg-gray-100 bg-[length:auto_450px,_100%_150px] bg-[position:right_bottom,_right_bottom,right_top_-90px] bg-no-repeat pb-56 pt-28"
    style={{
      backgroundImage: `url(${couch}), url(${couchBg}), url(${vanIsle})`
    }}
  >
    <div className="sans-serif absolute -top-10 left-0 border border-l-0 border-gray-800 bg-white py-6 pl-12 pr-20 text-3xl font-thin uppercase tracking-wider text-gray-700 xl:pl-24">
      <h2>What is Spacelift?</h2>
    </div>
    <div className="px-24">
      <div className="max-w-2xl text-xl font-light leading-loose tracking-wide text-gray-700">
        Spacelift is your complete transformation <br />
        design service for home &amp; business.
        <br />
        Any space, in any style.
        <br />
        <br />
        Cost-effective, reliable, and fully insured,
        <br />
        we manage projects from start to success with personalized care at every
        step.
        <br />
        <br />
        Proudly based on Vancouver Island.
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
    market: [market, marketBg]
  }

  const steps = Object.keys(stepsMap)

  const [selectedStep, setSelectedStep] = useState(steps[0])

  return (
    <section
      id="process"
      className="relative flex h-screen scroll-mt-32 flex-col"
    >
      <div className="sans-serif -mt-12 inline-block self-center border border-gray-800 bg-white px-20 py-6 text-center text-3xl font-thin uppercase tracking-wider text-gray-700">
        <h2>The Process</h2>
      </div>
      <div className="mx-auto my-24 flex justify-around gap-16 text-center text-xl font-light leading-loose tracking-wide text-gray-700">
        <div>
          Spacelift designs a space perfectly-suited
          <br />
          to fit your unique goals &amp; budget.
        </div>
        <div>
          Our process then takes over, to deliver
          <br />
          incredible results, and exceed expectations.
        </div>
      </div>
      <div className="z-10 mx-auto -mb-16 flex gap-8">
        {steps.map((step) => (
          <div
            key={`${step}-icon`}
            className="sans-serif flex w-48 max-w-36 flex-1 flex-col items-center justify-center border border-gray-800 bg-white pb-5 pt-3 text-center text-sm uppercase tracking-wider transition-all hover:-mb-6"
            onMouseEnter={() => {
              setSelectedStep(step)
            }}
          >
            <img
              src={stepsMap[step][0]}
              alt={`${step} icon`}
              className="mb-2 w-20"
            />
            {step}
          </div>
        ))}
      </div>
      <div className="flex-1">
        {steps.map((step) => (
          <div
            key={`${step}-bg`}
            className="h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${stepsMap[step][1]})`,
              display: step === selectedStep ? 'block' : 'none'
            }}
          />
        ))}
      </div>
    </section>
  )
}

const Space = ({
  title,
  description,
  image
}: {
  title: string
  description: string
  image: string
}) => {
  return (
    <div>
      <div className="relative border-gray-800">
        <h3 className="sans-serif absolute -top-10 inline border border-gray-800 bg-white px-12 py-4 text-xl font-thin uppercase tracking-wider text-gray-700">
          {title}
        </h3>
        <img src={image} width="100%" alt={`${title} photo 1`} />
        <button className="absolute bottom-12 left-4 rounded-full bg-white p-2">
          <img src={arrowDown} width="24" className="rotate-90" />
        </button>
        <button className="absolute bottom-12 right-4 rounded-full bg-white p-2">
          <img src={arrowDown} width="24" className="-rotate-90" />
        </button>
      </div>
      <div className="px-10 pt-10 text-center text-lg font-light leading-loose tracking-wide text-gray-700">
        {description}
      </div>
    </div>
  )
}

const AnySpace = () => (
  <section id="spaces" className="relative scroll-mt-32">
    <div className="pb-24 pt-48">
      <div className="sans-serif absolute -top-10 left-0 border border-l-0 border-gray-800 bg-white py-6 pl-12 pr-20 text-3xl font-thin uppercase tracking-wider text-gray-700 xl:pl-24">
        <h2>
          Any Space<span className="mx-3 mt-0.5">•</span>Any Style
        </h2>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-32">
        {[
          [
            'Home',
            "Whether it's a cozy living room or a vibrant kitchen, we bring tailored designs to elevate your everyday living.",
            homeSpace
          ],
          [
            'Business',
            'Drive productivity and impresses clients. We specialize in modern, functional designs for businesses of all sizes.',
            businessSpace
          ],
          [
            'Real-Estate',
            'Maximize property value with our expert staging services. We create inviting spaces that attract potential buyers.',
            realEstateSpace
          ],
          [
            'Store Displays',
            'Captivate customers with eye-catching store displays. Our designs enhance product visibility and drive sales.',
            storeDisplaysSpace
          ],
          [
            'Window Fronts',
            'Transform your window fronts into stunning showcases. We design displays that draw attention and increase foot traffic.',
            windowFrontsSpace
          ],
          [
            'Any Space',
            'No matter the space, we bring your vision to life. Our versatile designs cater to any style and function.',
            anySpaceSpace
          ]
        ].map(([title, description, image]) => (
          <Space
            key={title}
            image={image}
            title={title}
            description={description}
          />
        ))}
      </div>
    </div>
  </section>
)

const CTA = () => (
  <section
    className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${anySpace})` }}
  >
    <div className="border border-gray-800 bg-white/80 px-24 py-12 text-center text-lg font-light leading-loose tracking-wide text-gray-700 backdrop-blur-sm">
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
    <div className="mx-auto max-w-6xl bg-gray-100 px-4 py-16">
      <div className="flex justify-center">
        <img src={star} alt="star" />
        <img src={star} alt="star" />
        <img src={star} alt="star" />
        <img src={star} alt="star" />
        <img src={star} alt="star" />
      </div>
      <div className="grid grid-cols-3 gap-x-20 gap-y-16 py-12">
        {[
          [
            'T. Malley',
            '“Completely transformed our space! The design was thoughtful, modern, and exactly what we needed. Couldnt be happier!”'
          ],
          [
            'J. Smith',
            '“The team at Spacelift exceeded our expectations. Their attention to detail and creativity brought our vision to life.”'
          ],
          [
            'A. Johnson',
            '“Professional, efficient, and highly skilled. Our office space has never looked better. Highly recommend Spacelift!”'
          ],
          [
            'R. Lee',
            '“From start to finish, the process was seamless. The end result was a beautiful, functional space that we love.”'
          ],
          [
            'K. Patel',
            '“Spacelift transformed our home into a modern, stylish space. Their team was a pleasure to work with.”'
          ],
          [
            'M. Garcia',
            '“Exceptional service and stunning results. Our new space is both beautiful and practical. Thank you, Spacelift!”'
          ]
        ].map(([name, quote]) => (
          <div key={name}>
            <div className="mb-2 italic text-gray-500">{name}</div>
            <div className="border border-black bg-white px-6 py-4 text-sm italic leading-loose tracking-wide text-gray-700">
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
    <div className="mt-8">
      <h3
        className="inline-block cursor-pointer text-lg font-light text-gray-600 hover:underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <img
          src={arrowDown}
          width="24"
          className={`ml-4 inline-block ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </h3>
      <div
        className="mt-4 bg-white p-6 text-sm leading-loose tracking-wide text-gray-800"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        {children}
      </div>
    </div>
  )
}

const FAQ = () => (
  <section className="bg-gray-100">
    <div className="mx-auto max-w-6xl px-4 py-28">
      <h2 className="mb-16 text-center text-3xl tracking-wide">
        Frequently Asked Questions
      </h2>
      <Question title="What are the rates for your services?">
        Prices begin at $75.00 per hour. (3 hour minimum). Jobs can vary
        depending your needs and requirements.
      </Question>
      <Question title="What happens to all the extra stuff I don't want?">
        We will take care of all your unwanted & unneeded items for you.
        <p className="mt-8">
          <strong>DONATIONS:</strong> We will donate to organizations that make
          a difference in our community.
        </p>
        <p>
          <strong>REHOMED & REUSED:</strong> Your items can have a second chance
          and be Rehomed and reused in a different project.
        </p>
        <p>
          <strong>RECYCLING, GARBAGE & HAULING:</strong> We are happy to take it
          away but additional dump fees and rates may apply.
        </p>
      </Question>
      <Question title="Should I buy boxes, bins or containers?">
        These supplies can be costly but necessary. We are happy to work with
        items you may want to purchase or already have. Alternatively we can
        purchase any needed items for an additional fee.
      </Question>
      <Question title="Does your company offer interior or exterior painting?">
        From interior to exterior, little to big projects, we can fulfil your
        painting needs.
      </Question>
      <Question title="Do I need to be home for the Spacelift process?">
        No not usually. Depending on the project scope we may need to spend some
        time together one-on-one sorting through items.
      </Question>
      <Question title="My back yard isn't working for me. Is this a space that you could help with?">
        Any space in any style. From inside to out we will work with any space
        you need.
      </Question>
    </div>
  </section>
)

const Contact = () => {
  const [whichSpace, setWhichSpace] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
        body: JSON.stringify({ name, email, phone, whichSpace, message })
      })

      const data = await response.json()
      setIsLoading(false)

      if (data.code === 200) {
        setTimeout(() => {
          alert(`Thank you ${name}, we will respond within 2-3 business days.`)
        }, 0)
      } else {
        setError(data.message)
      }
    } catch (error: any) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  return (
    <section id="contact" className="flex scroll-mt-20">
      <div className="flex basis-1/3 bg-[url('/src/assets/contact-bg.jpg')] bg-cover bg-center"></div>
      <div className="flex basis-2/3 flex-col items-center p-12 leading-loose tracking-wide">
        <h2 className="sans-serif -mt-24 mb-6 inline border border-gray-800 bg-white px-24 py-8 text-2xl font-thin uppercase tracking-wide">
          Start your Spacelift Today!
        </h2>

        <form onSubmit={onSubmit}>
          <label className="mt-4 block">
            <span className="text-gray-700">
              Name <sup className="text-red-400">*</sup>
            </span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full border border-gray-300 p-2"
              required
            />
          </label>
          <div className="flex gap-8">
            <label className="mt-6 block">
              <span className="text-gray-700">
                Email <sup className="text-red-400">*</sup>
              </span>
              <input
                type="email"
                name="email"
                value={email}
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
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 block w-full border border-gray-300 p-2"
              />
            </label>
          </div>
          <label className="mt-6 block">
            <span className="text-gray-700">
              Which space do you have in mind?
            </span>
            <input
              type="text"
              name="whichSpace"
              value={whichSpace}
              onChange={(e) => setWhichSpace(e.target.value)}
              className="mt-2 block w-full border border-gray-300 p-2"
            />
          </label>
          <label className="mt-6 block">
            <span className="text-gray-700">
              Tell us about your project <sup className="text-red-400">*</sup>
            </span>
            <textarea
              className="mt-2 block w-full border border-gray-300 p-2"
              rows={6}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          {error && <div className="mt-2 text-red-500">Error: {error}</div>}
          <button
            className={`${ButtonLargeSecondary} mt-8 w-full rounded-full border-gray-600`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Book my free estimate'}
          </button>
        </form>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="flex bg-black/90 text-white">
    <div className=" flex basis-1/3 items-center justify-center border-r-white">
      <div>
        <img src={logo} className="h-32 brightness-150 grayscale" />
        <div className="sans-serif flex justify-center text-xs tracking-widest ">
          <span>TRANSFORMING SPACES</span>
        </div>
      </div>
    </div>
    <div className="flex flex-1 justify-between border-l border-l-white px-12 py-8">
      <div className="flex flex-col gap-8">
        <div className="font-thin tracking-wide">
          Explore our projects on Facebook & Instagram
        </div>
        <div className="flex basis-1 items-center gap-4">
          <div className="flex gap-2">
            <a className="rounded-full border-2 border-white" href="">
              <img src={facebook} />
            </a>
            <a className="rounded-full border-2 border-white" href="">
              <img src={instagram} />
            </a>
          </div>
          <span className="text-xl tracking-wide text-white">
            @spaceliftonline
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 text-right">
        <a
          href="#"
          className="mb-2 inline-block text-sm tracking-wide underline"
        >
          Back to top
        </a>
        <a
          className="inline-block text-lg tracking-wide hover:underline"
          href="mailto:info@spacelift.online"
        >
          info@spacelift.online
        </a>
        <a
          className="inline-block text-lg tracking-wide hover:underline"
          href="tel:2501234567"
        >
          (250)-123-4567
        </a>
        <span className="mt-2 text-sm tracking-wide text-gray-400">
          &copy; Spacelift 2024
        </span>
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
    <AnySpace />
    <Testimonials />
    <CTA />
    <FAQ />
    <Contact />
    <Footer />
  </div>
)

export default App
