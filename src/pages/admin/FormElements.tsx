import React from 'react';
import SEO from './components/SEO';
import { FileText } from 'lucide-react';

const FormElements: React.FC = () => {
  return (
    <>
      <SEO 
        title="Form Elements - TailAdmin"
        description="Comprehensive collection of form input elements and controls."
      />

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">Form Elements</h1>
          <p className="mt-2 text-slate-400">Input fields, selects, checkboxes, and more</p>
        </header>

        <div className="p-12 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-purple-600/10 border border-white/10 text-center">
          <FileText className="w-16 h-16 text-fuchsia-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Form Elements Library</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Comprehensive collection of form inputs including text, email, password, number, date, select, radio, checkbox, textarea, and custom controls.
          </p>
        </div>
      </div>
    </>
  );
};

export default FormElements;
