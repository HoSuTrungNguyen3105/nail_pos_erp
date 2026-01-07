import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Search, Printer, HelpCircle, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export default function ZotaTicket() {
  const [activeTab, setActiveTab] = useState('NAILS');
  
  // Mock Data mimicking the image
  const ticketItems = [
    { id: 1, name: 'Bamboo Massage', tech: 'Edisa', time: '5:28 PM (60 min)', price: 70.00, initials: 'ET', color: 'bg-[#2dd4bf]' }, // Teal
    { id: 2, name: 'Lavender Pedi', tech: 'Glory', time: '', price: 40.00, initials: 'GT', color: 'bg-[#f43f5e]' }, // Pink
  ];

  const services = [
    { name: 'Lavender Mani', price: 25.00, type: 'treatment' },
    { name: 'Lavender Pedi', price: 40.00, type: 'pedi' },
    { name: 'Classic Treatment Mani', price: 16.00, type: 'treatment' },
    { name: 'Classic Treatment Pedi', price: 26.00, type: 'pedi' },
    { name: 'Deluxe Treatment Mani', price: 30.00, type: 'treatment' },
    { name: 'Deluxe Treatment Pedi', price: 40.00, type: 'pedi' },
    { name: 'Lemon Drop Treatment Mani', price: 25.00, type: 'treatment' },
    { name: 'Lemon Drop Treatment Pedi', price: 45.00, type: 'pedi' },
    { name: 'Kiddie Cure Treatment Mani', price: 15.00, type: 'treatment' },
    { name: 'Kiddie Cure Treatment Pedi', price: 22.00, type: 'pedi' },
    { name: 'Full Set Color Tips', price: 31.00, type: 'treatment' },
    { name: 'Fill Pink & White', price: 25.00, type: 'pedi' },
    { name: 'Full Set/Fill Glitter', price: 46.00, type: 'treatment' },
    { name: 'Mani & Pedi Combo', price: 70.00, type: 'pedi' },
    { name: 'Add-On Nails', price: null, type: 'pedi' },
  ];

  return (
    <div className="flex flex-col h-full gap-4 text-white p-2">
      {/* HEADER */}
      <div className="flex items-center justify-between shrink-0 mb-1">
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white rounded-full h-10 w-10 p-0">
             <ArrowLeft size={20} />
           </Button>
           <div className="bg-white/10 p-1.5 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded flex items-center justify-center font-bold text-lg">Z</div>
           </div>
           <div>
             <h2 className="text-sm font-bold opacity-60">Ticket View</h2>
             <h1 className="text-lg font-bold">Edisa (QUEUE) ={'>'} #102</h1>
           </div>
        </div>
        
        <div className="flex items-center gap-2">
           <Button className="bg-[#be123c] hover:bg-[#9f1239] text-white font-bold tracking-wider">COMBINE</Button>
           <Button variant="ghost" size="sm" className="text-white/60 hover:text-white"><HelpCircle size={24} /></Button>
           <Button variant="ghost" size="sm" className="text-white/60 hover:text-white"><Search size={24} /></Button>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* LEFT COLUMN: TICKET DETAILS */}
        <div className="w-[35%] flex flex-col bg-[#2e1065]/60 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden relative shadow-2xl">
           {/* Customer Header */}
           <div className="p-3 bg-[#4c1d95]/40 border-b border-white/10 flex justify-between items-center">
              <div className="flex gap-3 text-sm font-bold opacity-80">
                 <Printer size={18} />
                 <span>2.00</span>
              </div>
              <div className="text-center">
                 <h3 className="font-bold text-[#2dd4bf]">Brianna S</h3>
                 <p className="text-xs text-[#2dd4bf]">262 pts = $5.00</p>
              </div>
              <Search size={18} className="opacity-80" />
           </div>

           {/* Items List */}
           <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {ticketItems.map((item) => (
                <div key={item.id} className="p-3 bg-white/5 rounded-lg border border-white/5 flex gap-3 hover:bg-white/10 transition-colors cursor-pointer">
                   <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-[#1e1b4b] shrink-0", item.color)}>
                     {item.initials}
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                         <span className="font-bold text-sm tracking-wide">{item.name}</span>
                         <span className="font-bold text-sm text-right">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs opacity-60">
                         <span className="italic">{item.tech} - (QUEUE)</span>
                         <div className="flex items-center gap-1">
                            {item.time && <span className="bg-[#4ade80] text-[#064e3b] px-1 rounded-[2px] font-bold text-[10px]">S</span>}
                            <span>{item.time || 'Sx 1'}</span>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
              
              {/* Empty Space Filler */}
              <div className="flex-1 min-h-[100px]" />
              
              {/* Bottom Summary (Anchored) */}
              <div className="mt-auto pt-4 border-t border-white/10 bg-[#2e1065]/80 p-3 pb-24"> {/* Added pb for floating buttons */}
                 <div className="grid grid-cols-2 gap-y-2 text-sm font-bold font-mono">
                    <div className="text-[#2dd4bf] flex items-center gap-1">± TIPS:</div>
                    <div className="text-right text-white">$0.00</div>
                    
                    <div className="text-[#2dd4bf] flex items-center gap-1">± TAX</div>
                    <div className="text-right text-white">$0.00</div>
                    
                    <div className="text-white mt-2">DISCOUNT</div>
                    <div className="text-right text-white mt-2">$0.00</div>
                    
                    <div className="text-white text-lg mt-1">TOTAL</div>
                    <div className="text-right text-[#4ade80] text-lg mt-1">$110.00</div>
                 </div>
              </div>
           </div>

           {/* Floating Actions Bottom */}
           <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <Button className="flex-1 bg-white hover:bg-gray-100 text-[#1e1b4b] font-bold rounded-full h-12">VOID TICKET</Button>
              <Button className="flex-1 bg-white hover:bg-gray-100 text-[#1e1b4b] font-bold rounded-full h-12">PAY</Button>
              <Button className="flex-1 bg-white hover:bg-gray-100 text-[#1e1b4b] font-bold rounded-full h-12">CANCEL</Button>
           </div>
        </div>

        {/* RIGHT COLUMN: SERVICES */}
        <div className="flex-1 flex flex-col gap-4">
           {/* Tabs */}
           <div className="flex gap-1 overflow-x-auto pb-2">
              {['NAILS', 'MASSAGE', 'FACIAL', 'WAXING', 'HAIR', 'MAKE UP', 'PRODUCTS'].map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={cn(
                     "px-6 py-3 rounded-t-xl font-bold text-sm tracking-wide border-t border-x border-white/10 transition-all",
                     activeTab === tab 
                       ? "bg-[#2dd4bf] text-[#0f766e] shadow-[0_0_15px_#2dd4bf40]" 
                       : "bg-white/5 text-white/60 hover:bg-white/10"
                   )}
                 >
                   {tab}
                 </button>
              ))}
           </div>
           
           {/* Grid */}
           <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-4 shadow-xl overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
                 {services.map((service, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "h-16 px-4 rounded-[2rem] flex items-center justify-between text-left shadow-lg transition-all",
                        service.type === 'treatment' 
                          ? "bg-gradient-to-r from-[#be123c] to-[#9f1239] text-white"  // Maroon
                          : "bg-gradient-to-r from-[#fdba74] to-[#fdba74] text-[#7c2d12]" // Peach
                      )}
                    >
                       <span className="font-bold text-sm leading-tight flex-1 pr-2">{service.name}</span>
                       <span className="font-bold text-sm shrink-0">
                         {service.price ? `$${service.price.toFixed(2)}` : ''}
                       </span>
                    </motion.button>
                 ))}
              </div>
           </div>
           
           {/* Add-on Area (Bottom right) */}
           <div className="h-16 bg-[#fdba74] rounded-[2rem] flex items-center px-6 text-[#7c2d12] font-bold shadow-lg mt-auto">
             Add-On Nails
           </div>
        </div>
      </div>
    </div>
  );
}
