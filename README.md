👨‍👩‍👧‍👦 Family Scheduler — Frontend (Angular)

Frontend del proyecto Family Scheduler, una aplicación full-stack para la gestión de familias, miembros y eventos.
Este repositorio contiene la interfaz desarrollada en Angular, conectada a una API REST construida con FastAPI.

🎯 Objetivo del Frontend

Construir una SPA (Single Page Application) capaz de:

Gestionar autenticación de usuarios

Mostrar información contextual según la familia del usuario logueado

Consumir una API protegida mediante JWT

Mantener un estado reactivo y escalable

🏗️ Creación y Arquitectura del Proyecto

El proyecto fue creado con Angular y estructurado siguiendo una arquitectura modular y escalable.

Se implementó:

Componentes standalone para reducir acoplamiento y simplificar la estructura

Separación por features (auth, families, members, events)

Servicios dedicados para la comunicación con la API

Manejo de estado reactivo usando Angular Signals

⚙️ Tecnologías y Conceptos Aplicados
🧩 Framework

Angular

TypeScript

🔄 Estado y Reactividad

Angular Signals para manejo de estado local reactivo

Comunicación entre componentes con @Input() y @Output()

🧠 Control Flow Moderno

Uso del nuevo control flow introducido en Angular:

@if

@for

@switch

📝 Formularios

FormsModule

Validación de formularios en cliente

Two-way data binding

🌐 Comunicación con Backend

Angular HTTP Client

Consumo de API REST protegida con JWT

Interceptor para adjuntar automáticamente el token en cada request

🧭 Navegación

Angular Router

Rutas protegidas con guards de autenticación

🎨 UI

Bootstrap para maquetación y estilos

Componentes reutilizables para cards, formularios y listados

🔐 Autenticación

El frontend trabaja con autenticación basada en JWT:

El usuario hace login

El backend devuelve un token

El token se guarda en el cliente

Un interceptor lo adjunta a cada petición protegida

Esto permite que cada usuario solo pueda acceder a sus propias familias, miembros y eventos.

🌍 Entornos y Configuración

Se utilizaron archivos de entorno para evitar URLs hardcodeadas.

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

🚀 Deploy

El frontend está preparado como SPA para ser desplegado en Netlify.

Configuración necesaria:

Build command

npm run build

Publish directory

dist/family-scheduler-front/browser

Redirects (para evitar 404 en rutas internas)

netlify.toml

[build]
command = "npm run build"
publish = "dist/family-scheduler-front/browser"

[[redirects]]
from = "/\*"
to = "/index.html"
status = 200

🧪 Usuario de Demostración

Solo existe un usuario demo para pruebas:

Email: laura.lopez@demo.com

Password: Demo1234!

Este usuario tiene una familia precargada con miembros y eventos para mostrar la aplicación en funcionamiento.

🛠️ Stack Tecnológico
| Tecnología | Uso |
| --------------- | ------------------- |
| Angular | Framework principal |
| TypeScript | Tipado estático |
| Angular Signals | Estado reactivo |
| Angular Router | Navegación |
| HTTP Client | Consumo de API |
| Bootstrap | UI |
| Netlify | Hosting frontend |

✍️ Autora

Laura Montironi
Desarrolladora Full-Stack en formación, enfocada en crear aplicaciones web con arquitectura real, seguridad y buenas prácticas.
