import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export function ensureUploadsDir() {
  const dir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
}

export function saveBufferAsFile(buffer: Buffer, originalName: string) {
  const uploads = ensureUploadsDir();
  const ext = path.extname(originalName) || '.jpg';
  const filename = `${Date.now()}-${uuidv4()}${ext}`;
  const filepath = path.join(uploads, filename);
  fs.writeFileSync(filepath, buffer);
  return filepath;
}
