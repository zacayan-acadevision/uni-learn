import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getClaseWithContribuciones = async (claseId) => {
  return await prisma.clases.findUnique({
    where: { id: parseInt(claseId) },
    include: {
      contribuciones: true
    }
  });
};

export const getContribucionById = async (id) => {
  return await prisma.contribuciones.findUnique({
    where: { id: parseInt(id) }
  });
};

export const createContribucion = async (data) => {
  return await prisma.contribuciones.create({
    data
  });
};

export const updateContribucion = async (id, content) => {
  return await prisma.contribuciones.update({
    where: { id: parseInt(id) },
    data: { content }
  });
};

export const deleteContribucion = async (id) => {
  return await prisma.contribuciones.delete({
    where: { id: parseInt(id) }
  });
};

//get contrinbution by classid