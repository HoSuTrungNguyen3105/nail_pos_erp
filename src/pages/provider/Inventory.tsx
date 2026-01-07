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

      {/* Order Workflow Section */}
      <Card className="p-6 mb-6">
        <h3 className="h3 mb-4">Active Orders Workflow</h3>
        <div className="space-y-4">
           {[1, 2].map((_, i) => (
             <div key={i} className="border border-[var(--border)] rounded-lg p-4">
               <div className="flex justify-between items-center mb-4">
                 <div>
                   <p className="font-bold">Order #ORD-2024-{100+i}</p>
                   <p className="text-sm text-[var(--muted-foreground)]">Distributor: Nail Supply Co.</p>
                 </div>
                 <span className="badge bg-blue-100 text-blue-700 border-none">Processing</span>
               </div>
               {/* Stepper */}
               <div className="relative flex items-center justify-between w-full mt-4">
                 {['Received', 'Packing', 'Shipping', 'Completed'].map((step, idx) => {
                   const stepStatus = i === 0 ? 1 : 2; // Mock progress
                   const isActive = idx <= stepStatus;
                   return (
                     <div key={step} className="flex flex-col items-center relative z-10 w-1/4">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                         isActive ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
                       }`}>
                         {idx + 1}
                       </div>
                       <span className={`text-xs mt-2 font-medium ${isActive ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}>
                         {step}
                       </span>
                     </div>
                   );
                 })}
                 {/* Progress Bar background */}
                 <div className="absolute top-4 left-0 h-0.5 bg-[var(--muted)] w-full -z-0" />
                 {/* Progress Bar active */}
                 <div className={`absolute top-4 left-0 h-0.5 bg-[var(--primary)] transition-all -z-0`} style={{ width: `${((i === 0 ? 1 : 2) / 3) * 100}%` }} />
               </div>
             </div>
           ))}
        </div>
      </Card>

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
                <th className="p-4 font-medium">Safety Threshold</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, i) => {
                const stock = i === 2 ? 8 : 1450;
                const threshold = 10;
                const isLowStock = stock < threshold;
                return (
                  <tr key={i} className={`border-b border-[var(--border)] transition-colors ${isLowStock ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-[var(--muted)]/50'}`}>
                    <td className="p-4 font-medium">Gel Polish Type {String.fromCharCode(65 + i)}</td>
                    <td className="p-4">Zone A-12</td>
                    <td className={`p-4 font-bold ${isLowStock ? 'text-red-600' : ''}`}>{stock}</td>
                    <td className="p-4">{threshold}</td>
                    <td className="p-4">
                        {isLowStock ? (
                            <span className="flex items-center gap-1 text-red-600 font-bold">
                                <AlertTriangle size={14} /> Low Stock
                            </span>
                        ) : (
                            <span className="text-green-500 font-medium">In Stock</span>
                        )}
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm">Adjust</Button>
                    </td>
                  </tr>
                );
              })}
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
