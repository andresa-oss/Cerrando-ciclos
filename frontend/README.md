# Cerrando Ciclos - Frontend

Este es el frontend de la plataforma de licitación de Solenium, construido con **React 19** y **Vite**.

## 🛠️ Stack Tecnológico
- **React 19 + TypeScript**: Base del proyecto.
- **TanStack Router**: Enrutamiento basado en archivos (File-based routing).
- **TanStack Query (v5)**: Gestión de estado asíncrono y caché.
- **Zustand**: Gestión de estado global ligero.
- **Tailwind CSS v4 + shadcn/ui**: Sistema de diseño y componentes UI.
- **Axios**: Cliente HTTP con interceptores para manejo de API.

## 📂 Estructura de Carpetas
Seguimos una arquitectura basada en funcionalidades (Features) dentro de `src/home/`:

```text
src/home/{feature}/
  ├── index.tsx          # Barril de exportación
  ├── api/              # Lógica de datos (fetchers, mutations, constants)
  ├── components/       # Componentes locales de la funcionalidad
  ├── hooks/           # Hooks personalizados específicos
  └── types/           # Definiciones de TypeScript
```

## 📋 Estándares de Desarrollo
- **Componentes**: Usar declaraciones de función (`export function Component()`) en lugar de `const`.
- **Data Fetching**: Usar `queryOptions` para centralizar la configuración de consultas.
- **Composición**: Preferir el patrón de componentes compuestos para evitar el prop-drilling y props booleanas excesivas.
- **Toast**: Feedback mediante `sonner`.

## 🚀 Ejecución
1. Instalar dependencias: `npm install`
2. Iniciar servidor de desarrollo: `npm run dev`
3. Ejecutar tests: `npm test`
