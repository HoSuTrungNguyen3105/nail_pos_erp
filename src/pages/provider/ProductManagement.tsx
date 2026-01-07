import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Filter, Search, Edit2, Trash2 } from 'lucide-react';
import type { 
  ProductCategory
} from '../../types/product';

export default function ProductManagement() {
  const [activeTab, setActiveTab] = useState<ProductCategory>('gel');

  // Dynamic columns based on active tab
  const getColumns = () => {
    switch(activeTab) {
      case 'gel':
        return [
          { header: 'Product Name', accessor: 'name' },
          { header: 'Type', accessor: 'type' },
          { header: 'Viscosity', accessor: 'viscosity' },
          { header: 'Curing Time', accessor: 'curing' },
          { header: 'Color', accessor: 'color' },
          { header: 'Price', accessor: 'price' },
          { header: 'Stock', accessor: 'stock' },
        ];
      case 'polish':
        return [
          { header: 'Product Name', accessor: 'name' },
          { header: 'Color Code', accessor: 'code' },
          { header: 'Volume', accessor: 'volume' },
          { header: 'Bottle Shape', accessor: 'shape' },
          { header: 'Price', accessor: 'price' },
          { header: 'Stock', accessor: 'stock' },
        ];
      case 'machines':
        return [
          { header: 'Product Name', accessor: 'name' },
          { header: 'Serial/IMEI', accessor: 'serial' },
          { header: 'Power (W)', accessor: 'power' },
          { header: 'Warranty', accessor: 'warranty' },
          { header: 'Price', accessor: 'price' },
          { header: 'Stock', accessor: 'stock' },
        ];
      case 'accessories':
        return [
          { header: 'Product Name', accessor: 'name' },
          { header: 'Type', accessor: 'type' },
          { header: 'Unit', accessor: 'unit' }, // Set or Piece
          { header: 'Price', accessor: 'price' },
          { header: 'Stock', accessor: 'stock' },
        ];
      default:
        return [];
    }
  };

  const columns = getColumns();

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="h2">Product Management</h1>
          <p className="text-[var(--muted-foreground)]">Manage your detailed inventory: Gels, Polishes, Machines & Accessories.</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border)] overflow-x-auto">
        <TabButton active={activeTab === 'gel'} onClick={() => setActiveTab('gel')}>Gel Systems</TabButton>
        <TabButton active={activeTab === 'polish'} onClick={() => setActiveTab('polish')}>Nail Polish</TabButton>
        <TabButton active={activeTab === 'machines'} onClick={() => setActiveTab('machines')}>Machines</TabButton>
        <TabButton active={activeTab === 'accessories'} onClick={() => setActiveTab('accessories')}>Accessories</TabButton>
      </div>

      <Card className="p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
            <Input className="pl-10" placeholder={`Search ${activeTab}...`} />
          </div>
          <Button variant="outline">
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)]">
                {columns.map((col, i) => (
                    <th key={i} className="p-4 font-medium">{col.header}</th>
                ))}
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                  {/* Mock Data Rendering Logic tailored to tabs */}
                   {activeTab === 'gel' && (
                     <>
                        <td className="p-4 font-medium"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-pink-100"/>Zota Builder Gel V{i}</div></td>
                        <td className="p-4">Builder</td>
                        <td className="p-4">Medium</td>
                        <td className="p-4">60s LED</td>
                        <td className="p-4 flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-pink-500"/>Pink</td>
                        <td className="p-4">$18.00</td>
                        <td className="p-4">1,200</td>
                     </>
                   )}
                   {activeTab === 'polish' && (
                     <>
                        <td className="p-4 font-medium"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-red-100"/>Zota Lacquer #00{i}</div></td>
                        <td className="p-4">RD-{100+i}</td>
                        <td className="p-4">15ml</td>
                        <td className="p-4">Square</td>
                        <td className="p-4">$8.50</td>
                        <td className="p-4">500</td>
                     </>
                   )}
                   {activeTab === 'machines' && (
                     <>
                        <td className="p-4 font-medium"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-gray-100"/>UV/LED Lamp X{i}</div></td>
                        <td className="p-4 text-xs font-mono text-[var(--muted-foreground)]">SN-2024-{8842+i}</td>
                        <td className="p-4">48W</td>
                        <td className="p-4">12 Months</td>
                        <td className="p-4">$45.00</td>
                        <td className="p-4">120</td>
                     </>
                   )}
                   {activeTab === 'accessories' && (
                     <>
                        <td className="p-4 font-medium"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-blue-100"/>Pro Nail File 100/180</div></td>
                        <td className="p-4">File</td>
                        <td className="p-4">Set (50pcs)</td>
                        <td className="p-4">$12.00</td>
                        <td className="p-4">2,500</td>
                     </>
                   )}

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
