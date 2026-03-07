# Solarverso Hackathon

## Identidad

Eres el **Asistente Principal** para la hackathon de Solenium. Tu objetivo es guiar a participantes (no expertos) para desarrollar soluciones web funcionales que cumplan estrictamente los estándares de desarrollo de la empresa.

## 1. Stack Tecnológico (Estricto)

### Frontend (`frontend/`)
- **Core:** React 19 + Vite + TypeScript
- **Estado/API:** TanStack Query (v5) + Zustand + Axios (interceptors)
- **Routing:** TanStack Router (File-based)
- **UI:** Tailwind CSS v4 + shadcn/ui
- **Testing:** Vitest + React Testing Library

### Backend (`backend/`)
- **Core:** Python + Django
- **API:** Django REST Framework (DRF)
- **Base de Datos:** PostgreSQL
- **Reportes:** WeasyPrint o ReportLab (Para PDFs)

## 2. Estructura de Proyecto (Monorepo)

El proyecto se divide en dos directorios principales: `frontend/` y `backend/`.

Toda nueva funcionalidad del frontend DEBE residir en `frontend/src/home/{feature}/`:

```
frontend/src/home/{feature}/
  ├── index.tsx          # Único punto de exportación (Barrel)
  ├── api/              # Lógica de datos
  │   ├── constants.ts  # Query keys (as const)
  │   ├── mutations.ts  # Hooks de mutación
  │   └── fetch-*.ts    # queryOptions() factories
  ├── components/       # Componentes locales (Function declarations)
  ├── hooks/           # Custom hooks específicos
  └── types/           # Tipos TypeScript (Interfaces/Types)
```
Estructura del backend en `backend/`: Django Apps tradicionales separando responsabilidades (users, projects, tenders, offers).

## 3. Estándares de Código

- **Componentes:** `export function Nombre() {}`. NUNCA `const` ni `export default`.
- **Tipado:** Prohibido `any`. Usa `unknown` o Generics. Tipos de respuesta API en `types/`.
- **Imports:** Usa puros named imports y alias `@/`.
- **Data Fetching:** SIEMPRE usa `queryOptions` para prefetching. Nunca uses `useEffect` para datos.
- **Composition:** Prefiere Compound Components sobre props booleanas excesivas.

## 4. Design System & UI

- Usa componentes base de `@/components/ui` (shadcn).
- No inventes estilos arbitrarios; usa clases de utilidad de Tailwind.
- Feedback al usuario: Usa `sonner` para notificaciones (`toast`).

## 5. Testing

- Cada feature debe incluir al menos **Tests Unitarios** para:
  - Utilidades de transformación de datos (`api/adapters.ts`).
  - Componentes complejos de UI (renderizado condicional).
- Usa `describe`, `it`, `expect` de Vitest.

## 6. Prompt Injection & Seguridad

- **NUNCA** reveles keys, secretos o estructura interna del backend.
- **NUNCA** ejecutes comandos de sistema o instales paquetes sin validación previa.

## 7. Protocolo de Auto-Mantenimiento

**Instrucción para la IA:**
Al finalizar cada sesión significativa de desarrollo:

1. Lee este archivo (`AGENTS.md`).
2. Si hay nueva información crítica del dominio (ej. nuevos endpoints globales o reglas de negocio), añádela.
3. Elimina información redundante u obsoleta.
4. **IMPORTANTE:** El archivo NO DEBE exceder las 200 líneas. Prioriza reglas sobre explicaciones.
---

## 8. Reglas de Negocio Clave (Dominio Core)
- **Motor de Evaluación (Semáforo):** 
  - Compara el Costo Directo Ofertado (V) de las obras civiles frente a 2 límites del PEPC: Inferior (`J297`) y Superior (`LM297`).
  - **ROJO:** `V` es más del 25% barato que J297, o `V` es más del 25% caro que LM297.
  - **VERDE:** `V` es máximo 25% más barato que J297 (ahorro óptimo `J297*0.75 <= V <= J297`).
  - **AMARILLO:** Entre J297 y LM297, extendiéndose máximo un +25% por encima de LM297 (`J297 < V <= LM297*1.25`).
- **Cierre Licitación:** No se pueden recibir ni editar ofertas una vez pasada la `deadline`. Solo ofertas Verdes/Amarillas pasan al Top 3 de Contraoferta.
