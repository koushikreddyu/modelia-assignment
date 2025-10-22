import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Upload from '@/components/Upload';
import { describe, expect, it, vi } from 'vitest';

describe('Upload Component', () => {
  it('renders upload UI correctly', () => {
    render(<Upload />);
    expect(screen.getByLabelText(/Upload image/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /Abort/i })).toBeDisabled();
  });

  it('shows preview when valid image selected', async () => {
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    render(<Upload />);
    const input = screen.getByLabelText(/Upload image/i) as HTMLInputElement;

    await userEvent.upload(input, file);
    expect(input.files?.[0]).toBe(file);
    expect(await screen.findByAltText(/Selected preview/i)).toBeInTheDocument();
  });

  it('displays alert for invalid file types', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Upload />);
    const file = new File(['x'], 'file.gif', { type: 'image/gif' });
    await userEvent.upload(screen.getByLabelText(/Upload image/i), file);
    expect(alertSpy).toHaveBeenCalled();
    alertSpy.mockRestore();
  });
});
