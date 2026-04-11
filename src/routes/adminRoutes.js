import materiasRouter from './admin/materias.js';
import clasesRouter from './admin/clases.js';
import ejerciciosRouter from './admin/ejercicios.js';
import contribucionesRouter from './admin/contribuciones.js';
import { getMateriasWithClases } from '../services/materiaService.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const materias = await getMateriasWithClases();
    res.render('admin', { title: 'Admin Panel', materias, layout: 'layouts/layout' });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});

router.use('/materias', materiasRouter);
router.use('/clases', clasesRouter);
router.use('/ejercicios', ejerciciosRouter);
router.use('/clase', contribucionesRouter);

export default router;