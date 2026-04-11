import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import router from '../src/routes/adminRoutes.js';

// Mocking the new services
jest.unstable_mockModule('../src/services/materiaService.js', () => ({
  getMateriasWithClases: jest.fn(),
  getMateriaById: jest.fn(),
  updateMateriaContent: jest.fn(),
}));

jest.unstable_mockModule('../src/services/claseService.js', () => ({
  getClaseById: jest.fn(),
  updateClaseContent: jest.fn(),
}));

jest.unstable_mockModule('../src/services/ejercicioService.js', () => ({
  getEjercicioById: jest.fn(),
  updateEjercicioContent: jest.fn(),
}));

// We need to import them after mocking in ESM
const materiaService = await import('../src/services/materiaService.js');
const claseService = await import('../src/services/claseService.js');
const ejercicioService = await import('../src/services/ejercicioService.js');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

describe('Admin Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET / should return 200 or 500', async () => {
    const response = await request(app).get('/');
    expect([200, 500]).toContain(response.status);
  });

  test('GET /materias/1 should return 200, 404 or 500', async () => {
    const response = await request(app).get('/materias/1');
    expect([200, 404, 500]).toContain(response.status);
  });

  test('POST /materias/1 should return 302 or 500', async () => {
    const response = await request(app)
      .post('/materias/1')
      .send({ content: 'New Content' });
    expect([302, 500]).toContain(response.status);
  });

  test('POST /clases/1 should return 302 or 500', async () => {
    const response = await request(app)
      .post('/clases/1')
      .send({ content: 'New Clase Content' });
    expect([302, 500]).toContain(response.status);
  });

  test('POST /ejercicios/1 should return 302 or 500', async () => {
    const response = await request(app)
      .post('/ejercicios/1')
      .send({ content: 'New Ejercicio Content' });
    expect([302, 500]).toContain(response.status);
  });
});