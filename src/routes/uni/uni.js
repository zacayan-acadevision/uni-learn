import express from 'express';
import { getMateriaById, getMateriasWithClases } from '../../services/materiaService.js';
import { getClaseById } from '../../services/claseService.js';
import { getEjerciciosByMateriaId } from '../../services/ejercicioService.js';
import { getClaseWithContribuciones } from '../../services/contribucionService.js';



const router = express.Router();


// GET all materias
router.get('/', async (req, res) => {
  try {
    const materias = await getMateriasWithClases();
    res.render('pages/home', { title: 'Home', materias, layout: 'layouts/unilayout' });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});

// /materia
router.get('/materia/:id', async (req, res) => {
  const materiaId = req.params.id;
  try {
    const clases = await getMateriaById(materiaId);
    res.render('pages/materia', { title: 'Home', clases, layout: 'layouts/unilayout' });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});

// /materia
router.get('/materia/:id/clase/:claseId', async (req, res) => {
  const materiaId = req.params.id;
  const claseId = req.params.claseId;
  try {
    const clase = await getClaseById(claseId);
    console.log(clase);
    const ejercicios = await getEjerciciosByMateriaId(materiaId);
    const contributions = await getClaseWithContribuciones(claseId);
    res.render('pages/clase', { title: 'Home', clase, ejercicios, contributions, layout: 'layouts/unilayout' });
  } catch (error) {
    console.error(apiError);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});


export default router;

