import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// --- MATERIAS ENDPOINTS ---

// GET all materias
router.get('/materias', async (req, res) => {
  try {
    const materias = await prisma.materias.findMany({
      include: { clases: true }
    });
    res.json(materias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create materia
router.post('/materias', async (req, res) => {
  try {
    const { content } = req.body;
    const nuevaMateria = await prisma.materias.create({
      data: { content }
    });
    res.status(201).json(nuevaMateria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update materia
router.put('/materias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const materiaActualizada = await prisma.materias.update({
      where: { id: parseInt(id) },
      data: { content }
    });
    res.json(materiaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE materia
router.delete('/materias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.materias.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- CLASES ENDPOINTS ---

// GET all clases
router.get('/clases', async (req, res) => {
  try {
    const clases = await prisma.clases.findMany({
      include: { materias: true }
    });
    res.json(clases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create clase
router.post('/clases', async (req, res) => {
  try {
    const { titulo, materiaId } = req.body;
    const nuevaClase = await prisma.clases.create({
      data: {
        titulo,
        materiaId: parseInt(materiaId)
      }
    });
    res.status(201).json(nuevaClase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update clase
router.put('/clases/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, content, fecha } = req.body;
    const updateData = {};
    if (titulo !== undefined) updateData.titulo = titulo;
    if (content !== undefined) updateData.content = content;
    if (fecha !== undefined) {
      if (fecha) {
        // Validar formato yyyy-mm-dd
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (regex.test(fecha)) {
          updateData.fecha = new Date(fecha);
        } else {
          return res.status(400).json({ error: 'Formato de fecha inválido. Use yyyy-mm-dd' });
        }
      } else {
        updateData.fecha = null;
      }
    }
    const claseActualizada = await prisma.clases.update({
      where: { id: parseInt(id) },
      data: updateData
    });
    res.json(claseActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE clase
router.delete('/clases/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.clases.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
    const { content, claseId, tipo } = req.body;

    if (!tipo) {
      return res.status(400).json({ error: 'El campo tipo es requerido' });
    }

    const tiposValidos = ['COMENTARIO', 'FILE', 'YOUTUBE', 'AUDIO', 'MARKDOWN'];

    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({ error: 'Tipo de contribución no válido' });
    }

    const nuevaContribucion = await prisma.contribuciones.create({
      data: {
        content,
        claseId: parseInt(claseId),
        tipo
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

// --- EJERCICIOS ENDPOINTS ---

// GET all ejercicios
router.get('/ejercicios', async (req, res) => {
  try {
    const ejercicios = await prisma.ejercicios.findMany({
      include: { materias: true }
    });
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create ejercicio
router.post('/ejercicios', async (req, res) => {
  try {
    const { content, materiaId } = req.body;
    const nuevoEjercicio = await prisma.ejercicios.create({
      data: {
        content,
        materiaId: parseInt(materiaId)
      }
    });
    res.status(201).json(nuevoEjercicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update ejercicio
router.put('/ejercicios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const ejercicioActualizado = await prisma.ejercicios.update({
      where: { id: parseInt(id) },
      data: { content }
    });
    res.json(ejercicioActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE ejercicio
router.delete('/ejercicios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.ejercicios.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;





