import { useAppStore } from '../store/appStore'
import { Card, CardBody } from '../components/ui/Card'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function ApplicationsPage() {
  const { applications, advanceApplication } = useAppStore()
  return (
    <Card>
      <CardBody>
        <h1 className="text-2xl font-semibold mb-4">Meine Bewerbungen</h1>
        {applications.length === 0 ? (
          <p className="text-black/60">Noch keine Bewerbungen – starte auf der <Link to="/listings" className="underline">Listing-Seite</Link>.</p>
        ) : (
          <ul className="grid gap-3">
            {applications.map((a) => (
              <li key={a.id} className="flex items-center justify-between glass p-3 text-sm">
                <span>Listing {a.listingId} – Status: {a.status}</span>
                <span className="flex items-center gap-3">
                  <Link to="/signature" className="inline-flex"><Button variant="soft" className="h-8 px-3 text-xs">Signieren (Demo)</Button></Link>
                  <div className="flex gap-1">
                    {(['invited','viewed','offered','signed','rejected','expired'] as const).map(s => (
                      <Button key={s} variant="ghost" className="h-8 px-2 text-xs" onClick={()=> advanceApplication(a.id, s)}>{s}</Button>
                    ))}
                  </div>
                  <span className="text-black/50">{new Date(a.createdAt).toLocaleString()}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  )
}


