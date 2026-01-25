# Family Scheduler — Frontend (Angular)

Frontend del proyecto **Family Scheduler**, construido con **Angular (standalone + signals)**.
Incluye landing page y formularios de **registro** y **login** conectados a un backend FastAPI.

---

## ✅ Requisitos

- Node.js (LTS recomendado)
- Angular CLI (opcional, pero útil)

Comprueba versiones:

```bash
node -v
npm -v
🚀 Instalación
npm install
▶️ Ejecutar en local
ng serve
Abre:

http://localhost:4200

🔌 Conexión con el Backend
Este frontend consume endpoints del backend FastAPI como:

POST /auth/register

POST /auth/login

Backend local
Por defecto (si lo tienes corriendo en tu PC):

http://localhost:8000

Backend en producción (Render)
Ejemplo:

https://family-scheduler-project-backend.onrender.com

Importante: si el backend en Render devuelve errores 500, normalmente es por configuración de base de datos en producción.

⚙️ Configuración de API URL (recomendado)
Para no hardcodear URLs, usa environment.

📁 src/environments/environment.ts

export const environment = {
  apiUrl: 'http://localhost:8000',
};
📁 src/environments/environment.prod.ts

export const environment = {
  apiUrl: 'https://family-scheduler-project-backend.onrender.com',
};
Y en tu código:

this.http.post(`${environment.apiUrl}/auth/register`, payload)
🌍 Deploy en Netlify
Build settings (Netlify)
Build command

ng build
Publish directory
Normalmente será una de estas:

dist/<nombre-proyecto>/browser

dist/<nombre-proyecto>

Si no estás segura, después de ng build mira la carpeta dist/.

🔁 Netlify SPA Redirect (IMPORTANTE)
Si usas rutas de Angular (routerLink), necesitas un redirect para que Netlify no rompa al recargar.

Crea el archivo:

📁 src/_redirects

/*    /index.html   200
Asegúrate de que ese archivo se copie al build (si no lo hace, lo movemos a public/ o ajustamos configuración según tu setup).

🧪 Formularios
Register
Campos:

full_name

email

password

Envía POST a:

/auth/register

Login
Campos:

email

password

Envía POST a:

/auth/login

La validación completa (email real, reglas de password, etc.) se implementará más adelante.

🛠️ Tech Stack
Angular (standalone components)

Signals

Reactive Forms

Bootstrap (UI)

📌 Notas
En producción, el backend debe permitir CORS desde la URL de Netlify.

En plan free de Render, el backend puede tardar en "despertar" la primera vez.

📷 Demo
Frontend (Netlify): https://family-scheduler-front.netlify.app/

Backend (Render): https://family-scheduler-project-backend.onrender.com
```
