'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    
    // Backend API logic will go here
    console.log('Login Successful:', formData);

    // Redirect user after successful sign-in
    // router.push('/dashboard'); 
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Info & Illustration */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Welcome <span className="text-[#6D36F6]">Back!</span> 👋
          </h2>
          <p className="text-gray-600 text-sm">
            Sign in to continue to your Dayflow account
          </p>

          <ul className="space-y-3 pt-2">
            {[
              'Smart Attendance Tracking',
              'Leave Management Made Easy',
              'Secure Payroll Management',
              'Role-based Access Control',
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#6D36F6]" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-4 flex justify-center lg:justify-start">
            <img
              src="/images/login.avif"
              alt="Login Graphic"
              className="w-full max-w-sm h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Side: Sign In Form Box */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h3>
          <p className="text-xs text-gray-500 mb-6">Enter your credentials to access your account</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email or Login ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email or login ID"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D36F6]/20 focus:border-[#6D36F6] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
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

            <div className="flex justify-end">
              <a href="#" className="text-xs font-medium text-[#6D36F6] hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6D36F6] hover:bg-[#5F3DC4] text-white py-3 rounded-xl font-semibold text-sm transition shadow-sm"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Redirect Link */}
          <p className="mt-6 text-center text-xs text-gray-600">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-[#6D36F6] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}