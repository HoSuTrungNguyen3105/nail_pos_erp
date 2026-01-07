import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

// Mock Data
const queueData = [
  { id: 1, name: 'BRI', time: '1:15:00 AM', color: 'border-l-[#f43f5e]' }, // Red/Pink
  { id: 2, name: 'KATIE', time: '1:15:00 AM', color: 'border-l-[#4ade80]' }, // Green
  { id: 3, name: 'AD', time: '1:15:00 AM', color: 'border-l-[#2dd4bf]' }, // Teal
  { id: 4, name: 'BETTY', time: '1:15:00 AM', color: 'border-l-[#3b82f6]' }, // Blue
  { id: 5, name: 'EDISA', time: '1:15:00 AM', color: 'border-l-[#f43f5e]' },
  { id: 6, name: 'LIZ', time: '1:15:00 AM', color: 'border-l-[#94a3b8]' }, // Gray
  { id: 7, name: 'GLORY', time: '1:15:00 AM', color: 'border-l-[#fb923c]' }, // Orange
  { id: 8, name: 'JANE', time: '1:15:00 AM', color: 'border-l-[#8b5cf6]' }, // Violet
];

const serviceData = [
  { id: 4, ticketId: '#1 AD', tech: 'Kitty V', client: 'Walk-in', price: '$0.00', duration: '11 min', statusColor: 'bg-[#2dd4bf]' },
  { id: 5, ticketId: '#2 BETTY', tech: 'Brenda', client: 'Walk-in', price: '$0.00', duration: '11 min', statusColor: 'bg-[#f43f5e]' },
];

export default function ZotaQueue() {
  const [activeTab, setActiveTab] = useState('SERVICE');

  return (
    <div className="flex h-full gap-4">
      {/* LEFT COLUMN: QUEUE */}
      <div className="w-[35%] flex flex-col glass-panel rounded-xl overflow-hidden shadow-2xl bg-white/5 border border-white/10">
        <div className="bg-[#1e1b4b]/80 p-3 text-center border-b border-white/10">
          <h2 className="text-sm font-bold tracking-widest text-[#2dd4bf]">QUEUE</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <div className="grid grid-cols-2 gap-3">
             {queueData.map((item) => (
                <QueueCard key={item.id} item={item} />
             ))}
             {/* Duplicate for demo density */}
             {queueData.map((item) => (
                <QueueCard key={`dup-${item.id}`} item={{...item, id: 100+item.id}} />
             ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="p-2 flex justify-between items-center bg-[#1e1b4b]/50">
           <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0 bg-[#2dd4bf] text-[#1e1b4b] hover:bg-[#2dd4bf]/80">
             <ChevronLeft size={16} />
           </Button>
           <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0 bg-[#2dd4bf] text-[#1e1b4b] hover:bg-[#2dd4bf]/80">
             <ChevronRight size={16} />
           </Button>
        </div>
      </div>

      {/* RIGHT COLUMN: SERVICE / WAITING LIST */}
      <div className="flex-1 flex flex-col glass-panel rounded-xl overflow-hidden shadow-2xl bg-white/5 border border-white/10">
         {/* Tabs */}
         <div className="flex text-sm font-bold tracking-wide border-b border-white/10">
            {['SERVICE', 'WAITING LIST', 'CLOSE TICKET', 'TURN DETAILS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-4 text-center transition-all",
                  activeTab === tab 
                    ? "bg-[#2dd4bf]/20 text-[#2dd4bf] border-b-2 border-[#2dd4bf]" 
                    : "bg-[#1e1b4b]/60 text-gray-400 hover:text-white hover:bg-[#1e1b4b]/40"
                )}
              >
                {tab}
              </button>
            ))}
         </div>

         {/* Content Area */}
         <div className="flex-1 p-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {serviceData.map((ticket) => (
                 <ServiceCard key={ticket.id} ticket={ticket} />
               ))}
            </div>
         </div>
         
         <div className="p-4 flex justify-end absolute bottom-0 right-0 gap-2 mb-4 mr-4">
             <Button variant="ghost" size="sm" className="rounded-full h-10 w-10 p-0 bg-[#2dd4bf] text-[#1e1b4b] shadow-lg hover:scale-105 transition-transform">
               <ChevronRight size={20} className="-rotate-90" />
             </Button>
             <Button variant="ghost" size="sm" className="rounded-full h-10 w-10 p-0 bg-[#2dd4bf] text-[#1e1b4b] shadow-lg hover:scale-105 transition-transform">
               <ChevronRight size={20} className="rotate-90" />
             </Button>
         </div>
      </div>
    </div>
  );
}

const QueueCard = ({ item }: { item: any }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={cn(
      "bg-white rounded-lg p-2 shadow-sm flex gap-2 border-l-[6px] relative overflow-hidden",
      item.color
    )}
  >
     {/* Avatar Placeholder */}
     <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`} alt="avatar" className="w-full h-full object-cover" />
     </div>
     <div className="flex-1 min-w-0">
       <div className="flex justify-between items-start">
         <h4 className="font-bold text-xs text-gray-800 truncate">#{item.id} {item.name}</h4>
       </div>
       <div className="text-[9px] text-gray-500 mt-1 space-y-0.5 font-mono">
         <p>Done = {item.time}</p>
         <div className="flex justify-between">
           <span>T=0.00</span>
           <span>C=0.00</span>
         </div>
         <div className="flex justify-between">
           <span>L=0.00</span>
           <span>1:47 AM</span>
         </div>
       </div>
     </div>
  </motion.div>
);

const ServiceCard = ({ ticket }: { ticket: any }) => {
  const navigate = useNavigate();
  return (
  <div onClick={() => navigate('/pos-system/ticket/102')} className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col relative group cursor-pointer hover:shadow-2xl transition-all">
    {/* Header */}
    <div className="px-3 py-1 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
       <span className="font-bold text-sm text-gray-700">{ticket.ticketId}</span>
       <span className="text-xs font-bold text-gray-500">1</span>
    </div>

    {/* Body */}
    <div className="p-3 flex gap-3 items-center relative z-10">
       <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ticket.tech}`} alt="tech" className="w-full h-full" />
       </div>
       <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-lg">{ticket.tech}</h3>
          <p className="text-xs text-gray-500">1:53 AM - N/A</p>
       </div>
       <div className="text-right">
          <p className="font-bold text-gray-800 text-lg">{ticket.price}</p>
          <p className="text-xs text-red-500 font-bold">{ticket.duration}</p>
       </div>
    </div>
    
    {/* Diagonal Status Background */}
    <div className={cn("absolute bottom-0 right-0 w-16 h-16 opacity-50 z-0 mask-image-gradient", ticket.statusColor)} 
         style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }} />
  </div>
  );
};
