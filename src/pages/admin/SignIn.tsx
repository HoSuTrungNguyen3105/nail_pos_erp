import React from 'react';
import SEO from './components/SEO';
import { LogIn } from 'lucide-react';

const SignIn: React.FC = () => {
  return (
    <>
      <SEO 
        title="Sign In - TailAdmin"
        description="Sign in to your account."
      />

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">Sign In</h1>
          <p className="mt-2 text-slate-400">Access your account</p>
        </header>

        <div className="p-12 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-purple-600/10 border border-white/10 text-center">
          <LogIn className="w-16 h-16 text-fuchsia-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign In Page</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Login form with email/password authentication, remember me option, forgot password link, and social login buttons.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
