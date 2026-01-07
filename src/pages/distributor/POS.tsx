import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Search, Scan, Plus, CreditCard, Banknote } from 'lucide-react';

export default function POS() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Zota Gel Base Coat', price: 18.00, qty: 1 },
    { id: 2, name: 'Zota Gel Top Coat', price: 18.00, qty: 1 },
    { id: 3, name: 'Color Gel #102 Red', price: 15.00, qty: 2 },
  ]);

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = total * 0.08;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
      {/* Left: Product Selection */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex gap-2 bg-[var(--card)] p-4 rounded-lg shadow-sm border border-[var(--border)]">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={20} />
             <Input className="pl-10 h-12 text-lg" placeholder="Search or scan barcode..." autoFocus />
          </div>
          <Button variant="secondary" className="h-12 w-12 p-0">
            <Scan />
          </Button>
        </div>

        {/* Promotions / Combos */}
        <div className="mb-4">
             <h3 className="font-semibold mb-2">Active Promotions</h3>
             <div className="flex gap-4 overflow-x-auto pb-2">
                 {[
                     { name: 'Buy 5 Gel Get 1 Top', code: 'PROMO-GEL5', color: 'bg-gradient-to-r from-pink-500 to-purple-500' },
                     { name: 'Starter Kit Deal', code: 'KIT-START', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' }
                 ].map((promo, i) => (
                     <button key={i} className={`flex-shrink-0 p-4 rounded-lg text-white ${promo.color} min-w-[200px] text-left hover:scale-[1.02] transition-transform`}>
                         <p className="font-bold">{promo.name}</p>
                         <p className="text-xs opacity-90 mt-1">{promo.code}</p>
                     </button>
                 ))}
             </div>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-2">
           {/* Mock Quick Select Grid */}
           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => (
             <button key={i} className="flex flex-col items-center justify-center p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all text-center">
                <div className="w-12 h-12 rounded bg-gray-200 mb-2" />
                <span className="text-sm font-medium line-clamp-2">Product Name {i}</span>
                <span className="text-xs font-bold mt-1">$15.00</span>
             </button>
           ))}
        </div>
      </div>

      {/* Right: Cart & Checkout */}
      <Card className="w-full lg:w-96 flex flex-col h-full border-t lg:border-t-0 p-0 overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] bg-[var(--muted)]/30">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">Current Order</h2>
            <span className="text-xs text-[var(--muted-foreground)]">Order #POS-8842</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 text-xs">Walk-in Customer</Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Plus size={16} /></Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-[var(--muted-foreground)]">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-6 w-6 rounded flex items-center justify-center bg-[var(--muted)] hover:bg-[var(--border)]" onClick={() => {
                   const newCart = cart.map(i => i.id === item.id ? {...i, qty: Math.max(1, i.qty-1)} : i);
                   setCart(newCart);
                }}>-</button>
                <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                <button className="h-6 w-6 rounded flex items-center justify-center bg-[var(--muted)] hover:bg-[var(--border)]" onClick={() => {
                   const newCart = cart.map(i => i.id === item.id ? {...i, qty: i.qty+1} : i);
                   setCart(newCart);
                }}>+</button>
              </div>
              <div className="text-right min-w-[3rem]">
                <p className="text-sm font-bold">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[var(--border)] bg-[var(--card)]">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-dashed border-[var(--border)] pt-2">
              <span>Total</span>
              <span>${(total + tax).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="flex-col h-auto py-3 gap-1">
              <Banknote size={20} />
              <span className="text-xs">Cash</span>
            </Button>
            <Button className="flex-col h-auto py-3 gap-1">
              <CreditCard size={20} />
              <span className="text-xs">Card</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
