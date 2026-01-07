import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Search, ArrowDown } from 'lucide-react';

export default function Warehouse() {
  const [stockLevel, setStockLevel] = useState(3492);
  const [lastImport, setLastImport] = useState<string | null>(null);

  const handleImport = () => {
      // Simulate API call to Provider
      const newStock = 100;
      setStockLevel((prev: number) => prev + newStock);
      setLastImport(new Date().toLocaleTimeString());
      alert(`Successfully imported ${newStock} units from Provider!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="h2">My Warehouse</h1>
          <p className="text-[var(--muted-foreground)]">Manage your local inventory.</p>
        </div>
        <Button onClick={handleImport}>
            <ArrowDown size={18} className="mr-2" />
            Import from Provider
        </Button>
      </div>
      
      {/* Search & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
            <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Total Items</h3>
            <p className="text-3xl font-bold mt-2">{stockLevel.toLocaleString()}</p>
        </Card>
         <Card className="p-6">
            <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Total Value</h3>
            <p className="text-3xl font-bold mt-2">${(stockLevel * 12.5).toLocaleString()}</p>
        </Card>
      </div>

       <Card className="p-6">
         <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
            <Input className="pl-10" placeholder="Search local inventory..." />
          </div>
          
          {lastImport ? (
               <div className="text-center p-8 bg-green-50 border-2 border-dashed border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">Last movement: Imported 100 units at {lastImport}</p>
               </div>
          ) : (
              <div className="text-center p-8 text-[var(--muted-foreground)] bg-[var(--muted)]/30 rounded-lg border-2 border-dashed border-[var(--border)]">
                  No recent movements today.
              </div>
          )}
       </Card>
    </div>
  )
}
