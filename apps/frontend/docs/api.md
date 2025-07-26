# API Consumption and Axios Usage

This guide describes how to consume the backend API from the SkillLink frontend using Axios, along with best practices for managing HTTP requests.

---

## 📦 Axios Configuration

The centralized Axios instance is located at:

```
src/shared/lib/axios.ts
```

This instance uses the `VITE_API_BASE_URL` environment variable defined in your `.env` file to determine the API base URL.

```ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  // You can add headers, interceptors, etc.
});

export default api;
```

---

## 🔑 Environment Variables

The API base URL is configured in the `.env` file:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

Remember to keep your `.env` file out of version control and use `.env.example` as a template.

---

## 🛠️ Example: Using Axios

You can import the `api` instance and make HTTP requests anywhere in your code:

```ts
import api from 'src/shared/lib/axios';

async function fetchData() {
  const response = await api.get('/route');
  return response.data;
}
```

---

## ✅ Integration with React Query

For requests that require cache management, loading, and error states, it is recommended to use React Query together with Axios.

Example of a custom hook:

```ts
import { useQuery } from '@tanstack/react-query';
import api from 'src/shared/lib/axios';

export const useTestApi = () => {
  return useQuery({
    queryKey: ['testApi'],
    queryFn: async () => {
      const response = await api.get('/test');
      return response.data;
    },
  });
};
```

---

## 🔒 Authentication and Headers

If your API requires authentication, you can add an Axios interceptor to include the token in every request:

```ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

> **Note:** This interceptor is commented out by default. Enable it when you implement the real authentication flow.

---

## 📝 Best Practices

- Centralize Axios configuration in a single file.
- Use environment variables for the base URL and sensitive keys.
- Prefer custom hooks and React Query for requests from components.
- Handle errors and loading states in the UI.
- Do not expose sensitive information in the frontend.
