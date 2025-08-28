<template>
  <div class="form-container">
    <h2 class="form-title">{{ isEdit ? 'Editar Documento' : 'Crear Nuevo Documento' }}</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Title:</label>
        <input id="title" v-model="form.title" type="text" required />
      </div>
      <div class="form-group">
  <label for="description">Description:</label>
  <textarea id="description" v-model="form.description" rows="4"></textarea>
      </div>
      <div class="form-group">
  <label for="author">Author:</label>
  <input id="author" v-model="form.author" type="text" />
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
          <select id="category" v-model="form.category" required>
            <option value="">Seleccione una categoría</option>
            <option v-for="cat in documentCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
      </div>
      <div class="form-group">
        <label for="language">Language:</label>
        <select id="language" v-model="form.language" required>
          <option v-for="lang in DOCUMENT_LANGUAGES" :key="lang.value" :value="lang.value">{{ lang.label }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="version">Versión:</label>
        <div style="display: flex; align-items: left;">
          <input id="versionPrimero" v-model="form.versionPrimero" type="number" min="1" step="1" required  style="width: 50px;"/> .
          <input id="versionSegundo" v-model="form.versionSegundo" type="number" min="0" step="1" required style="width: 50px;" />
        </div>      
      </div>
      <div class="form-group">
        <label for="file">File:</label>
        <template v-if="isEdit">
          <button type="button" class="btn-change">Cambiar Versión</button>
          <span style="display:block; margin-top:8px; color:#666;">Archivo actual: {{ form.fileName }}</span>
          <input id="file" ref="fileInputRef" type="file" style="display:none;" @change="onFileChange" accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/markdown,.md" />
        </template>
        <template v-else>
          <input id="file" type="file" @change="onFileChange" accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/markdown,.md" />
        </template>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-save">Guardar</button>
        <button type="button" class="btn-cancel" @click="onCancel">Cancelar</button>
      </div>
      <div v-if="error" class="form-error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
const documentCategories = ref<Array<{ id: number; slug: string; name: string; description: string; created_at: string }>>([]);

onMounted(() => {
  const userRole = localStorage.getItem('role') || 'viewer';
  let userId = '';
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    userId = user.id ? String(user.id) : '';
  } catch {}
  fetch('http://localhost:3000/api/categories', {
    method: 'GET',
    headers: {
      'X-User-Role': userRole,
      'X-User-Id': userId
    }
  })
    .then(res => res.json())
    .then(data => {
      documentCategories.value = data.categories || [];
    })
    .catch(err => {
      console.error('Error al consultar categorías:', err);
    });
});
import { ref, watch } from 'vue';
import { DOCUMENT_LANGUAGES } from '../../store/auth';

interface FormData {
  title: string;
  description: string;
  author: string;
  category: string;
  language: string;
  version: string;
  versionPrimero: number | null;
  versionSegundo: number | null;
  file: File | null;
  fileName?: string;
}
const fileInputRef = ref<HTMLInputElement | null>(null);
const props = defineProps<{ editData?: Partial<FormData> }>();
const isEdit = ref(false);
const form = ref<FormData>({
  title: '',
  description: '',
  author: '',
  category: '',
  language: 'es',
  version: '',
  versionPrimero: 1,
  versionSegundo: 0,
  file: null,
  fileName: ''
});

watch(() => props.editData, (val) => {
  if (val) {
    isEdit.value = true;
    form.value = {
      title: val.title || '',
      description: val.description || '',
      author: val.author || '',
      category: val.category || '',
      language: val.language || 'es',
      version: typeof val.version === 'string' ? val.version : '',
      versionPrimero: typeof (val as any).versionPrimero === 'number' ? (val as any).versionPrimero : 1,
      versionSegundo: typeof (val as any).versionSegundo === 'number' ? (val as any).versionSegundo : 0,
      file: null,
      fileName: val.fileName || ''
    };
  } else {
    isEdit.value = false;
    form.value = {
      title: '',
      description: '',
      author: '',
      category: '',
      language: 'es',
      version: '',
      versionPrimero: 1,
      versionSegundo: 0,
      file: null,
      fileName: ''
    };
  }
}, { immediate: true });
const error = ref('');
function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    form.value.file = target.files[0];
  }
}
function onSubmit() {
  // Validación y lógica de envío aquí
  error.value = '';
  if (
    form.value.versionPrimero === null || form.value.versionPrimero === undefined ||
    form.value.versionSegundo === null || form.value.versionSegundo === undefined
  ) {
    error.value = 'Debes completar ambos campos de versión.';
    return;
  }
  if (!form.value.title || !form.value.category || !form.value.language) {
    error.value = 'Todos los campos obligatorios deben estar completos.';
    return;
  }
  // Validar archivo obligatorio solo al crear (no editar)
  if (!isEdit.value && !form.value.file) {
    error.value = 'Debes seleccionar un archivo.';
    return;
  }
  form.value.version = `${form.value.versionPrimero}.${form.value.versionSegundo}`;
  // Simulación de envío
  // Obtener datos del formulario y usuario
  const userRole = localStorage.getItem('role') || 'viewer';
  let userId = '';
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    userId = user.id ? String(user.id) : '';
  } catch {}

  uploadDocument({
    title: form.value.title,
    description: form.value.description,
    author: userId,
    categoryId: form.value.category,
    language: form.value.language,
    version: form.value.version,
    file: form.value.file,
    userRole,
    userId
  })
    .then(doc => {
      // Documento creado exitosamente
      console.log('Documento creado:', doc);
      alert('Documento guardado!');
      emit('cancel'); // Regresa al listado de documentos
    })
    .catch(err => {
      // Mostrar error al usuario
      error.value = err.message;
      console.error(err.message);
    });
}

async function uploadDocument({
  title,
  description,
  author,         // normalmente el userId autenticado
  categoryId,     // debe ser el id de la categoría seleccionada
  language,
  version,
  file,           // archivo seleccionado (File object)
  userRole,       // rol del usuario (ej: 'admin', 'editor', 'viewer')
  userId          // id del usuario autenticado
}) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('uploadedBy', author);      // o 'author' si el backend lo espera así
  formData.append('categoryId', categoryId);
  formData.append('language', language);
  formData.append('version', version);
  formData.append('file', file);

  const response = await fetch('http://localhost:3000/api/documents/upload', {
    method: 'POST',
    headers: {
      'X-User-Role': userRole,
      'X-User-Id': userId
      // No incluyas 'Content-Type', fetch lo pone automáticamente para FormData
    },
    body: formData
  });

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error('Respuesta inesperada del servidor. No es JSON. Detalle: ' + text.slice(0, 100));
  }
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Error al subir documento');
  }
  return data.document; // o la respuesta que envíe el backend
}

const emit = defineEmits(['cancel']);
function onCancel() {
  // Limpiar el formulario
  form.value = {
    title: '',
    description: '',
    author: '',
    category: '',
    language: 'es',
    version: '',
    versionPrimero: null,
    versionSegundo: null,
    file: null
  };
  error.value = '';
  emit('cancel');
}
</script>

<style src="../../styles/forms.css"></style>
