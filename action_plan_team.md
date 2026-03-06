# Plan de Acción: Equipo de 4 Desarrolladores
Este documento distribuye las cargas de trabajo para el desarrollo en paralelo de la **Plataforma de Licitación Solenium** (Monorepo: Frontend en React/Vite y Backend en Django).

## Dev 1: Frontend - Interfaz Interna (Solenium Admin/Ingenieros)
**Responsabilidades Principales:**
- Configuración base del proyecto Frontend (Vite, Tailwind v4, TanStack Router y Query, Zustand).
- **Módulo de Proyectos (`src/home/projects`)**: Tableros y visualización de licitaciones activas.
- **Carga de Cantidades de Obra (`src/home/tenders`)**: Interfaz para que los ingenieros definan las cantidades (AIU e IVA pleno).
- **Módulo de Evaluación (`src/home/evaluation`)**: Renderizado complejo del Mapa de Calor (Heatmap) comparando los valores unitarios entre Top Contratistas y Presupuesto PEPC.

## Dev 2: Frontend - Portal de Contratistas (UX/UI & Cotización)
**Responsabilidades Principales:**
- **Módulo de Licitación (`src/home/bidding`)**: Interfaces paso a paso para que el contratista visualice actividades y digite **únicamente los valores unitarios** y observaciones.
- **Generación Visual de la Oferta**: Integración de la vista previa de la cotización antes del cierre formal del proceso.
- **Módulo de Contraoferta (`src/home/counteroffer`)**: Pantalla privada donde el top 3 visualiza su posición y actualiza precios si lo desea.

## Dev 3: Backend - Core & Motor de Licitación (Admin)
**Responsabilidades Principales:**
- Configuración base de Django, Base de Datos (PostgreSQL recomendado)
- **API Gestión de Proyectos**: Endpoints para crear licitaciones (fechas, coordenadas, etc.).
- **Procesamiento de Cantidades (Excel)**: Script o parser en Python para cargar formatos estándar de cantidades y separarlos en AIU / IVA.
- **Motor de Evaluación Automática**: Lógica que al cierre del plazo, compila las ofertas, ejecuta la comparativa porcentual de precios contra PEPC, asigna clasificación de colores (Verde, Naranja, Rojo) y retorna los finalistas.

## Dev 4: Backend - Motor de Ofertas y Generador PDF (Contratistas)
**Responsabilidades Principales:**
- **API Ofertas y Contraofertas**: Endpoints para que los contratistas envíen/actualicen en borrador sus ofertas unitarias, asegurando robustas reglas de validación (no pasar deadline, inmutabilidad tras el cierre).
- **Control de Acceso/Seguridad (DRF)**: Garantizar que el contratista solo pueda acceder a información no estratégica y sus propias ofertas.
- **Document Generator PDF**: Implementar servicio escalable (usando `WeasyPrint` o librería similar) que reciba datos de la oferta final, inyecte data en plantillas HTML y retorne un PDF multipart: Página 1 (AIU), Página 2 (IVA Pleno), con logo Solenium y marca de agua/disclaimer dinámico.

---

### Sprint Inicial Sugerido (Sincronización de Equipo)
1. **Semana 1**: Dev 3 diseña la BD completa y exporta Spec OpenAPI. Dev 1 y Dev 2 inicializan el frontend con mocks usando MSW apoyándose en la Spec.
2. **Semana 2**: Integración de creación de Proyectos (Dev 1 & Dev 3) y registro/visualización en portal Contratistas (Dev 2 & Dev 4).
3. **Semana 3**: Implementar flujos densos (Carga de Excels, diligenciamiento de ofertas, motor de heatmap y PDF).
4. **Semana 4**: Módulo de Contraoferta, pulir UI/UX y QA End-to-End.
