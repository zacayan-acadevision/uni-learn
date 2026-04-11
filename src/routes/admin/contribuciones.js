import express from 'express';
import {
  getClaseWithContribuciones,
  getContribucionById,
  createContribucion,
  updateContribucion,
  deleteContribucion
} from '../../services/contribucionService.js';

const router = express.Router();

// GET /admin/clase/:id/contribuciones
router.get('/:id/contribuciones', async (req, res) => {
  try {
    const id = req.params.id
    
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
router.post('/:id/contribuciones', async (req, res) => {
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
router.get('/:id/contribuciones/:contribucionId', async (req, res) => {
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
router.post('/:id/contribuciones/:contribucionId', async (req, res) => {
  try {
    const { id, contribucionId } = req.params;
    const { content, _method } = req.body;
    if(_method === 'DELETE') {
      res.send('Eliminando contribución...'); // Enviar respuesta antes de eliminar
      return;
    }
    await updateContribucion(contribucionId, content);
    res.redirect(`/admin/clase/${id}/contribuciones`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar contribución');
  }
});

// DELETE /admin/clase/:id/contribuciones/:id
router.post('/:id/contribuciones/:contribucionId/delete', async (req, res) => {
  try {
    const { id, contribucionId } = req.params;
    const contribucion = await getContribucionById(contribucionId);
    if (!contribucion) {
      return res.status(404).send('Contribución no encontrada');
    }
    await deleteContribucion(contribucionId);
    res.redirect(`/admin/clase/${id}/contribuciones`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar contribución');
  }
});

export default router;