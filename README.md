# Cerrando Ciclos - Plataforma de Licitación Solenium

![Solenium Logo](https://solenium.co/wp-content/uploads/2021/04/Logo-Solenium-Horizontal-Azul.png)

## 🌟 Visión General
**Cerrando Ciclos** es una plataforma centralizada diseñada para Solenium (EPC líder en energías renovables en Colombia). El sistema automatiza y digitaliza el proceso de licitación para la construcción de minigranjas solares, optimizando la evaluación económica de contratistas y la toma de decisiones estratégicas.

## 🚀 Características Principales
- **Motor de Evaluación Inteligente:** Análisis automatizado de ofertas mediante un sistema de semáforo (Verde/Amarillo/Rojo) comparando contra el PEPC.
- **Mapa de Calor (Heatmap):** Visualización tabular avanzada para comparar ítems de obra entre múltiples contratistas.
- **Gestión de Licitaciones:** Flujo completo desde la carga de cantidades de obra hasta la adjudicación.
- **Generación de Reportes:** Creación automática de PDFs tipo cotización oficial para cada oferta.
- **Portal de Contratistas:** Interfaz dedicada para que los contratistas ingresen sus propuestas de forma segura.

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** React 19 + Vite + TypeScript
- **Estado:** TanStack Query v5 + Zustand
- **Rutas:** TanStack Router (File-based)
- **UI:** Tailwind CSS v4 + shadcn/ui
- **Estilo de Código:** Basado en composición de componentes.

### Backend
- **Core:** Python + Django
- **API:** Django REST Framework (DRF)
- **Base de Datos:** PostgreSQL / SQLite (Dev)
- **Reportes:** WeasyPrint / ReportLab para PDFs.

## 📂 Estructura del Proyecto (Monorepo)
```text
.
├── frontend/          # Aplicación React (Vite)
│   ├── src/home/      # Lógica por funcionalidades (Features)
│   └── src/components # Componentes reutilizables (shadcn)
├── backend/           # API Django
│   ├── projects/      # Gestión de proyectos
│   ├── tenders/       # Licitaciones y cantidades de obra
│   └── offers/        # Propuestas económicas y evaluación
└── AGENTS.md          # Estándares de desarrollo y reglas de negocio
```

## ⚙️ Configuración y Ejecución

### Requisitos Previos
- Node.js (v18+)
- Python (v3.10+)
- PostgreSQL (opcional para desarrollo local)

### Backend
1. Entrar a la carpeta: `cd backend`
2. Crear venv: `python -m venv venv`
3. Instalar dependencias: `pip install -r requirements.txt`
4. Migrar DB: `python manage.py migrate`
5. Correr servidor: `python manage.py run_server`

### Frontend
1. Entrar a la carpeta: `cd frontend`
2. Instalar dependencias: `npm install`
3. Correr desarrollo: `npm run dev`

---
Desarrollado para el **Solarverso Hackathon** por Solenium.
