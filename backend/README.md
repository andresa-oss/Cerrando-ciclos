# Cerrando Ciclos - Backend

Backend de la plataforma de licitaciones de Solenium, desarrollado con **Django** y **Django REST Framework (DRF)**.

## 🛠️ Stack Tecnológico
- **Python 3.10+**
- **Django**: Framework web core.
- **Django REST Framework**: Para la construcción de APIs robustas.
- **PostgreSQL**: Base de datos relacional (recomendada).
- **WeasyPrint / ReportLab**: Generación de documentos PDF.

## 📂 Organización de Aplicaciones
El proyecto está dividido en aplicaciones modulares de Django:
- **`projects/`**: Gestión de proyectos de minigranjas solares.
- **`tenders/`**: Administración de ítems y cantidades de obra (BOQ).
- **`offers/`**: Recepción de propuestas de contratistas y motor de evaluación económica.
- **`core/`**: Funcionalidades compartidas y utilidades.

## 🧠 Lógica de Negocio: Motor de Evaluación
El backend implementa el "Semáforo de Competitividad":
- **Verde**: Oferta óptima (hasta un 25% de ahorro frente al PEPC).
- **Amarillo**: Oferta en rango aceptable (entre PEPC y +25%).
- **Rojo**: Oferta fuera de rango (muy alta o sospechosamente baja).

## 🚀 Ejecución
1. Configurar entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```
2. Instalar requerimientos: `pip install -r requirements.txt`
3. Ejecutar migraciones: `python manage.py migrate`
4. Iniciar servidor: `python manage.py runserver`

## 📄 Documentación de API
Los endpoints están documentados y siguen los estándares de DRF. Para más detalles sobre la integración, consultar `OFFERS_API.md` en este directorio.
