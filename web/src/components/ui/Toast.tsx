import { useEffect } from 'react'
import { useAppStore } from '../../store/appStore'

export function Toaster() {
  const { toasts, removeToast } = useAppStore()
  useEffect(() => {
    const timers = toasts.map((t) => setTimeout(() => removeToast(t.id), 3500))
    return () => { timers.forEach(clearTimeout) }
  }, [toasts, removeToast])
  if (toasts.length === 0) return null
  const tone = (type: 'success' | 'info' | 'warn' | 'error') => ({
    success: 'bg-[rgb(var(--color-success))] text-white',
    info: 'bg-[rgb(var(--color-primary))] text-white',
    warn: 'bg-[rgb(var(--color-warn))] text-white',
    error: 'bg-[rgb(var(--color-error))] text-white',
  }[type])
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <div key={t.id} className={`rounded-[var(--radius-md)] shadow-[var(--shadow-soft)] px-4 py-3 ${tone(t.type)}`} role="status" aria-live="polite">
          {t.message}
        </div>
      ))}
    </div>
  )
}


