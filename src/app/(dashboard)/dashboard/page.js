import { CheckCircle2, Calendar, Wallet, Clock, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Good morning, Rahul 👋</h2>
        <p className="text-xs text-gray-500 mt-1">Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Check In</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600"><Clock className="w-4 h-4" /></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">09:15 AM</h3>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">Checked In</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Leave Balance</span>
            <div className="p-2 rounded-xl bg-purple-50 text-[#5F3DC4]"><Calendar className="w-4 h-4" /></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">12</h3>
            <span className="text-xs text-gray-400">Days Left</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">This Month&apos;s Salary</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600"><Wallet className="w-4 h-4" /></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">₹ 54,860</h3>
            <span className="text-xs text-gray-400">May 2024</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Working Days</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600"><CheckCircle2 className="w-4 h-4" /></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">18 / 22</h3>
            <span className="text-xs text-gray-400">Days Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}