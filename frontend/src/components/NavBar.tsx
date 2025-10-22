'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clearToken, getToken } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const token = getToken();
    setAuthed(Boolean(token));
  }, [pathname]);

  function handleLogout() {
    clearToken();
    router.push('/auth/login');
  }

  return (
    <nav className="p-3 border-b flex items-center gap-4">
      <Link className="font-semibold" href="/">
        Modelia Mini Studio
      </Link>
      <div className="ml-auto flex gap-3">
        {authed ? (
          <>
            <Link href="/studio" className="underline">
              Studio
            </Link>
            <button
              className="px-3 py-1 border rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="underline" href="/auth/login">
              Login
            </Link>
            <Link className="underline" href="/auth/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
