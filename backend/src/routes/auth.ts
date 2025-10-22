import express from 'express';
import { z } from 'zod';
import * as authService from '../services/authService';

const router = express.Router();

const signupSchema = z.object({
  email: z.string({ message: 'Invalid Email' }).email(),
  password: z.string({ message: 'Password required'}).min(6, { message: 'Password should have minimum 6 charecters'}),
  name: z.string().optional()
});

router.post('/signup', async (req, res) => {
  try {
    const data = signupSchema.parse(req.body);
    const result = await authService.signup(data.email, data.password, data.name);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Invalid request' });
  }
});

const loginSchema = z.object({
  email: z.string({ message: 'Invalid Email' }).email(),
  password: z.string({ message: 'Password required'}).min(6, { message: 'Password should have minimum 6 charecters'})
});

router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data.email, data.password);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Invalid credentials' });
  }
});

export default router;
