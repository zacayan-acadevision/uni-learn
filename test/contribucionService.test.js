import { getClaseWithContribuciones, getContribucionById, createContribucion, updateContribucion, deleteContribucion } from '../src/services/contribucionService.js';

describe('ContribucionService', () => {
  test('getClaseWithContribuciones returns clase with contributions', async () => {
    const clase = await getClaseWithContribuciones(1);
    expect(clase).toBeDefined();
    expect(clase.contribuciones).toBeDefined();
  });

  test('getContribucionById returns contribution', async () => {
    const contribucion = await getContribucionById(1);
    expect(contribucion).toBeDefined();
  });

  test('createContribucion creates new contribution', async () => {
    const nueva = await createContribucion({
      content: 'Nueva contribución',
      claseId: 1
    });
    expect(nueva).toBeDefined();
    expect(nueva.content).toBe('Nueva contribución');
  });

  test('updateContribucion updates content', async () => {
    const actualizada = await updateContribucion(1, 'Contenido actualizado');
    expect(actualizada.content).toBe('Contenido actualizado');
  });

  test('deleteContribucion deletes contribution', async () => {
    await deleteContribucion(1);
    const contribucion = await getContribucionById(1);
    expect(contribucion).toBeNull();
  });
});