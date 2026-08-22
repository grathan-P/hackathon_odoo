'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, Eye, EyeOff, UserCheck } from 'lucide-react';
import { registerMockUser } from '@/lib/mockAuth';
import { initialPendingRegistrations, readMockCollection, writeMockCollection } from '@/lib/mockData';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'employee',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.role === 'employee') {
      const pending = readMockCollection('pending-registrations', initialPendingRegistrations);
      writeMockCollection('pending-registrations', [...pending, {
        id: `registration-${Date.now()}`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: 'Employee',
        dept: 'Unassigned',
        joiningYear: new Date().getFullYear(),
        status: 'Pending',
      }]);
      setRegisteredUser({ role: 'pending' });
      return;
    }

    const user = registerMockUser(formData);
    setRegisteredUser(user);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Info & Illustration */}
        <div className="space-y-4 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-gray-900">
            Create Your <span className="text-[#6D36F6]">Account</span>
          </h2>
          <p className="text-gray-600 text-sm">
            Fill in the details to get started with Dayflow
          </p>
          <div className="pt-6 flex justify-center">
            <img
              src="/images/login.avif"
              alt="Signup Graphic"
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Side: Form Box */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">Sign Up</h3>
          <p className="text-xs text-gray-500 mb-6">Create a new account</p>

          {registeredUser && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
              {registeredUser.role === 'pending' ? 'Registration submitted. HR approval is required before you can sign in.' : `Account created. Sign in with ${registeredUser.role === 'employee' ? `login ID ${registeredUser.loginId}` : 'your email'}.`}
              <button type="button" onClick={() => router.push('/')} className="block mt-2 font-semibold underline">
                Continue to Sign In
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D36F6]/20 focus:border-[#6D36F6] outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D36F6]/20 focus:border-[#6D36F6] outline-none"
                />
              </div>
            </div>

            {/* Phone & Role */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D36F6]/20 focus:border-[#6D36F6] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Role</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D36F6]/20 focus:border-[#6D36F6] outline-none bg-white appearance-none"
                  >
                    <option value="employee">Employee</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D36F6]/20 focus:border-[#6D36F6] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D36F6]/20 focus:border-[#6D36F6] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6D36F6] hover:bg-[#5F3DC4] text-white py-3 rounded-xl font-semibold text-sm transition shadow-sm mt-2"
            >
              Sign Up
            </button>
          </form>

          {formData.role === 'employee' && (
            <div className="mt-6 rounded-xl border border-purple-100 bg-purple-50 p-3">
              <img src="/images/login.avif" alt="Employee account preview" className="w-full h-32 object-contain" />
              <p className="mt-2 text-center text-[11px] font-medium text-purple-700">Employee login ID will be generated after registration.</p>
            </div>
          )}

          {/* Sign In Redirect Link */}
          <p className="mt-6 text-center text-xs text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-[#6D36F6] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}