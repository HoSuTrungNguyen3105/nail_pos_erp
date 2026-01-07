// import React, { useState } from 'react';
import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Search, Filter, ShoppingCart } from 'lucide-react';
// import { motion } from 'framer-motion';

export default function Marketplace() {
  const categories = ['All', 'Gel Systems', 'Polish', 'Machines', 'Accessories', 'Furniture'];
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden h-48 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center px-8 text-white">
        <div>
          <h1 className="text-3xl font-bold mb-2">Wholesale Sourcing</h1>
          <p className="text-white/80 max-w-xl">
            Access premium nail supplies at exclusive distributor prices. Bulk discounts applied automatically at checkout.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 sticky top-20 z-40 bg-[var(--background)]/90 backdrop-blur-sm py-2">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--muted)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={16} />
            <Input className="pl-9 h-10" placeholder="Search inventory..." />
          </div>
          <Button variant="outline" size="sm" className="h-10 w-10 p-0">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
          <ProductCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

const ProductCard = ({ index }: { index: number }) => (
  <Card className="group overflow-hidden p-0 border-none shadow-md hover:shadow-xl transition-all duration-300">
    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-200">
        Product Image
      </div>
      <div className="absolute top-2 right-2">
         {index % 3 === 0 && <span className="badge bg-red-500 text-white border-none">Sale</span>}
      </div>
      
      {/* Quick Add Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
        <Button className="w-full" size="sm">
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
    
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold truncate pr-2">Zota Premium Gel V{index}</h3>
          <p className="text-xs text-[var(--muted-foreground)]">SKU: ZPG-{200+index}</p>
        </div>
      </div>
      
      <div className="flex items-end justify-between mt-4">
        <div>
          <p className="text-xs text-[var(--muted-foreground)] mb-0.5">Wholesale Price</p>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[var(--primary)]">$12.50</span>
            <span className="text-xs text-[var(--muted-foreground)] line-through">$24.00</span>
          </div>
        </div>
        <div className="text-right">
           <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-1 rounded badge-outline">In Stock</span>
        </div>
      </div>
    </div>
  </Card>
);
