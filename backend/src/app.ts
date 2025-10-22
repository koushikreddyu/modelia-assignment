import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth';
import genRoutes from './routes/generations';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
  app.use('/auth', authRoutes);
  app.use('/generations', genRoutes);

  // basic health
  app.get('/health', (_req, res) => res.json({ ok: true }));
  return app;
}
