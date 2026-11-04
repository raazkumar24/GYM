import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { BRAND } from '../data'
import { EASE } from './ui'

const links = [
  { href: '#about', label: 'About' },
  { href: '#programs', label: 'Programs' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#team', label: 'Coaches' },
  { href: '#faq', label: 'FAQ' },
]

export default function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 400 && !open)
    setSolid(y > window.innerHeight * 0.8)
  })

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6"
        animate={{ y: hidden ? '-120%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className={`mx-auto flex max-w-[1500px] items-center justify-between rounded-full py-2 pl-5 pr-2 transition-colors duration-500 ${
            solid ? 'bg-paper/85 text-ink shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md' : 'text-paper'
          }`}
        >
          <a href="#top" className="flex items-baseline gap-2">
            <span className="text-[19px] font-bold uppercase tracking-[-0.04em] [font-stretch:80%]">{BRAND.name}</span>
            <span className="label hidden opacity-60 sm:inline">Strength Studio</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="group relative overflow-hidden rounded-full px-4 py-2 text-[13px] font-medium">
                <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-[160%]">{l.label}</span>
                <span className="absolute inset-x-4 top-2 block translate-y-[160%] transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
                  {l.label}
                </span>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#trial"
              className="hidden rounded-full bg-clay px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-paper transition-colors hover:bg-clay-deep sm:inline-block"
            >
              Free trial
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-full md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-10 text-paper md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {[...links, { href: '#trial', label: 'Free trial' }].map((l, i) => (
              <div key={l.href} className="overflow-hidden border-b border-paper/10">
                <motion.a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block py-3 text-[13vw]"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.05 }}
                >
                  {l.label}
                </motion.a>
              </div>
            ))}
            <p className="label mt-8 text-paper/50">{BRAND.city}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
