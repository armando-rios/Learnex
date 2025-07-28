# Learnex Monorepo

Este repositorio es un monorepo que contiene tanto la aplicación frontend como el backend de Learnex.

## Estructura del Proyecto

- `apps/backend`: Contiene el código del servidor backend.
- `apps/frontend`: Contiene el código de la aplicación frontend.

## Requisitos Previos

- Node.js v18 o superior
- pnpm como gestor de paquetes (instalación: `npm install -g pnpm`)
- Git

## Instalación de Dependencias

Primero, instala las dependencias en el nivel del monorepo ejecutando:

```bash
pnpm install
```

Esto configurará las dependencias para todos los paquetes y aplicaciones dentro del monorepo.

## Scripts Disponibles

### Ejecutar los Proyectos

Para iniciar tanto el frontend como el backend simultáneamente desde la raíz del proyecto:

```bash
pnpm dev
```

---

_Este proyecto es una reimplementación mejorada basada en una versión anterior desarrollada durante una hackathon bajo la organización [Alumnithon](https://github.com/alumnithon)._
