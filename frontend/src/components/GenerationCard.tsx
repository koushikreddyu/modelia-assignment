import type { Generation } from '@/lib/types';

export default function GenerationCard({
  g,
  onRestore,
}: {
  g: Generation;
  onRestore: (g: Generation) => void;
}) {
  return (
    <div className="p-2 border rounded flex items-start gap-3">
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}${g.imageUrl}`}
        alt={g.prompt}
        className="w-24 h-24 object-cover rounded"
      />
      <div>
        <div className="font-semibold">{g.prompt}</div>
        <div className="text-sm text-gray-500">
          {g.style} • {new Date(g.createdAt).toLocaleString()}
        </div>
        {g.status === 'FAILED' && (
          <div className="text-red-600 text-sm">Failed: {g.errorMessage}</div>
        )}
        <button
          className="mt-2 text-sm underline"
          onClick={() => onRestore(g)}
          aria-label="Restore"
        >
          Restore
        </button>
      </div>
    </div>
  );
}
