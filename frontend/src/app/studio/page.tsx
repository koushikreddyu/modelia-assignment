'use client';
import { useCallback, useEffect, useState } from 'react';
import Upload from '@/components/Upload';
import GenerationCard from '@/components/GenerationCard';
import { api } from '@/lib/api';
import type { Generation } from '@/lib/types';
import { getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function StudioPage() {
  const router = useRouter();
  const [history, setHistory] = useState<Generation[]>([]);
  const [restored, setRestored] = useState<Generation | null>(null);

  const refresh = useCallback(async () => {
    const { data } = await api.get('/generations?limit=5');
    setHistory(data);
    setRestored(null);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/auth/login');
      return;
    }
    setTimeout(() => refresh(), 0);
  }, [refresh]);

  return (
    <div className="max-w-4xl mx-auto p-6 grid gap-6">
      <h1 className="text-2xl font-semibold">AI Studio</h1>
      {restored && <p className="text-sm text-gray-600">Restored: {restored.prompt}</p>}
      <Upload onComplete={refresh} restored={restored} />
      <section>
        <h2 className="text-lg font-semibold mb-2">Recent Generations</h2>
        <div className="grid gap-2">
          {history.length === 0 && (
            <div
              className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <span className="font-medium">Alert!</span> No generations found. Upload an image to
              get started.
            </div>
          )}
          {history.map((h) => (
            <GenerationCard key={h.id} g={h} onRestore={setRestored} />
          ))}
        </div>
      </section>
    </div>
  );
}
