# Diagrama de Secuencia: Flujo de Inserción de Datos RAG (seed)

Este documento describe el proceso de llenado de tablas para un sistema RAG (Retrieval-Augmented Generation) utilizando datos de ejemplo (seeder). El proceso está representado como un diagrama de secuencia entre los distintos actores y tablas involucradas.

## Actores Principales

- **Seeder**: script o componente responsable de poblar la base de datos.
- **PostgreSQL**: base de datos donde se insertan los datos.
- **Tablas involucradas**:
  - `users`
  - `document_categories`
  - `documents`
  - `embedding_models`
  - `document_versions`
  - `document_chunks`
  - `chunk_embeddings`
  - `rol_categories`

---

## Flujo de Inserción Mejorado

### 1. Usuarios
- Se inserta un usuario "admin" y otros usuarios en la tabla `users` si no existen (`ON CONFLICT DO NOTHING`).

### 2. Roles y Permisos por Categoría
- Se insertan roles y se asocian a categorías en la tabla `rol_categories` para definir permisos de acceso.
- Se vinculan usuarios y/o roles a categorías específicas según la política de acceso.

### 3. Categorías
- Se insertan categorías como `manual`, `guía`, etc. con `ON CONFLICT DO NOTHING`.
- Si se usa jerarquía, se insertan categorías padre-hijo usando el campo `parent_id` en `document_categories`.

### 4. Documentos
- Por cada título/documento, se consulta el `user_id` y `category_id` correspondiente.
- Se insertan los documentos con campos como `title`, `slug`, `category_id`, `uploaded_by`.

### 5. Versiones de Documentos
- Se registra una versión (`v1`, `v2`, etc.) por cada documento y se asocia con un modelo de embedding.
- Se obtiene el `model_id` del embedding correspondiente.

### 6. Chunks de Documentos
- Por cada documento, se divide en chunks usando la tabla `document_chunks` con campos como `text`, `tokens`, `language`, `version_id`.
- Se insertan filas con cada chunk generado.

### 7. Embeddings de Chunks
- Se genera un vector demo para cada chunk y se guarda en la tabla `chunk_embeddings`.
- Se asegura la unicidad de la combinación `(chunk_id, model_id)`.

---

## Consideraciones Técnicas

- Uso de `ON CONFLICT DO NOTHING` para evitar duplicados.
- Uso de `UNION ALL` para insertar múltiples registros de una sola vez.
- Las inserciones dependen del orden lógico de relaciones entre tablas.
- Se recomienda poblar primero las tablas base (`users`, `document_categories`, `embedding_models`), luego las dependientes (`documents`, `rol_categories`), y finalmente las de detalle (`document_versions`, `document_chunks`, `chunk_embeddings`).

---

## Resultado
- El proceso deja completamente pobladas las tablas necesarias para que el sistema RAG funcione con datos iniciales, incluyendo usuarios, roles, permisos por categoría, documentos, versiones, chunks y embeddings.
