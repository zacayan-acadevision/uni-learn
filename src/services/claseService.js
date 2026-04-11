import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getClaseById = async (intId) => {
  return await prisma.clases.findUnique({
    where: { id: parseInt(intId) },
  });
};

export const updateClaseContent = async (id, content) => {
  return await prisma.clases.update({
    where: { id: parseInt(id) },
    data: { content },
  });
};

export const deleteClase = async (id) => {
  return await prisma.clases.delete({
    where: { id: parseInt(id) },
  });
};