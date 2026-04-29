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
