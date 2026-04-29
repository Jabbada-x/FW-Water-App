'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { readSession, SessionUser } from '@/lib/auth';

export default function AuthGate({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const session = readSession();
    if (!session) {
      router.replace('/login');
      return;
    }
    if (adminOnly && session.role !== 'admin') {
      router.replace('/');
      return;
    }
    setUser(session);
  }, [adminOnly, router]);

  if (!user) return <main style={{ padding: 16 }}>Lade Anmeldung…</main>;
  return <>{children}</>;
}
