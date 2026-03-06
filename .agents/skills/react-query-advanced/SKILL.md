---
name: react-query-advanced-pattern
description: Guía para implementar TanStack Query de forma escalable. Úsala cuando el usuario esté creando hooks de consulta (useQuery), necesite reutilizar llaves de consulta, o quiera optimizar el rendimiento mediante prefetching en loaders y Suspense.
---

# Patrón Avanzado de TanStack Query: Opciones Reutilizables y Prefetching

Esta habilidad enseña a implementar un sistema de gestión de estado asíncrono que desacopla la configuración de la consulta de los componentes de React, permitiendo el prefetching a nivel de navegación.

## Reglas de Arquitectura

1. **Centralización de Query Keys:** Nunca escribas strings directamente en los componentes. Define las llaves en un archivo de constantes global para permitir invalidaciones seguras desde cualquier parte de la aplicación.
2. **Query Options:** En lugar de crear hooks personalizados (que restringen el uso a `useQuery`), crea funciones que devuelvan el objeto `queryOptions`. Esto permite usar la misma configuración con `useQuery`, `useSuspenseQuery` o `ensureQueryData`.
3. **Prefetching en Loaders de React Router:** Utiliza la función `ensureQueryData` dentro de los loaders de tus rutas para cargar los datos antes de que el componente se renderice.
4. **Componentes con Suspense:** Utiliza `useSuspenseQuery` para consumir los datos. Esto simplifica el código al eliminar la necesidad de manejar manualmente los estados `isPending` o `isError` dentro de la UI.

## Ejemplos de Implementación

### 1. Definición de Constantes y Opciones

```ts
// constants/queryKeys.ts
export const O_QUERY_KEYS = {
  currentUser: ['current-user'] as const,
};

// queries/userQueries.ts
import { queryOptions } from '@tanstack/react-query';
import { O_QUERY_KEYS } from '../constants/queryKeys';

export function createCurrentUserQueryOptions() {
  return queryOptions({
    queryKey: O_QUERY_KEYS.currentUser,
    queryFn: async () => {
      const res = await fetch('/api/user');
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // Reutilizable en toda la app
  });
}
```

### 2. Integración con Loader de React Router

```ts
// routes/UserDetail.tsx
import { getUserQueryOptions } from '../queries/userQueries';

// Loader compatible con React Router
export const loader =
  (queryClient) =>
  async ({ params }) => {
    if (!params.id) throw new Error('No ID provided');

    // Se asegura de que el dato esté en caché antes de entrar a la ruta
    return await queryClient.ensureQueryData(getUserQueryOptions(params.id));
  };
```

### 3. Componente de UI Simplificado

```ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getUserQueryOptions } from '../queries/userQueries';

export function UserProfile() {
  const { id } = useParams();

  // El componente asume que el dato ya está listo gracias al loader
  const { data: user } = useSuspenseQuery(getUserQueryOptions(id!));

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```
