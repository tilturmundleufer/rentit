export function Badge({ label, tone = 'info' }: { label: string; tone?: 'success' | 'info' | 'warn' | 'error' }) {
  const tones = {
    success: 'bg-[rgb(var(--color-success))]/10 text-[rgb(var(--color-success))]',
    info: 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]',
    warn: 'bg-[rgb(var(--color-warn))]/10 text-[rgb(var(--color-warn))]',
    error: 'bg-[rgb(var(--color-error))]/10 text-[rgb(var(--color-error))]',
  }
  return <span className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-medium ${tones[tone]}`}>{label}</span>
}


