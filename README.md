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


## Fehlerbehebung Build-Cache
Wenn wiederholt unerklärliche Parser- oder Build-Fehler auftreten:
1. `npm run clean`
2. `npm run dev`
