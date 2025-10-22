import path from 'path';
import fs from 'fs';

import { PrismaClient } from '@prisma/client';

import { saveBufferAsFile } from '../utils/file';

const prisma = new PrismaClient();

// simulate generation: 20% overloaded (fail), otherwise copy file and mark completed after 1-2s
export async function createGeneration(
  userId: string,
  prompt: string,
  style: string,
  inputFilePath: string,
) {
  const inputRel = path.relative(process.cwd(), inputFilePath);
  const generation = await prisma.generation.create({
    data: {
      userId,
      prompt,
      style,
      inputImagePath: inputRel,
      status: 'QUEUED',
    },
  });

  // process in background
  processGeneration(generation.id, inputFilePath).catch(console.error);

  return generation;
}

async function processGeneration(id: string, inputFilePath: string) {
  await prisma.generation.update({ where: { id }, data: { status: 'PROCESSING' } });

  const delay = 1000 + Math.floor(Math.random() * 1000); // 1-2s
  await new Promise(r => setTimeout(r, delay));

  // 20% chance of overload
  if (Math.random() < 0.2) {
    await prisma.generation.update({
      where: { id },
      data: { status: 'FAILED', errorMessage: 'Model overloaded' },
    });
    return;
  }

  const inputBuffer = fs.readFileSync(inputFilePath);
  const saved = saveBufferAsFile(inputBuffer, path.basename(inputFilePath));
  const resultRel = path.relative(process.cwd(), saved);

  await prisma.generation.update({
    where: { id },
    data: { status: 'COMPLETED', resultImagePath: resultRel },
  });
}

export async function getLatestGenerations(userId: string, limit = 5) {
  return prisma.generation.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}
