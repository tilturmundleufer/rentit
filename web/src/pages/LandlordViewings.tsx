import { useState } from 'react'
import { useAppStore } from '../store/appStore'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Label } from '../components/ui/Input'

export default function LandlordViewingsPage() {
  const { managedSlots, createManagedSlot, removeManagedSlot } = useAppStore()
  const [listingId, setListingId] = useState('l1')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  return (
    <div className="grid gap-6">
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold">Besichtigungen verwalten</h1>
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            <div>
              <Label>Unit</Label>
              <select className="w-full h-10 px-3 rounded-[var(--radius-sm)] bg-black/5" value={listingId} onChange={(e)=> setListingId(e.target.value)}>
                <option value="l1">l1</option>
                <option value="l2">l2</option>
                <option value="l3">l3</option>
                <option value="l4">l4</option>
                <option value="l5">l5</option>
              </select>
            </div>
            <div>
              <Label>Start</Label>
              <Input type="datetime-local" value={start} onChange={(e)=> setStart(e.target.value)} />
            </div>
            <div>
              <Label>Ende</Label>
              <Input type="datetime-local" value={end} onChange={(e)=> setEnd(e.target.value)} />
            </div>
            <div className="sm:col-span-3">
              <Button onClick={()=> { if (start && end) createManagedSlot(listingId, new Date(start).toISOString(), new Date(end).toISOString()) }}>Slot anlegen</Button>
            </div>
          </div>
          <p className="text-xs text-black/60 mt-2">Export/ICS-Hinweis (Demo): Nur Darstellung.</p>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold">Kommende Termine</h2>
          {managedSlots.length === 0 ? (
            <p className="text-black/60 mt-2">Keine Slots erstellt.</p>
          ) : (
            <ul className="grid gap-2 mt-3">
              {managedSlots.map(s => (
                <li key={s.id} className="glass p-3 text-sm flex items-center justify-between">
                  <span>{s.listingId} – {new Date(s.start).toLocaleString()} bis {new Date(s.end).toLocaleString()}</span>
                  <Button variant="soft" className="h-8 px-3 text-xs" onClick={()=> removeManagedSlot(s.id)}>Entfernen</Button>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  )
}


