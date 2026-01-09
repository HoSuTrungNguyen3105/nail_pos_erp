import React from 'react';
import SEO from './components/SEO';
import { FileText, Layout, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Forms: React.FC = () => {
  return (
    <>
      <SEO 
        title="Forms - TailAdmin"
        description="Create and manage forms with various elements and layouts."
      />

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">Forms</h1>
          <p className="mt-2 text-slate-400">Build and customize forms for data collection</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/admin/forms/elements"
            className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-fuchsia-500/50 transition-all group"
          >
            <FileText className="w-12 h-12 text-fuchsia-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Form Elements</h3>
            <p className="text-slate-400">
              Explore various form inputs including text fields, selects, checkboxes, radio buttons, and more.
            </p>
          </Link>

          <Link 
            to="/admin/forms/layout"
            className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-teal-500/50 transition-all group"
          >
            <Layout className="w-12 h-12 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Form Layouts</h3>
            <p className="text-slate-400">
              Different form layout patterns including vertical, horizontal, inline, and multi-column forms.
            </p>
          </Link>
        </div>

        <div className="p-12 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-purple-600/10 border border-white/10 text-center">
          <CheckCircle className="w-16 h-16 text-fuchsia-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Form Builder</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Advanced form builder with validation, conditional logic, file uploads, and integration capabilities.
          </p>
        </div>
      </div>
    </>
  );
};

export default Forms;
