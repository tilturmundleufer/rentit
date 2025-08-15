import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type Variant = 'primary' | 'soft' | 'ghost'
type Size = 'm' | 'l'

export function Button({
  children,
  variant = 'primary',
  size = 'm',
  className = '',
  ...rest
}: PropsWithChildren<{
  variant?: Variant
  size?: Size
  className?: string
}> & ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = 'inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none'
  const sizes = size === 'l' ? 'h-12 px-5 text-base' : 'h-10 px-4 text-sm'
  const variants: Record<Variant, string> = {
    primary: 'bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary))]/90 shadow-[var(--shadow-soft)]',
    soft: 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/15',
    ghost: 'bg-transparent hover:bg-black/5',
  }
  return (
    <button className={`${base} ${sizes} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}


