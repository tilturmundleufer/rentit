import { useNavigate } from 'react-router-dom'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAppStore } from '../store/appStore'

export default function StartPage() {
  const navigate = useNavigate()
  const { role, lastRole, setRole, roleChangeNoticeSeenAt } = useAppStore()
  const openRole = (r: typeof role) => {
    setRole(r)
    if (r === 'prospect') navigate('/listings')
    if (r === 'landlord') navigate('/dashboard')
    if (r === 'ops') navigate('/ops')
  }
  return (
    <div className="grid gap-6">
      <div className="glass p-4 text-sm text-black/70">
        Zuletzt verwendete Rolle: <span className="font-medium">{lastRole ?? role}</span>. Dies ist eine Demo ohne echte Datenverarbeitung.
      </div>
      {!roleChangeNoticeSeenAt && lastRole && lastRole !== role && (
        <div className="glass p-3 text-sm" role="status" aria-live="polite">
          Kontext wird geändert – Daten zwischen Rollen sind getrennt (Demo).
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardBody>
            <div className="text-xs uppercase tracking-wide text-black/50">Interessent/Mieter</div>
            <h2 className="text-lg font-semibold mt-1">Wohnungen finden & bewerben</h2>
            <p className="text-black/70 mt-2">Profil pflegen, passende Listings sehen, Bewerbung senden, Besichtigungen buchen und nach Zuschlag Tickets erstellen.</p>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => openRole('prospect')}>Bereich öffnen</Button>
              <button className="text-sm underline text-[rgb(var(--color-primary))]" onClick={() => alert('Du kannst Listings filtern, Bewerben und Besichtigungen buchen.')}>Was kann ich hier?</button>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs uppercase tracking-wide text-black/50">Vermieter/Projektentwickler</div>
            <h2 className="text-lg font-semibold mt-1">Projekte, Regeln & Pipeline</h2>
            <p className="text-black/70 mt-2">Projekte/Units verwalten, Eligibility-Regeln festlegen, Bewerbungs-Pipeline steuern, Besichtigungsslots pflegen.</p>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => openRole('landlord')}>Bereich öffnen</Button>
              <button className="text-sm underline text-[rgb(var(--color-primary))]" onClick={() => alert('Du kannst Regeln ändern, Sichtbarkeit steuern und Status verschieben.')}>Was kann ich hier?</button>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs uppercase tracking-wide text-black/50">Rentit-Ops</div>
            <h2 className="text-lg font-semibold mt-1">Heutige Termine & Prüfungen</h2>
            <p className="text-black/70 mt-2">Check-ins durchführen, No-Shows markieren, manuelle Prüfungen moderieren und Richtlinien einsehen.</p>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => openRole('ops')}>Bereich öffnen</Button>
              <button className="text-sm underline text-[rgb(var(--color-primary))]" onClick={() => alert('Du kannst Check-ins verbuchen und Prüfungen bearbeiten.')}>Was kann ich hier?</button>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="text-xs text-black/60">
        Hinweis: Beim Wechsel der Rolle ändert sich der Kontext. Daten sind getrennt (Demo). Keine sensiblen Dokumente; nur Platzhalter.
      </div>
    </div>
  )
}


