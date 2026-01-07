// import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Search, AlertTriangle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function Inventory() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="h2">Inventory Management</h1>
        <p className="text-[var(--muted-foreground)]">Monitor stock levels and manage warehouse operations.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/10 text-blue-600">
              <PackageIcon />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Total SKU Count</p>
              <h3 className="text-2xl font-bold">1,240</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-500/10 text-red-600">
              <AlertTriangle />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Low Stock Alerts</p>
              <h3 className="text-2xl font-bold">15</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/10 text-green-600">
              <DollarSignIcon />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Inventory Value</p>
              <h3 className="text-2xl font-bold">$482,000</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
            <Input className="pl-10" placeholder="Search inventory..." />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <ArrowUpRight size={16} className="mr-2" />
              Stock In
            </Button>
            <Button variant="outline">
              <ArrowDownLeft size={16} className="mr-2" />
              Stock Out
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)]">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Current Stock</th>
                <th className="p-4 font-medium">Alert Threshold</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                  <td className="p-4 font-medium">Gel Polish Type {String.fromCharCode(65 + i)}</td>
                  <td className="p-4">Zone A-12</td>
                  <td className="p-4">1,450</td>
                  <td className="p-4">100</td>
                  <td className="p-4"><span className="text-green-500 font-medium">In Stock</span></td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">Adjust</Button>
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

const PackageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22v-9"/></svg>
)

const DollarSignIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
)
