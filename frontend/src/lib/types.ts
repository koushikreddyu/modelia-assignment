export type Generation = {
  id: string;
  prompt: string;
  style: string;
  imageUrl: string;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | string;
  createdAt: string;
  errorMessage?: string | null;
};
