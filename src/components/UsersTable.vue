<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const users = ref<User[]>([]);
const page = ref(1);
const limit = ref(10);
const totalPages = ref(1);
const totalCount = ref(0);
const loading = ref(false);
const error = ref('');

function fetchUsers() {
  loading.value = true;
  error.value = '';
  // Simulación de API, reemplaza por tu fetch real
  setTimeout(() => {
    // Simula 5 usuarios y 1 página
    users.value = [
      { id: 1, username: 'root_user', email: 'root@example.com', firstName: 'Super', lastName: 'Usuario', role: 'root' },
      { id: 2, username: 'admin_user', email: 'admin@example.com', firstName: 'Ana', lastName: 'Gómez', role: 'admin' },
      { id: 3, username: 'regular_user', email: 'user@example.com', firstName: 'Luis', lastName: 'Martínez', role: 'user' },
      { id: 4, username: 'editor_user', email: 'editor@example.com', firstName: 'Editor', lastName: 'Editor', role: 'editor' },
      { id: 5, username: 'usuario prueba', email: 'usuarioPrueba@example.com', firstName: 'usuario', lastName: 'prueba', role: 'user' }
    ];
    totalCount.value = users.value.length;
    totalPages.value = 1;
    loading.value = false;
  }, 500);
}

onMounted(fetchUsers);
watch([page, limit], fetchUsers);
// Este componente muestra la tabla de usuarios activos y el botón para adicionar usuario
</script>

<template>
  <section class="main-content">
    <h2>Gestión de Usuarios Activos</h2>
    <div class="header-flex">
      <h2 style="margin:0;">Gestión de Usuarios Activos</h2>
      <button class="add-doc-btn">Adicionar Usuario</button>
    </div>
  <table class="users-table doc-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Role</th>
          <th>Operaciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>root_user</td>
          <td>root@example.com</td>
          <td>Super</td>
          <td>Usuario</td>
          <td>root</td>
          <td><a href="#" class="users-link">Modificar</a> <a href="#" class="users-link">Eliminar</a></td>
        </tr>
        <tr>
          <td>admin_user</td>
          <td>admin@example.com</td>
          <td>Ana</td>
          <td>Gómez</td>
          <td>admin</td>
          <td><a href="#" class="users-link">Modificar</a> <a href="#" class="users-link">Eliminar</a></td>
        </tr>
        <tr>
          <td>regular_user</td>
          <td>user@example.com</td>
          <td>Luis</td>
          <td>Martínez</td>
          <td>user</td>
          <td><a href="#" class="users-link">Modificar</a> <a href="#" class="users-link">Eliminar</a></td>
        </tr>
        <tr>
          <td>editor_user</td>
          <td>editor@example.com</td>
          <td>Editor</td>
          <td>Editor</td>
          <td>editor</td>
          <td><a href="#" class="users-link">Modificar</a> <a href="#" class="users-link">Eliminar</a></td>
        </tr>
        <tr>
          <td>usuario prueba</td>
          <td>usuarioPrueba@example.com</td>
          <td>usuario</td>
          <td>prueba</td>
          <td>user</td>
          <td><a href="#" class="users-link">Modificar</a> <a href="#" class="users-link">Eliminar</a></td>
        </tr>
      </tbody>
    </table>
    <div v-if="totalPages > 1" class="pagination-container">
      <button :disabled="page===1" @click="page--" class="doc-link" style="background:none;">Anterior</button>
      <span>Página {{ page }} de {{ totalPages }}</span>
      <button :disabled="page===totalPages" @click="page++" class="doc-link" style="background:none;">Siguiente</button>
    </div>
    <div class="msg-container">
      <div v-if="loading" class="msg-loading">Cargando usuarios...</div>
      <div v-if="error" class="msg-error">{{ error }}</div>
    </div>
  </section>
</template>
