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

## Rollen / RLS lokal testen
Für lokale SQL-Tests kann die aktive User-ID gesetzt werden:

```sql
set app.user_id = '11111111-1111-1111-1111-111111111111'; -- admin
select * from water_sources;
```

## Alternative
Statt lokaler DB kann ein echtes Supabase-Projekt verwendet werden (URL + Anon Key in `.env.local`).
