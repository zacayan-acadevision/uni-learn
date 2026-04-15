# Plan: Versión de Solo Lectura del Sitio Educativo

## Objetivo
Crear una versión de solo lectura (blog) del sitio educativo que:
- No tenga inputs ni posibilidad de edición
- Use el mismo diseño visual del sistema existente
- Sea accesible desde la raíz del proyecto
- Tenga formato blog con notas, clases, ejercicios y contribuciones
- Sea completamente mock/hardcoded

## Estructura de Archivos

```
public/
├── index.html                    # Página principal del blog
├── css/
│   ├── blog-style.css            # Estilos específicos del blog
│   └── blog-markdown.css         # Estilos para contenido Markdown
├── js/
│   ├── blog-navigation.js        # Navegación del blog
│   └── blog-markdown-render.js   # Renderizado de Markdown
├── assets/
│   ├── images/                   # Imágenes del blog
│   └── icons/                    # Iconos del blog
└── data/
    ├── blog-data.json            # Datos mock del blog
    └── blog-content.json         # Contenido completo del blog
```

## Diseño del Blog

### Layout Principal
- **Header**: Logo, navegación principal, búsqueda
- **Sidebar**: Categorías (Materias, Clases, Ejercicios, Contribuciones)
- **Main Content**: Contenido del blog
- **Sidebar Derecho**: Popular posts, etiquetas, newsletter

### Componentes del Blog
1. **Hero Section**: Título del blog, descripción, imagen destacada
2. **Featured Posts**: Posts destacados en la parte superior
3. **Post List**: Lista de posts con thumbnail, título, fecha, autor
4. **Post Detail**: Vista detallada de un post
5. **Categories**: Categorías del blog
6. **Tags**: Etiquetas de los posts
7. **Newsletter**: Formulario de suscripción (visual solo)

### Estilos
- Usar variables CSS del sistema existente
- Adaptar sidebar para navegación del blog
- Estilos para contenido Markdown y LaTeX
- Responsive design para móviles

## Contenido Mock

### Materias (Asignaturas)
- Cálculo I
- Cálculo II
- Álgebra Lineal
- Ecuaciones Diferenciales
- Probabilidad y Estadística

### Clases (Posts)
- Cálculo I: Límites y Continuidad
- Cálculo I: Derivadas
- Cálculo I: Integrales
- Cálculo II: Series
- Cálculo II: Ecuaciones Diferenciales
- Álgebra Lineal: Vectores
- Álgebra Lineal: Matrices
- Ecuaciones Diferenciales: Primer Orden
- Probabilidad y Estadística: Variables Aleatorias
- Probabilidad y Estadística: Distribuciones

### Ejercicios
- Ejercicios de Límites
- Ejercicios de Derivadas
- Ejercicios de Integrales
- Ejercicios de Álgebra Lineal
- Ejercicios de Ecuaciones Diferenciales
- Ejercicios de Probabilidad y Estadística

### Contribuciones
- Archivos PDF de guías
- Videos de apoyo
- Audios de clases
- Material adicional

## Navegación del Blog

### Rutas
- `/blog/` - Página principal
- `/blog/materia/:id` - Lista de clases de una materia
- `/blog/clase/:id` - Vista detallada de una clase
- `/blog/ejercicios/:id` - Ejercicios de una materia
- `/blog/contribuciones/:id` - Contribuciones de una materia

### Navegación
- Breadcrumbs para navegación
- Sidebar con categorías
- Links a posts relacionados
- Botón "Volver al inicio"

## Implementación

### Paso 1: Crear estructura de archivos
- Crear directorios: css, js, assets, data
- Crear archivos base: index.html, blog-style.css, blog-data.json

### Paso 2: Implementar diseño base
- Header con logo y navegación
- Sidebar de categorías
- Layout principal con main content
- Estilos CSS base

### Paso 3: Crear componentes del blog
- Hero section
- Featured posts
- Post list
- Post detail view
- Sidebar widgets

### Paso 4: Implementar contenido mock
- Crear datos JSON con materias, clases, ejercicios
- Generar contenido HTML para cada post
- Añadir imágenes y recursos

### Paso 5: Implementar funcionalidad
- Navegación entre páginas
- Renderizado de Markdown
- Estilos para contenido matemático
- Responsive design

### Paso 6: Probar y optimizar
- Verificar navegación
- Probar responsive design
- Optimizar imágenes
- Verificar estilos

## Características Específicas

### Sin Inputs de Edición
- No hay formularios de creación/edición
- No hay botones de editar/eliminar
- Solo lectura completo

### Contenido Educativo
- Clases con contenido Markdown
- Ejercicios con soluciones
- Contribuciones (archivos, videos, audios)
- Material de apoyo

### Estilos Educativos
- Colores del sistema existente
- Tipografía legible
- Espaciado adecuado
- Estructura clara

## Consideraciones

1. **Performance**: Usar imágenes optimizadas
2. **SEO**: Añadir meta tags básicos
3. **Accessibility**: Añadir atributos ARIA
4. **Responsive**: Adaptar para móviles y tablets
5. **Código**: Mantener código limpio y organizado

## Próximos Pasos

1. Revisar este plan
2. Aprobar el enfoque
3. Iniciar implementación
4. Probar iterativamente
5. Ajustar según feedback