import Lenis from 'lenis'
import { MotionConfig } from 'motion/react'
import { useEffect, useState } from 'react'
import About, { Details } from './components/About'
import { Events, Faq, Footer, Trial } from './components/Closing'
import Hero from './components/Hero'
import Nav from './components/Nav'
import { Reviews, Team } from './components/People'
import Pricing from './components/Pricing'
import Programs, { Rituals } from './components/Programs'

export default function App() {
  const [plan, setPlan] = useState('Transit (Monthly)')

  useEffect(() => {
    document.title = 'Aayam — Strength Studio, Indiranagar Bengaluru'
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    let id = 0
    const raf = (t: number) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <About />
        <Details />
        <Programs />
        <Rituals />
        <Pricing onSelect={setPlan} />
        <Team />
        <Reviews />
        <Events />
        <Faq />
        <Trial plan={plan} setPlan={setPlan} />
      </main>
      <Footer />
    </MotionConfig>
  )
}
