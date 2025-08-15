import { Link, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card, CardBody } from '../components/ui/Card'

export default function SuccessPage() {
  const { state } = useLocation() as { state?: { type?: 'application' | 'viewing'; id?: string; when?: string } }
  const type = state?.type ?? 'application'
  return (
    <Card>
      <div role="status" aria-live="polite">
      <CardBody>
        <h1 className="text-2xl font-semibold">Erfolg!</h1>
        <p className="text-black/70 mt-2">
          {type === 'application' ? 'Deine Bewerbung wurde erfasst.' : 'Dein Besichtigungstermin wurde gebucht.'}
        </p>
        {type === 'viewing' && state?.when && (
          <div className="mt-4 p-4 rounded-[var(--radius-md)] bg-black/5 text-sm">
            <div className="font-medium">Kalender-Erinnerung (ics-ähnlich)</div>
            <div>Wann: {new Date(state.when).toLocaleString()}</div>
            <div>Wo: Vor-Ort – Details im Projekt</div>
            <div className="mt-3">
              <Button variant="soft" onClick={() => downloadIcs(state.when!)}>ICS herunterladen</Button>
            </div>
          </div>
        )}
        <div className="mt-6 flex gap-2">
          <Link to="/listings" className="underline">Weiter suchen</Link>
          <Link to="/" className="underline">Zur Startseite</Link>
        </div>
      </CardBody>
      </div>
    </Card>
  )
}

function downloadIcs(whenIso: string) {
  const start = new Date(whenIso)
  const end = new Date(start)
  end.setMinutes(end.getMinutes() + 30)
  const pad = (n: number) => String(n).padStart(2, '0')
  const toUtc = (d: Date) => `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rentit Demo//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@rentit.demo`,
    `DTSTAMP:${toUtc(new Date())}`,
    `DTSTART:${toUtc(start)}`,
    `DTEND:${toUtc(end)}`,
    'SUMMARY:Besichtigung (Rentit Demo)',
    'LOCATION:Projekt vor Ort',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n')
  const blob = new Blob([body], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'besichtigung.ics'
  a.click()
  URL.revokeObjectURL(url)
}


