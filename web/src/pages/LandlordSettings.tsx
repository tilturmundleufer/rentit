import { Card, CardBody } from '../components/ui/Card'

export default function LandlordSettingsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold">Einstellungen (Org)</h1>
          <p className="text-black/70 mt-2">Org-Profil, Team-Rollen (Demo-Texte). Multi-Tenant-Kontext: Daten org-gebunden.</p>
          <ul className="list-disc ml-5 text-sm mt-3 text-black/70">
            <li>Org-Name: Muster GmbH</li>
            <li>Team: 3 Mitglieder (Admin, Vermieter, Support)</li>
            <li>Mandanten-Isolation: aktiv (Demo)</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}


