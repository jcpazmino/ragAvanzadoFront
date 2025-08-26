<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import '../styles/login.css';

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

<div class="login-container">
  <div class="login-box">
    <h1>RAGPersonal</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button :disabled="store.loading">
        <span v-if="!store.loading">Iniciar Sesión</span>
        <span v-else>Validando…</span>
      </button>
      <div class="error-message">{{ store.error }}</div>
    </form>
  </div>
</div>
</template>
