import { useEffect, useRef, useState } from 'react';
import { useGenerate } from '@/hooks/useGenerate';
import { Generation } from '@/lib/types';

const STYLE_OPTIONS = ['Editorial', 'Street', 'High-fashion', 'Minimal'];

export default function Upload({
  onComplete,
  restored,
}: {
  onComplete?: (x: Generation) => void;
  restored?: Generation | null;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState(STYLE_OPTIONS[0]);
  const { loading, error, generate, abort } = useGenerate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (restored) {
      setPrompt(restored.prompt);
      setStyle(restored.style);
    }
  }, [restored]);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f && (f.size > 10 * 1024 * 1024 || !['image/jpeg', 'image/png'].includes(f.type))) {
      alert('Only JPEG/PNG up to 10MB');
      return;
    }
    setFile(f);
  }

  async function onGenerate() {
    if (!file) {
      inputRef.current?.focus();
      return;
    }
    try {
      const res = await generate(file, prompt, style);
      onComplete?.(res);
      setFile(null);
      setPrompt('');
      setStyle(STYLE_OPTIONS[0]);
      inputRef.current!.value = '';
    } catch {
      /* handled in hook */
    }
  }

  return (
    <section aria-labelledby="uploader" className="grid gap-3 p-4 border rounded">
      <h2 id="uploader" className="text-lg font-semibold">
        Upload & Prompt
      </h2>

      <label className="block">
        <span className="sr-only">Upload image</span>
        <input
          ref={inputRef}
          aria-label="Upload image"
          type="file"
          accept="image/png,image/jpeg"
          onChange={onFileChange}
          className="block"
        />
      </label>

      {preview && (
        <img src={preview} alt="Selected preview" className="w-48 h-48 object-cover rounded" />
      )}

      <label className="grid gap-1">
        <span>Prompt</span>
        <input
          aria-label="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border p-2 rounded"
        />
      </label>

      <label className="grid gap-1">
        <span>Style</span>
        <select
          aria-label="Style"
          className="border p-2 rounded"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          {STYLE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-2">
        <button
          onClick={onGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? 'Generating…' : 'Generate'}
        </button>
        <button
          onClick={abort}
          disabled={!loading}
          className="px-4 py-2 border rounded disabled:opacity-60"
        >
          Abort
        </button>
      </div>

      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Alert! : </span> {error}
        </div>
      )}
    </section>
  );
}
