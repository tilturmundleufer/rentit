import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Listing, ViewingSlot } from '../data/listings'

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'invited'
  | 'viewed'
  | 'offered'
  | 'signed'
  | 'rejected'
  | 'expired'

export type Application = {
  id: string
  listingId: string
  status: ApplicationStatus
  createdAt: string
}

export type ViewingLifecycle = 'scheduled' | 'checked_in' | 'no_show' | 'done'

export type BookedViewing = {
  id: string
  listingId: string
  slotId: string
  bookedAt: string
  status: ViewingLifecycle
}

export type Profile = {
  adults: number
  children: number
  income: number
  pets: boolean
}

export type Filters = {
  rooms?: number
  maxRent?: number
  features?: string[]
}

type Toast = { id: string; type: 'success' | 'info' | 'warn' | 'error'; message: string }

type AuditEntry = { id: string; type: 'application' | 'viewing' | 'profile' | 'role' | 'ops' | 'rules' | 'tickets'; message: string; createdAt: string }

export type Role = 'prospect' | 'landlord' | 'ops'

export type EligibilityRules = {
  rentToIncomeMax: number
  petsAllowed: boolean
}

export type TicketStatus = 'new' | 'in_review' | 'in_progress' | 'resolved'

export type Ticket = {
  id: string
  title: string
  category: 'maintenance' | 'moving' | 'cleaning' | 'other'
  description: string
  status: TicketStatus
  createdAt: string
}

export type ManualReview = {
  id: string
  applicationId: string
  tag: string
  status: 'open' | 'cleared' | 'pending_docs'
  comment?: string
  createdAt: string
}

export type VisibilityState = {
  projectPublic: boolean
  unitVisible: Record<string, boolean> // listingId -> visible
}

export type ManagedSlot = {
  id: string
  listingId: string
  start: string
  end: string
}

export type Project = {
  id: string
  name: string
  address: string
  unitIds: string[]
}

type State = {
  profile?: Profile
  filters: Filters
  applications: Application[]
  viewings: BookedViewing[]
  toasts: Toast[]
  audit: AuditEntry[]
  lastApplicationId?: string
  lastViewingId?: string
  role: Role
  lastRole?: Role
  roleChangedAt?: string
  rules: EligibilityRules
  tickets: Ticket[]
  reviews: ManualReview[]
  visibility: VisibilityState
  managedSlots: ManagedSlot[]
  projects: Project[]
  roleIntroSeen: Record<Role, boolean>
  roleChangeNoticeSeenAt?: string
}

type Actions = {
  setFilters: (f: Partial<Filters>) => void
  saveProfile: (p: Profile) => void
  clearProfile: () => void
  applyTo: (listing: Listing) => void
  bookViewing: (listing: Listing, slot: ViewingSlot) => void
  removeToast: (id: string) => void
  pushToast: (t: Omit<Toast, 'id'>) => void
  log: (entry: Omit<AuditEntry, 'id' | 'createdAt'> & { message: string }) => void
  setRole: (r: Role) => void
  setRules: (r: Partial<EligibilityRules>) => void
  toggleUnitVisible: (listingId: string, visible?: boolean) => void
  setProjectPublic: (isPublic: boolean) => void
  advanceApplication: (id: string, next: ApplicationStatus) => void
  createTicket: (t: Omit<Ticket, 'id' | 'createdAt' | 'status'> & { status?: TicketStatus }) => void
  updateTicketStatus: (id: string, status: TicketStatus) => void
  updateViewingStatus: (id: string, status: ViewingLifecycle) => void
  createManualReview: (applicationId: string, tag: string) => void
  updateManualReview: (id: string, status: ManualReview['status'], comment?: string) => void
  createManagedSlot: (listingId: string, startIso: string, endIso: string) => void
  removeManagedSlot: (slotId: string) => void
  dismissRoleIntro: (role: Role) => void
  dismissRoleChangeNotice: () => void
}

export const useAppStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      profile: undefined,
      filters: {},
      applications: [],
      viewings: [],
      toasts: [],
      audit: [],
      role: 'prospect',
      lastRole: undefined,
      roleChangedAt: undefined,
      rules: { rentToIncomeMax: 0.3, petsAllowed: true },
      tickets: [],
      reviews: [],
      visibility: { projectPublic: true, unitVisible: {} },
      managedSlots: [],
      projects: [
        { id: 'p1', name: 'Projekt Parkblick', address: 'Am Schlosspark 12, Berlin', unitIds: ['l1', 'l2'] },
        { id: 'p2', name: 'Projekt Cityline', address: 'Friedrichstr. 88, Berlin', unitIds: ['l3', 'l4', 'l5'] },
      ],
      roleIntroSeen: { prospect: false, landlord: false, ops: false },
      roleChangeNoticeSeenAt: undefined,

      setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),

      saveProfile: (p) => {
        set({ profile: p })
        get().pushToast({ type: 'success', message: 'Profil gespeichert' })
        get().log({ type: 'profile', message: 'Profil gespeichert' })
      },
      clearProfile: () => set({ profile: undefined }),

      applyTo: (listing) => {
        const app: Application = {
          id: `app-${listing.id}-${Date.now()}`,
          listingId: listing.id,
          status: 'submitted',
          createdAt: new Date().toISOString(),
        }
        set((s) => ({ applications: [app, ...s.applications], lastApplicationId: app.id }))
        get().pushToast({ type: 'success', message: 'Bewerbung eingereicht' })
        get().log({ type: 'application', message: `Bewerbung für ${listing.title}` })
      },

      bookViewing: (listing, slot) => {
        const v: BookedViewing = {
          id: `view-${listing.id}-${slot.id}`,
          listingId: listing.id,
          slotId: slot.id,
          bookedAt: new Date().toISOString(),
          status: 'scheduled',
        }
        set((s) => ({ viewings: [v, ...s.viewings], lastViewingId: v.id }))
        get().pushToast({ type: 'info', message: 'Besichtigung gebucht' })
        get().log({ type: 'viewing', message: `Besichtigung gebucht für ${listing.title}` })
      },

      removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
      pushToast: (t) => set((s) => ({ toasts: [...s.toasts, { ...t, id: `${Date.now()}-${s.toasts.length}` }] })),
      log: (entry) => set((s) => ({ audit: [{ id: `log-${Date.now()}-${s.audit.length}`, createdAt: new Date().toISOString(), ...entry }, ...s.audit].slice(0, 50) })),

      setRole: (r) => {
        const prev = get().role
        set({ role: r, lastRole: prev, roleChangedAt: new Date().toISOString(), roleChangeNoticeSeenAt: undefined })
        get().log({ type: 'role', message: `Rolle gewechselt: ${prev} → ${r}` })
        get().pushToast({ type: 'info', message: `Rolle: ${r}` })
      },

      setRules: (r) => {
        set((s) => ({ rules: { ...s.rules, ...r } }))
        get().log({ type: 'rules', message: 'Regeln aktualisiert' })
      },

      toggleUnitVisible: (listingId, visible) => {
        set((s) => ({ visibility: { ...s.visibility, unitVisible: { ...s.visibility.unitVisible, [listingId]: visible ?? !s.visibility.unitVisible[listingId] } } }))
        get().log({ type: 'rules', message: `Sichtbarkeit geändert für ${listingId}` })
      },

      setProjectPublic: (isPublic) => {
        set((s) => ({ visibility: { ...s.visibility, projectPublic: isPublic } }))
        get().log({ type: 'rules', message: `Projekt ist jetzt ${isPublic ? 'öffentlich' : 'privat'}` })
      },

      advanceApplication: (id, next) => {
        set((s) => ({ applications: s.applications.map((a) => (a.id === id ? { ...a, status: next } : a)) }))
        get().log({ type: 'application', message: `Bewerbungsstatus aktualisiert: ${id} → ${next}` })
      },

      createTicket: (t) => {
        const ticket: Ticket = {
          id: `ticket-${Date.now()}`,
          title: t.title,
          category: t.category,
          description: t.description,
          status: t.status ?? 'new',
          createdAt: new Date().toISOString(),
        }
        set((s) => ({ tickets: [ticket, ...s.tickets] }))
        get().log({ type: 'tickets', message: `Ticket erstellt: ${ticket.title}` })
      },

      updateTicketStatus: (id, status) => {
        set((s) => ({ tickets: s.tickets.map((t) => (t.id === id ? { ...t, status } : t)) }))
        get().log({ type: 'tickets', message: `Ticketstatus geändert: ${id} → ${status}` })
      },

      updateViewingStatus: (id, status) => {
        set((s) => ({ viewings: s.viewings.map((v) => (v.id === id ? { ...v, status } : v)) }))
        get().log({ type: 'ops', message: `Viewing-Status geändert: ${id} → ${status}` })
      },

      createManualReview: (applicationId, tag) => {
        const r: ManualReview = {
          id: `rev-${Date.now()}`,
          applicationId,
          tag,
          status: 'open',
          createdAt: new Date().toISOString(),
        }
        set((s) => ({ reviews: [r, ...s.reviews] }))
        get().log({ type: 'ops', message: `Manuelle Prüfung angelegt: ${tag}` })
      },

      updateManualReview: (id, status, comment) => {
        set((s) => ({ reviews: s.reviews.map((r) => (r.id === id ? { ...r, status, comment } : r)) }))
        get().log({ type: 'ops', message: `Prüfstatus geändert: ${id} → ${status}` })
      },

      createManagedSlot: (listingId, startIso, endIso) => {
        const ms: ManagedSlot = { id: `ms-${Date.now()}`, listingId, start: startIso, end: endIso }
        set((s) => ({ managedSlots: [ms, ...s.managedSlots] }))
        get().log({ type: 'rules', message: `Slot angelegt: ${listingId} ${startIso}` })
      },

      removeManagedSlot: (slotId) => {
        set((s) => ({ managedSlots: s.managedSlots.filter((m) => m.id !== slotId) }))
        get().log({ type: 'rules', message: `Slot entfernt: ${slotId}` })
      },

      dismissRoleIntro: (role) => set((s) => ({ roleIntroSeen: { ...s.roleIntroSeen, [role]: true } })),
      dismissRoleChangeNotice: () => set({ roleChangeNoticeSeenAt: new Date().toISOString() }),
    }),
    {
      name: 'rentit-demo-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        profile: s.profile,
        applications: s.applications,
        viewings: s.viewings,
        filters: s.filters,
        audit: s.audit,
        role: s.role,
        lastRole: s.lastRole,
        rules: s.rules,
        tickets: s.tickets,
        reviews: s.reviews,
        visibility: s.visibility,
        managedSlots: s.managedSlots,
        projects: s.projects,
        roleIntroSeen: s.roleIntroSeen,
        roleChangeNoticeSeenAt: s.roleChangeNoticeSeenAt,
      }),
    },
  ),
)


