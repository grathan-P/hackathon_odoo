import Sidebar2 from '@/components/Sidebar2';
import Navbar3 from '@/components/Navbar3';
import Footer from '@/components/Footer';

export default function HRDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar2 />
      <div className="flex-1 flex flex-col">
        <Navbar3 />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
}