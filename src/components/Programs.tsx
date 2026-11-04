import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { programs, rituals } from '../data'
import { Arrow, EASE, Index, Lines, Rise, Spark } from './ui'

function useIsDesktop() {
  const [d, setD] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setD(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return d
}

export default function Programs() {
  const [active, setActive] = useState(2)

  return (
    <section id="programs" className="bg-paper px-5 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
          <Lines
            className="display text-[clamp(2.6rem,7vw,6.8rem)]"
            lines={[
              <>
                Your<span className="accent ml-2 text-clay">choice</span>
              </>,
              'of practice',
            ]}
          />
          <div className="text-right">
            <Index n="03" />
            <p className="mt-2 text-[12px] text-ash">
              {programs.length} disciplines,
              <br />
              one membership
            </p>
          </div>
        </div>

        {/* Desktop: vertical pill accordion */}
        <Rise className="hidden h-[480px] gap-2 md:flex">
          {programs.map((p, i) => {
            const on = i === active
            return (
              <button
                key={p.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={on}
                className={`relative min-w-0 overflow-hidden rounded-[40px] text-left ring-1 transition-[flex-grow,background-color,border-radius] duration-700 ease-out-expo ${
                  on ? 'grow-[7] rounded-[24px] bg-char text-paper ring-char' : 'grow bg-paper text-ink ring-line hover:bg-bone'
                }`}
                style={{ flexBasis: 0 }}
              >
                <AnimatePresence>
                  {on && (
                    <motion.div
                      key="open"
                      className="absolute inset-0 flex min-w-[400px] flex-col"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.5 } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <div className="relative h-[62%] overflow-hidden rounded-[20px] m-2">
                        <motion.img
                          src={p.img}
                          alt={p.title}
                          className="h-full w-full object-cover"
                          initial={{ scale: 1.15 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.2, ease: EASE }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between px-6 pb-6 pt-3">
                        <h3 className="text-[26px] font-semibold leading-tight tracking-tight">{p.title}</h3>
                        <p className="max-w-[360px] text-[12.5px] leading-relaxed text-paper/60">{p.text}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className={`flex h-full flex-col items-center justify-between py-7 transition-opacity duration-300 ${on ? 'opacity-0' : 'opacity-100'}`}>
                  <span className="label text-ash">0{i + 1}</span>
                  <span className="block whitespace-nowrap text-[19px] font-medium tracking-tight [writing-mode:vertical-rl] rotate-180">{p.title}</span>
                  <span className="grid size-8 place-items-center rounded-full bg-ink text-paper">
                    <Arrow dir="down" className="size-3" />
                  </span>
                </div>
              </button>
            )
          })}
        </Rise>

        {/* Mobile: stacked accordion */}
        <div className="flex flex-col gap-2 md:hidden">
          {programs.map((p, i) => {
            const on = i === active
            return (
              <div key={p.title} className={`overflow-hidden rounded-[22px] ring-1 transition-colors ${on ? 'bg-char text-paper ring-char' : 'ring-line'}`}>
                <button onClick={() => setActive(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center justify-between px-5 py-4 text-left">
                  <span className="text-[17px] font-medium tracking-tight">{p.title}</span>
                  <span className={`grid size-8 place-items-center rounded-full transition-transform duration-500 ${on ? 'rotate-180 bg-clay text-paper' : 'bg-ink text-paper'}`}>
                    <Arrow dir="down" className="size-3" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.6, ease: EASE }}>
                      <div className="px-2 pb-4">
                        <img src={p.img} alt={p.title} className="h-52 w-full rounded-2xl object-cover" />
                        <p className="px-3 pt-4 text-[13px] leading-relaxed text-paper/65">{p.text}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function RitualCard({ r, i }: { r: (typeof rituals)[number]; i: number }) {
  return (
    <article className="group relative flex h-[62vh] max-h-[560px] min-h-[420px] w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] bg-char text-paper md:w-[min(34vw,520px)]">
      <div className="relative flex-1 overflow-hidden">
        <img
          src={r.img}
          alt={r.title}
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
          loading="lazy"
        />
        <span className="label absolute left-4 top-4 rounded-full bg-paper/90 px-2.5 py-1 text-ink">{r.meta}</span>
        <span className="label absolute right-4 top-4 text-paper/80">0{i + 1}/0{rituals.length}</span>
      </div>
      <div className="flex items-end justify-between gap-6 p-6">
        <div>
          <h3 className="text-[24px] font-semibold tracking-tight">{r.title}</h3>
          <p className="mt-2 max-w-[340px] text-[12.5px] leading-relaxed text-paper/60">{r.text}</p>
        </div>
      </div>
    </article>
  )
}

export function Rituals() {
  const desktop = useIsDesktop()
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    if (!desktop || !track.current) return
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [desktop])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance])
  const bar = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%'])

  const heading = (
    <div className="flex shrink-0 flex-col justify-between md:w-[min(40vw,600px)] md:pr-10">
      <div>
        <Index n="04" className="text-paper/50" />
        <h2 className="display mt-6 text-[clamp(2.4rem,4.6vw,4.6rem)]">
          <Spark className="mr-2 inline-block size-[0.7em] -translate-y-[0.08em] text-clay" />
          Rituals of deep <span className="text-clay">physical and mental restoration</span>
        </h2>
      </div>
      <p className="mt-6 max-w-[360px] text-[13px] leading-relaxed text-paper/60">
        Training is only half the work. Our recovery floor is included from the Transit plan upward, and open to every member on a
        pay-per-session basis.
      </p>
    </div>
  )

  if (!desktop) {
    return (
      <section className="bg-ink px-5 py-24 text-paper">
        {heading}
        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
          {rituals.map((r, i) => (
            <RitualCard key={r.title} r={r} i={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={section} className="relative bg-ink text-paper" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-stretch gap-4 pl-10 pr-10">
          {heading}
          {rituals.map((r, i) => (
            <RitualCard key={r.title} r={r} i={i} />
          ))}
        </motion.div>
        <div className="absolute inset-x-10 bottom-8 flex items-center gap-4">
          <span className="label text-paper/50">Recovery floor</span>
          <div className="h-px flex-1 bg-paper/15">
            <motion.div style={{ width: bar }} className="h-px bg-clay" />
          </div>
          <span className="label text-paper/50">Level 2</span>
        </div>
      </div>
    </section>
  )
}
