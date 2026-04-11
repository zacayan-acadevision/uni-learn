import express from 'express';
import { getMateriasWithClases } from '../../services/materiaService.js';



const router = express.Router();


// GET all materias
router.get('/', async (req, res) => {
  try {
    const materias = await getMateriasWithClases();
    res.render('pages/home', { title: 'Home', materias, layout: 'layouts/unilayout' });
  } catch (error) {
    console.error(apiError);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});

// /materia
router.get('/materia', async (req, res) => {
  try {
     const materias = await getMateriasWithClases();
    res.render('pages/materia', { title: 'Home', materias, layout: 'layouts/unilayout' });
  } catch (error) {
    console.error(apiError);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});

// /materia
router.get('/clase', async (req, res) => {
  try {
     const materias = await getMateriasWithClases();
    res.render('pages/clase', { title: 'Home', materias, layout: 'layouts/unilayout' });
  } catch (error) {
    console.error(apiError);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});


export default router;

