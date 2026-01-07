import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Search, Plus, Mail, Phone, Gift, Calendar } from 'lucide-react';

export default function CRM() {
  const [activeTab, setActiveTab] = useState<'customers' | 'promotions'>('customers');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="h2">Customer Relationships</h1>
          <p className="text-[var(--muted-foreground)]">Manage customers and marketing campaigns.</p>
        </div>
        <div className="flex gap-2">
           <Button variant={activeTab === 'customers' ? 'primary' : 'outline'} onClick={() => setActiveTab('customers')}>
             Customers
           </Button>
           <Button variant={activeTab === 'promotions' ? 'primary' : 'outline'} onClick={() => setActiveTab('promotions')}>
             Promotions
           </Button>
        </div>
      </div>

      {activeTab === 'customers' ? (
        <Card className="p-6">
          <div className="flex justify-between mb-6">
             <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
                <Input className="pl-10" placeholder="Search customers..." />
              </div>
              <Button>
                <Plus size={18} className="mr-2" />
                Add Customer
              </Button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold">
                    {String.fromCharCode(65+i)}
                  </div>
                  <div>
                    <p className="font-medium">Customer {String.fromCharCode(65+i)}</p>
                    <div className="flex gap-3 text-xs text-[var(--muted-foreground)]">
                      <span className="flex items-center gap-1"><Phone size={12}/> +1 234 567 890{i}</span>
                      <span className="flex items-center gap-1"><Mail size={12}/> customer{i}@email.com</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="text-right">
                      <p className="text-sm font-bold">$420.50</p>
                      <p className="text-xs text-[var(--muted-foreground)]">Total Spent</p>
                   </div>
                   <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-l-4 border-l-[var(--primary)]">
             <div className="flex justify-between items-start mb-4">
               <div>
                  <h3 className="font-bold text-lg">Buy 5 Get 1 Free (Gel Polish)</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">Active until Dec 31, 2024</p>
               </div>
               <span className="badge badge-default bg-green-500/10 text-green-500 border-none">Active</span>
             </div>
             <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-4">
               <Calendar size={16} />
               Created on Jan 15, 2024
             </div>
             <div className="flex gap-2">
               <Button size="sm" variant="outline">Edit</Button>
               <Button size="sm" variant="ghost" className="text-red-500">End</Button>
             </div>
          </Card>
           
           <Card className="p-6 border-l-4 border-l-[var(--secondary)]">
             <div className="flex justify-between items-start mb-4">
               <div>
                  <h3 className="font-bold text-lg">New Salon Welcome Kit</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">20% off first order over $500</p>
               </div>
               <span className="badge badge-default bg-green-500/10 text-green-500 border-none">Active</span>
             </div>
             <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-4">
               <Gift size={16} />
               Used 45 times
             </div>
             <div className="flex gap-2">
               <Button size="sm" variant="outline">Edit</Button>
               <Button size="sm" variant="ghost" className="text-red-500">End</Button>
             </div>
          </Card>
        </div>
      )}
    </div>
  );
}
