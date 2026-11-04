import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { IMG, stats } from '../data'
import { Counter, EASE, Index, Lines, Rise, Spark } from './ui'

function Word({ children, progress, range, clay }: { children: string; progress: MotionValue<number>; range: [number, number]; clay?: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className={clay ? 'text-clay' : undefined}>
      {children}{' '}
    </motion.span>
  )
}

function Manifesto() {
  const ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const parts = [
    { text: 'We are not a gym. We are a training space —', clay: false },
    { text: 'where strength becomes a craft.', clay: true },
  ]
  const words = parts.flatMap((p) => p.text.split(' ').map((w) => ({ w, clay: p.clay })))
  return (
    <h2 ref={ref} className="display relative text-[clamp(2.4rem,6.4vw,6.2rem)]">
      <Spark className="mr-3 inline-block size-[0.62em] -translate-y-[0.08em] text-clay" />
      {words.map((item, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} clay={item.clay}>
          {item.w}
        </Word>
      ))}
    </h2>
  )
}

function Stat({ value, suffix, label, decimals, i }: (typeof stats)[number] & { i: number }) {
  return (
    <div className="border-t border-line pt-4">
      <div className="flex items-baseline justify-between">
        <span className="label text-ash">0{i + 1}</span>
      </div>
      {/* numbers are cropped at the baseline on purpose */}
      <div className="h-[0.7em] overflow-hidden text-[clamp(5.2rem,13vw,12.5rem)]">
        <motion.div
          initial={{ y: '40%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.3, ease: EASE, delay: i * 0.08 }}
          className="font-sans font-bold leading-[0.78] tracking-[-0.07em] [font-stretch:82%]"
        >
          <Counter to={value} decimals={decimals} />
          {suffix}
        </motion.div>
      </div>
      <p className="mt-3 max-w-[260px] text-[13px] leading-snug text-ash">{label}</p>
    </div>
  )
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostY = useTransform(scrollYProgress, [0, 1], ['-10%', '25%'])
  const ghostX = useTransform(scrollYProgress, [0, 1], ['10%', '-12%'])

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-paper px-5 pb-28 pt-24 md:px-10 md:pb-40 md:pt-36">
      <motion.div
        style={{ y: ghostY, x: ghostX }}
        className="pointer-events-none absolute -right-[6%] top-[4%] h-[90%] w-[70%] opacity-45 mix-blend-multiply md:w-[38%]"
        aria-hidden
      >
        <img
          src={IMG.runner}
          alt=""
          className="h-full w-full object-cover object-center [filter:grayscale(1)_contrast(1.5)_brightness(1.15)_blur(10px)] [mask-image:radial-gradient(ellipse_45%_48%_at_50%_50%,#000_35%,transparent_100%)]"
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="mb-10 flex items-start justify-between">
          <Index n="01" />
          <p className="max-w-[200px] text-right text-[12px] leading-snug text-ash">
            No pressure. No mirrors-and-music chaos. Only calm, coached and personal training.
          </p>
        </div>

        <div className="max-w-[1180px]">
          <Manifesto />
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <Rise className="md:col-span-4">
            <p className="label mb-3 text-clay">Who we train</p>
            <p className="text-[15px] leading-relaxed text-ink/80">
              People who value their time, their body and their energy. Founders, doctors, parents, students — anyone who sees training
              as balance, not punishment.
            </p>
          </Rise>
          <Rise className="md:col-span-4 md:col-start-7" delay={0.1}>
            <p className="label mb-3 text-clay">This is about life</p>
            <p className="text-[15px] leading-relaxed text-ink/80">
              Every detail — <span className="accent text-[1.15em]">considered</span>. Every movement —{' '}
              <span className="accent text-[1.15em]">coached</span>. Privacy, atmosphere and progress you can actually measure.
            </p>
          </Rise>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 md:mt-32 md:max-w-[960px]">
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function Details() {
  const steps = [0.32, 0.44, 0.52, 0.62, 0.7, 0.8, 0.88, 1]
  return (
    <section className="bg-paper px-5 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="relative mb-14 flex flex-col items-center text-center md:mb-20">
          <Index n="02" className="absolute left-0 top-0" />
          <Lines
            className="display text-[clamp(2.6rem,7vw,6.8rem)]"
            lines={[
              <>
                Details<span className="accent ml-1 text-clay">that</span>
              </>,
              'actually matter',
            ]}
          />
          <Rise delay={0.2}>
            <p className="mt-6 max-w-[440px] text-[14px] leading-relaxed text-ash">
              Excellence starts with the small things. Every part of Aayam is engineered to{' '}
              <span className="text-ink">support your goals and protect your time.</span>
            </p>
          </Rise>
        </div>

        <div className="grid gap-3 md:grid-cols-3 md:grid-rows-[260px_220px]">
          <Rise className="flex flex-col justify-between rounded-[22px] bg-bone p-7">
            <div>
              <h3 className="text-[26px] font-semibold tracking-tight">(Insight)</h3>
              <div className="mt-3 h-px w-2/3 bg-ink/20" />
            </div>
            <p className="max-w-[300px] text-[13px] leading-relaxed text-ash">
              We begin with a 45-minute assessment — posture, mobility, strength baselines and lifestyle — so your plan is built on real
              data, not guesswork.
            </p>
          </Rise>

          <Rise delay={0.08} className="flex flex-col justify-between rounded-[22px] bg-char p-5 text-paper md:row-span-2">
            <div className="flex h-[200px] items-end gap-1.5 rounded-2xl bg-ink/60 p-3">
              {steps.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-[10px]"
                  style={{ backgroundColor: `color-mix(in oklab, var(--color-clay) ${20 + i * 11}%, var(--color-bone))` }}
                  initial={{ height: '8%' }}
                  whileInView={{ height: `${h * 100}%` }}
                  viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.07 }}
                />
              ))}
            </div>
            <div className="px-2 pb-2">
              <h3 className="mt-8 text-[26px] font-semibold tracking-tight">(Progress)</h3>
              <div className="mt-3 h-px w-2/3 bg-paper/20" />
              <p className="mt-16 max-w-[300px] text-[13px] leading-relaxed text-paper/60">
                Strength numbers, body composition and attendance tracked in our app. You always know where you stand and what comes next.
              </p>
            </div>
          </Rise>

          <Rise delay={0.16} className="relative flex flex-col rounded-[22px] bg-clay p-7 text-paper md:row-span-2">
            <Spark className="absolute -left-2 -top-2 size-12 text-ink" />
            <h3 className="mt-6 text-[26px] font-semibold tracking-tight">(Care)</h3>
            <div className="mt-3 h-px w-2/3 bg-paper/30" />
            <p className="mt-auto max-w-[320px] text-[13px] leading-relaxed text-paper/80">
              A supervised kids’ corner, filtered water on every floor, fresh towels and lockers that charge your phone. Your training
              hour stays fully yours.
            </p>
          </Rise>

          <Rise delay={0.1} className="flex flex-col justify-between rounded-[22px] bg-ink p-7 text-paper">
            <div>
              <h3 className="text-[26px] font-semibold tracking-tight">(Expertise)</h3>
              <div className="mt-3 h-px w-2/3 bg-paper/20" />
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-paper/60">
              Every coach holds ACE, NSCA or K11 certification and trains under our in-house physio. Science-backed, never trend-chasing.
            </p>
          </Rise>
        </div>
      </div>
    </section>
  )
}
