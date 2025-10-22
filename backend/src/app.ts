import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/auth', authRoutes);

  // basic health
  app.get('/health', (_req, res) => res.json({ ok: true }));
  return app;
}
