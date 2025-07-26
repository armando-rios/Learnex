# Environment Variables and Configuration

This document describes the required and recommended environment variables for the correct operation of the **SkillLink** project. We use environment variables to separate sensitive or environment-specific configuration (development, production, etc.) from the source code.

---

## `.env` File

The `.env` file **MUST NOT be uploaded to the repository**. Instead, a `.env.example` file is provided as a reference. Each developer should create their own `.env` based on this example and adjust the values according to their local environment.

### Example `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
# VITE_PUBLIC_API_KEY=
# VITE_FRONTEND_URL=http://localhost:5173
# VITE_FEATURE_FLAG_EXAMPLE=true
```

---

## Main Variables

- **VITE_API_BASE_URL**
  Backend base URL (Java).
  Example: `http://localhost:8080/api`

- **VITE_PUBLIC_API_KEY**
  (Optional) Public key for third-party services (Google, Stripe, etc.).

- **VITE_FRONTEND_URL**
  (Optional) Frontend URL, useful for CORS, redirects, etc.

- **VITE_FEATURE_FLAG_EXAMPLE**
  (Optional) Example feature flag to enable/disable functionalities.

---

## Best Practices

- **Never upload your `.env` file** to the repository.
- **Update the `.env.example` file** if you add new variables.
- **Always use the `VITE_` prefix** so that variables are accessible in the frontend code with `import.meta.env`.

---

## Accessing Variables in Code

In the source code, access variables like this:

```ts
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## Additional Notes

- If you need to add new variables, document their purpose in this file and in `.env.example`.
- For production, configure environment variables in your deployment platform (Vercel, Netlify, Docker, etc.).
