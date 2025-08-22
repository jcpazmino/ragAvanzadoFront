# Indicaciones para el desarrollo del Frontend de Login de Usuario

Este documento describe los puntos clave para integrar el frontend de login de usuario con el backend del módulo `users` de RAG Avanzado.

---

## 1. Endpoints principales

- **Registro de usuario:**
  - `POST /api/users/register`
  - Body: `{ nombre, email, password, rol }`
  - Respuesta: `{ usuario: { id, nombre, email, rol } }`

- **Login de usuario:**
  - `POST /api/users/login`
  - Body: `{ email, password }`
  - Respuesta: `{ token, usuario: { id, nombre, email, rol } }`

- **Acceso a perfil protegido:**
  - `GET /api/users/perfil`
  - Header: `Authorization: Bearer <jwt_token>`
  - Respuesta: `{ usuario: { ... } }`

- **Cambio de credenciales:**
  - `PUT /api/users/:id/credenciales`
  - Header: `Authorization: Bearer <jwt_token>`
  - Body: `{ nuevaPassword }`
  - Respuesta: `{ mensaje: "Credenciales actualizadas" }`

- **Asignación de rol:**
  - `PUT /api/users/:id/rol`
  - Header: `Authorization: Bearer <jwt_token>`
  - Body: `{ rol }`
  - Respuesta: `{ usuario: { id, rol } }`

---

## 2. Autenticación y manejo de sesión

- Al hacer login, guarda el `token` JWT en localStorage o sessionStorage.
- Incluye el token en el header `Authorization` para acceder a rutas protegidas.
- Valida el rol del usuario para mostrar/ocultar opciones en el frontend.
- Implementa logout eliminando el token del almacenamiento.

---

## 3. Manejo de errores

- Si el backend responde con `{ error: "Acceso denegado: rol insuficiente" }` o `{ error: "Token inválido" }`, muestra mensaje claro al usuario y redirige al login si es necesario.
- Valida los campos antes de enviar el formulario (email, password, etc.).
- Muestra mensajes de éxito o error según la respuesta del backend.

---

## 4. Seguridad

- No expongas el token JWT en la URL ni en el DOM.
- Usa HTTPS para todas las comunicaciones.
- Implementa protección contra XSS y CSRF en el frontend.

---

## 5. Pruebas recomendadas

- Simula flujos completos: registro, login, acceso protegido, cambio de credenciales, logout.
- Prueba casos de error: credenciales incorrectas, token vencido, rol insuficiente.
- Verifica que los datos sensibles no se expongan en el frontend.

---

## 6. Ejemplo de flujo básico

1. El usuario accede al formulario de login y envía email y password.
2. El frontend recibe el token y datos del usuario, los guarda y redirige al dashboard.
3. Para acceder a rutas protegidas, el frontend envía el token en el header.
4. Si el token es inválido o el rol no es suficiente, muestra mensaje y redirige al login.

---

## 7. Consideraciones adicionales

- Consulta el README del backend para detalles de estructura y pruebas.
- Si usas SSO/OAuth2, consulta los endpoints y flujos específicos.
- Mantén sincronizados los nombres de campos y rutas con el backend.

---

## 8. Ejemplo de request desde frontend (fetch)

```js
// Login
fetch('/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      // ...
    } else {
      alert(data.error);
    }
  });
```

---

## 9. Ejemplo de uso de token en request protegido

```js
const token = localStorage.getItem('token');
fetch('/api/users/perfil', {
  method: 'GET',
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(res => res.json())
  .then(data => {
    // ...
  });
```

---

## 10. Contacto y soporte

- Para dudas sobre la integración, consulta la documentación del backend o contacta al equipo de backend.
