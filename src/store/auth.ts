import { defineStore } from 'pinia';
import { api } from '../services/api';

type User = { id: number; username: string; email: string; first_name?: string; last_name?: string };

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    role: localStorage.getItem('role') || 'user',
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
        // Imprime en consola la respuesta completa del backend
        console.log('Login response:', data);
        // se espera { token, usuario }
        this.token = data.token;
        this.user = data.usuario;
        this.role = data.usuario?.rol || 'user';

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
      this.token = null; this.user = null; this.role = 'user';
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
    },
  },
});
