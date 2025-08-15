import { useAppStore } from '../store/appStore'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Label } from '../components/ui/Input'
import { useState } from 'react'

export default function TenancyPage() {
  const { tickets, createTicket, updateTicketStatus } = useAppStore()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<'maintenance' | 'moving' | 'cleaning' | 'other'>('maintenance')
  const [description, setDescription] = useState('')
  const submit = () => {
    if (!title) return
    createTicket({ title, category, description })
    setTitle('')
    setDescription('')
  }
  return (
    <div className="grid gap-6">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold">Mein Mietverhältnis (Demo)</h1>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Betreff</Label>
              <Input value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="z.B. Heizung defekt" />
            </div>
            <div>
              <Label>Kategorie</Label>
              <select className="w-full h-10 px-3 rounded-[var(--radius-sm)] bg-black/5" value={category} onChange={(e)=> setCategory(e.target.value as any)}>
                <option value="maintenance">Wartung</option>
                <option value="moving">Umzug</option>
                <option value="cleaning">Reinigung</option>
                <option value="other">Sonstiges</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label>Beschreibung</Label>
              <textarea className="w-full min-h-[100px] p-3 rounded-[var(--radius-sm)] bg-black/5" value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="Bitte beschreiben... (keine sensiblen Daten)"></textarea>
            </div>
            <div className="sm:col-span-2">
              <Button onClick={submit}>Neues Anliegen melden</Button>
            </div>
          </div>
          <p className="text-xs text-black/60 mt-3">Hinweis: Dies ist eine Demo. Keine echten Uploads, nur Textfelder.</p>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold">Tickets</h2>
          {tickets.length === 0 ? (
            <p className="text-black/60 mt-2">Noch keine Anliegen gemeldet.</p>
          ) : (
            <ul className="grid gap-2 mt-3">
              {tickets.map(t => (
                <li key={t.id} className="glass p-3 text-sm flex items-center justify-between">
                  <span>{t.title} – {t.category} – {t.status}</span>
                  <span className="flex gap-2">
                    <Button variant="soft" className="h-8 px-3 text-xs" onClick={()=> updateTicketStatus(t.id, 'in_review')}>in Prüfung</Button>
                    <Button variant="soft" className="h-8 px-3 text-xs" onClick={()=> updateTicketStatus(t.id, 'in_progress')}>in Arbeit</Button>
                    <Button variant="soft" className="h-8 px-3 text-xs" onClick={()=> updateTicketStatus(t.id, 'resolved')}>gelöst</Button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  )
}


