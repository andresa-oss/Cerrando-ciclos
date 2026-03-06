---
name: react-composition-pattern
description: Guía para crear o refactorizar componentes monolíticos de React en arquitecturas basadas en composición y componentes compuestos. Úsala cuando se detecten múltiples props booleanas (ej. isEditing, isThread) o cuando se necesite elevar el estado para componentes complejos como formularios o editores.
---

# Composition Pattern

Esta habilidad permite transformar componentes rígidos y difíciles de mantener en sistemas flexibles basados en **Compound Components** y **Elevación de Estado**.

## Cuándo usar esta habilidad

- Cuando un componente tiene **más de 2 o 3 props booleanas** que controlan el renderizado visual (ej. `showFooter`, `isUpdate`).
- Al construir interfaces complejas que varían ligeramente según el contexto (ej. un chat en un canal vs. un hilo).
- Cuando se necesite que elementos fuera de un contenedor accedan al estado interno del mismo.

## Reglas de Implementación

1. **Eliminar el "Monolito":** No uses un solo componente que reciba todas las configuraciones. Divide la UI en piezas pequeñas como `Header`, `Input`, `Footer` y `Provider`.
2. **Uso de JSX sobre Arrays:** No pases arrays de configuración para renderizar botones o acciones. Usa JSX directamente para permitir flexibilidad total.
3. **Desacoplar Estado e Interfaz:** El `Provider` define la interfaz (estado y acciones), pero la implementación del estado (local con `useState` o global con hooks externos) debe ser intercambiable.
4. **Elevación de Estado:** Si un botón externo necesita ejecutar una acción del componente, envuelve ambos en el `Provider` en un nivel superior del árbol de React.

## Ejemplos de Código

### 1. Estructura de Componentes Compuestos

En lugar de `<UserForm isEdit={true} />`, ensambla las piezas necesarias:

```tsx
// Implementación flexible sin props booleanas innecesarias
export function EditMessageComposer() {
  const state = useEditState(); // Estado específico para edición [20]

  return (
    <ComposerProvider state={state.data} actions={state.actions}>
      <div className="frame">
        <ComposerHeader title="Editando mensaje" />
        <ComposerInput />
        {/* No renderizamos DropZone porque no se requiere en edición [17] */}
        <ComposerFooter>
          <CancelButton />
          <SaveButton />
        </ComposerFooter>
      </div>
    </ComposerProvider>
  );
}
```

### 2. Consumo de Contexto Agnóstico

Los subcomponentes deben ser agnósticos a cómo se gestiona el estado:

```tsx
export function ComposerInput() {
  // El input solo sabe que existe un "text" en el contexto [21]
  const { text, setText } = useComposerContext();
  return <textarea value={text} onChange={(e) => setText(e.target.value)} />;
}
```

Puedes ver un ejemplo sencillo en [simple-example](simple-example.tsx) o si prefieres un ejemplo mas elaborado para componentes mas complejos, guiate de [modal-example](modal-example.md).

## Beneficios

Este patrón reduce las alucinaciones de la IA al proporcionar una estructura de árbol de React clara y predecible, evitando la lógica compleja de operadores ternarios anidados que suelen romper los componentes monolíticos.
