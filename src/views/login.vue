<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const email = ref('');
const password = ref('');
const store = useAuthStore();
const router = useRouter();

async function onSubmit() {
  try {
    await store.login(email.value, password.value);
    router.push({ name: 'dashboard' });
  } catch (e) {
    // el error ya queda en store.error
  }
}
</script>

<template>




  <div class="login-bg">
    <div class="login-card">
      <h1 class="login-title">RAGPersonal</h1>

      <form class="login-form" @submit.prevent="onSubmit">
        <div>
          <label class="login-label">Email:</label>
          <input v-model="email" type="email" class="login-input" autocomplete="email" required />
        </div>

        <div>
          <label class="login-label">Contraseña:</label>
          <input v-model="password" type="password" class="login-input" autocomplete="current-password" required />
        </div>

        <button class="login-btn" :disabled="store.loading">
          <span v-if="!store.loading">Iniciar Sesión</span>
          <span v-else>Validando…</span>
        </button>

        <p v-if="store.error" class="login-error">{{ store.error }}</p>
      </form>
    </div>
  </div>
</template>
