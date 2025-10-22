import { useCallback } from 'react';

export function useRetry() {
  return useCallback(async <T>(fn: () => Promise<T>, max = 3, base = 400): Promise<T> => {
    let last: unknown;
    for (let i = 0; i < max; i++) {
      try {
        return await fn();
      } catch (e) {
        last = e;
        await new Promise((r) => setTimeout(r, base * 2 ** i));
      }
    }
    throw last;
  }, []);
}
