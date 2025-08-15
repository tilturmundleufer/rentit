import type { InputHTMLAttributes } from 'react'

export function Input({ className = '', ...rest }: InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  const base = 'h-10 px-3 rounded-[var(--radius-md)] bg-white/80 border border-black/10 focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-bg))]'
  return <input className={`${base} ${className}`} {...rest} />
}

export function Label({ htmlFor, children, className = '' }: { htmlFor?: string; children: React.ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-black/80 mb-1 ${className}`}>
      {children}
    </label>
  )
}


