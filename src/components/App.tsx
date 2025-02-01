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
import { FormEvent, Fragment, useState } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'motion/react'

const Button =
  'sans-serif border border-gray-800 px-8 py-2 text-gray-700 bg-white tracking-wider inline-flex gap-2 text-sm uppercase items-center hover:bg-gray-100 transition-colors justify-center'

const ButtonLarge = `${Button} text-lg px-12 py-3`
const ButtonLargeSecondary = `${ButtonLarge} bg-yellow-50 border-yellow-50`

const Header = () => {
  const controls = useAnimation()
  const { scrollY } = useScroll()
  const widthEnd = 180
  const scrollEnd = 310
  const leftEnd = '5%'

  // Map scroll position to left, top, width and opacity values
  const left = useTransform(scrollY, [0, scrollEnd], ['10%', leftEnd])
  const top = useTransform(scrollY, [0, scrollEnd], [80, -12])
  const width = useTransform(scrollY, [0, scrollEnd], [420, widthEnd])
  const opacity = useTransform(scrollY, [0, 80], [1, 0])

  // Background logo transforms
  const backLeft = useTransform(scrollY, [0, scrollEnd], ['-8%', '-10%'])
  const backWidth = useTransform(scrollY, [0, scrollEnd], [1200, 1200])
  const backTop = useTransform(scrollY, [0, scrollEnd], [-280, -400])
  const backOpacity = useTransform(scrollY, [0, scrollEnd], [0.075, 0])

  return (
    <header className="sans-serif fixed left-0 top-0 z-20 w-full bg-white/80 backdrop-blur-sm">
      <div className="relative">
        {/* Background logo */}
        <motion.img
          src={logo}
          width={1000}
          className="absolute -z-50 opacity-10 grayscale"
          style={{
            width: backWidth,
            left: backLeft,
            top: backTop,
            opacity: backOpacity,
            pointerEvents: 'none'
          }}
          alt="Background logo"
        />

        <motion.div
          className="absolute"
          style={{ left, top }}
          animate={controls}
        >
          <a href="#" className="justify-center text-center">
            <motion.img src={logo} style={{ width }} alt="Logo" />
            <motion.div
              className="flex justify-center text-sm tracking-widest text-gray-600"
              style={{ opacity }}
            >
              <span>TRANSFORMING SPACES</span>
            </motion.div>
          </a>
        </motion.div>

        <nav className="mt-4 flex items-center justify-end gap-6 p-4 text-sm uppercase tracking-wider underline-offset-8">
          {[
            { href: '#about', label: 'About' },
            { href: '#process', label: 'The Process' },
            { href: '#spaces', label: 'Any Space' }
          ].map((item, index) => (
            <Fragment key={index}>
              <a
                href={item.href}
                className="text-gray-700 hover:text-gray-900 hover:underline"
              >
                {item.label}
              </a>
              {index < 2 && <span className="text-gray-300">•</span>}
            </Fragment>
          ))}
          <a href="#contact" className={`${Button} ml-2 font-bold`}>
            Your Free Estimate
          </a>
          <div className="flex gap-2">
            <a href="">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="">
              <img src={instagram} alt="Instagram" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

const Hero = () => (
  <div className="flex h-screen">
    <div className="flex-1 pt-96 text-gray-700">
      <motion.div
        initial={{ marginLeft: -100, opacity: 0 }}
        animate={{ marginLeft: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="pad-left"
      >
        <h1 className="mt-4 text-4xl leading-loose tracking-wide">
          We specialize in revitalizing
          <br />
          <span className="sans-serif font-extralight">
            regular, unused, unloved
          </span>{' '}
          places
          <br />
          into <span className="underline">amazin</span>g spaces.
        </h1>
      </motion.div>
      <div className="pad-left my-12 bg-gray-50 py-6 pr-4">
        <div className="sans-serif inline-flex gap-10 text-gray-500">
          {['Home', 'Business', 'Real-Estate', 'Any Space'].map(
            (item, index) => (
              <motion.div
                key={index}
                className="flex text-sm uppercase tracking-wider"
                initial={{ marginLeft: -100, opacity: 0 }}
                animate={{ marginLeft: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.25 }}
              >
                {item}
                <img src={check} className="ml-4 h-5" />
              </motion.div>
            )
          )}
        </div>
      </div>
      <div className="pad-left inline-flex gap-8">
        <a href="#about" className={ButtonLarge}>
          Learn More
          <img src={arrowDown} width="24" />
        </a>
        <a href="#contact" className={ButtonLargeSecondary}>
          Book an Estimate
        </a>
      </div>
    </div>
    <div className="flex flex-1 pt-28">
      <img src={hero} width="100%" />
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
    <motion.div whileInView={{ marginLeft: 0 }}>
      <div className="pad-left sans-serif absolute -top-10 left-0 border border-l-0 border-gray-800 bg-white py-6 pr-20 text-3xl font-thin uppercase tracking-wider text-gray-700">
        <h2>What is Spacelift?</h2>
      </div>
    </motion.div>
    <div className="pad-left max-w-2xl">
      <div className="text-xl font-light leading-loose tracking-wide text-gray-700">
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
      <div className="sans-serif my-12 inline-block self-center border border-gray-800 bg-white px-20 py-6 text-center text-3xl font-thin uppercase tracking-wider text-gray-700">
        <h2>The Process</h2>
      </div>
      <div className="mx-auto mb-36 flex justify-around gap-16 text-center text-xl font-light leading-loose tracking-wide text-gray-700">
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
      <div className="relative flex-1">
        <div
          key={selectedStep}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: stepsMap[selectedStep][1] }}
        />
        <div className="relative z-10 mx-auto -mt-20 flex max-w-6xl justify-around gap-12">
          {steps.map((step) => (
            <div
              key={step}
              className="sans-serif flex w-48 flex-1 cursor-pointer flex-col items-center justify-center border border-gray-800 bg-white pb-5 pt-3 text-center text-sm uppercase tracking-wider"
              onMouseEnter={() => setSelectedStep(step)}
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
      </div>
    </section>
  )
}

const Space = ({
  title,
  description
}: {
  title: string
  description: string
}) => {
  return (
    <div>
      <div className="relative border-gray-800">
        <h3 className="sans-serif absolute -top-10 inline border border-gray-800 bg-white px-12 py-4 text-xl font-thin uppercase tracking-wider text-gray-700">
          {title}
        </h3>
        <img
          src={`/src/assets/spaces/${title}-1.png`}
          width="100%"
          alt={`${title} photo 1`}
        />
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
      <div className="pad-left sans-serif absolute -top-10 left-0 border border-l-0 border-gray-800 bg-white py-6 pr-20 text-3xl font-thin uppercase tracking-wider text-gray-700">
        <h2>
          Any Space<span className="mx-3 mt-0.5">•</span>Any Style
        </h2>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-32">
        {[
          [
            'Home',
            "Whether it's a cozy living room or a vibrant kitchen, we bring tailored designs to elevate your everyday living."
          ],
          [
            'Business',
            'Drive productivity and impresses clients. We specialize in modern, functional designs for businesses of all sizes.'
          ],
          [
            'Real-Estate',
            'Maximize property value with our expert staging services. We create inviting spaces that attract potential buyers.'
          ],
          [
            'Store Displays',
            'Captivate customers with eye-catching store displays. Our designs enhance product visibility and drive sales.'
          ],
          [
            'Window Fronts',
            'Transform your window fronts into stunning showcases. We design displays that draw attention and increase foot traffic.'
          ],
          [
            'Any Space',
            'No matter the space, we bring your vision to life. Our versatile designs cater to any style and function.'
          ]
        ].map(([title, description]) => (
          <Space key={title} title={title} description={description} />
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
  question,
  answer
}: {
  question: string
  answer: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mt-8">
      <h3
        className="inline-block cursor-pointer text-lg font-light text-gray-600 hover:underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <img
          src={arrowDown}
          width="24"
          className={`ml-4 inline-block ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </h3>
      {isOpen && (
        <p className="mt-2 p-6 text-sm tracking-wide text-gray-800">{answer}</p>
      )}
    </div>
  )
}

const FAQ = () => (
  <section className=" bg-gray-100">
    <div className="mx-auto max-w-6xl px-4 py-28">
      <h2 className="mb-16 text-center text-3xl tracking-wide">
        Frequently Asked Questions
      </h2>
      {[
        [
          'What are the rates for your services?',
          'Prices begin at $75.00 per hour. (3 hour minimum). Jobs can vary depending your needs and requirements. '
        ],
        [
          "What happens to all the extra stuff I don't want?",
          'We will take care of all your unwanted & unneeded items for you. *DONATIONS. We will donate to organizations that make a difference in our community. *REHOMED & REUSED Your items can have a second chance and be Rehomed and reused in a different project. *RECYCLING, GARBAGE & HAULING. We are happy to take it away but additional dump fees and rates may apply.'
        ],
        [
          'Does your company offer moving services?',
          'Unfortunately we do not offer physical moving and loading but we are able to offer packing and unpacking services. '
        ],
        [
          'Should I buy boxes, bins and containers?',
          'These supplies can be costly but necessary. We are happy to work with items you may want to purchase or already have. Alternatively we can purchase any needed items for an additional fee . '
        ],
        [
          'Does your company offer interior or exterior painting?',
          'From interior to exterior, little to big projects, we can fulfil your painting needs.'
        ],
        [
          'Do I need to be home for the Spacelift process?',
          'No not usually. Depending on the project scope we may need to spend some time together one-on-one sorting through items.'
        ],
        [
          'My back yard isn’t working for me. Is this a space that you could help with?',
          'Any space in any style.  From inside to out we will work with any space you need.'
        ]
      ].map(([question, answer]) => (
        <Question key={question} question={question} answer={answer} />
      ))}
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      setError('')

      const response = await fetch('https://formcarry.com/s/VhZHRRwdqzu', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, whichSpace, message })
      })

      const data = await response.json()

      if (data.code === 200) {
        alert('We received your submission, thank you!')
      } else {
        setError(data.message)
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <section id="contact" className="flex scroll-mt-20">
      <div className="flex basis-1/3 bg-[url('/src/assets/contact-bg.jpg')] bg-cover bg-center"></div>
      <div className="flex basis-2/3 flex-col items-center p-12 leading-loose tracking-wide">
        <h2 className="sans-serif mb-6 inline border border-gray-800 px-24 py-8 text-2xl font-thin uppercase tracking-wide">
          Ready to start your project?
        </h2>

        <form onSubmit={onSubmit}>
          <label className="mt-6 block">
            <span className="text-gray-700">
              Your Name <sup className="text-red-400">*</sup>
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
            className={`${ButtonLargeSecondary} mt-8 w-full`}
            type="submit"
          >
            Book my free estimate
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
          <span className="text-xl tracking-wide text-gray-300">
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
