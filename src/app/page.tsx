'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import AuthGate from '@/components/AuthGate';
import { signOut } from '@/lib/auth';
import { calcPressureLoss } from '@/lib/pressure';
import { haversineKm } from '@/lib/routing';
import type { WaterSource } from '@/lib/types';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

const WATER_SOURCES_SEED: WaterSource[] = [
  {
    id: '1',
    name: 'UH-12',
    type: 'unterflurhydrant',
    latitude: 50.112,
    longitude: 8.682,
    capacity_l_min: 1200,
    status: 'aktiv',
    notes: null,
    last_checked_at: '2026-03-11'
  },
  {
    id: '2',
    name: 'Löschteich Nord',
    type: 'loeschteich',
    latitude: 50.11,
    longitude: 8.69,
    capacity_l_min: 2000,
    status: 'eingeschraenkt',
    notes: 'Zufahrt eng',
    last_checked_at: '2026-01-05'
  },
  {
    id: '3',
    name: 'Zisterne Bauhof',
    type: 'zisterne',
    latitude: 50.115,
    longitude: 8.676,
    capacity_l_min: 800,
    status: 'ausser_betrieb',
    notes: 'Pumpe defekt',
    last_checked_at: '2025-12-09'
  }
];

export default function Home() {
  const [incidentPoint, setIncidentPoint] = useState({ lat: 50.112, lon: 8.682 });
  const [flow, setFlow] = useState(800);

  const results = useMemo(() => {
    return WATER_SOURCES_SEED
      .map((source) => {
        const distanceKm = haversineKm(
          { lat: incidentPoint.lat, lon: incidentPoint.lon },
          { lat: source.latitude, lon: source.longitude }
        );
        const lengthM = distanceKm * 1000;
        return {
          ...source,
          distanceKm,
          hoseLengthM: Math.round(lengthM / 20) * 20,
          pressureBar: calcPressureLoss({ pressurePer100m: flow / 1000, lengthM })
        };
      })
      .sort((a, b) => {
        if (a.status === 'ausser_betrieb' && b.status !== 'ausser_betrieb') return 1;
        if (b.status === 'ausser_betrieb' && a.status !== 'ausser_betrieb') return -1;
        return a.distanceKm - b.distanceKm;
      });
  }, [incidentPoint, flow]);

  return (
    <AuthGate>
      <div className="app-shell">
        <div className="header">
          FW Water App · Einsatzhilfe
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/config">Konfiguration</Link>
            <Link href="/admin">Admin</Link>
            <button
              onClick={() => {
                void signOut().finally(() => {
                  window.location.assign('/login');
                });
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="main-grid">
          <div className="map-wrap">
            <MapView
              incident={[incidentPoint.lat, incidentPoint.lon]}
              sources={results}
              line={
                results[0]
                  ? [
                      [incidentPoint.lat, incidentPoint.lon],
                      [results[0].latitude, results[0].longitude]
                    ]
                  : undefined
              }
              onPick={(lat, lon) => setIncidentPoint({ lat, lon })}
            />
          </div>

          <div className="panel">
            <div className="controls">
              <div className="row">
                <input
                  value={incidentPoint.lat}
                  onChange={(e) =>
                    setIncidentPoint((p) => ({ ...p, lat: Number(e.target.value) }))
                  }
                />
                <input
                  value={incidentPoint.lon}
                  onChange={(e) =>
                    setIncidentPoint((p) => ({ ...p, lon: Number(e.target.value) }))
                  }
                />
              </div>
              <input
                type="number"
                value={flow}
                onChange={(e) => setFlow(Number(e.target.value))}
              />
            </div>

            {results.map((r) => (
              <div className="card" key={r.id}>
                <strong>{r.name}</strong> · {r.type} · {r.status}
                <br />
                <span className="meta">
                  {r.distanceKm.toFixed(2)} km · {r.hoseLengthM} m · {r.capacity_l_min} l/min · Δp{' '}
                  {r.pressureBar} bar
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthGate>
  );
}
