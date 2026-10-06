/**
 * src/components/auth/ProtectedRoute.jsx
 * Route Authorization Guard with Skeleton Hydration & RBAC Verification
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { ShieldAlert, Lock, Loader2, ArrowRight } from 'lucide-react';

export const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredPermission = null,
  redirectView = 'login' 
}) => {
  const { isAuthenticated, isLoading, user, hasRole, hasPermission } = useAuth();
  const { navigateTo, setCurrentView } = useStore();

  // 1. Session Hydration State: Display sleek loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-[#FF3E6C] animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          Verifying Encrypted Session...
        </p>
      </div>
    );
  }

  // 2. Unauthenticated State: Redirect to login while capturing intent
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl text-center space-y-5 animate-fade-in">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-neutral-900 dark:text-white">
            Authentication Required
          </h2>
          <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
            Please sign in to your HYPED.CO account to access this protected area.
          </p>
        </div>
        <button
          onClick={() => navigateTo(redirectView)}
          className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02]"
        >
          <span>Proceed to Sign In</span>
          <ArrowRight className="w-4 h-4 text-[#FFA41C]" />
        </button>
      </div>
    );
  }

  // 3. RBAC Verification: Role Restriction (e.g. Admin Portal)
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-red-200 dark:border-red-900/40 shadow-xl text-center space-y-5 animate-fade-in">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase text-red-500 tracking-widest bg-red-50 dark:bg-red-950 px-2 py-0.5 rounded-full">
            403 Forbidden
          </span>
          <h2 className="text-xl font-black uppercase text-neutral-900 dark:text-white mt-2">
            Restricted Access
          </h2>
          <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
            You do not possess the required <strong>{requiredRole}</strong> security clearance to access this portal.
          </p>
        </div>
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors"
        >
          Return to Public Storefront
        </button>
      </div>
    );
  }

  // 4. Permission Check (Fine-Grained RBAC)
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center space-y-4">
        <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto" />
        <h3 className="text-lg font-black uppercase text-neutral-900 dark:text-white">Permission Missing</h3>
        <p className="text-xs text-neutral-500">Missing authorization scope: <code>{requiredPermission}</code></p>
      </div>
    );
  }

  // Access Granted
  return <>{children}</>;
};