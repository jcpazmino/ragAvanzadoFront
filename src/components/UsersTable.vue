<script setup lang="ts">
// Este componente muestra la tabla de usuarios activos y el botón para adicionar usuario
</script>

<template>
  <section class="main-content">
    <h2>Gestión de Usuarios Activos</h2>
    <button style="float:right; margin-bottom:10px; background:#22c55e; color:#fff; font-weight:600; border:none; border-radius:8px; padding:8px 24px; font-size:1rem; cursor:pointer;">Adicionar Usuario</button>
    <table class="users-table" style="width:100%; border-collapse:collapse; margin-top:12px; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
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
  </section>
</template>
