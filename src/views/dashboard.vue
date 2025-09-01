<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { INACTIVITY_LIMIT } from '../config/appConfig';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import UsersTable from '../components/UsersTable.vue';
import DocumentsTable from '../components/documents/DocumentsTable.vue';
import DocumentForm from '../components/documents/form.vue';

const store = useAuthStore();
const router = useRouter();

onMounted(() => {
  const user = localStorage.getItem('user');
  if (!user) {
    router.push({ name: 'login' });
  }
});
function logout() {
  store.logout();
  router.push({ name: 'login' });
}

// --- Auto logout after 10 minutes of inactivity ---
let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    alert('Sesión cerrada por inactividad.');
    logout();
  }, INACTIVITY_LIMIT);
}

function setupInactivityListeners() {
  const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
  events.forEach(e => window.addEventListener(e, resetInactivityTimer));
  resetInactivityTimer();
}

function removeInactivityListeners() {
  const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
  events.forEach(e => window.removeEventListener(e, resetInactivityTimer));
  if (inactivityTimer) clearTimeout(inactivityTimer);
}

onMounted(setupInactivityListeners);
onUnmounted(removeInactivityListeners);

const showDocumentForm = ref(false);
const editDocumentData = ref<Partial<{ title: string; description: string; author: string; category: string; language: string; version: string; file: File | null; fileName?: string; }> | undefined>(undefined);
const activeSection = ref('users');

function handleAddDocument() {
  showDocumentForm.value = true;
  editDocumentData.value = undefined;
}

function handleEditDocument(data: any) {
  showDocumentForm.value = true;
  editDocumentData.value = data;
}
</script>

<template style="min-width: 90%;">
  <header>
    <nav>
      <div class="logo">RAGPersonal</div>
      <div class="user-info">
        <span v-if="store.user?.username">{{ store.user.username }}</span>
        <button @click="logout">Cerrar Sesión</button>
      </div>
    </nav>
  </header>
  <main>
    <h1>Bienvenido a RAGPersonal</h1>
    <div class="dashboard-container">
      <aside class="sidebar">
        <h2>Navegación</h2>
        <ul>
          <li><a href="#" :class="{active: activeSection==='users'}" @click.prevent="activeSection='users'">Users</a></li>
          <li><a href="#" :class="{active: activeSection==='categories'}" @click.prevent="activeSection='categories'">Categories</a></li>
          <li><a href="#" :class="{active: activeSection==='documents'}" @click.prevent="activeSection='documents'">Documents</a></li>
        </ul>
      </aside>
      <section class="main-content">
          <div >
            <UsersTable v-if="activeSection==='users'" />
            <template v-if="activeSection==='documents'">
              <DocumentForm v-if="showDocumentForm" :editData="editDocumentData" @cancel="showDocumentForm=false" />
              <DocumentsTable v-else @add-document="handleAddDocument" @edit-document="handleEditDocument" />
            </template>
          </div>
        <!-- Aquí podrías agregar el componente de categorías si lo necesitas -->
      </section>
    </div>
  </main>
</template>
