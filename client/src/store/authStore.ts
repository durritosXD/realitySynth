import { create } from 'zustand';

type User = { id: string; email: string; name: string };
type AuthState = {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
};

const api = async (path: string, body: object) => {
  const response = await fetch(`/api/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error((await response.json()).error ?? 'Authentication failed');
  return response.json();
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('rs_token'),
  user: localStorage.getItem('rs_user') ? JSON.parse(localStorage.getItem('rs_user')!) : null,
  login: async (email, password) => {
    const data = await api('login', { email, password });
    localStorage.setItem('rs_token', data.token);
    localStorage.setItem('rs_user', JSON.stringify(data.user));
    set({ token: data.token, user: data.user });
  },
  register: async (email, password, name) => {
    const data = await api('register', { email, password, name });
    localStorage.setItem('rs_token', data.token);
    localStorage.setItem('rs_user', JSON.stringify(data.user));
    set({ token: data.token, user: data.user });
  },
  logout: () => {
    localStorage.removeItem('rs_token');
    localStorage.removeItem('rs_user');
    set({ token: null, user: null });
  }
}));
