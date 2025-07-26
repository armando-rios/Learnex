# SkillLink

SkillLink is a platform to connect mentors and learners, collaborate on projects, and boost skill growth within a community.

---

## 🚀 Overview

This repository contains the frontend for SkillLink, developed with **React**, **TypeScript**, and **Vite**. The project uses a modular feature-based architecture, global state management with Zustand and React Query, styling with Tailwind CSS, and API consumption via Axios.

---

## 📦 Quick Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/skilllink.git
   cd skilllink
   ```

2. **Install dependencies:**

   ```sh
   bun install
   ```

3. **Set up environment variables:**

   - Copy the `.env.example` file to `.env` and adjust the values for your environment.
   - Example:
     ```
     cp .env.example .env
     ```

4. **Start the development server:**
   ```sh
   bun run dev
   ```

---

## 🗂️ Project Structure

See the [structure and conventions documentation](docs/estructura.md) for more details.

```
src/
├── app/                # Entrypoint, router, and main configuration
├── features/           # Main features (auth, messaging, profiles, etc.)
├── shared/             # Reusable components, hooks, utils, stores, and libraries
├── styles/             # Global styles (Tailwind, CSS)
└── vite-env.d.ts       # Vite types
```

---

## ⚙️ Configuration and Environment Variables

Environment variables are defined in `.env` (not versioned). See [docs/ambientes.md](docs/ambientes.md) for more information and best practices.

---

## 🛠️ Main Tools

- **React + TypeScript + Vite**: frontend foundation.
- **Tailwind CSS**: utility-first styling.
- **Zustand**: global state management.
- **React Query**: remote data and cache management.
- **Axios**: API consumption.
- **Lucide React**: SVG icons.
- **React Hook Form + Zod**: forms and validation.

---

## 📚 Additional Documentation

- [Structure and conventions](docs/estructura.md)
- [Environment variables and configuration](docs/ambientes.md)
- [State management (Zustand, React Query)](docs/estado.md)
- [Styling and Tailwind CSS](docs/estilos.md)
- [API consumption and Axios](docs/api.md)

---

## 📝 Notes

- Keep your `.env` file out of version control.
- If you have questions or suggestions, check the relevant documentation or contact the team.

