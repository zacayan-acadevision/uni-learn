import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEjercicioById = async (id) => {
  return await prisma.ejercicios.findUnique({
    where: { id: parseInt(id) },
  });
};

export const getEjercicioWithNavigation = async (id) => {
  const currentEjercicio = await prisma.ejercicios.findUnique({
    where: { id: parseInt(id) },
  });

  if (!currentEjercicio) return null;

  const [prevEjercicio, nextEjercicio] = await Promise.all([
    prisma.ejercicios.findFirst({
      where: {
        materiaId: currentEjercicio.materiaId,
        id: { lt: currentEjercicio.id },
      },
      orderBy: { id: 'desc' },
    }),
    prisma.ejercicios.findFirst({
      where: {
        materiaId: currentEjercicio.materiaId,
        id: { gt: currentEjercicio.id },
      },
      orderBy: { id: 'asc' },
    }),
  ]);

  return {
    ...currentEjercicio,
    prevEjercicio,
    nextEjercicio,
  };
};

export const updateEjercicioContent = async (id, content) => {
  return await prisma.ejercicios.update({
    where: { id: parseInt(id) },
    data: { content },
  });
};

export const deleteEjercicio = async (id) => {
  return await prisma.ejercicios.delete({
    where: { id: parseInt(id) },
  });
};

export const getEjerciciosByMateriaId = async (materiaId) => {
  return await prisma.ejercicios.findMany({
    where: { materiaId: parseInt(materiaId) },
  });
};

export const createEjercicio = async (materiaId, content) => {
  return await prisma.ejercicios.create({
    data: {
      content,
      materiaId: parseInt(materiaId),
    },
  });
};
