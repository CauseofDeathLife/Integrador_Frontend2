# Módulo Asistencias (React) — Basado en los archivos del dashboard

Replica en React (componentes y páginas) del módulo **Asistencias** tomando como referencia:
- `listado-asistencias.html` y `js/modulos/asistencias.js`
- `crear-asistencia.html` y `js/modulos/crear-asistencia.js`

## Correr
```bash
npm install
npm run dev
```
Rutas:
- `/asistencias` — listado con filtros (fecha, grado, asignatura, estado) + búsqueda + ver/editar/eliminar
- `/asistencias/nueva` — crear
- `/asistencias/:id/editar` — editar

Validaciones y campos condicionales replican el comportamiento original (tardanza => minutos; ausente/justificado => tipo de justificación).
Persistencia local con `localStorage` (simulación de API).
