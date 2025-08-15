import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import './index.css'
import ListingsPage from './pages/Listings'
import ListingDetailPage from './pages/ListingDetail'
import ProfilePage from './pages/Profile'
import ApplicationsPage from './pages/Applications'
import ViewingsPage from './pages/Viewings'
import DashboardPage from './pages/Dashboard'
import { Toaster } from './components/ui/Toast'
import SuccessPage from './pages/Success'
import AuditPage from './pages/Audit'
import SignaturePage from './pages/Signature'
import { DemoBanner } from './components/ui/DemoBanner'
import NotFoundPage from './pages/NotFound'
import StartPage from './pages/Start'
import LandlordPage from './pages/Landlord'
import OpsPage from './pages/Ops'
import { useAppStore } from './store/appStore'
import TenancyPage from './pages/Tenancy'
import LandlordPipelinePage from './pages/LandlordPipeline'
import LandlordViewingsPage from './pages/LandlordViewings'
import LandlordTemplatesPage from './pages/LandlordTemplates'
import LandlordSettingsPage from './pages/LandlordSettings'
import LandlordProjectsPage from './pages/LandlordProjects'
import OpsModerationPage from './pages/OpsModeration'
import { RoleIntro } from './components/ui/RoleIntro'

function Layout({ children }: { children: React.ReactNode }) {
  const { role, lastRole, applications, roleIntroSeen, dismissRoleIntro, roleChangeNoticeSeenAt, dismissRoleChangeNotice } = useAppStore()
  const hasLease = applications.some((a) => a.status === 'signed')
  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded">Zum Inhalt springen</a>
      <header className="sticky top-0 z-10" role="banner">
        <DemoBanner />
        <div className="backdrop-blur-lg bg-white/70 border-b border-white/60">
        <div className="container-max flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-semibold text-[rgb(var(--color-text))]">Rentit</Link>
          <nav className="flex items-center gap-4 text-sm" role="navigation" aria-label="Hauptnavigation">
            {role === 'prospect' && (
              <>
                <NavLink to="/listings" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Listings</NavLink>
                <NavLink to="/profile" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Profil</NavLink>
                <NavLink to="/applications" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Bewerbungen</NavLink>
                <NavLink to="/viewings" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Termine</NavLink>
                {hasLease && <NavLink to="/tenancy" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Mein Mietverhältnis</NavLink>}
              </>
            )}
            {role === 'landlord' && (
              <>
                <NavLink to="/dashboard" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Dashboard</NavLink>
                <NavLink to="/landlord" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Projekte/Regeln</NavLink>
                <NavLink to="/landlord/pipeline" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Bewerbungen</NavLink>
                <NavLink to="/landlord/viewings" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Besichtigungen</NavLink>
                <NavLink to="/landlord/templates" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Vorlagen</NavLink>
                <NavLink to="/landlord/settings" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Einstellungen</NavLink>
                <NavLink to="/audit" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Audit</NavLink>
              </>
            )}
            {role === 'ops' && (
              <>
                <NavLink to="/ops" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Übersicht</NavLink>
                <NavLink to="/ops/moderation" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Moderation</NavLink>
                <NavLink to="/audit" className={({isActive})=>`px-3 py-2 rounded-[var(--radius-sm)] ${isActive? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]':'hover:bg-black/5'}`}>Audit</NavLink>
              </>
            )}
            <div className="ml-2 text-xs text-black/70">Rolle: <span className="font-medium">{role}</span> {lastRole && <span className="text-black/50">(zuletzt: {lastRole})</span>}</div>
            <Link to="/" className="h-9 px-3 rounded-[var(--radius-sm)] bg-black/5 hover:bg-black/10 inline-flex items-center">Rolle wechseln</Link>
          </nav>
        </div>
        </div>
        {(!(roleIntroSeen && roleIntroSeen[role]) || !roleChangeNoticeSeenAt) && (
          <div className="bg-black/5">
            <div className="container-max py-2 text-sm flex items-center justify-between">
              <div>
                {!(roleIntroSeen && roleIntroSeen[role]) && (
                  <span>
                    {role === 'prospect' && 'Hier findest du passende Wohnungen, kannst dich bewerben und Termine buchen.'}
                    {role === 'landlord' && 'Verwalte Projekte, Regeln und die Bewerbungs-Pipeline. Änderungen wirken sofort (Demo).'}
                    {role === 'ops' && 'Heute anstehende Termine prüfen, Check-ins verbuchen und Prüfungen moderieren.'}
                  </span>
                )}
                {!roleChangeNoticeSeenAt && lastRole && lastRole !== role && (
                  <span className="ml-3">Kontext wird geändert – Daten zwischen Rollen sind getrennt (Demo).</span>
                )}
              </div>
              <button className="h-8 px-3 rounded-[var(--radius-sm)] hover:bg-black/10" onClick={() => { if (!roleIntroSeen[role]) dismissRoleIntro(role); if (!roleChangeNoticeSeenAt) dismissRoleChangeNotice() }}>Schließen</button>
            </div>
          </div>
        )}
      </header>
      <main id="main" className="container-max py-6" role="main">
        {children}
      </main>
      <footer className="container-max py-8 text-xs text-black/60" role="contentinfo" aria-label="Datenschutz-Hinweis">
        Demo: Es werden nur Mock-Daten lokal verarbeitet. Keine echten personenbezogenen Daten.
      </footer>
      <RoleIntro role={role} open={!(roleIntroSeen && roleIntroSeen[role])} onClose={() => dismissRoleIntro(role)} onFinish={() => dismissRoleIntro(role)} />
      <Toaster />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/viewings" element={<ViewingsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/landlord" element={<LandlordPage />} />
          <Route path="/landlord/projects" element={<LandlordProjectsPage />} />
          <Route path="/landlord/pipeline" element={<LandlordPipelinePage />} />
          <Route path="/landlord/viewings" element={<LandlordViewingsPage />} />
          <Route path="/landlord/templates" element={<LandlordTemplatesPage />} />
          <Route path="/landlord/settings" element={<LandlordSettingsPage />} />
          <Route path="/ops" element={<OpsPage />} />
          <Route path="/ops/moderation" element={<OpsModerationPage />} />
          <Route path="/tenancy" element={<TenancyPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/signature" element={<SignaturePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
