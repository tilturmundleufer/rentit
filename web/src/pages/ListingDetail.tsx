import { useParams, Link, useNavigate } from 'react-router-dom'
import { listings } from '../data/listings'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAppStore } from '../store/appStore'

export default function ListingDetailPage() {
  const { id } = useParams()
  const { applyTo, bookViewing, rules } = useAppStore()
  const navigate = useNavigate()
  const l = listings.find((x) => x.id === id)
  if (!l) return <div className="glass p-6">Listing nicht gefunden</div>
  return (
    <div className="grid gap-6">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold">{l.title}</h1>
          <p className="text-black/60">{l.address}, {l.city}</p>
          <div className="mt-3 text-sm">{l.rooms} Zi · {l.areaSqm} m² · €{l.coldRent} kalt · {l.floor}</div>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => { applyTo(l); navigate('/success', { state: { type: 'application' } }) }}>Bewerben</Button>
            <a href="#slots"><Button variant="soft">Besichtigung buchen</Button></a>
            <Button variant="ghost" onClick={()=> alert('Virtuelle Ansicht (Demo) – kein echtes Routing')}>Virtuell ansehen</Button>
            <Link to="/listings" className="inline-flex"><Button variant="ghost">Zurück</Button></Link>
          </div>
          <div className="mt-4 text-xs text-black/60">
            Soft-Regeln dieses Projekts: Rent-to-Income ≤ {(rules.rentToIncomeMax*100).toFixed(0)}%. Warum? Faire Vorselektion; keine harte Ablehnung. <Button variant="ghost" className="h-7 px-2" onClick={() => window.alert('Demo: Anfrage zur manuellen Prüfung erfasst')}>Manuelle Prüfung anfragen</Button>
          </div>
        </CardBody>
      </Card>
      <div id="slots" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {l.slots.map((s) => (
          <div key={s.id} className="glass p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{new Date(s.start).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</div>
              <div className="text-xs text-black/60">30 Min • {s.status === 'available' ? 'frei' : 'gebucht'}</div>
            </div>
            <Button variant="soft" disabled={s.status !== 'available'} onClick={() => { bookViewing(l, s); navigate('/success', { state: { type: 'viewing', when: s.start } }) }}>Slot wählen</Button>
          </div>
        ))}
      </div>
    </div>
  )
}


