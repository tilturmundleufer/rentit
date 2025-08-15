# Rentit – Demo (M1–M2)

Kurz-Briefing
- Vision: End-to-End Vermietungs-Demo (Scout-IA + Liquid Glass Stil), Zielmarkt Berlin.
- Rollen: Interessent/Mieter, Vermieter/Projektentwickler, Rentit-Ops (Demo).
- KPIs: Time-to-Lease, Conversion Bewerbung→Vertrag, No-Show-Rate (Demo-Kacheln).

Flows (MVP)
- Profil anlegen (lokal), Suchen & Filtern (Zimmer, Max-Kaltmiete, Feature-Chips), Listings-Grid mit Badges ("passt"/"vielleicht").
- Listing-Detail mit CTAs: Bewerben, Besichtigung buchen (Slots). Erfolgsscreens inkl. ics-ähnlicher Box.
- Bewerbungen/Termine-Übersichten, Audit-Log der Aktionen, Signatur-Flow (Demo: Dokument erzeugt → Signiert).

Architektur (Demo)
- SPA mit React + Vite + TypeScript, Tailwind v4 Utilities, minimale UI-Komponenten.
- Daten: statische Mock-Daten im Frontend. Globaler Store (Zustand) + LocalStorage-Persistenz.
- Slices: Search/Listings, Detail, Profile, Apply/Viewing, Metrics, Audit.

Datenschutz/AGG (Demo)
- Keine realen personenbezogenen Daten; Mock-Disclaimer im Footer.
- Regel-Transparenz: "Warum passt das?" Dialog mit Soft-Regeln (Rent-to-Income ≤ 30%), Dummy "manuelle Prüfung".

A11y & Qualität
- Labels, Fokus-Ringe, Modal-Fokus-Trap, semantische Struktur, AA-Kontraste.
- Leerseiten, Toast-Feedback, kleine Performance-Disziplin.

Lokal starten
- Dev (HMR): im Ordner `web` → `npm run dev` und Browser auf http://127.0.0.1:5173
- Prod-Preview: `npm run build` danach `npm run preview` → http://127.0.0.1:4173

Grenzen der Demo
- Keine echten Provider/Backends, keine Zahlungsabwicklung/Kaution/ERP.
- Statuswechsel/Signatur sind UI-Simulationen.

Offene Punkte (Nächste Iteration)
- Regel-Editor, echte Provider (ID/E-Sign/Open-Banking), Security & RLS, CSV-Import/Projekt-Setup, SSR/SEO.