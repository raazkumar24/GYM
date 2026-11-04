import { motion, useInView, useMotionValue, animate } from 'motion/react'
import { useEffect, useRef, type ReactNode } from 'react'

export const EASE = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

export function Arrow({ className = '', dir = 'right' }: { className?: string; dir?: 'right' | 'up-right' | 'down' | 'left' }) {
  const rot = { right: 0, 'up-right': -45, down: 90, left: 180 }[dir]
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} style={{ transform: `rotate(${rot}deg)` }} aria-hidden>
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export function Check({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

/** Brand mark: a barbell inside a weight plate. Tilts into place once in view. */
export function Spark({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      className={className}
      initial={{ rotate: -35 }}
      whileInView={{ rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE }}
      aria-hidden
    >
      <circle cx="20" cy="20" r="20" fill="currentColor" />
      <g fill="var(--color-paper)">
        <rect x="7" y="19" width="26" height="2" rx="1" />
        <rect x="10.5" y="12.5" width="3.5" height="15" rx="1.2" />
        <rect x="15" y="15" width="2" height="10" rx="0.8" />
        <rect x="23" y="15" width="2" height="10" rx="0.8" />
        <rect x="26" y="12.5" width="3.5" height="15" rx="1.2" />
      </g>
    </motion.svg>
  )
}

export function Index({ n, className = '' }: { n: string; className?: string }) {
  return <span className={`label text-ash ${className}`}>({n})</span>
}

/** Masked line reveal: each line slides up from behind its own clip. */
export function Lines({
  lines,
  className = '',
  delay = 0,
  stagger = 0.08,
  as: Tag = 'h2',
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p'
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span
            className="block origin-top-left"
            initial={{ y: '110%', rotate: 2.5 }}
            animate={inView ? { y: '0%', rotate: 0 } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Small block that rises once when entering the viewport. */
export function Rise({ children, className = '', delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Counter({ to, decimals = 0, className = '' }: { to: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const mv = useMotionValue(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, { duration: 1.8, ease: EASE })
    const unsub = mv.on('change', (v) => {
      if (ref.current) ref.current.textContent = v.toFixed(decimals)
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [inView, to, decimals, mv])
  return (
    <span ref={ref} className={className}>
      {(0).toFixed(decimals)}
    </span>
  )
}

export function PillButton({
  children,
  href,
  onClick,
  variant = 'ink',
  className = '',
  type,
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'ink' | 'paper' | 'clay' | 'ghost'
  className?: string
  type?: 'submit' | 'button'
}) {
  const styles = {
    ink: 'bg-ink text-paper',
    paper: 'bg-paper text-ink',
    clay: 'bg-clay text-paper',
    ghost: 'bg-transparent text-current ring-1 ring-current/25',
  }[variant]
  const dot = {
    ink: 'bg-clay text-paper',
    paper: 'bg-ink text-paper',
    clay: 'bg-paper text-clay',
    ghost: 'bg-current/10',
  }[variant]
  const inner = (
    <>
      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">{children}</span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <span className={`grid size-9 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg] ${dot}`}>
        <Arrow className="size-3.5" />
      </span>
    </>
  )
  const cls = `group inline-flex items-center gap-4 rounded-full py-1.5 pl-6 pr-1.5 text-[13px] font-medium uppercase tracking-wide ${styles} ${className}`
  if (href)
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    )
  return (
    <button type={type ?? 'button'} onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}
