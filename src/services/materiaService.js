import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMateriasWithClases = async () => {
  return await prisma.materias.findMany({
    include: {
      clases: true,
      ejercicios: true,
    },
  });
};

export const getMateriaById = async (id) => {
  return await prisma.materias.findUnique({
    where: { id: parseInt(id) },
    include: {
      clases: {
        orderBy: [
          { fecha: 'asc' },  // Primero ordena por fecha ascendente
          { id: 'asc' }      // Luego por id para mantener consistencia
        ]
      },
      ejercicios: true,
    },
  });
};

export const updateMateriaContent = async (id, content) => {
  return await prisma.materias.update({
    where: { id: parseInt(id) },
    data: { content },
  });
};

export const deleteMateria = async (id) => {
  return await prisma.materias.delete({
    where: { id: parseInt(id) },
  });
};