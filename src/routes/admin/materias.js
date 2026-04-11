import express from 'express';
import { getMateriaById, updateMateriaContent, deleteMateria } from '../../services/materiaService.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const materia = await getMateriaById(req.params.id);
    if (!materia) return res.status(404).send('Materia no encontrada');
    res.render('edit-materia', { materia, title: 'Editar Materia', layout: 'layouts/layout' });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});

router.post('/:id', async (req, res) => {
  try {
    await updateMateriaContent(req.params.id, req.body.content);
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar materia');
  }
});

router.post('/:id/delete', async (req, res) => {
  try {
    await deleteMateria(req.params.id);
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar materia');
  }
});

export default router;