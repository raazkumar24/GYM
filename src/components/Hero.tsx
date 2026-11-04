import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { BRAND, IMG, reviews } from '../data'
import { Arrow, EASE, Lines, PillButton } from './ui'

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
})

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const markY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section id="top" ref={ref} className="relative bg-ink p-2.5 md:p-3">
      <motion.div
        className="relative flex h-[calc(100svh-20px)] min-h-[620px] flex-col overflow-hidden rounded-[22px] md:rounded-[28px]"
        initial={{ clipPath: 'inset(14% 10% 14% 10% round 28px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
        transition={{ duration: 1.5, ease: EASE, delay: 0.1 }}
      >
        {/* Background photo */}
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <motion.img
            src={IMG.hero}
            alt="Athlete preparing for a barbell lift in a dimly lit training room"
            className="h-full w-full object-cover object-[62%_30%] [filter:grayscale(0.55)_contrast(1.08)_sepia(0.18)]"
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: EASE, delay: 0.1 }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,21,19,0.75)_0%,rgba(21,21,19,0.25)_50%,rgba(21,21,19,0)_75%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,21,19,0.5)_0%,rgba(21,21,19,0)_30%,rgba(21,21,19,0)_55%,rgba(21,21,19,0.9)_100%)]" />
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />

        {/* Content: sits in its own row, never under the wordmark */}
        <motion.div style={{ y: contentY, opacity: fade }} className="relative z-10 flex flex-1 flex-col px-5 pt-24 text-paper md:px-10 md:pt-28">
          <motion.div {...fadeIn(1.1)} className="flex items-start justify-between gap-6">
            <p className="label leading-relaxed text-paper/65">
              Est. 2019
              <br />
              {BRAND.city}
            </p>
            <p className="label hidden max-w-[220px] text-right leading-relaxed text-paper/65 md:block">
              A members-first training space, capped at 60 people an hour.
            </p>
          </motion.div>

          <div className="mt-auto flex items-end justify-between gap-10 pb-6 md:pb-8">
            <div className="max-w-[640px]">
              <Lines
                as="h1"
                delay={0.7}
                className="display text-[clamp(2.6rem,min(6.6vw,11vh),6.6rem)]"
                lines={[
                  'Strength,',
                  <>
                    held with <span className="accent text-clay-soft">intention</span>.
                  </>,
                ]}
              />
              <motion.p {...fadeIn(1.25)} className="mt-5 max-w-[400px] text-[14px] leading-relaxed text-paper/75">
                Coached training, recovery and community under one roof — built for people who want results without the noise.
              </motion.p>
              <motion.div {...fadeIn(1.4)} className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-5">
                <PillButton href="#trial" variant="paper">
                  Book a free session
                </PillButton>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {reviews.slice(0, 3).map((r) => (
                      <img key={r.name} src={r.img} alt="" className="size-9 rounded-full object-cover ring-2 ring-ink" />
                    ))}
                  </div>
                  <div className="leading-tight">
                    <p className="text-[17px] font-semibold tracking-tight">2,300+</p>
                    <p className="label text-[9px] text-paper/60">active members</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* <motion.div
              initial={{ opacity: 0, y: 30, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              transition={{ delay: 1.6, duration: 1.1, ease: EASE }}
              className="hidden w-[240px] shrink-0 rounded-2xl bg-paper p-2 text-ink shadow-2xl lg:block"
            >
              <div className="relative h-[120px] overflow-hidden rounded-xl">
                <img src={IMG.heroInset} alt="" className="h-full w-full object-cover grayscale" />
                <span className="label absolute left-2 top-2 rounded-full bg-paper px-2 py-1 text-[9px] text-ink">Today · 6:00 AM</span>
              </div>
              <div className="flex items-center justify-between px-2 pb-1 pt-2.5">
                <div>
                  <p className="text-[13px] font-semibold leading-tight">Strength Pod</p>
                  <p className="label mt-0.5 text-[9px] text-clay">2 spots left</p>
                </div>
                <a href="#trial" className="grid size-8 place-items-center rounded-full bg-ink text-paper" aria-label="Book strength pod">
                  <Arrow dir="up-right" className="size-3" />
                </a>
              </div>
            </motion.div> */}
          </div>
        </motion.div>

        {/* Wordmark: in normal flow at the bottom, sized by width and height */}
        <div className="relative z-0 border-t border-paper/15 px-3 md:px-6">
          <motion.h2
            style={{ y: markY }}
            aria-label={BRAND.name}
            className="flex justify-between font-sans text-[min(23vw,30vh)] font-[800] uppercase leading-[0.8] tracking-[-0.06em] text-paper [font-stretch:72%]"
          >
            {BRAND.name.split('').map((ch, i) => (
              <span key={i} className="block overflow-hidden pt-[0.06em]">
                <motion.span
                  className="block translate-y-[6%]"
                  initial={{ y: '100%' }}
                  animate={{ y: '6%' }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.55 + i * 0.07 }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </div>
      </motion.div>
    </section>
  )
}
