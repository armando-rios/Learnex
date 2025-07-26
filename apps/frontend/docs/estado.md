# State Management

This project uses two main tools for state management and remote data handling:

- **Zustand**: for local global state (e.g., authentication).
- **React Query**: for handling asynchronous and cached data from the API.

---

## Zustand

Zustand is a lightweight library for managing global state in React applications.  
It is mainly used for states that need to be accessible in different parts of the application, such as user authentication.

### Location

Zustand stores are located in:

```
src/shared/store/
```

For example, the authentication store is in `src/shared/store/authStore.ts`.

### Usage Example

```ts
import { useAuthStore } from 'src/shared/store/authStore';

const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
```

---

## React Query

React Query is used for efficient handling of remote data (fetching, caching, synchronization, etc.) from the API.

### Configuration

The React Query provider (`QueryClientProvider`) is set up in `src/app/main.tsx`.

### Usage Example

```ts
import { useQuery } from '@tanstack/react-query';
import api from 'src/shared/lib/axios';

const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => api.get('/users').then((res) => res.data),
});
```

### Custom Hooks

It is recommended to create custom hooks for each endpoint in `src/shared/hooks/` or in the corresponding feature folder.

---

## Best Practices

- Use **Zustand** for global state that does not depend on the API (e.g., authentication, flags, global UI).
- Use **React Query** for anything involving remote data, caching, synchronization, or API mutations.
- Do not mix API business logic into Zustand stores.
- Prefer custom hooks to encapsulate React Query logic.

---

## Resources

- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
