import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { billingOptions, plans, reviews, type Billing } from '../data'
import { Arrow, Check, EASE, Index, Lines, Rise } from './ui'

const inr = (n: number) => new Intl.NumberFormat('en-IN').format(n)

export default function Pricing({ onSelect }: { onSelect: (plan: string) => void }) {
  const [billing, setBilling] = useState<Billing>('monthly')
  const opt = billingOptions.find((b) => b.id === billing)!

  return (
    <section id="pricing" className="bg-paper px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto_1fr]">
          <div className="order-2 md:order-1">
            <Index n="06" />
            <p className="mt-2 max-w-[180px] text-[12px] leading-snug text-ash">Choose your plan. Upgrade or pause any time.</p>
          </div>
          <Lines className="display order-1 text-center text-[clamp(2.6rem,7vw,6.8rem)] md:order-2" lines={['Subscribe', <>to <span className="accent text-clay">change</span></>]} />
          <div className="order-3 flex items-center gap-3 md:justify-end">
            <div className="flex -space-x-2">
              {reviews.slice(0, 3).map((r) => (
                <img key={r.name} src={r.img} alt="" className="size-8 rounded-full object-cover ring-2 ring-paper" />
              ))}
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold">
                <span className="text-clay">★★★★★</span> 4.9
              </p>
              <p className="label text-[9px] text-ash">1,200+ Google reviews</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center md:mt-16">
          <div className="relative flex rounded-full bg-bone p-1" role="tablist" aria-label="Billing period">
            {billingOptions.map((b) => (
              <button
                key={b.id}
                role="tab"
                aria-selected={billing === b.id}
                onClick={() => setBilling(b.id)}
                className={`relative z-10 rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-wide transition-colors sm:px-6 ${
                  billing === b.id ? 'text-paper' : 'text-ink/70 hover:text-ink'
                }`}
              >
                {billing === b.id && (
                  <motion.span layoutId="billing-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ duration: 0.5, ease: EASE }} />
                )}
                {b.label}
                {b.off > 0 && <span className={`ml-1.5 ${billing === b.id ? 'text-clay-soft' : 'text-clay'}`}>−{b.off * 100}%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => {
            const monthly = opt.off ? Math.round((p.price * (1 - opt.off)) / 100) * 100 - 1 : p.price
            const total = monthly * opt.months
            const dark = p.popular
            return (
              <Rise key={p.name} delay={i * 0.07}>
                <div
                  className={`relative flex h-full flex-col rounded-[24px] p-6 transition-transform duration-700 ease-out-expo hover:-translate-y-1.5 ${
                    dark ? 'bg-ink text-paper' : 'bg-paper ring-1 ring-line'
                  }`}
                >
                  {dark && (
                    <span className="absolute -right-2 -top-3 rotate-[6deg] rounded-md bg-clay px-3 py-1.5 font-serif text-[16px] italic text-paper shadow-lg">
                      Most chosen
                    </span>
                  )}
                  <div className="text-center">
                    <h3 className="display text-[30px] leading-none">{p.name}</h3>
                    <p className={`mt-1.5 font-serif text-[15px] italic ${dark ? 'text-paper/50' : 'text-ash'}`}>({p.tagline})</p>
                    <div className="relative mt-6 h-[64px] overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.p
                          key={monthly}
                          initial={{ y: '100%' }}
                          animate={{ y: '0%' }}
                          exit={{ y: '-100%' }}
                          transition={{ duration: 0.6, ease: EASE }}
                          className="text-[54px] font-bold leading-[64px] tracking-[-0.05em] [font-stretch:85%]"
                        >
                          ₹{inr(monthly)}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    <p className={`text-[12px] ${dark ? 'text-paper/50' : 'text-ash'}`}>per month + GST</p>
                    <p className={`label mt-2 h-4 text-[10px] ${dark ? 'text-clay-soft' : 'text-clay'}`}>
                      {opt.months > 1 ? `Billed ₹${inr(total)} every ${opt.months} months` : 'No lock-in · cancel anytime'}
                    </p>
                  </div>

                  <ul className={`mt-7 flex-1 space-y-3 border-t pt-6 text-[13px] ${dark ? 'border-paper/10' : 'border-line'}`}>
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <span className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${dark ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}>
                          <Check className="size-2.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 grid gap-2">
                    <a
                      href="#trial"
                      onClick={() => onSelect(`${p.name} (${opt.label})`)}
                      className={`group flex items-center justify-center gap-2 rounded-full py-3 text-[12px] font-semibold uppercase tracking-wide transition-colors ${
                        dark ? 'bg-clay text-paper hover:bg-clay-deep' : 'bg-ink text-paper hover:bg-clay'
                      }`}
                    >
                      Join {p.name}
                      <Arrow className="size-3 transition-transform duration-500 group-hover:translate-x-1" />
                    </a>
                    <a
                      href="#trial"
                      onClick={() => onSelect(`Call about ${p.name}`)}
                      className={`flex items-center justify-center gap-2 rounded-full py-3 text-[12px] font-medium uppercase tracking-wide transition-colors ${
                        dark ? 'bg-paper/10 text-paper/70 hover:bg-paper/15' : 'bg-bone text-ink/60 hover:text-ink'
                      }`}
                    >
                      Request a call
                    </a>
                  </div>
                </div>
              </Rise>
            )
          })}
        </div>
        <p className="mt-6 text-center text-[12px] text-ash">
          One-time joining fee ₹1,000 (waived on annual plans). No-cost EMI available on annual plans. Student & corporate rates on request.
        </p>
      </div>
    </section>
  )
}
