import type { PropsWithChildren, ReactNode } from 'react'

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <div className={`glass ${className}`}>{children}</div>
}

export function CardHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="p-4 border-b border-white/60 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-black/60">{subtitle}</p>}
      </div>
      {actions}
    </div>
  )
}

export function CardBody({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <div className={`p-4 border-t border-white/60 flex items-center justify-end gap-2 ${className}`}>{children}</div>
}


