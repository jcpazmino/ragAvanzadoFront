import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/login.vue';
import Dashboard from '../views/dashboard.vue';
import { useAuthStore } from '../store/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
  { path: '/login', name: 'login', component: LoginPage, meta: { public: true } },
  { path: '/', name: 'dashboard', component: Dashboard, meta: { roles: ['admin','editor','viewer'] } },
    // agrega aquí tus otras vistas (Users, Categories, Documents, etc.)
  ],
});

router.beforeEach((to, from) => {
  const store = useAuthStore();
  // Permitir acceso a rutas públicas
  if (to.meta.public) return true;

  // Si no está autenticado, redirigir a login (evitar bucle si ya está en login)
  if (!store.token) {
    if (to.name !== 'login') return { name: 'login' };
    return true;
  }

  // Si el rol no está permitido, redirigir al dashboard (evitar bucle)
  const allowed = (to.meta.roles as string[] | undefined) ?? [];
  if (allowed.length && !allowed.includes(store.role)) {
    if (to.name !== 'dashboard') return { name: 'dashboard' };
    return true;
  }

  return true;
});

export default router;
