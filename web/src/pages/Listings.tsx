import { useMemo, useState } from 'react'
import { listings } from '../data/listings'
import { useAppStore } from '../store/appStore'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input, Label } from '../components/ui/Input'
import { Link } from 'react-router-dom'
import { Modal } from '../components/ui/Modal'

export default function ListingsPage() {
  const { filters, setFilters, profile, applyTo, rules, visibility, role, applications, viewings } = useAppStore()
  const [query, setQuery] = useState('')
  const [whyOpen, setWhyOpen] = useState<string | null>(null)
  const [onlyMatches, setOnlyMatches] = useState(false)
  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (role === 'prospect') {
        if (!visibility.projectPublic) return false
        const unitVisible = visibility.unitVisible[l.id]
        if (unitVisible === false) return false
      }
      if (filters.rooms && l.rooms < filters.rooms) return false
      if (typeof filters.maxRent === 'number' && l.coldRent > filters.maxRent) return false
      if (filters.features && filters.features.length > 0 && !filters.features.every((f) => l.features.includes(f))) return false
      if (query && !(`${l.title} ${l.address} ${l.city}`.toLowerCase().includes(query.toLowerCase()))) return false
      if (onlyMatches) {
        const income = profile?.income ?? 0
        if (income <= 0) return false
        const ratio = l.coldRent / income
        if (ratio > rules.rentToIncomeMax) return false
      }
      return true
    })
  }, [filters, query, onlyMatches, profile, rules, visibility, role])

  const badge = (rent: number) => {
    const income = profile?.income ?? 0
    if (income <= 0) return 'vielleicht'
    const ratio = rent / income
    return ratio <= rules.rentToIncomeMax ? 'passt' : 'vielleicht'
  }

  const kpis = useMemo(() => {
    const income = profile?.income ?? 0
    const visibleListings = listings.filter((l) => {
      if (role === 'prospect') {
        if (!visibility.projectPublic) return false
        if (visibility.unitVisible[l.id] === false) return false
      }
      return true
    })
    const matchCount = income > 0
      ? visibleListings.filter((l) => (l.coldRent / income) <= rules.rentToIncomeMax).length
      : 0
    const openApps = applications.filter((a) => a.status !== 'signed' && a.status !== 'rejected' && a.status !== 'expired').length
    const upcoming = viewings
      .map((v) => {
        const listing = listings.find((x) => x.id === v.listingId)
        const slot = listing?.slots.find((s) => s.id === v.slotId)
        return slot ? { id: v.id, when: new Date(slot.start) } : undefined
      })
      .filter((x): x is { id: string; when: Date } => !!x)
      .sort((a, b) => a.when.getTime() - b.when.getTime())[0]
    return { matchCount, openApps, nextViewing: upcoming?.when }
  }, [applications, viewings, profile, role, rules, visibility])

  return (
    <div className="grid gap-6">
      {!profile && (
        <div className="glass p-4 text-sm text-black/70">Profil unvollständig – fülle es aus, um passende Wohnungen zu sehen. <Link className="underline" to="/profile">Profil öffnen</Link>.</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass p-4" aria-label="Passende Listings">
          <div className="text-xs text-black/60">Passende Listings</div>
          <div className="text-2xl font-semibold">{kpis.matchCount}</div>
          {(!profile || (profile?.income ?? 0) <= 0) && <div className="text-xs text-black/50 mt-1">Profil erforderlich</div>}
        </div>
        <div className="glass p-4" aria-label="Offene Bewerbungen">
          <div className="text-xs text-black/60">Offene Bewerbungen</div>
          <div className="text-2xl font-semibold">{kpis.openApps}</div>
        </div>
        <div className="glass p-4" aria-label="Nächste Besichtigung">
          <div className="text-xs text-black/60">Nächste Besichtigung</div>
          <div className="text-2xl font-semibold">{kpis.nextViewing ? kpis.nextViewing.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : '—'}</div>
        </div>
      </div>

      <div className="glass p-4 flex flex-wrap items-end gap-4" role="region" aria-label="Filter">
        <div className="w-full md:w-auto">
          <Label>Suche</Label>
          <Input placeholder="Adresse/PLZ/Titel" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Suchbegriff" />
        </div>
        <div>
          <Label>Zimmer (min)</Label>
          <Input type="number" min={0} value={filters.rooms ?? ''} onChange={(e) => setFilters({ rooms: e.target.value ? Number(e.target.value) : undefined })} aria-label="Zimmer Mindestanzahl" />
        </div>
        <div>
          <Label>Max. Kaltmiete (€)</Label>
          <Input type="number" min={0} value={filters.maxRent ?? ''} onChange={(e) => setFilters({ maxRent: e.target.value ? Number(e.target.value) : undefined })} aria-label="Maximale Kaltmiete" />
        </div>
        <div className="ml-auto">
          <Button variant="ghost" onClick={() => setFilters({ rooms: undefined, maxRent: undefined })}>Reset</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {['Balkon', 'Aufzug', 'Neubau'].map((f) => {
          const active = filters.features?.includes(f)
          return (
            <button
              key={f}
              className={`h-9 px-3 rounded-full text-sm focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-bg))] ${active ? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]' : 'bg-black/5 text-black/70 hover:bg-black/10'}`}
              onClick={() => {
                const current = new Set(filters.features ?? [])
                if (current.has(f)) current.delete(f)
                else current.add(f)
                setFilters({ features: Array.from(current) })
              }}
              aria-pressed={active}
            >
              {f}
            </button>
          )
        })}
        {(filters.features?.length ?? 0) > 0 && (
          <Button variant="ghost" className="h-9" onClick={() => setFilters({ features: [] })}>Filter zurücksetzen</Button>
        )}
        <label className="ml-auto flex items-center gap-2 text-sm text-black/70">
          <input
            type="checkbox"
            onChange={(e) => setOnlyMatches(e.target.checked)}
            checked={onlyMatches}
            aria-label="Nur passende anzeigen"
          />
          Nur passende anzeigen
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="region" aria-label="Ergebnisse">
        {filtered.map((l) => (
          <Card key={l.id} className="overflow-hidden">
            <CardBody>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{l.title}</h3>
                  <p className="text-sm text-black/60">{l.address}, {l.city}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={badge(l.coldRent)} tone={badge(l.coldRent) === 'passt' ? 'success' : 'info'} />
                  <button className="text-xs underline text-[rgb(var(--color-primary))]" onClick={() => setWhyOpen(l.id)} aria-label="Warum passt das?">Warum?</button>
                </div>
              </div>
              <div className="mt-3 text-sm text-black/80">{l.rooms} Zi · {l.areaSqm} m² · €{l.coldRent} kalt</div>
              <div className="mt-4 flex items-center gap-2">
                <Button size="m" onClick={() => applyTo(l)}>Bewerben</Button>
                <Link to={`/listing/${l.id}`} className="inline-flex"><Button variant="soft">Details</Button></Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass p-6 text-center text-black/70">Keine Ergebnisse. Passe die Filter an.</div>
      )}

      <Modal open={whyOpen !== null} title="Warum passt das?" onClose={() => setWhyOpen(null)}>
        {whyOpen && (() => {
          const l = listings.find(x => x.id === whyOpen)!
          const inc = profile?.income ?? 0
          const ratio = inc > 0 ? l.coldRent / inc : undefined
          return (
            <div className="text-sm">
              <p>Dieses Projekt nutzt Soft-Regeln (AGG-Hinweis). Hauptkriterium: Rent-to-Income ≤ {(rules.rentToIncomeMax*100).toFixed(0)}%.</p>
              <ul className="mt-3 grid gap-1">
                <li>Kaltmiete: €{l.coldRent.toLocaleString()}</li>
                <li>Dein Einkommen: {inc > 0 ? `€${inc.toLocaleString()}` : 'unbekannt (Profil pflegen)'}</li>
                <li>Verhältnis: {ratio !== undefined ? `${(ratio * 100).toFixed(1)}%` : '–'}</li>
              </ul>
              <p className="mt-3 text-black/60">Hinweis: Dies ist eine unverbindliche Einschätzung. <button className="underline" onClick={() => { setWhyOpen(null); }}>Manuelle Prüfung anfragen</button></p>
            </div>
          )
        })()}
      </Modal>
    </div>
  )
}


