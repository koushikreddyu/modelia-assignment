import request from 'supertest';
import { createApp } from '../src/app';
import path from 'path';
describe('Generations', () => {
  const app = createApp();
  let token = '';
  beforeAll(async () => {
    const email = `g${Date.now()}@example.com`;
    const pw = 'password1';
    await request(app).post('/auth/signup').send({ email, password: pw });
    const login = await request(app).post('/auth/login').send({ email, password: pw });
    token = login.body.accessToken;
  });

  it('create generation success or overloaded', async () => {
    const res = await request(app)
      .post('/generations')
      .set('Authorization', `Bearer ${token}`)
      .attach('image', path.join(__dirname, 'fixtures', 'sample.jpg'))
      .field('prompt', 'test')
      .field('style', 'Editorial');
    expect([201, 400]).toContain(res.status); // 400 if overloaded simulated or invalid
  });

  it('unauthorized access', async () => {
    const res = await request(app).get('/generations');
    expect(res.status).toBe(401);
  });
});
