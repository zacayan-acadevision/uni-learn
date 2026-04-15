// Generador de Placeholders de Imágenes (JavaScript Puro)

/**
 * Genera un placeholder SVG local para imágenes que no se cargan
 * @param {number} width - Ancho del placeholder (px)
 * @param {number} height - Alto del placeholder (px)
 * @param {string} text - Texto a mostrar
 * @returns {string} - Data URL del placeholder SVG genérico
 */
function generatePlaceholder(width, height, text) {
    // Leer el SVG genérico
    const svg = fetch('/images/generic-placeholder.svg')
        .then(response => response.text())
        .then(svgText => {
            // Reemplazar el texto
            const encodedText = encodeURIComponent(text || 'Imagen no disponible');
            const finalSvg = svgText.replace('{{text}}', encodedText);

            // Convertir a Data URL
            return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(finalSvg);
        });

    return svg;
}

/**
 * Maneja imágenes que no se cargan
 * @param {HTMLImageElement} img - Elemento de imagen
 */
function handleImageError(img) {
    // Generar placeholder local usando el SVG genérico
    generatePlaceholder(400, 250, 'Imagen no disponible').then(url => {
        img.src = url;
        img.onerror = null; // Evitar bucle infinito
    });
}

// Agregar event listener a todas las imágenes
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(function(img) {
        img.onerror = function() {
            handleImageError(this);
        };
    });
});

// Exportar funciones para uso externo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generatePlaceholder,
        handleImageError
    };
}