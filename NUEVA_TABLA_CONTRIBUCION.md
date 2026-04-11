# Documentación: Nueva Tabla Contribución

## Objetivo
Crear una nueva tabla llamada `contribucion` (en inglés: `contribution`) que depende de la tabla `clases`.

## Requisitos
- Tabla con único campo `content`
- 3 contribuciones por cada clase
- URL: `/materia/{id}/clase/{id}` para ver contribuciones
- Panel de administración para gestionar contribuciones
- API REST para CRUD de contribuciones
- Formularios de edición y eliminación
- Pruebas unitarias

## Pasos a Seguir

### 1. Crear Entidad en Prisma
**Archivo:** `prisma/schema.prisma`

```prisma
model Contribucion {
  id        Int      @id @default(autoincrement())
  content   String
  claseId   Int
  clase     Clase    @relation(fields: [claseId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 2. Migración de Base de Datos
```bash
npx prisma migrate dev --name add_contribucion_table
```

### 3. Generar Cliente Prisma
```bash
npx prisma generate
```

### 4. Actualizar Base de Datos
```bash
npx prisma db push
```

### 5. Crear Servicio
**Archivo:** `src/services/contribucionService.js`

```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getClaseWithContribuciones = async (claseId) => {
  return await prisma.clases.findUnique({
    where: { id: parseInt(claseId) },
    include: {
      contribuciones: true
    }
  });
};

export const getContribucionById = async (id) => {
  return await prisma.contribuciones.findUnique({
    where: { id: parseInt(id) }
  });
};

export const createContribucion = async (data) => {
  return await prisma.contribuciones.create({
    data
  });
};

export const updateContribucion = async (id, content) => {
  return await prisma.contribuciones.update({
    where: { id: parseInt(id) },
    data: { content }
  });
};

export const deleteContribucion = async (id) => {
  return await prisma.contribuciones.delete({
    where: { id: parseInt(id) }
  });
};
```

### 6. Crear Rutas en AdminRoutes
**Archivo:** `src/routes/adminRoutes.js`

```javascript
import { getEjercicioById, updateEjercicioContent } from '../services/ejercicioService.js';
import {
  getClaseWithContribuciones,
  getContribucionById,
  createContribucion,
  updateContribucion,
  deleteContribucion
} from '../services/contribucionService.js';

// ... rutas existentes ...

// GET /admin/clase/:id/contribuciones
router.get('/clase/:id/contribuciones', async (req, res) => {
  try {
    const { id } = req.params;
    const clase = await getClaseWithContribuciones(id);
    if (!clase) return res.status(404).send('Clase no encontrada');
    res.render('contribuciones', {
      clase,
      title: 'Contribuciones',
      layout: 'layouts/layout'
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { title: 'Internal Server Error' });
  }
});

// POST /admin/clase/:id/contribuciones
router.post('/clase/:id/contribuciones', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    await createContribucion({
      content,
      claseId: parseInt(id)
    });
    res.redirect(`/admin/clase/${id}/contribuciones`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear contribución');
  }
});

// GET /admin/clase/:id/contribuciones/:id
router.get('/clase/:id/contribuciones/:id', async (req, res) => {
  try {
    const { id, contribucionId } = req.params;
    const contribucion = await getContribucionById(contribucionId);
    if (!contribucion) return res.status(404).send('Contribución no encontrada');
    res.render('edit-contribucion', {
      contribucion,
      title: 'Editar Contribución',
      layout: 'layouts/layout'
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { title: 'Internal Server Error' });
  }
});

// POST /admin/clase/:id/contribuciones/:id
router.post('/clase/:id/contribuciones/:id', async (req, res) => {
  try {
    const { id, contribucionId } = req.params;
    const { content } = req.body;
    await updateContribucion(contribucionId, content);
    res.redirect(`/admin/clase/${id}/contribuciones`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar contribución');
  }
});

// DELETE /admin/clase/:id/contribuciones/:id
router.delete('/clase/:id/contribuciones/:id', async (req, res) => {
  try {
    const { id, contribucionId } = req.params;
    const contribucion = await getContribucionById(contribucionId);
    await deleteContribucion(contribucionId);
    res.redirect(`/admin/clase/${id}/contribuciones`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar contribución');
  }
});

export default router;
```

### 7. Crear API REST
**Archivo:** `src/routes/api.js`

```javascript
// ... endpoints existentes ...

// --- CONTRIBUTION ENDPOINTS ---

// GET all contribuciones
router.get('/contribuciones', async (req, res) => {
  try {
    const contribuciones = await prisma.contribuciones.findMany({
      include: { clase: true }
    });
    res.json(contribuciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create contribucion
router.post('/contribuciones', async (req, res) => {
  try {
    const { content, claseId } = req.body;
    const nuevaContribucion = await prisma.contribuciones.create({
      data: {
        content,
        claseId: parseInt(claseId)
      }
    });
    res.status(201).json(nuevaContribucion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update contribucion
router.put('/contribuciones/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const contribucionActualizada = await prisma.contribuciones.update({
      where: { id: parseInt(id) },
      data: { content }
    });
    res.json(contribucionActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE contribucion
router.delete('/contribuciones/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contribuciones.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 8. Crear Vistas EJS

**Archivo:** `views/contribuciones.ejs`

```ejs
<h1 id="title">Contribuciones</h1>
<h2><%= clase.content %></h2>
<ul>
  <% clase.contribuciones.forEach(contribucion => { %>
    <li>
      <%= contribucion.content %>
      <a href="/admin/clase/<%= clase.id %>/contribuciones/<%= contribucion.id %>">Editar</a>
      <form action="/admin/clase/<%= clase.id %>/contribuciones/<%= contribucion.id %>" method="POST" style="display: inline;">
        <input type="hidden" name="_method" value="DELETE">
        <button type="submit" style="color: red; background: none; border: 1px solid red; padding: 5px 10px; cursor: pointer; margin-left: 10px;">Eliminar</button>
      </form>
    </li>
  <% }) %>
</ul>
<a href="/admin/clase/<%= clase.id %>">Volver</a>
```

**Archivo:** `views/edit-contribucion.ejs`

```ejs
<h1 id="title">Editar Contribución</h1>
<form action="/admin/clase/<%= contribucion.claseId %>/contribuciones/<%= contribucion.id %>" method="POST">
  <label for="content">Contenido:</label>
  <textarea name="content" id="content"><%= contribucion.content %></textarea>
  <button type="submit">Guardar</button>
</form>
<form action="/admin/clase/<%= contribucion.claseId %>/contribuciones/<%= contribucion.id %>" method="POST" style="display: inline;">
  <input type="hidden" name="_method" value="DELETE">
  <button type="submit" style="color: red; background: none; border: 1px solid red; padding: 5px 10px; cursor: pointer; margin-left: 10px;">Eliminar</button>
</form>
<a href="/admin/clase/<%= contribucion.claseId %>/contribuciones">Volver</a>
```

### 9. Registrar Rutas en app.js
```javascript
import contribucionRoutes from './routes/contribucionRoutes.js';

app.use('/admin', contribucionRoutes);
```

### 10. Actualizar Seed
**Archivo:** `prisma/seed.js`

```javascript
// ... seed existente ...

// Crear 3 contribuciones por cada clase
for (const clase of clases) {
  for (let i = 1; i <= 3; i++) {
    await prisma.contribuciones.create({
      data: {
        content: `Contribución ${i} para clase ${clase.id}`,
        claseId: clase.id
      }
    });
  }
}
```

### 11. Pruebas Unitarias
**Archivo:** `test/contribucionService.test.js`

```javascript
import { getClaseWithContribuciones, getContribucionById, createContribucion, updateContribucion, deleteContribucion } from '../src/services/contribucionService.js';

describe('ContribucionService', () => {
  test('getClaseWithContribuciones returns clase with contributions', async () => {
    const clase = await getClaseWithContribuciones(1);
    expect(clase).toBeDefined();
    expect(clase.contribuciones).toBeDefined();
  });

  test('getContribucionById returns contribution', async () => {
    const contribucion = await getContribucionById(1);
    expect(contribucion).toBeDefined();
  });

  test('createContribucion creates new contribution', async () => {
    const nueva = await createContribucion({
      content: 'Nueva contribución',
      claseId: 1
    });
    expect(nueva).toBeDefined();
    expect(nueva.content).toBe('Nueva contribución');
  });

  test('updateContribucion updates content', async () => {
    const actualizada = await updateContribucion(1, 'Contenido actualizado');
    expect(actualizada.content).toBe('Contenido actualizado');
  });

  test('deleteContribucion deletes contribution', async () => {
    await deleteContribucion(1);
    const contribucion = await getContribucionById(1);
    expect(contribucion).toBeNull();
  });
});
```

### 12. Ejecutar Pruebas
```bash
npm test
```

## Lista de Pendientes

- [ ] Crear entidad `Contribucion` en `prisma/schema.prisma`
- [ ] Crear migración `add_contribucion_table`
- [ ] Generar cliente Prisma
- [ ] Actualizar base de datos con `db push`
- [ ] Crear archivo `src/services/contribucionService.js`
- [ ] Agregar rutas en `src/routes/adminRoutes.js`:
  - [ ] GET `/admin/clase/:id/contribuciones`
  - [ ] POST `/admin/clase/:id/contribuciones`
  - [ ] GET `/admin/clase/:id/contribuciones/:id`
  - [ ] POST `/admin/clase/:id/contribuciones/:id`
  - [ ] DELETE `/admin/clase/:id/contribuciones/:id`
- [ ] Agregar endpoints en `src/routes/api.js`:
  - [ ] GET `/api/contribuciones`
  - [ ] POST `/api/contribuciones`
  - [ ] PUT `/api/contribuciones/:id`
  - [ ] DELETE `/api/contribuciones/:id`
- [ ] Crear vista `views/contribuciones.ejs`
- [ ] Crear vista `views/edit-contribucion.ejs`
- [ ] Actualizar `prisma/seed.js`
- [ ] Crear archivo `test/contribucionService.test.js`
- [ ] Ejecutar pruebas unitarias
- [ ] Verificar respuesta 200 para GET `/contribucion/:id`
- [ ] Verificar respuesta 201 para POST `/contribuciones`
- [ ] Verificar respuesta 200 para PUT `/contribuciones/:id`
- [ ] Verificar respuesta 204 para DELETE `/contribuciones/:id`
- [ ] Verificar formularios de edición y eliminación
- [ ] Verificar panel de administración