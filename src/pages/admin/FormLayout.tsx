import React from 'react';
import SEO from './components/SEO';
import { Layout } from 'lucide-react';

const FormLayout: React.FC = () => {
  return (
    <>
      <SEO 
        title="Form Layout - TailAdmin"
        description="Different form layout patterns and structures."
      />

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">Form Layouts</h1>
          <p className="mt-2 text-slate-400">Various form layout patterns and structures</p>
        </header>

        <div className="p-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-600/10 border border-white/10 text-center">
          <Layout className="w-16 h-16 text-teal-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Form Layout Patterns</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Explore different form layouts including vertical, horizontal, inline, multi-column, and wizard-style forms.
          </p>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
