import { useRef, useState, useCallback } from 'react';
import { api } from '@/lib/api';
import { useRetry } from './useRetry';

export function useGenerate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const controller = useRef<AbortController | null>(null);
  const retry = useRetry();

  const generate = useCallback(
    async (file: File, prompt: string, style: string) => {
      setLoading(true);
      setError(null);
      controller.current = new AbortController();
      const form = new FormData();
      form.append('image', file);
      form.append('prompt', prompt);
      form.append('style', style);
      try {
        const res = await retry(() =>
          api.post('/generations', form, { signal: controller.current!.signal }),
        );
        setGenerationId(res.data.id);
        return res.data;
      } catch (e: unknown) {
        if (e instanceof Error) {
          if (e.name === 'CanceledError' || e.message === 'canceled') setError('Aborted');
          else setError(e.message ?? 'Error');
        } else if ((e as any)?.response?.data?.message === 'Model overloaded') {
          setError('Model overloaded. Please retry.');
        }
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [retry],
  );

  const abort = useCallback(() => {
    controller.current?.abort();
    controller.current = null;
  }, []);

  return { loading, error, generationId, generate, abort, setError };
}
