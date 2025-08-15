import { useMemo, useState } from 'react'
import { Modal } from './Modal'
import type { Role } from '../../store/appStore'

export function RoleIntro({ role, open, onClose, onFinish }: { role: Role; open: boolean; onClose: () => void; onFinish: () => void }) {
  const steps = useMemo(() => {
    if (role === 'prospect') {
      return [
        { t: 'Listings & Filter', d: 'Finde passende Wohnungen. Nutze Filter und Chips, um zu verfeinern.' },
        { t: 'Bewerben', d: 'Ein Klick genügt in der Demo. Der Status erscheint unter „Bewerbungen“.' },
        { t: 'Besichtigung', d: 'Buche einen Slot. Erfolgsscreen zeigt eine ics-ähnliche Karte.' },
        { t: 'Mein Mietverhältnis', d: 'Nach „signiert“ werden Tickets/Services sichtbar.' },
      ]
    }
    if (role === 'landlord') {
      return [
        { t: 'Dashboard', d: 'Sieh Demo-KPIs zu Time-to-Lease, Conversion und No-Show.' },
        { t: 'Projekte & Regeln', d: 'Steuere Sichtbarkeit und Eligibility (wirkt sofort auf Interessenten).' },
        { t: 'Pipeline', d: 'Wechsle Bewerbungsstatus per Klick. Audit-Log protokolliert Aktionen.' },
        { t: 'Besichtigungen', d: 'Lege Slots an und verwalte Termine (Demo).' },
      ]
    }
    return [
      { t: 'Übersicht heute', d: 'Check-ins verbuchen, No-Shows markieren, „Erledigt“ setzen.' },
      { t: 'Manuelle Prüfungen', d: 'Einträge anlegen, Status ändern, Kommentare setzen (Demo).' },
      { t: 'Moderation', d: 'Richtlinien/FAQ ansehen; nur Metadaten (DSGVO).' },
    ]
  }, [role])
  const [idx, setIdx] = useState(0)
  const done = idx >= steps.length
  const next = () => {
    if (idx < steps.length - 1) setIdx((i) => i + 1)
    else onFinish()
  }
  const reset = () => setIdx(0)
  return (
    <Modal open={open && !done} title={`Intro: ${steps[idx]?.t ?? ''}`} onClose={() => { reset(); onClose() }}>
      <div className="text-sm">
        <p className="text-black/70">{steps[idx]?.d}</p>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button className="h-9 px-3 rounded-[var(--radius-sm)] bg-black/5 hover:bg-black/10" onClick={() => { reset(); onClose() }}>Später</button>
          <button className="h-9 px-3 rounded-[var(--radius-sm)] bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/15" onClick={next}>{idx < steps.length - 1 ? 'Weiter' : 'Fertig'}</button>
        </div>
      </div>
    </Modal>
  )
}


