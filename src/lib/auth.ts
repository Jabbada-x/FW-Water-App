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
