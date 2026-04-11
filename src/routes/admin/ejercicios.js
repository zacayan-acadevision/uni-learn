import express from 'express';
import { getEjercicioById, updateEjercicioContent, deleteEjercicio } from '../../services/ejercicioService.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const ejercicio = await getEjercicioById(req.params.id);
    if (!ejercicio) return res.status(404).send('Ejercicio no encontrado');
    res.render('edit-ejercicio', { ejercicio, title: 'Editar Ejercicio', layout: 'layouts/layout' });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});

router.post('/:id', async (req, res) => {
  try {
    await updateEjercicioContent(req.params.id, req.body.content);
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar ejercicio');
  }
});

router.post('/:id/delete', async (req, res) => {
  try {
    await deleteEjercicio(req.params.id);
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar ejercicio');
  }
});

export default router;