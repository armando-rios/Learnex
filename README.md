# Learnex Monorepo

> **🚀 Proyecto en Reimplementación**: Este proyecto está siendo completamente reimplementado. La versión anterior fue desarrollada con Java (Spring Boot) durante una hackathon bajo la organización [Alumnithon](https://github.com/alumnithon). Esta nueva versión utiliza un **stack moderno full TypeScript** para mejorar el mantenimiento, la escalabilidad y la experiencia de desarrollo.

## 📋 Sobre el Proyecto

Learnex (anteriormente SkillLink) es una plataforma para conectar mentores y estudiantes, colaborar en proyectos y potenciar el crecimiento de habilidades dentro de una comunidad de aprendizaje.

Este repositorio es un monorepo que contiene tanto la aplicación frontend como el backend de Learnex.

## 🛠️ Stack Tecnológico

### Backend

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **MongoDB** + **Mongoose** - Base de datos y ODM
- **JWT** - Autenticación
- **Swagger** - Documentación de API
- **bcrypt** - Encriptación de contraseñas

### Frontend

- **React 19** + **TypeScript**
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos utility-first
- **Zustand** - Gestión de estado global
- **React Query** - Gestión de datos remotos y caché
- **React Hook Form** + **Zod** - Formularios y validación
- **Axios** - Consumo de API
- **React Router** - Enrutamiento
- **Lucide React** - Iconos SVG

### DevOps & Herramientas

- **Turborepo** - Gestión de monorepo
- **pnpm** - Gestor de paquetes
- **ESLint** + **Prettier** - Linting y formateo

## 📁 Estructura del Proyecto

```
learnex/
├── apps/
│   ├── backend/          # API REST con Express + TypeScript
│   │   └── src/
│   │       ├── features/ # Módulos por funcionalidad (auth, profiles, etc.)
│   │       └── shared/   # Código compartido (config, middleware, models)
│   └── frontend/         # Aplicación React + TypeScript
│       └── src/
│           ├── app/      # Configuración principal y router
│           ├── features/ # Funcionalidades por módulo
│           └── shared/   # Componentes, hooks y utilidades compartidas
├── turbo.json            # Configuración de Turborepo
└── pnpm-workspace.yaml   # Configuración del workspace
```

## 🚀 Requisitos Previos

- **Node.js** v18 o superior
- **pnpm** como gestor de paquetes
  ```bash
  npm install -g pnpm
  ```
- **MongoDB** (local o remoto)
- **Git**

## ⚙️ Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone <repository-url>
   cd learnex
   ```

2. **Instalar dependencias:**

   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno:**

   **Backend** (`apps/backend/.env`):

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

   **Frontend** (`apps/frontend/.env`):

   ```env
   VITE_API_URL=http://localhost:3000
   ```

## 🏃 Ejecución

### Desarrollo

Para iniciar tanto el frontend como el backend simultáneamente:

```bash
pnpm dev
```

Esto iniciará:

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:3000/api-docs

### Scripts Individuales

```bash
# Solo backend
pnpm --filter backend dev

# Solo frontend
pnpm --filter frontend dev

# Type checking en todo el monorepo
pnpm typecheck

# Linting
pnpm lint
```
