'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const login = async () => {
    try {
      setErrorMsg('');
      await signIn(email, password);
      router.push('/');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Anmeldung fehlgeschlagen');
    }
import { writeSession } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('einsatz@feuerwehr.local');
  const [role, setRole] = useState<'user' | 'admin'>('user');

  const login = () => {
    writeSession({ id: crypto.randomUUID(), name: role === 'admin' ? 'Admin' : 'Einsatzkraft', email, role });
    router.push(role === 'admin' ? '/admin' : '/');
  };

  return (
    <main style={{ maxWidth: 420, margin: '48px auto', background: '#fff', padding: 16, borderRadius: 12 }}>
      <h1>Anmeldung</h1>
      <p>Login mit Supabase Auth.</p>
      <label>E-Mail</label>
      <input style={{ width: '100%', marginBottom: 8 }} value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Passwort</label>
      <input type='password' style={{ width: '100%', marginBottom: 12 }} value={password} onChange={(e) => setPassword(e.target.value)} />
      {errorMsg ? <p style={{ color: '#b91c1c' }}>{errorMsg}</p> : null}
      <p>Demo-Login mit Rollen (lokal). In Produktion über Supabase Auth ersetzen.</p>
      <label>E-Mail</label>
      <input style={{ width: '100%', marginBottom: 8 }} value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Rolle</label>
      <select style={{ width: '100%', marginBottom: 12 }} value={role} onChange={(e) => setRole(e.target.value as 'user'|'admin')}>
        <option value='user'>Einsatzkraft</option>
        <option value='admin'>Admin</option>
      </select>
      <button className='big-btn' onClick={login} style={{ width: '100%' }}>Einloggen</button>
    </main>
  );
}
