import { useAppStore } from '../store/appStore'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function LandlordPage() {
  const { rules, setRules, visibility, setProjectPublic, toggleUnitVisible } = useAppStore()
  return (
    <div className="grid gap-6">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold">Dashboard (Demo)</h1>
          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            <div className="glass p-3"><div className="text-sm text-black/60">Time-to-Lease</div><div className="text-2xl font-semibold">14 Tage</div></div>
            <div className="glass p-3"><div className="text-sm text-black/60">Conversion</div><div className="text-2xl font-semibold">23%</div></div>
            <div className="glass p-3"><div className="text-sm text-black/60">No-Show-Rate</div><div className="text-2xl font-semibold">8%</div></div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold">Regeln / Eligibility (Demo)</h2>
          <div className="mt-3 grid sm:grid-cols-2 gap-4">
            <label className="text-sm">Rent-to-Income max (%)
              <input className="mt-1 w-full h-10 px-3 rounded-[var(--radius-sm)] bg-black/5" type="number" min={10} max={80} value={Math.round(rules.rentToIncomeMax*100)} onChange={(e)=> setRules({ rentToIncomeMax: Number(e.target.value)/100 })} />
            </label>
            <label className="text-sm flex items-center gap-2 mt-6">
              <input type="checkbox" checked={rules.petsAllowed} onChange={(e)=> setRules({ petsAllowed: e.target.checked })} /> Haustiere erlaubt
            </label>
          </div>
          <p className="text-xs text-black/60 mt-2">AGG-Guardrail: Verbotene/Proxy-Kriterien sind nicht zulässig. Dies ist eine Demo ohne echte Entscheidungen.</p>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold">Sichtbarkeit (Demo)</h2>
          <div className="mt-3 flex items-center gap-3">
            <Button variant="soft" onClick={()=> setProjectPublic(!visibility.projectPublic)}>
              Projekt: {visibility.projectPublic ? 'öffentlich' : 'privat'}
            </Button>
            <Button variant="soft" onClick={()=> toggleUnitVisible('l1')}>Unit l1: {visibility.unitVisible['l1'] ? 'sichtbar' : 'nicht sichtbar'}</Button>
            <Button variant="soft" onClick={()=> toggleUnitVisible('l2')}>Unit l2: {visibility.unitVisible['l2'] ? 'sichtbar' : 'nicht sichtbar'}</Button>
          </div>
          <p className="text-xs text-black/60 mt-2">Wirken sofort auf Interessenten-Feed (simuliert).</p>
        </CardBody>
      </Card>
    </div>
  )
}


