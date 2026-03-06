# 📘 Guía de Integración API - Motor Solenium

Este documento detalla todas las rutas (Endpoints) creadas por el equipo de **Backend (Dev 3)** y asocia cada una con el Desarrollador de Frontend correspondiente **(Dev 1 y Dev 2)** para que puedan conectar sus pantallas.

---

## 🏗️ 1. Módulo de Proyectos (Licitaciones)
Maneja la información pública de la licitación y su ciclo de vida.

- **URL Base:** `/api/v1/projects/`
- **Frontend Principal:** 👩‍💻 **Dev 1** (Para crear y mostrar licitaciones internas) y 🧑‍💻 **Dev 2** (Para mostrarle al portal del contratista las licitaciones abiertas).

| Método | Endpoint | Descripción | Encargado Frontend |
|---|---|---|---|
| `GET` | `/api/v1/projects/` | Listar todas las licitaciones. | **Dev 1 / Dev 2** |
| `POST` | `/api/v1/projects/` | Crear nueva licitación (Fechas, J297, LM297). | **Dev 1** (Admin) |
| `GET` | `/api/v1/projects/{id}/` | Ver detalles de una sola licitación. | **Dev 1 / Dev 2** |
| `POST`| `/api/v1/projects/{id}/close_and_evaluate/`| **Cerrar Proyecto y ejecutar Semáforo**. | **Dev 1** (Evaluación) |

---

## 📊 2. Módulo de Archivos y Cantidades (PEPC)
Maneja la lectura de los Excel subidos por ingeniería y el registro base de obra.

- **URL Base:** `/api/v1/tenders/`
- **Frontend Principal:** 👩‍💻 **Dev 1** (Panel de Ingenieros, Módulo `src/home/tenders`).

| Método | Endpoint | Descripción | Encargado Frontend |
|---|---|---|---|
| `POST` | `/api/v1/tenders/upload-excel/` | Subir archivo Excel local (`.xlsx`) y crear todos los ítems de golpe. | **Dev 1** |
| `GET` | `/api/v1/tenders/items/?project_id={id}` | Consultar el listado de ítems y costo tope de un proyecto. | **Dev 1** / **Dev 2** (Bidding) |
| `POST` | `/api/v1/tenders/aiu/` | Guardar configuraciones y % de AIU por proyecto. | **Dev 1** |

---

## 👷‍♂️ 3. Módulo de Contratistas (Ofertas y PDF)
Recibe la cotización económica de los contratistas compitiendo.

- **URL Base:** `/api/v1/offers/` y `/api/v1/pricing/`
- **Frontend Principal:** 🧑‍💻 **Dev 2** (Portal de Contratistas) y parcialmente **Dev 4** (Contraoferta).

| Método | Endpoint | Descripción | Encargado Frontend |
|---|---|---|---|
| `POST` | `/api/v1/offers/` | El contratista envía su "Cascarón" de la propuesta base. | **Dev 2** (Bidding) |
| `GET` | `/api/v1/offers/?project={id}` | Ver todas las ofertas de un proyecto *(El Mapa de Calor leerá de aquí el `semaphore_color` de todos)*. | **Dev 1** (Evaluación) |
| `POST` | `/api/v1/pricing/` | Insertar Precio Unitario a un Ítem cotizado por el contratista. | **Dev 2** (Bidding) |
| `PUT` | `/api/v1/pricing/{id}/` | Editar precio unitario *(Solo permitido para el Top 3 si cerró).* | **Dev 4** (Contraoferta)|
| `GET` | `/api/v1/offers/{id}/download_pdf/` | **Descargar constancia de Excel en formato PDF** (2 páginas Selladas).| **Dev 2** (Portal) |

---

## 🚦 Reglas de Negocio en la Nube (Solo para saber)
*(Estas lógicas ocurren en silencio en el Backend, el Frontend no debe programarlas)*

1. **Restricción de Fechas:** Las rutas `POST` o `PUT` de `/offers` rechazarán la conexión (Error HTTP 400) si la `deadline` expiró.
2. **Top 3 Excepción:** Si un proyecto ya cerró, `/pricing/` autorizará actualizar el dato bajo cuerda solo si la oferta está marcada por el sistema en Ranking 1, 2 o 3.
3. **El Semáforo:** La IA de la base de datos comparará el Total de Obras contra los Casilleros `J297` y `LM297` que ingresó Dev 1. Luego arrojará `ROJO`, `AMARILLO`, o `VERDE` en la propiedad `semaphore_color` cuando llamen a `/api/v1/offers/`.
