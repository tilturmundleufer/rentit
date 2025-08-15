import { useEffect, useRef } from 'react'

export function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  const closeRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'Tab') trapFocus(e) }
    document.addEventListener('keydown', onKey)
    const id = setTimeout(() => { closeRef.current?.focus() }, 0)
    return () => { document.removeEventListener('keydown', onKey); clearTimeout(id) }
  }, [open, onClose])

  const trapFocus = (e: KeyboardEvent) => {
    const root = document.getElementById('modal-root')
    if (!root) return
    const focusables = root.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement as HTMLElement | null
    if (e.shiftKey && active === first) { e.preventDefault(); (last as HTMLElement).focus() }
    else if (!e.shiftKey && active === last) { e.preventDefault(); (first as HTMLElement).focus() }
  }
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4" id="modal-root">
        <div className="glass w-full max-w-lg">
          <div className="p-4 border-b border-white/60 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button ref={closeRef} className="h-8 px-3 rounded-[var(--radius-sm)] hover:bg-black/5" onClick={onClose} aria-label="Dialog schließen">×</button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}


