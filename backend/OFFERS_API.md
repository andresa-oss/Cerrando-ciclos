# Documentación de la API de Ofertas (Rol Dev 4)

Esta documentación está orientada al equipo de Frontend (Dev 1 y Dev 2) para integrar correctamente el flujo de los contratistas al enviar sus ofertas en la Plataforma Solenium.

**URL Base de la API:** `http://localhost:8000/api/` (Ajustar según entorno)

---

## 🏗️ Flujo General Sugerido para Frontend
1. El contratista ingresa al detalle de una licitación (ej. ID `1`).
2. El frontend consulta `GET /api/offers/` para ver si el contratista ya tiene un borrador.
3. Si no lo tiene, hace `POST /api/offers/` enviando `{"tender_id": 1}`. Se crea la oferta con estado `DRAFT`.
4. El frontend guarda cada precio diligenciado haciendo `POST` o `PATCH` hacia `/api/offer-items/`.
5. Cuando el contratista finaliza, el frontend acciona `POST /api/offers/{oferta_id}/submit/`. El estado pasa a `SUBMITTED`.
6. Si el usuario quiere descargar su cotización, el frontend abre el enlace `GET /api/offers/{oferta_id}/pdf/`.

---

## 🔒 Consideraciones de Seguridad
- **Autenticación requerida:** Todos los endpoints requieren que el usuario esté autenticado. El backend asociará automáticamente la oferta al usuario en sesión (`request.user`).
- **Inmutabilidad:** Una vez el endpoint de `/submit/` se ejecuta, el estado pasa a `SUBMITTED`, y cualquier intento de modificar la oferta (`PATCH /api/offers/{id}/`) o sus ítems será bloqueado por el servidor con un error de permisos (403 Forbidden).

---

## 📚 Endpoints Disponibles

### 1. Ofertas Base (`/api/offers/`)

#### `GET /api/offers/`
Obtiene las ofertas creadas **exclusivamente por el contratista autenticado**. Ningún contratista puede ver ofertas de la competencia.

**Respuesta Exitosa (200 OK)**
```json
[
  {
    "id": 1,
    "contractor": "test_contractor",
    "tender_id": 1,
    "status": "DRAFT",  // o "SUBMITTED"
    "created_at": "2023-10-25T10:00:00Z",
    "updated_at": "2023-10-25T10:00:00Z",
    "submitted_at": null,
    "items": []  // Lista de actividades cobradas
  }
]
```

#### `POST /api/offers/`
Crea una nueva oferta vacía (borrador).

**Cuerpo (Payload)**
```json
{
  "tender_id": 1
}
```

---

### 2. Ítems de la Oferta (`/api/offer-items/`)

Aquí recae la digitación de los **valores unitarios**. 

#### `POST /api/offer-items/`
Añade un valor unitario a una actividad específica dentro de un borrador de oferta.

**Cuerpo (Payload)**
```json
{
  "offer": 1,  // ID de la oferta creada en el paso anterior
  "activity_name": "Excavación mecánica",
  "unit_price": 15000.50,
  "observation": "Incluye maquinaria pesada" // Opcional
}
```

#### `PATCH /api/offer-items/{item_id}/`
Actualiza un precio ya digitado.

**Cuerpo (Payload)**
```json
{
  "unit_price": 18000.00
}
```

---

### 3. Congelamiento (Submit) y Exportación PDF

#### `POST /api/offers/{oferta_id}/submit/`
Cierra la cotización. Guarda el timestamp en `submitted_at` y bloquea futuras modificaciones.

**Cuerpo:** Vacío.

**Respuesta (200 OK)**
```json
{
  "status": "offer submitted"
}
```
*(De retornarse error `400 Bad Request`, significa que ya estaba enviada).*

#### `GET /api/offers/{oferta_id}/pdf/`
Retorna un blob/archivo binario `application/pdf`. Muestra:
- Página 1: Valores AIU.
- Página 2: Valores IVA Pleno.
- Marca de agua dinámica de confidencialidad.

*Nota para Frontend: Este endpoint debe tratarse asincrónicamente o abrirse en una nueva pestaña (ej. usando un link `<a>` con atributo `download` o creando un `Blob` desde la respuesta Axios).*
