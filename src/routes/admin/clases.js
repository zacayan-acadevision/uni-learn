import express from 'express';
import { getClaseById, updateClaseContent, deleteClase } from '../../services/claseService.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const clase = await getClaseById(req.params.id);
    if (!clase) return res.status(404).send('Clase no encontrada');
    res.render('edit-clase', { clase, title: 'Editar Clase', layout: 'layouts/layout' });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});

router.post('/:id', async (req, res) => {
  try {
    await updateClaseContent(req.params.id, req.body.content);
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar clase');
  }
});

router.post('/:id/delete', async (req, res) => {
  try {
    await deleteClase(req.params.id);
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar clase');
  }
});

export default router;