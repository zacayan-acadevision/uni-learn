import express from 'express';
import { getMateriasWithClases } from '../services/materiaService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const materias = await getMateriasWithClases();
    res.render('blog/pages/home', { title: 'Home', materias, layout: 'blog/layouts/layout' });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});

export default router;
