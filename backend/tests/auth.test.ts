import request from 'supertest';
import { createApp } from '../src/app';
describe('Auth', () => {
  const app = createApp();
  it('signup and login happy path', async () => {
    const email = `test${Date.now()}@example.com`;
    const pw = 'password1';
    const signup = await request(app).post('/auth/signup').send({ email, password: pw });
    expect(signup.status).toBe(200);
    const login = await request(app).post('/auth/login').send({ email, password: pw });
    expect(login.status).toBe(200);
    expect(login.body.accessToken).toBeDefined();
  });
  it('invalid login', async () => {
    const res = await request(app).post('/auth/login').send({ email: 'noone@example.com', password: 'x' });
    expect(res.status).toBe(400);
  });
});
