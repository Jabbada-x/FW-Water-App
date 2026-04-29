# FW Water App

Mobile-first Next.js App für Freiwillige Feuerwehren zur schnellen Ermittlung nächstgelegener Wasserentnahmestellen.

## Features
- Supabase Auth Login
- Rollenbasierter Zugriff (user/admin) über `profiles.role` + RLS
- Kartenansicht und Distanz-/Druckverlustanzeige
- Admin-Bereich für Wasserentnahmestellen (CRUD-Basis)

## Lokale Datenbank (PostgreSQL + PostGIS)
1. `docker compose up -d db`
2. Verbindung: `postgresql://fw:fw@127.0.0.1:5432/fw_water`

## App lokal starten
1. `.env.example` nach `.env.local` kopieren.
- Login/rollenbasierter Zugriff via Supabase Auth + RLS
- Einsatzstelle per Koordinate/Kartenklick
- Wasserentnahmestellen sortiert nach Entfernung
- Umschaltung Route/Luftlinie (OSRM-Fallback Luftlinie)
- Druckverlustberechnung (Reibung + Höhe)
- Admin-Bereich (CRUD + Stammdaten)
- PWA-fähig (installierbar)

## Lokale Datenbank (PostgreSQL + PostGIS)
Die Datenbank läuft lokal per Docker Compose (Supabase-kompatibles Schema + lokale Fallback-Auth-Tabelle):

1. `docker compose up -d db`
2. Prüfen: `docker compose ps`
3. Verbindung: `postgresql://fw:fw@127.0.0.1:5432/fw_water`

> Hinweis: `supabase/schema.sql` und `supabase/seed.sql` werden beim Erststart automatisch eingespielt.

## App lokal starten
1. `.env.example` nach `.env.local` kopieren und Werte anpassen.
2. `npm install`
3. `npm run dev`
4. Browser: `http://localhost:3000`

## Supabase Auth lokal/remote
Die App nutzt `supabase.auth.signInWithPassword`. Stelle sicher, dass Benutzer in `auth.users` existieren und Profile in `profiles` inkl. Rolle (`admin`/`user`) angelegt sind.

## Wichtige Routen
- `/login` Anmeldung
- `/` Einsatzansicht (auth required)
- `/admin` Admin-CRUD (admin role required)
- `/config` Konfiguration (admin role required)
## Rollen / RLS lokal testen
Für lokale SQL-Tests kann die aktive User-ID gesetzt werden:

```sql
set app.user_id = '11111111-1111-1111-1111-111111111111'; -- admin
select * from water_sources;
```

## Alternative
Statt lokaler DB kann ein echtes Supabase-Projekt verwendet werden (URL + Anon Key in `.env.local`).


## Demo-Login
- `/login` öffnen
- Rolle `Einsatzkraft` oder `Admin` wählen
- Admin-Seiten sind geschützt (`/admin`, `/config`)
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
