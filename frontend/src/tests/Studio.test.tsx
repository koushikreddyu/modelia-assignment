import { render, screen } from '@testing-library/react';
import StudioPage from '@/app/studio/page';
import { api } from '@/lib/api';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('Studio Page', () => {
  beforeEach(() => {
    (api.get as any).mockResolvedValueOnce({ data: [] });
  });

  it('renders Studio page with upload', async () => {
    render(<StudioPage />);
    expect(await screen.findByText(/AI Studio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload image/i)).toBeInTheDocument();
  });
});
