# Project Structure and Conventions

This document describes the folder and file structure of the **SkillLink** project, as well as the main organizational and development conventions.

---

## Folder Structure

```
src/
├── app/                # App entrypoint, router, and main configuration
├── features/           # Main application features (auth, messaging, profiles, etc.)
│   ├── auth/
│   ├── messaging/
│   ├── opportunities/
│   └── profiles/
├── shared/             # Reusable and cross-cutting code (components, hooks, utils, store, lib)
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── store/
│   └── utils/
├── styles/             # Global style files (Tailwind, CSS)
└── vite-env.d.ts       # Vite types
```

---

## General Conventions

- **Atomic Design:** Components in `shared/components` should be as reusable and decoupled as possible.
- **Features:** Each feature has its own folder under `features/` and may have subfolders for `components`, `pages`, `hooks`, `services`, etc.
- **Pages:** Main pages are located in `shared/pages` or within each feature if they are feature-specific.
- **Global state:** Managed in `shared/store` using Zustand and React Query.
- **Styles:** Tailwind CSS is used for most styling. Global styles are in `src/styles/`.
- **Custom hooks:** Should go in `shared/hooks` if reusable, or in the relevant feature if specific.
- **Services/API:** API access services should be in `features/[feature]/services` or in `shared/lib` if general (like the Axios instance).
- **Environment variables:** Defined in `.env` (not versioned) and `.env.example` (template).

---

## Naming Conventions

- **Components:** PascalCase (`MyComponent.tsx`)
- **Hooks:** camelCase with `use` prefix (`useMyHook.ts`)
- **Service files:** camelCase (`apiService.ts`)
- **Style files:** kebab-case (`main-layout.css`)

---

## Example Feature Organization

```
features/
└── auth/
    ├── components/
    ├── hooks/
    ├── pages/
    ├── services/
    └── index.ts
```

---

## Best Practices

- Keep components and hooks as small and focused as possible.
- Prefer reuse and composition.
- Document hooks and services with clear comments.
- Use environment variables for any sensitive or environment-dependent configuration.
- If a file or folder grows too large, consider splitting it following the feature pattern.

