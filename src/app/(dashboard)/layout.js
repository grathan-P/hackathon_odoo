import Sidebar from '@/components/Sidebar';
import Navbar2 from '@/components/Navbar2';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar2 />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}