'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { saveToken } from '@/lib/auth';
import { handleError } from '@/lib/handleError';

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>({ name: '', email: '', password: '' });
  const [error, setError] = useState<string[] | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/signup', form);
      saveToken(data.accessToken);
      router.push('/studio');
    } catch (err: unknown) {
      setError(handleError(err));
    }
  }

  return (
    <section className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">Create account</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        {['name', 'email', 'password'].map((k) => (
          <label key={k} className="grid gap-1 capitalize">
            <span>{k}</span>
            <input
              className="border p-2"
              type={k === 'password' ? 'password' : k === 'email' ? 'email' : 'text'}
              value={form[k as keyof SignupForm]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              required={k !== 'name'}
            />
          </label>
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Alert! : </span> {error[0]}
          </div>
        )}
      </form>
    </section>
  );
}
