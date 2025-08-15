import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAppStore } from '../store/appStore'


export default function LandlordProjectsPage() {
  const { visibility, setProjectPublic, toggleUnitVisible, projects } = useAppStore()
  const precheck = () => alert('Demo: CSV Pre-Check – 5 Zeilen erkannt, 0 Fehler. Parser nicht implementiert.')
  return (
    <div className="grid gap-6">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold">Projekte & Wohnungen</h1>
          <div className="mt-3">
            <Button variant="soft" onClick={precheck}>CSV importieren (Pre-Check)</Button>
          </div>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {projects.map(p => (
              <div key={p.id} className="glass p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-black/60">{p.address}</div>
                    <div className="text-lg font-semibold">{p.name}</div>
                    <div className="text-sm text-black/60">Einheiten: {p.unitIds.length}</div>
                  </div>
                  <Button variant="soft" className="h-8 px-3 text-xs" onClick={()=> setProjectPublic(!visibility.projectPublic)}>
                    {visibility.projectPublic ? 'öffentlich' : 'privat'}
                  </Button>
                </div>
                <ul className="mt-3 grid gap-2">
                  {p.unitIds.map(uid => (
                    <li key={uid} className="glass p-3 text-sm flex items-center justify-between">
                      <span>Unit {uid}</span>
                      <Button variant="ghost" className="h-8 px-3 text-xs" onClick={()=> toggleUnitVisible(uid)}>
                        {visibility.unitVisible[uid] === false ? 'nicht sichtbar' : 'sichtbar'}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}


