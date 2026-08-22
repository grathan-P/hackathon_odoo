'use client';

import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { initialLeaveRequests, readMockCollection, writeMockCollection } from '@/lib/mockData';

export default function LeaveRequestsPage() {
  const [requests, setRequests] = useState([]);
  useEffect(() => { const timeoutId = window.setTimeout(() => setRequests(readMockCollection('leave-requests', initialLeaveRequests)), 0); return () => window.clearTimeout(timeoutId); }, []);
  const updateStatus = (id, status) => {
    const updated = requests.map((request) => request.id === id ? { ...request, status } : request);
    setRequests(updated);
    writeMockCollection('leave-requests', updated);
  };

  return (
    <div className="space-y-6"><div><h2 className="text-xl font-bold text-gray-900">Leave Requests</h2><p className="text-xs text-gray-500 mt-0.5">Approve or reject employee leave applications</p></div><div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-x-auto"><table className="w-full text-left text-xs"><thead><tr className="border-b border-gray-100 text-gray-400"><th className="py-3 px-4">Employee</th><th className="py-3 px-4">Leave Type</th><th className="py-3 px-4">From - To</th><th className="py-3 px-4">Days</th><th className="py-3 px-4">Reason</th><th className="py-3 px-4">Status</th><th className="py-3 px-4">Actions</th></tr></thead><tbody className="divide-y divide-gray-50">{requests.map((request) => <tr key={request.id}><td className="py-3 px-4 font-semibold">{request.employee}</td><td className="py-3 px-4">{request.type}</td><td className="py-3 px-4">{request.dates}</td><td className="py-3 px-4">{request.days}</td><td className="py-3 px-4">{request.reason}</td><td className="py-3 px-4"><span className={`rounded-full px-2.5 py-0.5 text-[10px] ${request.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : request.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>{request.status}</span></td><td className="py-3 px-4">{request.status === 'Pending' && <><button onClick={() => updateStatus(request.id, 'Approved')} className="mr-2 rounded-lg bg-emerald-50 p-1 text-emerald-600" title="Approve"><Check className="w-4 h-4" /></button><button onClick={() => updateStatus(request.id, 'Rejected')} className="rounded-lg bg-red-50 p-1 text-red-600" title="Reject"><X className="w-4 h-4" /></button></>}</td></tr>)}</tbody></table></div></div>
  );
}
