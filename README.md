# Gestión de Documentos - Vue 3 + Vite

Este proyecto permite la gestión de documentos activos, incluyendo creación, edición, eliminación y visualización de embeddings.

## Características principales
- Listado de documentos con paginación y operaciones (modificar, embeddings, eliminar)
- Formulario para crear/editar documentos con validaciones
- Selección dinámica de categorías desde el backend
- Selección de idioma desde variable global
- Subida de archivos restringida a PDF, DOCX y Markdown (.md)
- Validación de campos obligatorios y tipo de archivo
- Envío de datos al backend usando FormData y headers personalizados
- Retorno automático al listado tras guardar exitosamente

## Requisitos de archivos
Solo se permiten archivos PDF, DOCX y Markdown (.md) al subir documentos.

## Integración con backend
- El formulario consulta las categorías desde `/api/categories`.
- Los documentos se suben a `/api/documents/upload` usando FormData.
- Se envían los headers `X-User-Role` y `X-User-Id` para autenticación.
- El backend debe responder siempre en formato JSON.

## Instalación y ejecución

```bash
npm install
```

## Notas adicionales
- Si el backend responde con error o formato no válido, se muestra un mensaje claro en el formulario.
- Al guardar un documento exitosamente, se regresa automáticamente al listado.


## Iniciar la app
```bash
npm run dev
```