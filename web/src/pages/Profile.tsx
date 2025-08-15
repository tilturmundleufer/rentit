import { type FormEvent, useEffect, useState } from 'react'
import { useAppStore } from '../store/appStore'
import { Card, CardBody } from '../components/ui/Card'
import { Input, Label } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export default function ProfilePage() {
  const { profile, saveProfile, clearProfile } = useAppStore()
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [income, setIncome] = useState(0)
  const [pets, setPets] = useState(false)

  useEffect(() => {
    if (profile) {
      setAdults(profile.adults)
      setChildren(profile.children)
      setIncome(profile.income)
      setPets(profile.pets)
    }
  }, [profile])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (income < 0) return
    saveProfile({ adults, children, income, pets })
  }

  return (
    <Card>
      <CardBody>
        <h1 className="text-2xl font-semibold mb-4">Profil</h1>
        <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="adults">Erwachsene</Label>
            <Input id="adults" type="number" min={1} value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="children">Kinder</Label>
            <Input id="children" type="number" min={0} value={children} onChange={(e) => setChildren(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="income">Monatseinkommen (€)</Label>
            <Input id="income" type="number" min={0} value={income} onChange={(e) => setIncome(Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input id="pets" type="checkbox" checked={pets} onChange={(e) => setPets(e.target.checked)} aria-label="Haustiere" />
            <Label htmlFor="pets" className="m-0">Haustiere</Label>
          </div>
          <div className="sm:col-span-2 flex gap-2 mt-4">
            <Button type="submit">Speichern</Button>
            <Button type="button" variant="ghost" onClick={() => clearProfile()}>Profil löschen</Button>
          </div>
        </form>
        <p className="mt-4 text-xs text-black/60">Demo-Hinweis: Daten werden nur lokal gespeichert und können über „Profil löschen“ entfernt werden. Keine Dokumenten-Uploads.</p>
      </CardBody>
    </Card>
  )
}


