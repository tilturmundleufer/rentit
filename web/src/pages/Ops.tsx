import { useAppStore } from '../store/appStore'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function OpsPage() {
  const { viewings, updateViewingStatus, reviews, createManualReview, updateManualReview } = useAppStore()
  const today = new Date()
  const isSameDay = (d: Date) => d.getFullYear()===today.getFullYear() && d.getMonth()===today.getMonth() && d.getDate()===today.getDate()
  const todays = viewings.filter((v) => isSameDay(new Date(v.bookedAt)))
  return (
    <div className="grid gap-6">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold">Heutige Termine (Demo)</h1>
          {todays.length === 0 ? (
            <p className="text-black/60 mt-2">Keine Termine heute.</p>
          ) : (
            <ul className="grid gap-2 mt-3">
              {todays.map((v) => (
                <li key={v.id} className="glass p-3 text-sm flex items-center justify-between">
                  <span>Viewing {v.id} – Status: {v.status}</span>
                  <span className="flex gap-2">
                    <Button variant="soft" className="h-8 px-3 text-xs" onClick={()=> updateViewingStatus(v.id, 'checked_in')}>Check-in</Button>
                    <Button variant="soft" className="h-8 px-3 text-xs" onClick={()=> updateViewingStatus(v.id, 'no_show')}>No-Show</Button>
                    <Button variant="soft" className="h-8 px-3 text-xs" onClick={()=> updateViewingStatus(v.id, 'done')}>Erledigt</Button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold">Manuelle Prüfungen (Demo)</h2>
          <div className="mt-3 flex gap-2">
            <Button onClick={()=> createManualReview('demo-app', 'Einkommensnachweis unklar')}>Prüfung anlegen</Button>
          </div>
          {reviews.length === 0 ? (
            <p className="text-black/60 mt-3">Keine Prüfungen offen.</p>
          ) : (
            <ul className="grid gap-2 mt-3">
              {reviews.map(r => (
                <li key={r.id} className="glass p-3 text-sm flex items-center justify-between">
                  <span>{r.tag} – {r.status}</span>
                  <span className="flex gap-2">
                    <Button variant="soft" className="h-8 px-3 text-xs" onClick={()=> updateManualReview(r.id, 'cleared')}>bestätigt</Button>
                    <Button variant="soft" className="h-8 px-3 text-xs" onClick={()=> updateManualReview(r.id, 'pending_docs', 'Bitte Gehaltsnachweis nachreichen')}>weitere Unterlagen</Button>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-black/60 mt-2">Ops sieht nur Metadaten (Demo); Aktionen erzeugen Audit-Einträge.</p>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold">Check-in (Demo)</h2>
          <div className="mt-2 flex gap-2">
            <input className="h-10 px-3 rounded-[var(--radius-sm)] bg-black/5" placeholder="Code eingeben" aria-label="Check-in Code" />
            <Button variant="soft" onClick={()=> alert('Check-in erfolgreich (Demo)')}>Prüfen</Button>
          </div>
          <p className="text-xs text-black/60 mt-2">Positive/negative Pfade werden als Feedback angezeigt.</p>
        </CardBody>
      </Card>
    </div>
  )
}


