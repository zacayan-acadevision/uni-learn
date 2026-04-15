// Funciones de Navegación del Blog

// Inicializar el blog
function initBlog() {
    renderMateriasNav();
    renderTags();
    renderFeaturedPosts();
    renderRecentPosts();
    renderEjercicios();
    renderContribuciones();
    renderPopularPosts();
}

// Renderizar navegación de materias
function renderMateriasNav() {
    const materiaNav = document.getElementById('materiaNav');
    if (!materiaNav) return;

    const materias = blogData.materias;
    let html = '';

    materias.forEach(materia => {
        html += `
            <a href="index.html#materia-${materia.id}" class="materia-link" data-materia-id="${materia.id}">
                <span class="nav-icon">${materia.icono}</span>
                <span class="nav-text">${materia.nombre}</span>
            </a>
        `;
    });

    materiaNav.innerHTML = html;
}

// Renderizar tags
function renderTags() {
    const tagsContainer = document.getElementById('tagsContainer');
    if (!tagsContainer) return;

    const tags = blogData.tags;
    let html = '';

    tags.forEach(tag => {
        html += `
            <a href="index.html#tag-${tag}" class="tag" data-tag="${tag}">${tag}</a>
        `;
    });

    tagsContainer.innerHTML = html;
}

// Renderizar posts destacados
function renderFeaturedPosts() {
    const featuredPosts = document.getElementById('featuredPosts');
    if (!featuredPosts) return;

    const clases = blogData.clases.slice(0, 6);
    let html = '';

    clases.forEach(clase => {
        const materia = blogData.materias.find(m => m.id === clase.materiaId);
        html += `
            <article class="post-card">
                <img src="${clase.imagen}" alt="${clase.titulo}">
                <div class="post-card-content">
                    <div class="meta">
                        <span>📅 ${formatDate(clase.fecha)}</span>
                        <span>👤 ${clase.autor}</span>
                    </div>
                    <h3>${clase.titulo}</h3>
                    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 1rem;">
                        ${clase.contenido.substring(0, 100)}...
                    </p>
                    <a href="clase.html?id=${clase.id}" class="read-more">Leer más →</a>
                </div>
            </article>
        `;
    });

    featuredPosts.innerHTML = html;
}

// Renderizar posts recientes
function renderRecentPosts() {
    const recentPosts = document.getElementById('recentPosts');
    if (!recentPosts) return;

    const clases = blogData.clases.slice(0, 5);
    let html = '';

    clases.forEach(clase => {
        const materia = blogData.materias.find(m => m.id === clase.materiaId);
        html += `
            <article class="post-list-item">
                <h3>${clase.titulo}</h3>
                <div class="meta">
                    <span>📅 ${formatDate(clase.fecha)}</span>
                    <span>👤 ${clase.autor}</span>
                    <span>📚 ${materia.nombre}</span>
                </div>
                <a href="clase.html?id=${clase.id}" class="read-more">Leer más →</a>
            </article>
        `;
    });

    recentPosts.innerHTML = html;
}

// Renderizar posts populares
function renderPopularPosts() {
    const popularPosts = document.getElementById('popularPosts');
    if (!popularPosts) return;

    const posts = blogData.popularPosts;
    let html = '';

    posts.forEach(post => {
        html += `
            <article class="popular-post">
                <img src="${post.imagen}" alt="${post.titulo}">
                <div class="popular-post-content">
                    <h4>${post.titulo}</h4>
                    <div class="meta">
                        <span>👁️ ${post.views} vistas</span>
                    </div>
                </div>
            </article>
        `;
    });

    popularPosts.innerHTML = html;
}

// Renderizar ejercicios
function renderEjercicios() {
    const ejerciciosGrid = document.getElementById('ejerciciosGrid');
    if (!ejerciciosGrid) return;

    const ejercicios = blogData.ejercicios;
    let html = '';

    ejercicios.forEach(ejercicio => {
        const materia = blogData.materias.find(m => m.id === ejercicio.materiaId);
        html += `
            <article class="ejercicio-card">
                <h4>${ejercicio.titulo}</h4>
                <div class="meta">
                    <span>📚 ${materia.nombre}</span>
                    <span>📝 ${ejercicio.cantidad} ejercicios</span>
                </div>
                <a href="ejercicios.html?id=${ejercicio.id}" class="read-more">Ver ejercicios →</a>
            </article>
        `;
    });

    ejerciciosGrid.innerHTML = html;
}

// Renderizar contribuciones
function renderContribuciones() {
    const contribucionesList = document.getElementById('contribucionesGrid');
    if (!contribucionesList) return;

    const contribuciones = blogData.contribuciones;
    let html = '';

    contribuciones.forEach(contrib => {
        const materia = blogData.materias.find(m => m.id === contrib.materiaId);
        let tipoIcono = '';

        switch(contrib.tipo) {
            case 'PDF':
                tipoIcono = '📄';
                break;
            case 'VIDEO':
                tipoIcono = '🎬';
                break;
            case 'AUDIO':
                tipoIcono = '🎵';
                break;
            default:
                tipoIcono = '📎';
        }

        html += `
            <article class="contribucion-card">
                <h4>${tipoIcono} ${contrib.titulo}</h4>
                <div class="meta">
                    <span>📚 ${materia.nombre}</span>
                    <span>📅 ${formatDate(contrib.fecha)}</span>
                </div>
                <a href="contribuciones.html?id=${contrib.id}" class="read-more">Descargar →</a>
            </article>
        `;
    });

    contribucionesList.innerHTML = html;
}

// Formatear fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Buscar contenido
function searchContent() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.post-card, .post-list-item, .ejercicio-card, .contribucion-card');

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Toggle búsqueda
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
        document.getElementById('searchInput').focus();
    }
}

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Inicializar página de clase
function initClasePage() {
    const params = new URLSearchParams(window.location.search);
    const claseId = parseInt(params.get('id'));

    if (!claseId) return;

    const clase = blogData.clases.find(c => c.id === claseId);
    if (!clase) return;

    // Renderizar contenido
    document.getElementById('claseTitulo').textContent = clase.titulo;
    document.getElementById('claseFecha').textContent = formatDate(clase.fecha);
    document.getElementById('claseAutor').textContent = clase.autor;
    document.getElementById('claseMateria').textContent = blogData.materias.find(m => m.id === clase.materiaId).nombre;

    // Renderizar contenido Markdown
    const contentContainer = document.getElementById('clase-content');
    contentContainer.innerHTML = marked.parse(clase.contenido);

    // Renderizar clases relacionadas
    const relatedClasses = document.getElementById('relatedClasses');
    const related = blogData.clases
        .filter(c => c.materiaId === clase.materiaId && c.id !== clase.id)
        .slice(0, 3);

    if (related.length > 0) {
        let html = '';
        related.forEach(c => {
            html += `
                <article class="post-card">
                    <img src="${c.imagen}" alt="${c.titulo}">
                    <div class="post-card-content">
                        <h3>${c.titulo}</h3>
                        <a href="clase.html?id=${c.id}" class="read-more">Leer más →</a>
                    </div>
                </article>
            `;
        });
        relatedClasses.innerHTML = html;
    } else {
        relatedClasses.innerHTML = '<p>No hay clases relacionadas.</p>';
    }

    // Renderizar ejercicios
    const exerciseList = document.getElementById('exerciseList');
    const ejercicios = blogData.ejercicios.filter(e => e.materiaId === clase.materiaId);

    if (ejercicios.length > 0) {
        let html = '';
        ejercicios.forEach(ej => {
            html += `
                <article class="ejercicio-card">
                    <h4>${ej.titulo}</h4>
                    <div class="meta">
                        <span>📚 ${blogData.materias.find(m => m.id === ej.materiaId).nombre}</span>
                        <span>📝 ${ej.cantidad} ejercicios</span>
                    </div>
                    <a href="ejercicios.html?id=${ej.id}" class="read-more">Ver ejercicios →</a>
                </article>
            `;
        });
        exerciseList.innerHTML = html;
    } else {
        exerciseList.innerHTML = '<p>No hay ejercicios disponibles.</p>';
    }

    // Renderizar contribuciones
    const contribucionesList = document.getElementById('contribucionesGrid');
    const contribuciones = blogData.contribuciones.filter(c => c.materiaId === clase.materiaId);

    if (contribuciones.length > 0) {
        let html = '';
        contribuciones.forEach(contrib => {
            const materia = blogData.materias.find(m => m.id === contrib.materiaId);
            let tipoIcono = '';

            switch(contrib.tipo) {
                case 'PDF':
                    tipoIcono = '📄';
                    break;
                case 'VIDEO':
                    tipoIcono = '🎬';
                    break;
                case 'AUDIO':
                    tipoIcono = '🎵';
                    break;
                default:
                    tipoIcono = '📎';
            }

            html += `
                <article class="contribucion-card">
                    <h4>${tipoIcono} ${contrib.titulo}</h4>
                    <div class="meta">
                        <span>📚 ${materia.nombre}</span>
                        <span>📅 ${formatDate(contrib.fecha)}</span>
                    </div>
                    <a href="contribuciones.html?id=${contrib.id}" class="read-more">Descargar →</a>
                </article>
            `;
        });
        contribucionesList.innerHTML = html;
    } else {
        contribucionesList.innerHTML = '<p>No hay contribuciones disponibles.</p>';
    }
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el blog (materias y etiquetas)
    initBlog();

    // Inicializar la página de clase
    initClasePage();
});