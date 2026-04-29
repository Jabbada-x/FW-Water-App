'use client';

import AuthGate from '@/components/AuthGate';

export default function AdminPage() {
  return (
    <AuthGate adminOnly>
      <main style={{ padding: 16 }}>
        <h1>Admin-Bereich</h1>
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
  );
}
