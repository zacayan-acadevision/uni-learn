import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEjercicioById = async (id) => {
  return await prisma.ejercicios.findUnique({
    where: { id: parseInt(id) },
  });
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