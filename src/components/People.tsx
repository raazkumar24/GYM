import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { reviews, team } from '../data'
import { Arrow, EASE, Index, Lines } from './ui'

function NavButtons({ onPrev, onNext, dark }: { onPrev: () => void; onNext: () => void; dark?: boolean }) {
  const base = 'grid size-11 place-items-center rounded-full transition-colors'
  return (
    <div className="flex gap-2">
      <button onClick={onPrev} aria-label="Previous" className={`${base} ${dark ? 'bg-paper/10 text-paper hover:bg-paper/20' : 'bg-bone hover:bg-line'}`}>
        <Arrow dir="left" className="size-3.5" />
      </button>
      <button onClick={onNext} aria-label="Next" className={`${base} ${dark ? 'bg-clay text-paper hover:bg-clay-deep' : 'bg-ink text-paper hover:bg-clay'}`}>
        <Arrow className="size-3.5" />
      </button>
    </div>
  )
}

export function Team() {
  const [active, setActive] = useState(0)
  const n = team.length
  const go = (d: number) => setActive((a) => (a + d + n) % n)

  return (
    <section id="team" className="bg-char px-3 py-3 text-paper">
      <div className="rounded-[28px] bg-ink px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto_1fr]">
            <div>
              <Index n="05" className="text-paper/40" />
              <p className="mt-2 font-serif text-[18px] italic text-paper/70">Architects of your form</p>
            </div>
            <Lines
              className="display text-[clamp(2.8rem,7.5vw,7rem)] md:text-center"
              lines={[
                <>
                  Our <span className="accent text-clay">coaches</span>
                </>,
              ]}
            />
            <div className="flex flex-col gap-5 md:items-end">
              <p className="max-w-[300px] text-[12px] leading-relaxed text-paper/55 md:text-right">
                Each coach is not just an expert but a mentor. They see you a few steps ahead and work with your body, mind and rhythm of
                life.
              </p>
              <NavButtons dark onPrev={() => go(-1)} onNext={() => go(1)} />
            </div>
          </div>

          <div className="no-scrollbar -mx-5 mt-14 flex snap-x gap-3 overflow-x-auto px-5 md:mx-0 md:h-[600px] md:overflow-visible md:px-0">
            {team.map((t, i) => {
              const on = i === active
              return (
                <button
                  key={t.name}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`group relative w-[72vw] shrink-0 snap-start border-l border-paper/10 pl-3 text-left transition-[flex-grow] duration-[900ms] ease-out-expo md:w-auto md:min-w-0 md:shrink md:basis-0 ${
                    on ? 'md:grow-[2.4]' : 'md:grow'
                  }`}
                >
                  <div className={`relative overflow-hidden rounded-[18px] transition-[height] duration-[900ms] ease-out-expo ${on ? 'h-[420px] md:h-[470px]' : 'h-[420px] md:h-[300px]'}`}>
                    <img
                      src={t.img}
                      alt={`${t.name}, ${t.role}`}
                      className={`h-full w-full object-cover object-top transition-[filter,transform] duration-[1.2s] ease-out-expo [filter:grayscale(1)_contrast(1.05)] ${
                        on ? 'scale-100 brightness-100' : 'scale-105 brightness-75 group-hover:brightness-90'
                      }`}
                    />
                  </div>
                  <p className={`mt-4 font-semibold tracking-tight transition-all duration-700 ${on ? 'text-[24px]' : 'text-[17px] text-paper/80'}`}>{t.name}</p>
                  <p className="label mt-1 text-clay-soft/80">{t.role}</p>
                  <motion.p
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }}
                    transition={{ duration: 0.6, ease: EASE, delay: on ? 0.3 : 0 }}
                    className="mt-3 max-w-[380px] text-[12.5px] leading-relaxed text-paper/55 md:block"
                  >
                    {t.bio}
                  </motion.p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Reviews() {
  const [index, setIndex] = useState(1)
  const [cardW, setCardW] = useState(380)
  const n = reviews.length
  const gap = 20

  useEffect(() => {
    const set = () => setCardW(window.innerWidth < 640 ? 280 : 380)
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])

  const go = (d: number) => setIndex((i) => Math.min(n - 1, Math.max(0, i + d)))

  return (
    <section className="overflow-hidden bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col items-center text-center">
          <Index n="07" />
          <Lines
            className="display mt-4 text-[clamp(2.2rem,5.6vw,5.4rem)]"
            lines={[
              'Voices of members',
              <>
                who value <span className="accent text-clay">quality</span>
              </>,
              'over shortcuts',
            ]}
          />
        </div>
      </div>

      <div className="relative mt-16 h-[360px] md:mt-20">
        <motion.div
          className="absolute top-6 flex cursor-grab active:cursor-grabbing"
          style={{ left: `calc(50% - ${cardW / 2}px)`, gap }}
          animate={{ x: -index * (cardW + gap) }}
          transition={{ duration: 0.9, ease: EASE }}
          drag="x"
          dragConstraints={{ left: -index * (cardW + gap), right: -index * (cardW + gap) }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1)
            else if (info.offset.x > 60) go(-1)
          }}
        >
          {reviews.map((r, i) => {
            const d = i - index
            return (
              <motion.figure
                key={r.name}
                className={`relative shrink-0 select-none rounded-[22px] p-6 ${d === 0 ? 'bg-clay-soft' : 'bg-bone'}`}
                style={{ width: cardW }}
                animate={{ rotate: d * 5, y: Math.abs(d) * 26, opacity: Math.abs(d) > 2 ? 0.3 : 1 }}
                transition={{ duration: 0.9, ease: EASE }}
                onClick={() => setIndex(i)}
              >
                <div className="flex items-center gap-3">
                  <img src={r.img} alt="" draggable={false} className="size-12 rounded-full object-cover" />
                  <div>
                    <p className="text-[17px] font-semibold leading-tight">{r.name}</p>
                    <p className="text-[11px] text-ash">{r.meta}</p>
                    <p className="text-[11px] text-ash">{r.since}</p>
                  </div>
                </div>
                <blockquote className="mt-6 font-serif text-[20px] italic leading-snug text-ink/85">“{r.quote}”</blockquote>
                <figcaption className="label mt-6 text-ash">
                  Focus: <span className="text-ink">{r.focus}</span>
                </figcaption>
              </motion.figure>
            )
          })}
        </motion.div>
      </div>

      <div className="mx-auto mt-6 flex max-w-[1500px] items-center justify-between gap-6 px-5 md:px-10">
        <div className="h-px w-40 bg-line">
          <motion.div className="h-px bg-ink" animate={{ width: `${((index + 1) / n) * 100}%` }} transition={{ duration: 0.8, ease: EASE }} />
        </div>
        <NavButtons onPrev={() => go(-1)} onNext={() => go(1)} />
      </div>
    </section>
  )
}
