import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export interface AuthRequest extends Request {
  userId?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.header('authorization');
  if (!auth) return res.status(401).json({ message: 'Unauthorized' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Unauthorized' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
