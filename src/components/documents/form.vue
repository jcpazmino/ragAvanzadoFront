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
        <textarea id="description" v-model="form.description" rows="4" required></textarea>
      </div>
      <div class="form-group">
        <label for="author">Author:</label>
        <input id="author" v-model="form.author" type="text" required />
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
        <select id="category" v-model="form.category" required>
          <option value="">Seleccione una categoría</option>
          <option value="cat1">Categoría 1</option>
          <option value="cat2">Categoría 2</option>
        </select>
      </div>
      <div class="form-group">
        <label for="language">Language:</label>
        <select id="language" v-model="form.language" required>
          <option value="es">Español</option>
          <option value="en">Inglés</option>
        </select>
      </div>
      <div class="form-group">
        <label for="version">Version:</label>
        <input id="version" v-model="form.version" type="text" required />
      </div>
      <div class="form-group">
        <label for="file">File:</label>
        <template v-if="isEdit">
          <button type="button" class="btn-change">Cambiar Versión</button>
          <span style="display:block; margin-top:8px; color:#666;">Archivo actual: {{ form.fileName }}</span>
          <input id="file" ref="fileInputRef" type="file" style="display:none;" @change="onFileChange" />
        </template>
        <template v-else>
          <input id="file" type="file" @change="onFileChange" />
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
import { ref, watch } from 'vue';
interface FormData {
  title: string;
  description: string;
  author: string;
  category: string;
  language: string;
  version: string;
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
      version: val.version || '',
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
  if (!form.value.title || !form.value.description || !form.value.author || !form.value.category || !form.value.language || !form.value.version) {
    error.value = 'Todos los campos son obligatorios.';
    return;
  }
  // Simulación de envío
  alert('Documento guardado!');
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
    file: null
  };
  error.value = '';
  emit('cancel');
}
</script>

<style src="../../styles/forms.css"></style>
