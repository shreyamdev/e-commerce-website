/**
 * src/pages/AuthPage.jsx
 * Unified Login & Registration View with Inline Error Handling & Visual States
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { Lock, Mail, User, ArrowRight, Loader2, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';

export const AuthPage = () => {
  const { login, register, authError, setAuthError, isLoading } = useAuth();
  const { navigateTo } = useStore();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [clientError, setClientError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (clientError) setClientError('');
    if (authError) setAuthError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClientError('');

    if (mode === 'register') {
      if (!formData.name.trim()) {
        setClientError('Full name is required.');
        return;
      }
      if (formData.password.length < 6) {
        setClientError('Password must be at least 6 characters long.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setClientError('Passwords do not match.');
        return;
      }

      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        navigateTo('home');
      }
    } else {
      const result = await login({
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        navigateTo('home');
      }
    }
  };

  const errorMessage = clientError || authError;

  return (
    <div className="max-w-md mx-auto my-12 px-4 sm:px-0">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 p-8 shadow-2xl relative overflow-hidden">
        
        {/* Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#FFA41C] via-[#FF3E6C] to-black" />

        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 bg-black dark:bg-neutral-800 text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto shadow-md">
            <span className="text-[#FF3E6C]">H</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
            {mode === 'login' ? 'Welcome Back' : 'Create VIP Account'}
          </h1>
          <p className="text-xs text-neutral-500">
            {mode === 'login'
              ? 'Sign in to access drops, saved vault items, and orders.'
              : 'Join the inner circle for exclusive streetwear priority access.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setClientError(''); }}
            className={`flex-1 py-2 text-xs font-black uppercase rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setClientError(''); }}
            className={`flex-1 py-2 text-xs font-black uppercase rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-2xl text-xs text-red-700 dark:text-red-400 flex items-center space-x-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Alex Rivera"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-xs pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:border-black dark:focus:border-white focus:outline-none text-neutral-900 dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5" />
              <input
                type="email"
                name="email"
                required
                placeholder="alex.hype@college.edu"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full text-xs pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:border-black dark:focus:border-white focus:outline-none text-neutral-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full text-xs pl-10 pr-10 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:border-black dark:focus:border-white focus:outline-none text-neutral-900 dark:text-white font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-neutral-400 hover:text-black dark:hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full text-xs pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:border-black dark:focus:border-white focus:outline-none text-neutral-900 dark:text-white font-mono"
                />
              </div>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center justify-center space-x-2 transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#FFA41C]" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Store' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4 text-[#FFA41C]" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Footer */}
        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 text-center">
          <p className="text-[11px] text-neutral-400">
            College Project Mock Account: <br />
            <strong className="text-neutral-700 dark:text-neutral-300">admin@hyped.co</strong> / password: <strong className="text-neutral-700 dark:text-neutral-300">admin123</strong>
          </p>
        </div>

      </div>
    </div>
  );
};