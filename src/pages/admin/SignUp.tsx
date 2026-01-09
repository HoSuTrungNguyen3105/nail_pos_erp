import React from 'react';
import SEO from './components/SEO';
import { UserPlus } from 'lucide-react';

const SignUp: React.FC = () => {
  return (
    <>
      <SEO 
        title="Sign Up - TailAdmin"
        description="Create a new account."
      />

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">Sign Up</h1>
          <p className="mt-2 text-slate-400">Create your account</p>
        </header>

        <div className="p-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-600/10 border border-white/10 text-center">
          <UserPlus className="w-16 h-16 text-teal-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign Up Page</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Registration form with name, email, password fields, terms acceptance, email verification, and social signup options.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
