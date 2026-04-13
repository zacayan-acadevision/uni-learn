import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getClaseById = async (intId) => {
  const currentClase = await prisma.clases.findUnique({
    where: { id: parseInt(intId) },
  });

  if (!currentClase) return null;

  // Obtener todas las clases de la materia
  const allClasses = await prisma.clases.findMany({
    where: { materiaId: currentClase.materiaId },
    orderBy: { id: 'asc' },
  });

  // Filtrar clases con fecha y sin fecha
  const clasesConFecha = allClasses.filter(clase => clase.fecha);
  const clasesSinFecha = allClasses.filter(clase => !clase.fecha);

  // Ordenar clases con fecha por fecha ascendente
  clasesConFecha.sort((a, b) => {
    if (!a.fecha) return 1;
    if (!b.fecha) return -1;
    return new Date(a.fecha) - new Date(b.fecha);
  });

  // Ordenar clases sin fecha por id ascendente
  clasesSinFecha.sort((a, b) => a.id - b.id);

  // Combinar: primero las con fecha, luego las sin fecha
  const clasesOrdenadas = [...clasesConFecha, ...clasesSinFecha];

  // Encontrar el índice de la clase actual
  const currentIndex = clasesOrdenadas.findIndex(clase => clase.id === currentClase.id);

  // Determinar la clase anterior y siguiente
  const prevClass = currentIndex > 0 ? clasesOrdenadas[currentIndex - 1] : null;
  const nextClass = currentIndex < clasesOrdenadas.length - 1 ? clasesOrdenadas[currentIndex + 1] : null;

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