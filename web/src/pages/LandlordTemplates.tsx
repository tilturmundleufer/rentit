import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function LandlordTemplatesPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold">Vorlagen (Vertrag)</h1>
          <p className="text-black/70 mt-2">Liste von Templates (Demo). Felder definieren, ohne Logik.</p>
          <ul className="grid gap-2 mt-3">
            <li className="glass p-3 text-sm flex items-center justify-between">
              <span>Muster-Mietvertrag v1</span>
              <Button variant="soft" className="h-8 px-3 text-xs" onClick={()=> alert('Demo: Template öffnen')}>Öffnen</Button>
            </li>
          </ul>
          <p className="text-xs text-black/60 mt-3">Hinweis: Spätere QES-Option möglich.</p>
        </CardBody>
      </Card>
    </div>
  )
}


