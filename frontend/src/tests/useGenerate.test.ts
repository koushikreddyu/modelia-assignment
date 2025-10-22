import { renderHook, act } from '@testing-library/react';
import { useGenerate } from '@/hooks/useGenerate';
import { describe, expect, it, vi } from 'vitest';
import { api } from '@/lib/api';

vi.mock('@/lib/api', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('useGenerate hook', () => {
  const mockFile = new File(['dummy'], 'test.jpg', { type: 'image/jpeg' });

  it('calls API successfully', async () => {
    (api.post as any).mockResolvedValueOnce({ data: { id: '1', status: 'COMPLETED' } });

    const { result } = renderHook(() => useGenerate());
    await act(async () => {
      const res = await result.current.generate(mockFile, 'prompt', 'style');
      expect(res.id).toBe('1');
    });
  });

  it('handles model overloaded retry error', async () => {
    const error = { response: { data: { message: 'Model overloaded' } } };
    (api.post as any)
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce({ data: { id: '2' } });

    const { result } = renderHook(() => useGenerate());
    await act(async () => {
      const res = await result.current.generate(mockFile, 'prompt', 'style');
      expect(res.id).toBe('2');
    });
  });

  it('aborts an in-flight request', async () => {
    const { result } = renderHook(() => useGenerate());
    act(() => result.current.abort());
    expect(result.current.error).toBe(null);
  });
});
