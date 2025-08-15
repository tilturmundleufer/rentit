import { Card, CardBody } from '../components/ui/Card'

export default function DashboardPage() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card><CardBody><div className="text-sm text-black/60">Time-to-Lease</div><div className="text-2xl font-semibold">14 Tage</div></CardBody></Card>
      <Card><CardBody><div className="text-sm text-black/60">Conversion Bewerbung→Vertrag</div><div className="text-2xl font-semibold">23%</div></CardBody></Card>
      <Card><CardBody><div className="text-sm text-black/60">No-Show-Rate</div><div className="text-2xl font-semibold">8%</div></CardBody></Card>
    </div>
  )
}


