👨‍👩‍👧‍👦 Family Scheduler — Frontend (Angular)

Frontend del proyecto Family Scheduler, desarrollado con Angular.
La aplicación permite a las familias gestionar eventos, hijos y miembros, con sistema de registro y login, conectado a un backend en FastAPI.

📋 Requisitos

Antes de empezar, asegúrate de tener instalado:

Node.js (versión LTS recomendada) → https://nodejs.org/

Angular CLI (opcional pero recomendado)

Comprobar versiones:

node -v
npm -v

🚀 Instalación

Instala las dependencias:

npm install

▶️ Ejecutar en local
ng serve

Abrir en el navegador:
👉 http://localhost:4200

🔌 Conexión con el Backend

Este frontend consume una API REST construida con FastAPI.

Endpoints principales
Método Endpoint Descripción
POST /auth/register Registro de usuario
POST /auth/login Login de usuario
GET /families Familias del usuario logueado
GET /families/{id}/children Hijos de la familia
GET /families/{id}/events Eventos de la familia
Backend en local
http://localhost:8000

Backend en producción (Render)
https://family-scheduler-project-backend.onrender.com

⚠️ En el plan gratuito de Render el backend puede tardar unos segundos en “despertar”.

⚙️ Configuración de la URL del API

Se usan environment files para evitar URLs hardcodeadas.

Desarrollo

src/environments/environment.ts

export const environment = {
apiUrl: 'http://localhost:8000',
};

Producción

src/environments/environment.prod.ts

export const environment = {
apiUrl: 'https://family-scheduler-project-backend.onrender.com',
};

Uso en servicios:

this.http.post(`${environment.apiUrl}/auth/login`, payload);

🌍 Deploy en Netlify

El frontend está preparado para desplegarse como SPA en Netlify.

Build settings
Opción Valor
Build command npm run build
Publish directory dist/family-scheduler-front/browser
🔁 Redirects para SPA (IMPORTANTE)

Crear netlify.toml en la raíz:

[build]
command = "npm run build"
publish = "dist/family-scheduler-front/browser"

[[redirects]]
from = "/\*"
to = "/index.html"
status = 200

🧪 Funcionalidades actuales

Registro y login de usuarios

Dashboard familiar

Listado de miembros de la familia

Listado de hijos

Listado de eventos familiares

Diferenciación visual de eventos por tipo

👥 Usuarios de prueba

Puedes usar estas cuentas para probar la app:

Password para todos: Demo1234!

| Nombre        | Email                                     | ID  | Familia |
| ------------- | ----------------------------------------- | --- | ------- |
| Ana Rivera    | [ana@demo.com](mailto:ana@demo.com)       | 11  | Rivera  |
| Carlos Rivera | [carlos@demo.com](mailto:carlos@demo.com) | 12  | Rivera  |
| Mei Chen      | [mei@demo.com](mailto:mei@demo.com)       | 13  | Chen    |
| Liam Chen     | [liam@demo.com](mailto:liam@demo.com)     | 14  | Chen    |
| Sofía Novak   | [sofia@demo.com](mailto:sofia@demo.com)   | 15  | Novak   |
| Marko Novak   | [marko@demo.com](mailto:marko@demo.com)   | 16  | Novak   |
| Laura García  | [laura@demo.com](mailto:laura@demo.com)   | 17  | García  |
| Diego García  | [diego@demo.com](mailto:diego@demo.com)   | 18  | García  |
| Amina Okoye   | [amina@demo.com](mailto:amina@demo.com)   | 19  | Okoye   |
| Sam Okoye     | [sam@demo.com](mailto:sam@demo.com)       | 20  | Okoye   |

Cada usuario solo ve su propia familia, hijos y eventos asociados.

🛠️ Tecnologías utilizadas

Angular (Standalone Components)

Angular Signals

Reactive Forms

Bootstrap

Netlify (frontend hosting)

Render (backend hosting)

📌 Notas importantes

El backend debe permitir CORS desde la URL de Netlify

El frontend usa JWT para autenticación

Las imágenes de avatar se gestionan en el frontend, no en la base de datos

Los datos de ejemplo están cargados para mostrar la app en funcionamiento

🔗 Demo

Frontend (Netlify)
https://family-scheduler-front.netlify.app

Backend (Render)
https://family-scheduler-project-backend.onrender.com
