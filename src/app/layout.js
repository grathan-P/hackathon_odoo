import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PublicShell from '@/components/PublicShell';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Dayflow HRMS',
  description: 'Simplify HR. Empower People.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
