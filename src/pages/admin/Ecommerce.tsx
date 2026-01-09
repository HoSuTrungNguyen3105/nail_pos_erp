import React from 'react';
import SEO from './components/SEO';
import { ShoppingCart, TrendingUp, Package, DollarSign } from 'lucide-react';

const Ecommerce: React.FC = () => {
  return (
    <>
      <SEO 
        title="eCommerce - TailAdmin"
        description="Manage your online store, products, orders, and sales analytics."
      />

      <div className="space-y-6">
        {/* Page Header */}
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">eCommerce Dashboard</h1>
          <p className="mt-2 text-slate-400">Manage your online store and track sales performance</p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: ShoppingCart, label: 'Total Orders', value: '1,234', color: 'fuchsia' },
            { icon: Package, label: 'Products', value: '567', color: 'teal' },
            { icon: DollarSign, label: 'Revenue', value: '$45,678', color: 'purple' },
            { icon: TrendingUp, label: 'Growth', value: '+12.5%', color: 'blue' },
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="p-12 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-purple-600/10 border border-white/10 text-center">
          <ShoppingCart className="w-16 h-16 text-fuchsia-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">eCommerce Module</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Full eCommerce management features including product catalog, inventory, orders, and customer management are coming soon.
          </p>
        </div>
      </div>
    </>
  );
};

export default Ecommerce;
