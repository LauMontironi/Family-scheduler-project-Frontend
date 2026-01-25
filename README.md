# 👨‍👩‍👧‍👦 Family Scheduler — Frontend (Angular)

Frontend del proyecto **Family Scheduler**, desarrollado con **Angular moderno (standalone components + signals)**.

La aplicación ofrece una **landing page** y formularios de **registro** y **login**, conectados a un backend desarrollado en **FastAPI**.

---

## 📋 Requisitos

Antes de empezar, asegúrate de tener instalado:

- Node.js (versión LTS recomendada): https://nodejs.org/
- Angular CLI (opcional, pero recomendable)

Comprueba las versiones instaladas:

```bash
node -v
npm -v
🚀 Instalación
Instala las dependencias del proyecto:

npm install
▶️ Ejecutar en local
Inicia el servidor de desarrollo:

ng serve
La aplicación estará disponible en:
http://localhost:4200

🔌 Conexión con el Backend
Este frontend consume un backend REST construido con FastAPI.

Endpoints principales
POST /auth/register

POST /auth/login

Backend en local
http://localhost:8000

Backend en producción (Render)
https://family-scheduler-project-backend.onrender.com

Nota:
Si el backend en Render devuelve errores 500, normalmente se debe a que la base de datos no está configurada en producción (siguiente fase del proyecto).

⚙️ Configuración de la URL del API
Para evitar URLs hardcodeadas, se usan environment files.

Desarrollo
Archivo: src/environments/environment.ts

export const environment = {
  apiUrl: 'http://localhost:8000',
};
Producción
Archivo: src/environments/environment.prod.ts

export const environment = {
  apiUrl: 'https://family-scheduler-project-backend.onrender.com',
};
Uso en el código
this.http.post(`${environment.apiUrl}/auth/register`, payload);
🌍 Deploy en Netlify
El frontend está preparado para desplegarse como SPA (Single Page Application) en Netlify.

Build settings
Build command:

npm run build
Publish directory:

dist/family-scheduler-front/browser
(La carpeta exacta depende del nombre del proyecto generado por Angular)

🔁 Redirects para SPA (IMPORTANTE)
Para evitar errores 404 al recargar rutas de Angular, se necesita un redirect.

Crea el archivo netlify.toml en la raíz del proyecto:

[build]
  command = "npm run build"
  publish = "dist/family-scheduler-front/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
🧪 Formularios
Registro (Register)
Campos:

full_name

email

password

Endpoint:
POST /auth/register

Login
Campos:

email

password

Endpoint:
POST /auth/login

La validación avanzada (emails reales, reglas de seguridad, etc.) se implementará en fases posteriores.

🛠️ Tecnologías utilizadas
Angular (standalone components)

Signals

Reactive Forms

Bootstrap (UI)

Netlify (deploy frontend)

📌 Notas importantes
En producción, el backend debe permitir CORS desde la URL de Netlify.

En el plan gratuito de Render, el backend puede tardar unos segundos en “despertar” tras un periodo de inactividad.

🔗 Demo

Frontend (Netlify): https://family-scheduler-front.netlify.app

Backend (Render): https://family-scheduler-project-backend.onrender.com


```
