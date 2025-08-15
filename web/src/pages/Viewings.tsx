import { useAppStore } from '../store/appStore'
import { Card, CardBody } from '../components/ui/Card'

export default function ViewingsPage() {
  const { viewings } = useAppStore()
  return (
    <Card>
      <CardBody>
        <h1 className="text-2xl font-semibold mb-4">Besichtigungstermine</h1>
        {viewings.length === 0 ? (
          <p className="text-black/60">Noch keine Termine gebucht.</p>
        ) : (
          <ul className="grid gap-3">
            {viewings.map((v) => (
              <li key={v.id} className="flex items-center justify-between glass p-3 text-sm">
                <span>Listing {v.listingId} – Slot {v.slotId}</span>
                <span className="text-black/50">gebucht {new Date(v.bookedAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  )
}


