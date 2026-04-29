import { supabase } from '@/lib/supabase';

export type AppRole = 'admin' | 'user';

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getMyRole(): Promise<AppRole | null> {
  const session = await getSession();
  const userId = session?.user.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) return null;
  return (data?.role as AppRole) ?? null;
export type AppRole = 'admin' | 'user';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
};

const KEY = 'fw_session_user';

export function readSession(): SessionUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function writeSession(user: SessionUser) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(KEY);
}
