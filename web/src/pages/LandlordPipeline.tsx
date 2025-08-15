import { useAppStore } from '../store/appStore'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const COLUMNS = ['submitted','invited','viewed','offered','signed','rejected','expired'] as const

export default function LandlordPipelinePage() {
  const { applications, advanceApplication } = useAppStore()
  return (
    <div className="grid gap-6">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold">Bewerbungen (Pipeline)</h1>
          <div className="mt-4 grid md:grid-cols-3 lg:grid-cols-7 gap-3">
            {COLUMNS.map(col => (
              <div key={col} className="glass p-3">
                <div className="text-sm font-medium mb-2">{col}</div>
                <ul className="grid gap-2">
                  {applications.filter(a=> a.status===col).map(a=> (
                    <li key={a.id} className="glass p-2 text-xs flex items-center justify-between">
                      <span>{a.id.split('-').slice(0,2).join('-')}</span>
                      <div className="flex gap-1">
                        {COLUMNS.filter(c=> c!==col).slice(0,3).map(s=> (
                          <Button key={s} variant="ghost" className="h-7 px-2 text-[11px]" onClick={()=> advanceApplication(a.id, s)}>→ {s}</Button>
                        ))}
                      </div>
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


