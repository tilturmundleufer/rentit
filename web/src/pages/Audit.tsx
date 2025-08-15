import { useAppStore } from '../store/appStore'
import { Card, CardBody } from '../components/ui/Card'

export default function AuditPage() {
  const { audit } = useAppStore()
  return (
    <Card>
      <CardBody>
        <h1 className="text-2xl font-semibold mb-4">Letzte Aktionen</h1>
        {audit.length === 0 ? (
          <p className="text-black/60">Noch keine Aktionen protokolliert.</p>
        ) : (
          <ul className="grid gap-2">
            {audit.map((e) => (
              <li key={e.id} className="glass p-3 text-sm flex items-center justify-between">
                <span>{e.message}</span>
                <span className="text-black/50">{new Date(e.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  )
}


