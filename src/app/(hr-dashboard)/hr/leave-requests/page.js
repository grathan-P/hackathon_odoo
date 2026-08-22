'use client';
import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { getMockSession } from '@/lib/mockAuth';
import { initialLeaveRequests, readMockCollection, writeMockCollection } from '@/lib/mockData';
export default function LeaveRequestsPage() {
  const [requests, setRequests] = useState(initialLeaveRequests);
  const [companyName, setCompanyName] = useState('Odoo India');
  useEffect(() => { const timeoutId = window.setTimeout(() => { const session = getMockSession(); setCompanyName(session?.companyName || 'Odoo India'); setRequests(readMockCollection('leave-requests', initialLeaveRequests)); }, 0); return () => window.clearTimeout(timeoutId); }, []);
  const companyRequests = requests.filter((request) => request.companyName === companyName);
  const updateStatus = (id, status) => { const updated = requests.map((request) => request.id === id ? { ...request, status } : request); setRequests(updated); writeMockCollection('leave-requests', updated); };
  return <div className="space-y-6"><div><h2 className="text-xl font-bold text-gray-900">Leave Requests</h2><p className="mt-0.5 text-xs text-gray-500">Requests for {companyName}</p></div><div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"><table className="w-full text-left text-xs"><thead><tr className="border-b border-gray-100 text-gray-400"><th className="px-4 py-3">Employee</th><th className="px-4 py-3">Leave Type</th><th className="px-4 py-3">Dates</th><th className="px-4 py-3">Reason</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead><tbody className="divide-y divide-gray-50">{companyRequests.map((request) => <tr key={request.id}><td className="px-4 py-3 font-semibold">{request.employee}</td><td className="px-4 py-3">{request.type}</td><td className="px-4 py-3">{request.dates}</td><td className="px-4 py-3">{request.reason}</td><td className="px-4 py-3">{request.status}</td><td className="px-4 py-3">{request.status === 'Pending' && <><button onClick={() => updateStatus(request.id, 'Approved')} className="mr-2 rounded-lg bg-emerald-50 p-1 text-emerald-600" title="Approve"><Check className="h-4 w-4" /></button><button onClick={() => updateStatus(request.id, 'Rejected')} className="rounded-lg bg-red-50 p-1 text-red-600" title="Reject"><X className="h-4 w-4" /></button></>}</td></tr>)}</tbody></table></div></div>;
}
