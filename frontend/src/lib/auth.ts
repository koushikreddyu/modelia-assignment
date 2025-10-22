export type User = { id: string; email: string; name?: string | null };
export type AuthResponse = { user: User; accessToken: string };

const TOKEN_KEY = 'modelia_jwt';

export function saveToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}
