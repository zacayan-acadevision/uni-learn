import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getClaseById = async (intId) => {
  const currentClase = await prisma.clases.findUnique({
    where: { id: parseInt(intId) },
  });

  if (!currentClase) return null;

  const [prevClass, nextClass] = await Promise.all([
    prisma.clases.findFirst({
      where: {
        materiaId: currentClase.materiaId,
        id: { lt: currentClase.id },
      },
      orderBy: { id: 'desc' },
    }),
    prisma.clases.findFirst({
      where: {
        materiaId: currentClase.materiaId,
        id: { gt: currentClase.id },
      },
      orderBy: { id: 'asc' },
    }),
  ]);

  return {
    ...currentClase,
    prevClass,
    nextClass,
  };
};

export const updateClaseContent = async (id, content) => {
  return await prisma.clases.update({
    where: { id: parseInt(id) },
    data: { content },
  });
};

export const updateClaseFecha = async (id, fecha) => {
  return await prisma.clases.update({
    where: { id: parseInt(id) },
    data: { fecha: fecha ? new Date(fecha) : null },
  });
};

export const deleteClase = async (id) => {
  return await prisma.clases.delete({
    where: { id: parseInt(id) },
  });
};