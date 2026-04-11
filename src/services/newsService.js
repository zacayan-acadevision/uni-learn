import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getNews = async () => {
  return await prisma.news.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getNewsById = async (id) => {
  return await prisma.news.findUnique({
    where: { id: parseInt(id) },
  });
};

export const createNews = async (content) => {
  return await prisma.news.create({
    data: { content },
  });
};

export const updateNewsContent = async (id, content) => {
  return await prisma.news.update({
    where: { id: parseInt(id) },
    data: { content },
  });
};

export const deleteNews = async (id) => {
  return await prisma.news.delete({
    where: { id: parseInt(id) },
  });
};
