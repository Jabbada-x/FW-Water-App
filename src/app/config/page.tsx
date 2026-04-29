'use client';

import AuthGate from '@/components/AuthGate';

export default function ConfigPage() {
  return (
    <AuthGate adminOnly>
      <main style={{ padding: 16 }}>
        <h1>Konfiguration Druckverlust</h1>
        <p>Stammdatenpflege für Schlauchtypen und Berechnungsparameter (Demo-UI).</p>
        <table style={{ width:'100%', maxWidth:600, borderCollapse:'collapse', background:'#fff' }}>
          <thead><tr><th>Typ</th><th>Durchmesser</th><th>Werte pro 100m</th></tr></thead>
          <tbody>
            <tr><td>B</td><td>75 mm</td><td>400l=0.5bar, 800l=1.2bar</td></tr>
            <tr><td>C42</td><td>42 mm</td><td>200l=0.8bar, 400l=2.1bar</td></tr>
          </tbody>
        </table>
      </main>
    </AuthGate>
  );
}
