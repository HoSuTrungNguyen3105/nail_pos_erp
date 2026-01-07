import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Filter, Search, Edit2, Trash2 } from 'lucide-react';

type ProductTab = 'gel' | 'polish' | 'machines' | 'accessories';

export default function ProductManagement() {
  const [activeTab, setActiveTab] = useState<ProductTab>('gel');

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="h2">Product Management</h1>
          <p className="text-[var(--muted-foreground)]">Manage your inventory, pricing and catalog.</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border)] overflow-x-auto">
        <TabButton active={activeTab === 'gel'} onClick={() => setActiveTab('gel')}>Gel Systems</TabButton>
        <TabButton active={activeTab === 'polish'} onClick={() => setActiveTab('polish')}>Nail Polish</TabButton>
        <TabButton active={activeTab === 'machines'} onClick={() => setActiveTab('machines')}>Machinery</TabButton>
        <TabButton active={activeTab === 'accessories'} onClick={() => setActiveTab('accessories')}>Accessories</TabButton>
      </div>

      <Card className="p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
            <Input className="pl-10" placeholder="Search products by name, SKU..." />
          </div>
          <Button variant="outline">
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
        </div>

        {/* Product Table (Mock) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)]">
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Price (Wholesale)</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-gray-200" />
                      <div>
                        <p className="font-medium">Zota {activeTab === 'machines' ? 'Pro Drill' : 'Gel'} V{i+1}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">SKU-00{i+1}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 capitalize">{activeTab}</td>
                  <td className="p-4"><span className="badge badge-default bg-green-500/10 text-green-500 border-none">Active</span></td>
                  <td className="p-4 font-medium">$24.00</td>
                  <td className="p-4">1,200</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm"><Edit2 size={16} /></Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600"><Trash2 size={16} /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

const TabButton = ({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
      active
        ? 'border-[var(--primary)] text-[var(--primary)]'
        : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
    }`}
  >
    {children}
  </button>
);
