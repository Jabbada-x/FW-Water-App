'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { calcPressureLoss } from '@/lib/pressure';
import { haversineKm } from '@/lib/routing';
import type { WaterSource } from '@/lib/types';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

const dummy: WaterSource[] = [
  { id: '1', name: 'UH-12', type: 'unterflurhydrant', latitude: 50.112, longitude: 8.682, capacity_l_min: 1200, status: 'aktiv', notes: null, last_checked_at: '2026-03-11' },
  { id: '2', name: 'Löschteich Nord', type: 'loeschteich', latitude: 50.11, longitude: 8.69, capacity_l_min: 2000, status: 'eingeschraenkt', notes: 'Zufahrt eng', last_checked_at: '2026-01-05' },
  { id: '3', name: 'Zisterne Bauhof', type: 'zisterne', latitude: 50.115, longitude: 8.676, capacity_l_min: 800, status: 'ausser_betrieb', notes: 'Pumpe defekt', last_checked_at: '2025-12-09' }
];

export default function Home() {
  const [incident, setIncident] = useState({ lat: 50.111, lon: 8.683 });
  const [flow, setFlow] = useState(800);
  const [lineMode, setLineMode] = useState<'route' | 'air'>('air');

  const results = useMemo(() => dummy.map((s) => {
    const km = haversineKm({ lat: incident.lat, lon: incident.lon }, { lat: s.latitude, lon: s.longitude });
    const lengthM = km * 1000;
    const pressure = calcPressureLoss({ pressurePer100m: flow / 1000, lengthM, heightDeltaM: 0, doubleLine: false });
    return { ...s, distanceKm: km, hoseLengthM: Math.round(lengthM / 20) * 20, pressureBar: pressure };
  }).sort((a,b) => {
    if (a.status === 'ausser_betrieb' && b.status !== 'ausser_betrieb') return 1;
    if (b.status === 'ausser_betrieb' && a.status !== 'ausser_betrieb') return -1;
    return a.distanceKm - b.distanceKm;
  }), [incident, flow]);

  return (
    <div className="app-shell">
      <div className="header">FW Water App · Einsatzhilfe</div>
      <div className="main-grid">
        <MapView
          incident={[incident.lat, incident.lon]}
          sources={results}
          line={results[0] ? [[incident.lat, incident.lon], [results[0].latitude, results[0].longitude]] : undefined}
          onPick={(lat, lon) => setIncident({ lat, lon })}
        />
        <div className="panel">
          <div className="controls">
            <div className="row">
              <input value={incident.lat} onChange={(e) => setIncident((p) => ({ ...p, lat: Number(e.target.value) }))} />
              <input value={incident.lon} onChange={(e) => setIncident((p) => ({ ...p, lon: Number(e.target.value) }))} />
            </div>
            <div className="row">
              <select value={lineMode} onChange={(e) => setLineMode(e.target.value as 'route' | 'air')}>
                <option value="route">Straßenroute</option>
                <option value="air">Luftlinie</option>
              </select>
              <input type="number" value={flow} onChange={(e) => setFlow(Number(e.target.value))} />
            </div>
            <button className="big-btn">Aktuelle Position verwenden</button>
          </div>
          <p className="meta">Hinweis: Die Berechnung ist eine Einsatzhilfe und ersetzt keine feuerwehrtaktische Beurteilung.</p>
          {results.map((r) => (
            <div className="card" key={r.id}>
              <strong>{r.name}</strong> · {r.type} · {r.status}<br/>
              <span className="meta">{r.distanceKm.toFixed(2)} km · {r.hoseLengthM} m · {r.capacity_l_min} l/min · Δp {r.pressureBar} bar</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
