import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/login.vue';
import Dashboard from '../views/dashboard.vue';
import { useAuthStore } from '../store/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginPage, meta: { public: true } },
    { path: '/', name: 'dashboard', component: Dashboard, meta: { roles: ['admin','editor','user'] } },
    // agrega aquí tus otras vistas (Users, Categories, Documents, etc.)
  ],
});

router.beforeEach((to) => {
  const store = useAuthStore();
  if (to.meta.public) return true;
  if (!store.isAuth) return { name: 'login' };
  const allowed = (to.meta.roles as string[] | undefined) ?? [];
  if (allowed.length && !allowed.includes(store.role)) return { name: 'dashboard' };
  return true;
});

export default router;
