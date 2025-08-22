<script setup lang="ts">
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
const store = useAuthStore();
const router = useRouter();
function logout() {
  store.logout();
  router.push({ name: 'login' });
}
</script>

<template>
  <div class="dashboard-bg">
    <header class="dashboard-header">
      <h2 class="dashboard-title">RAGPersonal</h2>
      <div class="dashboard-user">
        <span v-if="store.user?.username" class="dashboard-username">{{ store.user.username }}</span>
        <button class="dashboard-btn-logout" @click="logout">Cerrar Sesión</button>
      </div>
    </header>

    <div class="dashboard-content">
      <aside class="dashboard-sidebar">
        <nav>
          <h4 class="sidebar-title">Navegación</h4>
          <ul class="sidebar-list">
            <li><a href="#" class="sidebar-link active">Users</a></li>
            <li><a href="#" class="sidebar-link">Categories</a></li>
            <li><a href="#" class="sidebar-link">Documents</a></li>
          </ul>
        </nav>
      </aside>
      <main class="dashboard-panel">
        <h3 class="dashboard-welcome">Bienvenido a RAGPersonal</h3>
        <hr class="dashboard-sep" />
        <section class="dashboard-users">
          <div class="users-header">
            <h4 class="users-title">Gestión de Usuarios Activos</h4>
            <button class="users-btn-add">Adicionar Usuario</button>
          </div>
          <table class="users-table">
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
          <div class="users-error"> </div>
        </section>
      </main>
    </div>
  </div>
</template>
