import express from 'express';
import multer from 'multer';
import { z } from 'zod';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import * as genService from '../services/generationService';
import { saveBufferAsFile } from '../utils/file';
import path from 'path';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB
const router = express.Router();

const postSchema = z.object({
  prompt: z.string().min(1),
  style: z.string().min(1)
});

router.post('/', authMiddleware, upload.single('image'), async (req: AuthRequest, res) => {
  try {
    const parsed = postSchema.parse({ prompt: req.body.prompt, style: req.body.style });
    if (!req.file) return res.status(400).json({ message: 'Image required' });
    // save buffer to uploads/
    const saved = saveBufferAsFile(req.file.buffer, req.file.originalname || 'upload.jpg');
    // create generation (async processing)
    const generation = await genService.createGeneration(req.userId as string, parsed.prompt, parsed.style, saved);
    // return minimal response
    res.status(201).json({
      id: generation.id,
      prompt: generation.prompt,
      style: generation.style,
      imageUrl: `/uploads/${path.basename(generation.inputImagePath)}`,
      status: generation.status,
      createdAt: generation.createdAt
    });
  } catch (err: any) {
    if (err?.name === 'ZodError') return res.status(400).json({ message: 'Invalid input' });
    res.status(400).json({ message: err.message || 'Bad request' });
  }
});

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const items = await genService.getLatestGenerations(req.userId as string, 5);
    const response = items.map(g => ({
      id: g.id,
      prompt: g.prompt,
      style: g.style,
      imageUrl: g.resultImagePath ? `/uploads/${path.basename(g.resultImagePath)}` : `/uploads/${path.basename(g.inputImagePath)}`,
      status: g.status,
      createdAt: g.createdAt,
      errorMessage: g.errorMessage || null
    }));
    res.json(response);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
