// Renderizado de Markdown para el Blog

// Transformar Markdown a HTML
function transformMarkdownToHTML(markdownText) {
    let htmlContent = markdownText;

    // Escapar caracteres especiales
    htmlContent = escapeLatex(htmlContent);

    // Convertir Markdown a HTML
    htmlContent = marked.parse(htmlContent);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    htmlContent = tempDiv.innerHTML;

    // Restaurar caracteres especiales
    htmlContent = htmlContent.replace(/\:\:/g, "_");
    htmlContent = htmlContent.replace(/\?\?/g, "^*");

    return htmlContent;
}

// Escapar LaTeX
function escapeLatex(text) {
    return text.replace(/\\/g, '\\\\');
}

// Procesar contenido Markdown
function processMarkdownContent(containerId, markdownText) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const htmlContent = transformMarkdownToHTML(markdownText);
    container.innerHTML = htmlContent;

    // Procesar MathJax
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise([container]).catch((err) => {
            console.error('Error al renderizar MathJax:', err);
        });
    }
}

// Inicializar Markdown
function initMarkdown() {
    // Procesar todos los contenedores de Markdown
    document.querySelectorAll('.blog-markdown-container').forEach(container => {
        const containerId = container.id;
        const markdownText = container.getAttribute('data-markdown');

        if (markdownText && markdownText.trim()) {
            processMarkdownContent(containerId, markdownText);
        }
    });
}

// Procesar contenido de clase
function processClaseContent(claseId) {
    const clase = blogData.clases.find(c => c.id === parseInt(claseId));
    if (!clase) return;

    const container = document.getElementById('clase-content');
    if (!container) return;

    const htmlContent = transformMarkdownToHTML(clase.contenido);
    container.innerHTML = htmlContent;

    // Procesar MathJax
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise([container]).catch((err) => {
            console.error('Error al renderizar MathJax:', err);
        });
    }
}

// Procesar contenido de ejercicio
function processEjercicioContent(ejercicioId) {
    const ejercicio = blogData.ejercicios.find(e => e.id === parseInt(ejercicioId));
    if (!ejercicio) return;

    const container = document.getElementById('ejercicio-content');
    if (!container) return;

    const htmlContent = transformMarkdownToHTML(ejercicio.contenido);
    container.innerHTML = htmlContent;

    // Procesar MathJax
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise([container]).catch((err) => {
            console.error('Error al renderizar MathJax:', err);
        });
    }
}

// Procesar contenido de materia
function processMateriaContent(materiaId) {
    const materia = blogData.materias.find(m => m.id === parseInt(materiaId));
    if (!materia) return;

    const container = document.getElementById('materia-content');
    if (!container) return;

    const htmlContent = transformMarkdownToHTML(materia.descripcion);
    container.innerHTML = htmlContent;

    // Procesar MathJax
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise([container]).catch((err) => {
            console.error('Error al renderizar MathJax:', err);
        });
    }
}

// Procesar contenido de contribución
function processContribucionContent(contribId) {
    const contrib = blogData.contribuciones.find(c => c.id === parseInt(contribId));
    if (!contrib) return;

    const container = document.getElementById('contribucion-content');
    if (!container) return;

    const htmlContent = transformMarkdownToHTML(contrib.descripcion);
    container.innerHTML = htmlContent;

    // Procesar MathJax
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise([container]).catch((err) => {
            console.error('Error al renderizar MathJax:', err);
        });
    }
}

// Inicializar Markdown cuando esté disponible
if (typeof marked !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initMarkdown);
}

// Configurar MathJax
if (typeof MathJax !== 'undefined') {
    MathJax = {
        startup: {
            typeset: false // Evita que procese la página al cargar
        },
        tex: {
            inlineMath: [['\\(', '\\)']],  // Delimitadores para ecuaciones en línea
            displayMath: [['\\[', '\\]']], // Delimitadores para ecuaciones en modo display
        },
    };
}

// Procesar contenido cuando esté disponible
document.addEventListener('DOMContentLoaded', function() {
    // Procesar contenido de clase si existe
    const urlParams = new URLSearchParams(window.location.search);
    const claseId = urlParams.get('id');
    if (claseId) {
        processClaseContent(claseId);
    }

    // Procesar contenido de ejercicio si existe
    const ejercicioId = urlParams.get('id');
    if (ejercicioId) {
        processEjercicioContent(ejercicioId);
    }

    // Procesar contenido de materia si existe
    const materiaId = urlParams.get('id');
    if (materiaId) {
        processMateriaContent(materiaId);
    }

    // Procesar contenido de contribución si existe
    const contribId = urlParams.get('id');
    if (contribId) {
        processContribucionContent(contribId);
    }
});