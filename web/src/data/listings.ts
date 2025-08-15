export type ViewingSlot = {
  id: string
  start: string // ISO
  end: string // ISO
  status: 'available' | 'booked'
}

export type Listing = {
  id: string
  title: string
  address: string
  city: string
  rooms: number
  areaSqm: number
  coldRent: number
  floor?: string
  features: string[]
  hero?: string
  slots: ViewingSlot[]
}

const makeSlots = (base: string, count = 4): ViewingSlot[] => {
  const start = new Date(base)
  return Array.from({ length: count }).map((_, i) => {
    const s = new Date(start)
    s.setHours(10 + i, 0, 0, 0)
    const e = new Date(s)
    e.setMinutes(e.getMinutes() + 30)
    return { id: `${base}-${i}`, start: s.toISOString(), end: e.toISOString(), status: 'available' }
  })
}

export const listings: Listing[] = [
  {
    id: 'l1',
    title: 'Helle 2-Zimmer-Wohnung am Park',
    address: 'Am Schlosspark 12',
    city: 'Berlin',
    rooms: 2,
    areaSqm: 65,
    coldRent: 1050,
    floor: '3. OG',
    features: ['Balkon', 'Aufzug', 'Neubau'],
    hero: '',
    slots: makeSlots('2025-08-20'),
  },
  {
    id: 'l2',
    title: 'Charmantes 1-Zimmer-Apartment',
    address: 'Friedrichstr. 88',
    city: 'Berlin',
    rooms: 1,
    areaSqm: 38,
    coldRent: 780,
    floor: '5. OG',
    features: ['Aufzug'],
    hero: '',
    slots: makeSlots('2025-08-21'),
  },
  {
    id: 'l3',
    title: 'Familienfreundliche 3 Zimmer',
    address: 'Prenzlauer Allee 201',
    city: 'Berlin',
    rooms: 3,
    areaSqm: 78,
    coldRent: 1390,
    floor: '2. OG',
    features: ['Balkon'],
    hero: '',
    slots: makeSlots('2025-08-22', 5),
  },
  {
    id: 'l4',
    title: 'Modernes Studio nahe S-Bahn',
    address: 'Ringbahnstr. 7',
    city: 'Berlin',
    rooms: 1,
    areaSqm: 30,
    coldRent: 690,
    floor: '1. OG',
    features: ['Neubau'],
    hero: '',
    slots: makeSlots('2025-08-23'),
  },
  {
    id: 'l5',
    title: 'Großzügige 4 Zimmer mit Weitblick',
    address: 'Musterweg 5',
    city: 'Berlin',
    rooms: 4,
    areaSqm: 98,
    coldRent: 1890,
    floor: '6. OG',
    features: ['Aufzug'],
    hero: '',
    slots: makeSlots('2025-08-24'),
  },
]


