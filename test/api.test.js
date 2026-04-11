import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

describe('API Materias y Clases CRUD', () => {
  let testMateriaId;
  let testClaseId;

  const MATERIA_ID_EXISTENTE = 1;

  beforeAll(async () => {
    try {
      console.log('Reseteando base de datos...');
      execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
      execSync('npm run db:seed', { std0: 'inherit' });

      const materia = await prisma.materias.create({
        data: { content: 'Materia de Prueba' }
      });
      testMateriaId = materia.id;
    } catch (error) {
      console.error('Error en el setup:', error);
      throw error;
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Pruebas para Materias', () => {
    it('debe crear una materia', async () => {
      const response = await request(app)
        .post('/api/materias')
        .send({ content: 'Nueva Materia Test' });
      expect(response.statusCode).toBe(201);
      expect(response.body.content).toBe('Nueva Materia Test');
    });

    it('debe modificar la materia de prueba', async () => {
      const response = await request(app)
        .put(`/api/materias/${testMateriaId}`)
        .send({ content: 'Materia Modificada' });
      expect(response.statusCode).toBe(200);
      expect(response.body.content).toBe('Materia Modificada');
    });

    it('debe borrar la materia de prueba', async () => {
      const response = await request(app).delete(`/api/materias/${testMateriaId}`);
      expect(response.statusCode).toBe(204);
    });
  });

  describe('Pruebas para Clases (usando materia ID 1)', () => {
    it('debe crear una clase para la materia 1', async () => {
      const response = await request(app)
        .post('/api/clases')
        .send({ content: 'Nueva Clase Test', materiaId: MATERIA_ID_EXISTENTE });
      expect(response.statusCode).toBe(201);
      testClaseId = response.body.id;
    });

    it('debe modificar la clase creada', async () => {
      const response = await request(app)
        .put(`/api/clases/${testClaseId}`)
        .send({ content: 'Clase Modificada' });
      expect(response.statusCode).toBe(200);
      expect(response.body.content).toBe('Clase Modificada');
    });

    it('debe borrar la clase creada', async () => {
      const response = await request(app).delete(`/api/clases/${testClaseId}`);
      expect(response.statusCode).toBe(204);
    });
  });
});
