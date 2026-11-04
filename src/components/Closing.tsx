import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { BRAND, events, faqs, programs } from '../data'
import { Arrow, EASE, Index, Lines, PillButton, Rise, Spark } from './ui'

export function Events() {
  const [hover, setHover] = useState<number | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.6 })
  const y = useSpring(my, { stiffness: 180, damping: 22, mass: 0.6 })

  return (
    <section
      className="relative bg-paper px-5 pb-28 md:px-10 md:pb-40"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
      }}
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 flex items-start justify-between gap-8">
          <Lines
            className="display max-w-[1100px] text-[clamp(2.2rem,5.6vw,5.4rem)]"
            lines={[
              <>
                Where <span className="text-clay">movement, mind</span>
              </>,
              <>
                and <span className="text-clay">community</span> meet
              </>,
            ]}
          />
          <div className="hidden text-right md:block">
            <Index n="08" />
            <p className="mt-2 text-[12px] text-ash">June calendar</p>
          </div>
        </div>

        <ul className="border-t border-ink/15" onMouseLeave={() => setHover(null)}>
          {events.map((ev, i) => (
            <li key={ev.title} onMouseEnter={() => setHover(i)} className="group relative border-b border-ink/15">
              <a href="#trial" className="grid grid-cols-[72px_1fr_auto] items-center gap-4 py-6 md:grid-cols-[140px_1fr_1fr_auto] md:gap-8 md:py-8">
                <div>
                  <p className="text-[22px] font-semibold leading-none tracking-tight md:text-[28px]">{ev.date}</p>
                  <p className="label mt-1 text-ash">{ev.day}</p>
                </div>
                <h3 className="text-[20px] font-medium tracking-tight transition-transform duration-700 ease-out-expo group-hover:translate-x-3 md:text-[34px]">
                  {ev.title}
                </h3>
                <p className="hidden max-w-[360px] text-[13px] leading-relaxed text-ash md:block">{ev.text}</p>
                <span className="grid size-10 place-items-center rounded-full bg-bone transition-colors duration-500 group-hover:bg-clay group-hover:text-paper">
                  <Arrow dir="up-right" className="size-3.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <motion.div className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block" style={{ x, y }}>
      <motion.div
        className="relative h-[240px] w-[190px] -translate-x-1/2 -translate-y-[60%] overflow-hidden rounded-2xl"
        initial={false}
        animate={{ opacity: hover === null ? 0 : 1, scale: hover === null ? 0.7 : 1, rotate: hover === null ? -8 : -4 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {events.map((ev, i) => (
          <motion.img
            key={ev.title}
            src={ev.img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            animate={{ clipPath: hover === i ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        ))}
      </motion.div>
      </motion.div>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="bg-paper px-5 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-[1200px]">
        <div className="relative mb-14 text-center">
          <Index n="09" className="absolute left-0 top-0 hidden md:block" />
          <Lines
            className="display text-[clamp(2.2rem,5.6vw,5.4rem)]"
            lines={[
              <>
                Questions<span className="accent ml-2 text-clay">we hear</span>
              </>,
              'before day one',
            ]}
          />
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((f, i) => {
            const on = open === i
            return (
              <Rise key={f.q} delay={i * 0.04} y={16}>
                <div className={`overflow-hidden rounded-[16px] transition-colors duration-500 ${on ? 'bg-ink text-paper' : 'bg-bone hover:bg-line/70'}`}>
                  <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-7">
                    <span className="text-[17px] font-medium tracking-tight md:text-[22px]">{f.q}</span>
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-out-expo ${
                        on ? 'rotate-90 bg-clay text-paper' : 'bg-ink text-paper'
                      }`}
                    >
                      <Arrow className="size-3.5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.6, ease: EASE }}>
                        <p className="max-w-[760px] px-5 pb-6 text-[14px] leading-relaxed text-paper/65 md:px-7">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Rise>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const slots = ['Early (5:30–8 AM)', 'Morning (8–11 AM)', 'Afternoon (12–4 PM)', 'Evening (5–8 PM)', 'Late (8–11 PM)']

export function Trial({ plan, setPlan }: { plan: string; setPlan: (p: string) => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [slot, setSlot] = useState(slots[3])
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, '').replace(/^91/, '')
    if (name.trim().length < 2) return setError('Please enter your name.')
    if (!/^[6-9]\d{9}$/.test(digits)) return setError('Please enter a valid 10-digit Indian mobile number.')
    setError('')
    const msg = `Hi Aayam! I'd like to book a free trial session.\n\nName: ${name.trim()}\nPhone: +91 ${digits}\nInterested in: ${plan}\nPreferred time: ${slot}`
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    setSent(true)
  }

  const field = 'w-full rounded-xl bg-paper/[0.06] px-4 py-3.5 text-[15px] text-paper placeholder:text-paper/35 outline-none ring-1 ring-paper/10 transition focus:ring-clay'
  const interests = [...programs.map((p) => p.title)]
  if (plan && !interests.includes(plan)) interests.unshift(plan)

  return (
    <section id="trial" className="bg-paper px-3 pb-3">
      <div className="relative overflow-hidden rounded-[28px] bg-ink px-5 py-20 text-paper md:px-10 md:py-28">
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />
        <div className="relative mx-auto grid max-w-[1500px] gap-14 md:grid-cols-2">
          <div className="flex flex-col justify-between">
            <div>
              <Index n="10" className="text-paper/40" />
              <Lines
                className="display mt-6 text-[clamp(2.6rem,6.4vw,6.2rem)]"
                lines={[
                  'Your first',
                  <>
                    session is <span className="accent text-clay">on us</span>
                  </>,
                ]}
              />
              <p className="mt-6 max-w-[420px] text-[14px] leading-relaxed text-paper/60">
                Sixty minutes with a coach: a movement assessment, a guided workout and a walk through the recovery floor. No sales
                pitch, no pressure.
              </p>
            </div>
            <dl className="mt-12 grid gap-6 text-[13px] sm:grid-cols-2">
              <div>
                <dt className="label text-paper/40">Visit</dt>
                <dd className="mt-2 leading-relaxed text-paper/80">{BRAND.address}</dd>
              </div>
              <div>
                <dt className="label text-paper/40">Hours</dt>
                <dd className="mt-2 leading-relaxed text-paper/80">{BRAND.hours}</dd>
              </div>
              <div>
                <dt className="label text-paper/40">Call</dt>
                <dd className="mt-2">
                  <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="text-paper/80 hover:text-clay-soft">
                    {BRAND.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-paper/40">Write</dt>
                <dd className="mt-2">
                  <a href={`mailto:${BRAND.email}`} className="text-paper/80 hover:text-clay-soft">
                    {BRAND.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <Rise>
            <div className="rounded-[22px] bg-char p-6 md:p-8">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex min-h-[420px] flex-col items-start justify-center"
                  >
                    <Spark className="size-12 text-clay" />
                    <h3 className="display mt-6 text-[44px]">See you soon, {name.split(' ')[0]}.</h3>
                    <p className="mt-4 max-w-[380px] text-[14px] leading-relaxed text-paper/60">
                      We opened WhatsApp with your details. Hit send and our front desk will confirm your slot within the hour.
                    </p>
                    <button onClick={() => setSent(false)} className="label mt-8 text-paper/50 underline underline-offset-4 hover:text-paper">
                      Edit details
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} exit={{ opacity: 0 }} className="flex flex-col gap-4" noValidate>
                    <p className="label text-paper/50">Book a free trial</p>
                    <label className="block">
                      <span className="sr-only">Full name</span>
                      <input className={field} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                    </label>
                    <label className="flex items-center rounded-xl ring-1 ring-paper/10 transition focus-within:ring-clay">
                      <span className="pl-4 text-[15px] text-paper/50">+91</span>
                      <span className="sr-only">Mobile number</span>
                      <input
                        className="w-full bg-transparent px-3 py-3.5 text-[15px] text-paper outline-none placeholder:text-paper/35"
                        placeholder="Mobile number"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel-national"
                      />
                    </label>
                    <label className="block">
                      <span className="label mb-2 block text-paper/40">Interested in</span>
                      <select className={`${field} appearance-none`} value={plan} onChange={(e) => setPlan(e.target.value)}>
                        {interests.map((p) => (
                          <option key={p} value={p} className="bg-char">
                            {p}
                          </option>
                        ))}
                      </select>
                    </label>
                    <fieldset>
                      <legend className="label mb-2 text-paper/40">Preferred time</legend>
                      <div className="flex flex-wrap gap-2">
                        {slots.map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setSlot(s)}
                            aria-pressed={slot === s}
                            className={`rounded-full px-3.5 py-2 text-[12px] transition-colors ${
                              slot === s ? 'bg-paper text-ink' : 'bg-paper/[0.06] text-paper/70 hover:bg-paper/10'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <AnimatePresence>
                      {error && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[13px] text-clay-soft" role="alert">
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <p className="max-w-[220px] text-[11px] leading-snug text-paper/40">Opens WhatsApp with your details. We never share your number.</p>
                      <PillButton type="submit" variant="clay">
                        Book my session
                      </PillButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const words = ['Strength', 'Mobility', 'Recovery', 'Community', 'Discipline', 'Balance']
  return (
    <footer className="overflow-hidden bg-paper pt-20">
      <div className="flex overflow-hidden border-y border-line py-5" aria-hidden>
        <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center">
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 text-[clamp(1.6rem,3vw,2.6rem)] font-medium tracking-tight">
              {i % 2 ? <span className="accent text-clay">{w}</span> : w}
              <Spark className="size-5 text-ink" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 pt-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="max-w-[360px] text-[14px] leading-relaxed text-ash">
            Aayam (आयाम) — <span className="accent text-[1.15em] text-ink">dimension</span>. A premium training space in the heart of
            Indiranagar, Bengaluru.
          </p>
        </div>
        <div>
          <p className="label mb-4 text-ash">Explore</p>
          <ul className="space-y-2 text-[14px]">
            {[
              ['#programs', 'Programs'],
              ['#pricing', 'Membership'],
              ['#team', 'Coaches'],
              ['#faq', 'FAQ'],
            ].map(([h, l]) => (
              <li key={h}>
                <a href={h} className="hover:text-clay">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4 text-ash">Follow</p>
          <ul className="space-y-2 text-[14px]">
            {['Instagram', 'YouTube', 'Strava Club', 'Google Maps'].map((s) => (
              <li key={s}>
                <a href="#top" className="hover:text-clay">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1500px] flex-wrap justify-between gap-4 px-5 text-[12px] text-ash md:px-10">
        <p>© {new Date().getFullYear()} Aayam Fitness Pvt. Ltd. · GSTIN 29ABCDE1234F1Z5</p>
        <a href="#top" className="label hover:text-ink">
          Back to top ↑
        </a>
      </div>

      <motion.p
        initial={{ y: '40%' }}
        whileInView={{ y: '12%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
        className="mt-6 select-none text-center font-sans text-[31vw] font-[800] uppercase leading-[0.72] tracking-[-0.065em] text-ink [font-stretch:72%]"
        aria-hidden
      >
        {BRAND.name}
      </motion.p>
    </footer>
  )
}
