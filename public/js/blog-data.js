// Datos Mock del Blog
const blogData = {
    materias: [
        { id: 1, nombre: 'Cálculo I', icono: '📊', descripcion: 'Introducción al cálculo diferencial e integral' },
        { id: 2, nombre: 'Cálculo II', icono: '📈', descripcion: 'Cálculo avanzado y series' },
        { id: 3, nombre: 'Álgebra Lineal', icono: '🔢', descripcion: 'Espacios vectoriales y matrices' },
        { id: 4, nombre: 'Ecuaciones Diferenciales', icono: '🌊', descripcion: 'Modelado matemático de sistemas dinámicos' },
        { id: 5, nombre: 'Probabilidad y Estadística', icono: '🎲', descripcion: 'Análisis de datos y aleatoriedad' }
    ],
    clases: [
        {
            id: 1,
            materiaId: 1,
            titulo: 'Límites y Continuidad',
            fecha: '2024-01-15',
            autor: 'Prof. García',
            contenido: '# Límites y Continuidad\n\n## Introducción\n\nLos límites son fundamentales en el cálculo.',
            imagen: '/images/generic-placeholder.svg',
            tags: ['cálculo', 'límites', 'continuidad'],
            popularidad: 95
        },
        {
            id: 2,
            materiaId: 1,
            titulo: 'Derivadas',
            fecha: '2024-01-22',
            autor: 'Prof. García',
            contenido: '# Derivadas\n\n## Definición\n\nLa derivada de una función f(x) en un punto a es:',
            imagen: '/images/generic-placeholder.svg',
            tags: ['cálculo', 'derivadas', 'reglas'],
            popularidad: 88
        },
        {
            id: 3,
            materiaId: 1,
            titulo: 'Integrales',
            fecha: '2024-01-29',
            autor: 'Prof. García',
            contenido: '# Integrales\n\n## Definición\n\nLa integral indefinida de una función f(x) es:',
            imagen: '/images/generic-placeholder.svg',
            tags: ['cálculo', 'integrales', 'áreas'],
            popularidad: 82
        },
        {
            id: 4,
            materiaId: 2,
            titulo: 'Series y Sucesiones',
            fecha: '2024-02-05',
            autor: 'Prof. López',
            contenido: '# Series y Sucesiones\n\n## Sucesiones\n\nUna sucesión es una función definida en los números naturales.',
            imagen: '/images/generic-placeholder.svg',
            tags: ['cálculo', 'series', 'sucesiones'],
            popularidad: 75
        },
        {
            id: 5,
            materiaId: 3,
            titulo: 'Vectores',
            fecha: '2024-02-12',
            autor: 'Prof. Martínez',
            contenido: '# Vectores\n\n## Definición\n\nUn vector es una cantidad que tiene magnitud y dirección.',
            imagen: '/images/generic-placeholder.svg',
            tags: ['álgebra', 'vectores', 'espacios'],
            popularidad: 70
        },
        {
            id: 6,
            materiaId: 4,
            titulo: 'Ecuaciones Diferenciales',
            fecha: '2024-02-19',
            autor: 'Prof. Rodríguez',
            contenido: '# Ecuaciones Diferenciales\n\n## Definición\n\nUna ecuación diferencial de primer orden es de la forma:',
            imagen: '/images/generic-placeholder.svg',
            tags: ['ecuaciones', 'diferenciales', 'primer orden'],
            popularidad: 65
        },
        {
            id: 7,
            materiaId: 5,
            titulo: 'Variables Aleatorias',
            fecha: '2024-02-26',
            autor: 'Prof. Sánchez',
            contenido: '# Variables Aleatorias\n\n## Definición\n\nUna variable aleatoria es una función que asigna un número real.',
            imagen: '/images/generic-placeholder.svg',
            tags: ['probabilidad', 'estadística', 'variables'],
            popularidad: 60
        }
    ],
    ejercicios: [
        { id: 1, materiaId: 1, titulo: 'Ejercicios de Límites', descripcion: 'Practica con límites y continuidad', cantidad: 15, tags: ['cálculo', 'límites', 'ejercicios'] },
        { id: 2, materiaId: 1, titulo: 'Ejercicios de Derivadas', descripcion: 'Practica con derivadas y reglas', cantidad: 20, tags: ['cálculo', 'derivadas', 'ejercicios'] },
        { id: 3, materiaId: 1, titulo: 'Ejercicios de Integrales', descripcion: 'Practica con integrales', cantidad: 18, tags: ['cálculo', 'integrales', 'ejercicios'] },
        { id: 4, materiaId: 2, titulo: 'Ejercicios de Series', descripcion: 'Practica con series y sucesiones', cantidad: 12, tags: ['cálculo', 'series', 'ejercicios'] },
        { id: 5, materiaId: 3, titulo: 'Ejercicios de Álgebra Lineal', descripcion: 'Practica con vectores y matrices', cantidad: 25, tags: ['álgebra', 'vectores', 'ejercicios'] },
        { id: 6, materiaId: 4, titulo: 'Ejercicios de Ecuaciones Diferenciales', descripcion: 'Practica con ecuaciones diferenciales', cantidad: 16, tags: ['ecuaciones', 'diferenciales', 'ejercicios'] },
        { id: 7, materiaId: 5, titulo: 'Ejercicios de Probabilidad', descripcion: 'Practica con probabilidad y estadística', cantidad: 22, tags: ['probabilidad', 'estadística', 'ejercicios'] }
    ],
    contribuciones: [
        { id: 1, materiaId: 1, tipo: 'PDF', titulo: 'Guía de Estudio: Límites y Continuidad', fecha: '2024-01-15', tamaño: '2.5 MB' },
        { id: 2, materiaId: 1, tipo: 'VIDEO', titulo: 'Video: Introducción al Cálculo', fecha: '2024-01-16', duracion: '45 min' },
        { id: 3, materiaId: 1, tipo: 'AUDIO', titulo: 'Audio: Clase de Derivadas', fecha: '2024-01-22', duracion: '30 min' },
        { id: 4, materiaId: 2, tipo: 'PDF', titulo: 'Guía de Estudio: Series y Sucesiones', fecha: '2024-02-05', tamaño: '1.8 MB' },
        { id: 5, materiaId: 3, tipo: 'VIDEO', titulo: 'Video: Vectores en 3D', fecha: '2024-02-12', duracion: '60 min' },
        { id: 6, materiaId: 4, tipo: 'PDF', titulo: 'Guía de Estudio: Ecuaciones Diferenciales', fecha: '2024-02-19', tamaño: '2.2 MB' },
        { id: 7, materiaId: 5, tipo: 'VIDEO', titulo: 'Video: Probabilidad y Estadística', fecha: '2024-02-26', duracion: '50 min' }
    ],
    tags: ['cálculo', 'álgebra', 'ecuaciones', 'probabilidad', 'estadística', 'límites', 'derivadas', 'integrales', 'series', 'vectores', 'matrices', 'diferenciales', 'variables', 'sucesiones'],
    popularPosts: [
        { id: 1, titulo: 'Límites y Continuidad', imagen: '/images/generic-placeholder.svg', views: 1250 },
        { id: 2, titulo: 'Derivadas', imagen: '/images/generic-placeholder.svg', views: 980 },
        { id: 3, titulo: 'Integrales', imagen: '/images/generic-placeholder.svg', views: 875 }
    ]
};