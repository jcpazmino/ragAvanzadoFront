<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
const emit = defineEmits(['add-document', 'edit-document']);
import '../../styles/documents.css';

interface Document {
  id: number;
  title: string;
  fileName: string;
  description: string;
  source: string;
  language: string;
  uploadedBy: string | number;
  categoryId: string | number;
  metadata?: any;
  createdAt?: string;
}
const documents = ref<Document[]>([]);
const page = ref(1);
const limit = ref(10);
const totalPages = ref(1);
const totalCount = ref(0);
const loading = ref(false);
const error = ref('');

// Filtros
const filterTitle = ref('');
const filterCategory = ref('');

function fetchDocuments() {
  loading.value = true;
  error.value = '';
  const params = new URLSearchParams({
    page: page.value.toString(),
    limit: limit.value.toString(),
    title: filterTitle.value,
    category: filterCategory.value
  });
  const userRole = localStorage.getItem('role') || 'viewer';
  fetch(`http://localhost:3000/api/documents?${params.toString()}`, {
    method: 'GET',
    headers: {
      'X-User-Role': userRole
    }
  })
    .then(res => res.json())
    .then(data => {
      documents.value = data.documents || [];
      totalCount.value = data.count || 0;
      totalPages.value = Math.max(1, Math.ceil((data.count || 0) / limit.value));
      loading.value = false;
    })
    .catch(err => {
      error.value = 'Error al cargar documentos';
      loading.value = false;
    });
}

onMounted(fetchDocuments);
watch([page, limit, filterTitle, filterCategory], fetchDocuments);
</script>

<template>
  <section class="main-content">
    <h2>Gestión de Documentos Activos</h2>
    <button style="float:right; margin-bottom:10px; background:#22c55e; color:#fff; font-weight:600; border:none; border-radius:8px; padding:8px 24px; font-size:1rem; cursor:pointer;" @click="emit('add-document')">Adicionar Documento</button>
    <table class="users-table" style="width:100%; border-collapse:collapse; margin-top:12px; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <thead>
        <tr>
          <th>Title</th>
          <th>File Name</th>
          <th>Author</th>
          <th>Category</th>
          <th>Version</th>
          <th>Language</th>
          <th>Operaciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading"><td colspan="7">Cargando...</td></tr>
        <tr v-if="error"><td colspan="7" style="color:#d32f2f;">{{ error }}</td></tr>
        <tr v-for="doc in documents" :key="doc.id">
          <td>{{ doc.title }}</td>
          <td>{{ doc.fileName }}</td>
          <td>{{ doc.uploadedBy }}</td>
          <td>{{ doc.categoryId }}</td>
          <td>{{ doc.description }}</td>
          <td>{{ doc.language }}</td>
          <td>
            <a href="#" class="users-link" @click.prevent="emit('edit-document', doc)">Modificar</a>
            <a href="#" class="users-link">Embeddings</a>
            <a href="#" class="users-link">Eliminar</a>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="margin-top:18px; display:flex; justify-content:center; gap:8px;">
      <button :disabled="page===1" @click="page--" style="padding:6px 16px; border-radius:5px; border:none; background:#1976d2; color:#fff; font-weight:500; cursor:pointer;">Anterior</button>
      <span>Página {{ page }} de {{ totalPages }}</span>
      <button :disabled="page===totalPages" @click="page++" style="padding:6px 16px; border-radius:5px; border:none; background:#1976d2; color:#fff; font-weight:500; cursor:pointer;">Siguiente</button>
    </div>
  </section>
</template>