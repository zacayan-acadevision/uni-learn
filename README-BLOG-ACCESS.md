# Acceso al Blog de Solo Lectura

## ¿Cómo ver el blog?

El blog de solo lectura está disponible en la carpeta `public/` del proyecto.

### Opción 1: Abrir directamente
1. Ve a la carpeta: `D:\Documents\acadevision\p400\public\`
2. Abre el archivo `index.html` en tu navegador

### Opción 2: Usar servidor local (recomendado)
```bash
# En la carpeta public/
cd D:\Documents\acadevision\p400\public

# Python 3
python -m http.server 8000

# Node.js (si tienes http-server instalado)
npx http-server

# PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000/index.html`

## Estructura del Blog

- **Página principal**: `index.html` - Vista general con todas las secciones
- **Clases**: `clase.html?id=1` - Vista de una clase específica
- **Ejercicios**: `ejercicios.html?id=1` - Vista de ejercicios
- **Contribuciones**: `contribuciones.html?id=1` - Vista de contribuciones

## Contenido Incluido

- 10 materias de matemáticas
- 7 clases completas con contenido Markdown
- 7 ejercicios por materia
- 7 contribuciones (PDFs, videos, audios)
- Navegación completa
- Diseño responsive

## Detalles Técnicos

- **Estilos**: CSS personalizado para el blog
- **Datos**: JavaScript con contenido mock
- **Markdown**: Soporte para Markdown y LaTeX
- **Ecuaciones**: MathJax para renderizado matemático
- **Sin backend**: Funciona completamente en el navegador

## Archivos del Blog

```
public/
├── index.html                    # Página principal
├── clase.html                    # Vista de clase
├── ejercicios.html               # Vista de ejercicios
├── contribuciones.html           # Vista de contribuciones
├── css/
│   ├── blog-style.css            # Estilos principales
│   └── blog-markdown.css         # Estilos Markdown
├── js/
│   ├── blog-data.js              # Datos mock
│   ├── blog-navigation.js        # Navegación
│   └── blog-markdown-render.js   # Renderizado Markdown
└── README-BLOG.md                # Documentación del blog
```

## Más Información

Ver `public/README-BLOG.md` para detalles completos sobre el blog.