import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="max-w-3xl mx-auto p-6 grid gap-4">
      <h1 className="text-3xl font-bold">Welcome to Modelia Mini AI Studio</h1>
      <p>Sign up or log in to start generating looks.</p>
      <div className="flex gap-3">
        <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white rounded">
          Get Started
        </Link>
        <Link href="/studio" className="px-4 py-2 border rounded">
          Open Studio
        </Link>
      </div>
    </section>
  );
}
