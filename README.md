# Taller de la Puerta Roja

Sitio web para un taller de cerámica artesanal ubicado en Vitacura, Santiago de Chile.
Proyecto universitario desarrollado con React + Vite.

## Stack

- **React** + **Vite** (JavaScript / JSX)
- **Tailwind CSS v3** para estilos
- **React Router DOM** para navegación
- Datos mockeados en `src/data/`, accedidos a través de `src/services/`
- Preparado para conectarse a un backend (Railway) vía `VITE_API_URL`

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Luego abre la URL que muestra la terminal (por defecto http://localhost:5173).

Para copiar la configuración de entorno:

```bash
cp .env.example .env
```

## Arquitectura

El proyecto separa responsabilidades en capas:

- **pages/** — ensamblan secciones; no contienen detalle visual.
- **components/layout/** — Header, Footer y PageLayout.
- **components/home/** — secciones de la página de inicio.
- **components/admin/** — panel de administración con tabs (activeTab).
- **components/ui/** — piezas reutilizables (Button, Card, Badge, etc.).
- **data/** — datos mockeados (se reemplazarán por la API).
- **services/** — única puerta de acceso a los datos. Hoy devuelven mocks;
  mañana harán `fetch` al backend sin que los componentes cambien.
- **routes/** — definición de rutas.

Regla clave: los componentes nunca importan desde `data/` directamente,
siempre pasan por `services/`. Esto permite cambiar el origen de los datos
(mock → API) en un solo lugar.

## Rutas

| Ruta         | Página         |
|--------------|----------------|
| `/`          | Inicio         |
| `/talleres`  | Talleres       |
| `/productos` | Tienda         |
| `/contacto`  | Contacto       |
| `/admin`     | Administración |

## Estado actual

Frontend funcional con datos mockeados. El panel de administración permite
cambiar entre Inventario, Facturas y Gastos, y eliminar registros en local.

## Próximos pasos

- Backend con API REST (talleres, productos, inventario, facturas, gastos).
- Conexión a base de datos en Railway.
- Autenticación para el panel de administración.
- Funciones de crear y editar en el panel.