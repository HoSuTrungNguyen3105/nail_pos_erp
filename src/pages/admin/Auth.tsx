import React from 'react';
import SEO from './components/SEO';
import { Lock, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
  return (
    <>
      <SEO 
        title="Authentication - TailAdmin"
        description="Manage authentication and user access."
      />

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">Authentication</h1>
          <p className="mt-2 text-slate-400">User authentication and access management</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/admin/auth/signin"
            className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-fuchsia-500/50 transition-all group"
          >
            <LogIn className="w-12 h-12 text-fuchsia-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Sign In</h3>
            <p className="text-slate-400">
              User login page with email/password authentication and social login options.
            </p>
          </Link>

          <Link 
            to="/admin/auth/signup"
            className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-teal-500/50 transition-all group"
          >
            <UserPlus className="w-12 h-12 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Sign Up</h3>
            <p className="text-slate-400">
              New user registration with email verification and profile setup.
            </p>
          </Link>
        </div>

        <div className="p-12 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-purple-600/10 border border-white/10 text-center">
          <Lock className="w-16 h-16 text-fuchsia-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Authentication System</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Secure authentication with JWT tokens, OAuth integration, two-factor authentication, and session management.
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;
