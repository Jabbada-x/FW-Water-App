'use client';

import { useEffect, useState } from 'react';
import AuthGate from '@/components/AuthGate';
import { supabase } from '@/lib/supabase';

type WS = { id: string; name: string; type: string; capacity_l_min: number; status: string };

export default function AdminPage() {
  const [items, setItems] = useState<WS[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('unterflurhydrant');
  const [status, setStatus] = useState('aktiv');
  const [capacity, setCapacity] = useState(1000);

  const load = async () => {
    const { data } = await supabase.from('water_sources').select('id,name,type,capacity_l_min,status').order('name');
    setItems((data ?? []) as WS[]);
  };

  useEffect(() => { void load(); }, []);

  const create = async () => {
    await supabase.from('water_sources').insert({ name, type, status, capacity_l_min: capacity, latitude: 50.112, longitude: 8.682 });
    setName('');
    await load();
  };

  const remove = async (id: string) => {
    await supabase.from('water_sources').delete().eq('id', id);
    await load();
  };

import AuthGate from '@/components/AuthGate';

export default function AdminPage() {
  return (
    <AuthGate adminOnly>
      <main style={{ padding: 16 }}>
        <h1>Admin-Bereich</h1>
        <h3>Neue Wasserentnahmestelle</h3>
        <div style={{display:'grid', gap:8, maxWidth:560, marginBottom:16}}>
          <input placeholder='Name / Kennung' value={name} onChange={(e) => setName(e.target.value)} />
          <select value={type} onChange={(e)=>setType(e.target.value)}><option>unterflurhydrant</option><option>ueberflurhydrant</option><option>loeschteich</option><option>zisterne</option><option>offenes_gewaesser</option><option>sonstige</option></select>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}><input type='number' value={capacity} onChange={(e)=>setCapacity(Number(e.target.value))}/><select value={status} onChange={(e)=>setStatus(e.target.value)}><option>aktiv</option><option>eingeschraenkt</option><option>ausser_betrieb</option></select></div>
          <button className='big-btn' onClick={create}>Speichern</button>
        </div>
        <h3>Vorhandene Stellen</h3>
        {items.map((i) => <div key={i.id} className='card'><strong>{i.name}</strong> · {i.type} · {i.capacity_l_min} l/min · {i.status} <button onClick={() => void remove(i.id)} style={{float:'right'}}>Löschen</button></div>)}
      </main>
    </AuthGate>
        <p>Wasserentnahmestellen verwalten (Demo-UI):</p>
        <div style={{display:'grid', gap:8, maxWidth:560}}>
          <input placeholder='Name / Kennung' />
          <select><option>Unterflurhydrant</option><option>Überflurhydrant</option><option>Löschteich</option><option>Zisterne</option><option>Offenes Gewässer</option></select>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}><input placeholder='Lat'/><input placeholder='Lon'/></div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}><input placeholder='Kapazität l/min'/><select><option>aktiv</option><option>eingeschränkt</option><option>außer Betrieb</option></select></div>
          <textarea placeholder='Bemerkungen' />
          <button className='big-btn'>Speichern</button>
        </div>
      </main>
    </AuthGate>
export default function AdminPage() {
  return (
    <main style={{ padding: 16 }}>
      <h1>Admin-Bereich</h1>
      <p>Verwaltung von Wasserentnahmestellen, Benutzern und Stammdaten (Rollenprüfung serverseitig via Supabase RLS).</p>
      <ul>
        <li>Wasserentnahmestellen anlegen/bearbeiten/löschen</li>
        <li>Schlauchtypen und Druckverlustparameter pflegen</li>
        <li>Benutzerrollen verwalten</li>
      </ul>
    </main>
  );
}
