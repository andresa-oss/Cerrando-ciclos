# Contexto del Proyecto: Plataforma de Licitación Solenium

## 1. Visión General
Solenium, EPC en energías renovables en Colombia, desarrolla minigranjas solares. Requiere una plataforma centralizada para evaluar económicamente a contratistas de obras civiles, eléctricas, montaje, etc.
El objetivo es digitalizar, estandarizar y automatizar la recepción de ofertas, su comparación y la selección de contratistas.

## 2. Flujo de Trabajo
1. **Registro:** Contratistas se registran y suben documentación (SST, ambiental, técnica, etc.). Parte pasa por *Solarverso*.
2. **Creación de Proyecto:** Administradores de Solenium crean el proyecto (ubicación, tipo, fechas).
3. **Cantidades de Obra:** Ingenieros de diseño definen cantidades a partir de plantillas en Excel.
   - Separados en **AIU** e **IVA Pleno (19%)**.
4. **Oferta:** Máximo 10 contratistas habilitados por proyecto ingresan precios unitarios (único campo editable).
5. **Cierre:** Vencimiento de plazo bloquea ediciones.
6. **Análisis:** El sistema genera un Mapa de Calor comparando ofertas y el PEPC (presupuesto).
   - 🟢 Verde: Favorable.
   - 🟠 Naranja: Aceptable.
   - 🔴 Rojo: Poco competitivo.
7. **Selección y Contraoferta:** Solenium selecciona hasta 3 finalistas, quienes pueden hacer una contraoferta (solo ven su posición en el ranking).
8. **Generación PDF:** El sistema genera un PDF tipo cotización oficial por cada oferta.

## 3. Roles de Usuario
- **Administradores (Solenium):** Gestionan proyectos, validan contratistas, analizan ofertas, seleccionan finalistas.
- **Ingenieros de Diseño:** Alimentan cantidades de obra del proyecto.
- **Contratistas:** Se registran, editan propuestas económicas de sus proyectos habilitados. No ven información de otros.

## 4. Estructura de Datos Clave (Cantidades de Obra)
- Actividad Constructiva (Descripción)
- Unidad de Medida
- Cantidad
- Valor Unitario (Editable por el contratista)
- Observaciones
- Clasificación de Impuesto (AIU / IVA 19%)

## 5. Salidas del Sistema
- Mapa de Calor y Análisis Tabular (UI).
- Documento PDF generado automáticamente que sirve como cotización legal y soporte documental histórico.
