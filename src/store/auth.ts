// Lenguajes disponibles para documentos
export const DOCUMENT_LANGUAGES = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'Inglés' },
  { value: 'pt', label: 'Portugués' }
];

import { defineStore } from 'pinia';
import { api } from '../services/api';

type User = { id: number; username: string; email: string; first_name?: string; last_name?: string };

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    role: localStorage.getItem('role') || 'viewer',
        user: (() => {
          const raw = localStorage.getItem('user');
          if (!raw || raw === 'undefined') return null;
          try {
            return JSON.parse(raw);
          } catch {
            return null;
          }
        })() as User | null,
    loading: false,
    error: '' as string | null,
  }),
  getters: {
    isAuth: (s) => !!s.token,
  },
  actions: {
    async login(email: string, password: string) {
      this.loading = true; this.error = null;
      try {
        const { data } = await api.post('/api/users/login', { email, password });
  // se espera { token, usuario }
        this.token = data.token;
        this.user = data.usuario;
        this.role = data.usuario?.rol || 'viewer';

        localStorage.setItem('token', this.token!);
        localStorage.setItem('role', this.role);
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (e: any) {
        this.error = e?.response?.data?.message || 'Credenciales inválidas';
        throw e;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = null; this.user = null; this.role = 'viewer';
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
    },
  },
});
