'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PublicShell({ children }) {
  const pathname = usePathname();
  const employeeRoutes = ['/dashboard', '/profile', '/attendance', '/leave', '/payroll'];
  const isDashboard = pathname.startsWith('/hr/') || employeeRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (isDashboard) return children;

  return (
    <>
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
