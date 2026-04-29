# FW Water App

Mobile-first Next.js App für Freiwillige Feuerwehren zur schnellen Ermittlung nächstgelegener Wasserentnahmestellen.

## Features
- Login/rollenbasierter Zugriff via Supabase Auth + RLS
- Einsatzstelle per Koordinate/Kartenklick
- Wasserentnahmestellen sortiert nach Entfernung
- Umschaltung Route/Luftlinie (OSRM-Fallback Luftlinie)
- Druckverlustberechnung (Reibung + Höhe)
- Admin-Bereich (CRUD + Stammdaten)
- PWA-fähig (installierbar)

## Lokal starten
1. `npm install`
2. `.env.local` erstellen:
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
3. `npm run dev`
4. Browser: `http://localhost:3000`

## Supabase
- Schema ausführen: `supabase/schema.sql`
- Seed einspielen: `supabase/seed.sql`
