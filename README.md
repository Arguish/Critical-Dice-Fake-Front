# Critical Dice API - Postman Clone

Un cliente web interactivo para probar la API de Critical Dice, construido con React y Tailwind CSS.

## Características

- � **Modo Oscuro** con esquema de colores violeta
- 🎨 Interfaz similar a Postman con dos columnas
- 🚀 Prueba todos los endpoints de la API
- ✏️ **Body editable** para peticiones POST/PATCH/PUT
- 🔑 Gestión automática de tokens de autenticación
- 📊 Visualización de respuestas JSON
- ⚡ Información de tiempo y tamaño de respuesta
- 🎯 Variables de entorno (base_url, api_token)

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## Instalación

1. Instala las dependencias:

```bash
npm install
```

## Uso

1. Inicia el servidor de desarrollo:

```bash
npm run dev
```

2. Abre tu navegador en `http://localhost:5173`

3. Configura la Base URL en el header (por defecto: `http://localhost:8000/api/v1`)

4. Haz clic en cualquier petición del sidebar para probarla

## Flujo de Trabajo Recomendado

1. **Login**: Primero ejecuta "Auth > Login (Get Token)" para obtener el token de autenticación
2. El token se guardará automáticamente en las variables
3. **Editar Body**: Si la petición tiene un body, puedes editarlo en el panel superior antes de enviar
4. **Enviar**: Haz clic en el botón "Enviar" para ejecutar la petición
5. La respuesta aparecerá en el panel inferior con toda la información (status, tiempo, headers, datos)

## Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx          # Cabecera con input de base URL
│   ├── Sidebar.jsx         # Lista de peticiones por carpetas
│   ├── RequestPanel.jsx    # Panel de edición de petición (body, headers)
│   ├── ResponsePanel.jsx   # Panel de visualización de respuestas
│   └── Variables.jsx       # Muestra las variables (solo lectura)
├── data/
│   └── collection.js       # Datos de la colección de Postman
├── App.jsx                 # Componente principal
├── main.jsx               # Punto de entrada
└── index.css              # Estilos globales con Tailwind
```

## Endpoints Disponibles

### Authentication
- Login (Get Token)
- Logout (Revoke Token)

### Characters CRUD
- List All Characters
- Create Character
- Get Single Character
- Update Character
- Delete Character

### Users CRUD
- List All Users
- Create User
- Get Single User
- Update User
- Delete User

### Error Cases
- Missing Required Fields
- Invalid Attributes Range
- Invalid System
- Without Authentication
- Non-existent Character

## Tecnologías

- React 18
- Vite
- Tailwind CSS
- Axios

## Build para Producción

```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `dist/`.

## Preview del Build

```bash
npm run preview
```

## Notas

- Las variables como `api_token` son de solo lectura y se actualizan automáticamente
- El token se guarda automáticamente cuando haces login
- Las respuestas JSON se formatean automáticamente para mejor legibilidad
- Los errores de red se muestran claramente en el panel de respuesta
