import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data to avoid duplication during seeding
  await prisma.news.deleteMany();
  await prisma.contribuciones.deleteMany();
  await prisma.ejercicios.deleteMany();
  await prisma.clases.deleteMany();
  await prisma.materias.deleteMany();

  // Create 10 news items
  for (let i = 1; i <= 10; i++) {
    await prisma.news.create({
      data: {
        content: `Noticia importante ${i}: ¡Bienvenido a la nueva actualización!`,
      },
    });
  }

  const tipos = ['COMENTARIO', 'FILE', 'YOUTUBE', 'AUDIO', 'MARKDOWN'];

  for (let i = 1; i <= 5; i++) {
    const materia = await prisma.materias.create({
      data: {
        content: `Materia ${i}`,
        clases: {
          create: Array.from({ length: 5 }, (_, j) => ({
            titulo: `Título Clase ${j + 1} de Materia ${i}`,
            content: `Clase ${j + 1} de Materia ${i}`,
          })),
        },
        ejercicios: {
          create: Array.from({ length: 3 }, (_, k) => ({
            content: `Ejercicio ${k + 1} de Materia ${i}`,
          })),
        },
      },
      include: {
        clases: true,
      },
    });
    console.log(`Created materia: ${materia.content}`);

    // Crear 2 contribuciones de cada tipo por cada clase
    for (const clase of materia.clases) {
      for (const tipo of tipos) {
        for (let j = 1; j <= 2; j++) {
          await prisma.contribuciones.create({
            data: {
              content: `${tipo} ${j} para clase ${clase.id}`,
              tipo: tipo,
              claseId: clase.id
            }
          });
        }
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


