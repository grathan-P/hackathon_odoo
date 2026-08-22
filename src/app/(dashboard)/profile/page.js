export default function ProfilePage() {
  const profileDetails = [
    { label: 'Full Name', value: 'Rahul Sharma' },
    { label: 'Marital Status', value: 'Single' },
    { label: 'Date of Birth', value: 'May 12, 1997' },
    { label: 'Phone Number', value: '+91 98765 43210' },
    { label: 'Gender', value: 'Male' },
    { label: 'Alternate Email', value: 'rahul.s.personal@gmail.com' },
    { label: 'Address', value: '221B Baker Street, Bengaluru, KA 560001' },
    { label: 'Emergency Contact', value: 'Neha Sharma (Sister) - +91 91234 56789' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-purple-100 border-2 border-[#5F3DC4] flex items-center justify-center font-bold text-2xl text-[#5F3DC4]">
          RS
        </div>
        <div className="space-y-1 text-center md:text-left flex-1">
          <h3 className="text-xl font-bold text-gray-900">Rahul Sharma</h3>
          <p className="text-xs text-gray-500 font-medium">Software Developer</p>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 mt-2">Active</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-xs border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
          <div><span className="text-gray-400 block">Employee ID</span><strong className="text-gray-800">EMP00123</strong></div>
          <div><span className="text-gray-400 block">Department</span><strong className="text-gray-800">Engineering</strong></div>
          <div><span className="text-gray-400 block">Date of Joining</span><strong className="text-gray-800">Jan 15, 2023</strong></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
          {profileDetails.map((item, idx) => (
            <div key={idx} className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-semibold text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}