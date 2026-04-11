import request from 'supertest';
import app from '../src/app';

describe('GET /admin', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/admin');
    expect(response.statusCode).toBe(200);
  });
});
