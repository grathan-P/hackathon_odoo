'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PublicShell({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/hr/');

  if (isDashboard) return children;

  return (
    <>
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
