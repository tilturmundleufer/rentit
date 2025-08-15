import { useState } from 'react'
import { Card, CardBody } from '../components/ui/Card'

export default function OpsModerationPage() {
  const [flags, setFlags] = useState(0)
  return (
    <div className="grid gap-6">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold">Moderation (Demo)</h1>
          <p className="text-black/70 mt-2">Richtlinien/FAQ (statisch): Keine sensiblen Dokumente verarbeiten; Entscheidungen dokumentieren; nur Metadaten einsehen.</p>
          <div className="mt-3 text-sm">Flags gesamt: <span className="font-medium">{flags}</span></div>
          <div className="mt-2">
            <button className="h-9 px-3 rounded-[var(--radius-sm)] bg-black/5 hover:bg-black/10" onClick={()=> setFlags((n)=>n+1)}>Flag erhöhen</button>
            <button className="h-9 px-3 rounded-[var(--radius-sm)] bg-black/5 hover:bg-black/10 ml-2" onClick={()=> setFlags(0)}>Zurücksetzen</button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}


