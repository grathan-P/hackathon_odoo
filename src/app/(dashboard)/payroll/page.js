'use client';

import { useEffect, useState } from 'react';
import { Download, Wallet } from 'lucide-react';
import { getMockSession } from '@/lib/mockAuth';

const payrollRows = [
  { month: 'May 2024', gross: 'Rs 68,000', deductions: 'Rs 13,140', net: 'Rs 54,860', status: 'Paid' },
  { month: 'April 2024', gross: 'Rs 68,000', deductions: 'Rs 13,140', net: 'Rs 54,860', status: 'Paid' },
  { month: 'March 2024', gross: 'Rs 68,000', deductions: 'Rs 13,140', net: 'Rs 54,860', status: 'Paid' },
];

export default function PayrollPage() {
  const [user, setUser] = useState(null);
  useEffect(() => { const timeoutId = window.setTimeout(() => setUser(getMockSession()), 0); return () => window.clearTimeout(timeoutId); }, []);
  return <div className="mx-auto max-w-5xl space-y-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-wide text-[#5F3DC4]">{user?.companyName || 'Company'} payroll</p><h2 className="mt-1 text-2xl font-bold text-gray-900">My payroll</h2><p className="mt-1 text-xs text-gray-500">Review your salary statements and payment history.</p></div><button className="flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700"><Download className="h-4 w-4" /> Download latest</button></div><section className="grid grid-cols-1 gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-[#5F3DC4] p-5 text-white shadow-sm sm:col-span-2"><Wallet className="h-5 w-5" /><p className="mt-5 text-xs text-purple-100">Latest take-home pay</p><h3 className="mt-1 text-3xl font-bold">Rs 54,860</h3><p className="mt-2 text-xs text-purple-100">May 2024 · Paid</p></div><div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"><p className="text-xs text-gray-500">Annual gross salary</p><h3 className="mt-3 text-2xl font-bold text-gray-900">Rs 8,16,000</h3><p className="mt-2 text-xs text-gray-400">As per current structure</p></div></section><section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"><h3 className="text-sm font-bold text-gray-900">Salary history</h3><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-xs"><thead><tr className="border-b border-gray-100 text-gray-400"><th className="py-3 px-4">Month</th><th className="py-3 px-4">Gross pay</th><th className="py-3 px-4">Deductions</th><th className="py-3 px-4">Net pay</th><th className="py-3 px-4">Status</th></tr></thead><tbody className="divide-y divide-gray-50">{payrollRows.map((row) => <tr key={row.month}><td className="py-3 px-4 font-semibold text-gray-800">{row.month}</td><td className="py-3 px-4">{row.gross}</td><td className="py-3 px-4">{row.deductions}</td><td className="py-3 px-4 font-semibold">{row.net}</td><td className="py-3 px-4"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">{row.status}</span></td></tr>)}</tbody></table></div></section></div>;
}
