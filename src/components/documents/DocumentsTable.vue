<script setup lang="ts">
import { ref, onMounted, watch, version } from 'vue';
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
  categoryName: string;
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
  let userId = '';
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    userId = user.id ? String(user.id) : '';
  } catch {}
  fetch(`http://localhost:3000/api/documents?${params.toString()}`, {
    method: 'GET',
    headers: {
      'X-User-Role': userRole,
      'X-User-Id': userId
    }
  })
    .then(res => res.json())
    .then(data => {
      documents.value = (data.documents || []).map(doc => ({
        id: doc.id,
        title: doc.title,
        fileName: doc.file_name,
        description: doc.description,
        source: doc.source,
        language: doc.language,
        uploadedBy: doc.uploaded_by,
        categoryId: doc.category_id,
        categoryName: doc.category_name,
        metadata: doc.metadata,
        createdAt: doc.created_at,
        author: doc.author || '',
        version: doc.version || '1.0'
      }));
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
  <div class="header-flex">
  <h2 style="margin:0;">Gestión de Documentos Activos</h2>
    <button class="add-doc-btn" @click="emit('add-document')">Adicionar Documento</button>
    </div>
  <table class="users-table doc-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>File Name</th>
          <th>Category</th>
          <th>Description</th>
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
          <td>{{ doc.categoryName }}</td>
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
    <div v-if="totalPages > 1" class="pagination-container">
      <button :disabled="page===1" @click="page--" class="doc-link" style="background:none;">Anterior</button>
      <span>Página {{ page }} de {{ totalPages }}</span>
      <button :disabled="page===totalPages" @click="page++" class="doc-link" style="background:none;">Siguiente</button>
    </div>
    <div class="msg-container">
      <div v-if="loading" class="msg-loading">Cargando documentos...</div>
      <div v-if="error" class="msg-error">{{ error }}</div>
    </div>
  </section>
</template>

<style>
.header-flex {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
}
</style>