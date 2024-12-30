import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 pt-20">
      <div className="max-w-md mx-auto p-6">
        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tab Switcher */}
          <div className="flex">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 text-center font-semibold transition-colors ${
                activeTab === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-4 text-center font-semibold transition-colors ${
                activeTab === 'signup'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {activeTab === 'signup' && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register('fullname', { required: true })}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register('email', { required: true })}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: true })}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {activeTab === 'signup' && (
                <div className="relative">
                  <select
                    {...register('role', { required: true })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select Role</option>
                    <option value="User">User</option>
                    <option value="Organizer">Organizer</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {activeTab === 'login' ? 'Login' : 'Sign Up'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {activeTab === 'login' && (
              <div className="mt-6 text-center">
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;