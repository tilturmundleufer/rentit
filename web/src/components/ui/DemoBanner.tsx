import { useEffect, useState } from 'react'

export function DemoBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hidden = localStorage.getItem('rentit-hide-banner') === '1'
    setVisible(!hidden)
  }, [])
  if (!visible) return null
  return (
    <div className="bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]">
      <div className="container-max flex items-center justify-between gap-4 py-2 text-sm">
        <p>
          Demo-Modus: Es werden ausschließlich Mock-Daten lokal im Browser gespeichert (kein Server, keine echten personenbezogenen Daten). Entscheidungen sind Simulationen (DSGVO/AGG-Hinweis).
        </p>
        <button
          className="h-8 px-3 rounded-[var(--radius-sm)] hover:bg-[rgb(var(--color-primary))]/15 focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]"
          onClick={() => { localStorage.setItem('rentit-hide-banner', '1'); setVisible(false) }}
          aria-label="Demo-Hinweis verbergen"
        >
          Verstanden
        </button>
      </div>
    </div>
  )
}


