import express from 'express';
import { getMateriaById, getMateriasWithClases } from '../../services/materiaService.js';
import { getClaseById } from '../../services/claseService.js';
import { getEjercicioWithNavigation } from '../../services/ejercicioService.js';
import { getEjerciciosByMateriaId } from '../../services/ejercicioService.js';
import { getClaseWithContribuciones } from '../../services/contribucionService.js';
import { getNews } from '../../services/newsService.js';



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
    const news = await getNews();
    const clases = await getMateriaById(materiaId);
    const ejercicios = await getEjerciciosByMateriaId(materiaId);
    res.render('pages/materia', { title: 'Home', clases, ejercicios, news, layout: 'layouts/unilayout' });
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
    const news = await getNews();
    const clase = await getClaseById(claseId);
    if (!clase) {
      return res.status(404).render('404', { title: 'Not Found', layout: 'layouts/layout' });
    }
    const ejercicios = await getEjerciciosByMateriaId(materiaId);
    const contributions = await getClaseWithContribuciones(claseId);
    res.render('pages/clase', { title: 'Home', clase, ejercicios, contributions, news, layout: 'layouts/unilayout' });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});

// /novedades
router.get('/novedades', async (req, res) => {
  try {
    const news = await getNews();
    res.render('pages/novedades', { title: 'Home', news, layout: 'layouts/unilayout' });
  } catch (error) {
    console.error(error);
  }
});


//admin
router.get('/admin', async (req, res) => {
  try {
    const news = await getNews();
    res.render('pages/novedades', { title: 'Home', news, layout: 'layouts/unilayout' });
  } catch (error) {
    console.error(error);
  }
});

// /materia/:id/ejercicio/:ejercicioId
router.get('/materia/:id/ejercicio/:ejercicioId', async (req, res) => {
  const materiaId = req.params.id;
  const ejercicioId = req.params.ejercicioId;
  try {
    const news = await getNews();
    const ejercicio = await getEjercicioWithNavigation(ejercicioId);
    if (!ejercicio) {
      return res.status(404).render('404', { title: 'Not Found', layout: 'layouts/layout' });
    }
    const ejercicios = await getEjerciciosByMateriaId(materiaId);
    const clases = await getMateriaById(materiaId);
    res.render('pages/ejercicio', { title: 'Home', ejercicio, ejercicios, news, clases, layout: 'layouts/unilayout' });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { title: 'Internal Server Error', layout: 'layouts/layout' });
  }
});


export default router;

