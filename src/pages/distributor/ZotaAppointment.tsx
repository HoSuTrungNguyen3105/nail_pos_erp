import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { 
  ChevronLeft, Search, Plus, 
  User, Edit, MoreHorizontal,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SERVICE_CATEGORIES = ['NAILS', 'MASSAGE', 'FACIAL', 'WAXING', 'HAIR', 'MAKE UP'];

const SERVICES = [
  { name: '60 Min Massage/PKG', price: 65.00, duration: 60, color: 'bg-[#115e59]' }, // Dark Teal
  { name: '90 mins Swedish', price: 90.00, duration: 90, color: 'bg-[#115e59]' },
  { name: '60 mins Therapeutic', price: 70.00, duration: 60, color: 'bg-[#115e59]' },
  { name: '60 mins Deep', price: 80.00, duration: 60, color: 'bg-[#115e59]' },
  { name: 'Firm Touch Massage', price: 75.00, duration: 60, color: 'bg-[#115e59]' },
  { name: '60 mins Hot Stone', price: 75.00, duration: 60, color: 'bg-[#115e59]' },
  { name: 'Couples Massage', price: 65.00, duration: 60, color: 'bg-[#115e59]' },
  
  // Right Column Services
  { name: '60 mins Swedish', price: 60.00, duration: 60, color: 'bg-[#a78bfa]' }, // Lavender
  { name: 'Bamboo Massage', price: 70.00, duration: 60, color: 'bg-[#a78bfa]' },
  { name: '90 mins Therapeutic', price: 100.00, duration: 90, color: 'bg-[#a78bfa]' },
  { name: '90 mins Holistic', price: 90.00, duration: 90, color: 'bg-[#a78bfa]' },
  { name: 'Hot Stone Deep', price: 85.00, duration: 60, color: 'bg-[#a78bfa]' },
  { name: '90 mins Hot Stone', price: 100.00, duration: 90, color: 'bg-[#a78bfa]' },
  { name: 'Upgrade Massage Service', price: null, duration: 0, color: 'bg-[#a78bfa]' },
];

export default function ZotaAppointment() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('MASSAGE');
  const [selectedDate] = useState('01/05/2021');
  const [selectedTime] = useState('11:45 AM');

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#be123c] text-white p-2 overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between h-14 shrink-0 mb-2">
         <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="text-white hover:bg-white/10">
               <ChevronLeft size={28} />
            </Button>
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
               <span className="font-bold text-xl">Z</span>
            </div>
         </div>

         {/* Center Info */}
         <div className="flex items-center gap-4 bg-[#1e1b4b]/60 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <span className="text-teal-400 font-bold text-lg">Hannah .</span>
            <span className="text-teal-400 font-bold text-lg">312-588-8888</span>
            <Search size={20} className="text-white/70" />
         </div>
         
         <div className="flex items-center gap-4">
            <div className="bg-white/10 px-4 py-1 rounded-full text-center">
               <p className="text-xs font-bold text-white/80">Tuesday Jan 5, 2021</p>
               <p className="text-xs font-bold text-white/80">5:36:12 PM</p>
            </div>
            <span className="font-bold tracking-wide">UN-ASSIGN</span>
            <Search size={24} />
         </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
         {/* LEFT PANEL: APPOINTMENT DETAILS */}
         <div className="w-[400px] flex flex-col gap-3 bg-[#1e1b4b]/40 backdrop-blur-xl rounded-xl border border-white/10 p-4 shadow-2xl">
            {/* Header / Edit */}
            <div className="flex justify-between items-start mb-2">
               <Button variant="ghost" size="sm" className="text-white/60"><Edit size={18} /></Button>
               <Search size={20} className="text-white/60" />
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-y-2 text-xs font-medium mb-2">
               <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 border border-white/40 rounded flex items-center justify-center"></div>
                  Prebook
               </label>
               <span className="text-right text-white/60">No Shows 0</span>
               
               <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 border border-white/40 rounded flex items-center justify-center"></div>
                  Online Confirmed
               </label>
               <span className="text-right text-white/60">Cancellations 0</span>
            </div>

            {/* Note Field */}
            <div className="relative">
               <div className="bg-white/20 rounded-lg p-2 min-h-[40px] flex items-center justify-between">
                  <span className="text-white/70 text-sm">Note:</span>
                  <MoreHorizontal size={18} className="text-white/70" />
               </div>
            </div>

            {/* Appt Notes */}
            <div className="relative flex gap-2">
               <div className="bg-[#4c1d95]/50 flex-1 rounded-lg p-3 text-sm text-white/80 border border-white/10">
                  Appointment Notes
               </div>
               <Button size="sm" className="bg-[#4c1d95]/50 border border-white/10 hover:bg-[#4c1d95] px-2"><Plus size={20}/></Button>
            </div>

            {/* Request Dropdowns */}
            <div className="grid grid-cols-2 gap-2">
               <div className="bg-[#4c1d95]/50 rounded-lg p-2 flex justify-between items-center text-sm border border-white/10">
                  <span>Request</span>
                  <ChevronLeft size={16} className="-rotate-90 opacity-60" />
               </div>
               <div className="flex gap-2">
                  <div className="bg-[#4c1d95]/50 flex-1 rounded-lg p-2 flex justify-between items-center text-sm border border-white/10">
                     <span>Kit / Formula</span>
                     <ChevronLeft size={16} className="-rotate-90 opacity-60" />
                  </div>
                  <Button size="sm" className="bg-[#4c1d95]/50 border border-white/10 hover:bg-[#4c1d95] shrink-0 px-2"><Plus size={20}/></Button>
               </div>
            </div>

            {/* Date Time Picker */}
            <div className="grid grid-cols-[1fr,1fr,auto] gap-2 items-center">
               <button className="bg-[#4c1d95]/60 hover:bg-[#4c1d95] text-[#2dd4bf] font-bold py-3 rounded-lg text-lg border border-white/10 transition-colors">
                  {selectedDate}
               </button>
               <button className="bg-[#4c1d95]/60 hover:bg-[#4c1d95] text-[#2dd4bf] font-bold py-3 rounded-lg text-lg border border-white/10 transition-colors">
                  {selectedTime}
               </button>
               <div className="p-2">
                  <User size={24} />
               </div>
            </div>

            {/* Services List */}
            <div className="flex-1 bg-white/5 rounded-xl border border-white/10 mt-2 overflow-y-auto custom-scrollbar">
               {/* Item 1 */}
               <div className="flex items-center gap-3 p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center font-bold">BM</div>
                  <div className="flex-1">
                     <div className="flex justify-between font-bold text-sm">
                        <span>60 mins Swedish</span>
                        <span>$60.00</span>
                     </div>
                     <div className="flex justify-between text-xs text-white/60 italic">
                        <span>Bri - (QUEUE)</span>
                        <span>11:45 AM | 60 min</span>
                     </div>
                  </div>
               </div>
               
               {/* Item 2 */}
               <div className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center font-bold">BM</div>
                  <div className="flex-1">
                     <div className="flex justify-between font-bold text-sm">
                        <span>Lavender Mani</span>
                        <span>$25.00</span>
                     </div>
                     <div className="flex justify-between text-xs text-white/60 italic">
                        <span>Bri - (QUEUE)</span>
                        <span>12:45 PM | 30 min</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-auto pt-2">
               <Button className="bg-white text-black hover:bg-gray-200 font-bold rounded-full py-6 text-lg tracking-wider">OK</Button>
               <Button className="bg-white text-black hover:bg-gray-200 font-bold rounded-full py-6 text-lg tracking-wider" onClick={() => navigate(-1)}>CANCEL</Button>
            </div>
         </div>

         {/* RIGHT PANEL: SERVICES */}
         <div className="flex-1 flex flex-col bg-[#4c1d95]/30 backdrop-blur-md rounded-xl border border-white/10 p-4 shadow-xl">
            {/* Tabs */}
            <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
               {SERVICE_CATEGORIES.map(category => (
                  <button
                     key={category}
                     onClick={() => setActiveCategory(category)}
                     className={cn(
                        "flex-1 min-w-[100px] py-3 rounded-t-lg font-bold text-sm border-t border-x border-white/20 transition-all",
                        activeCategory === category 
                           ? "bg-[#2dd4bf] text-[#134e4a] shadow-[0_-4px_10px_rgba(45,212,191,0.3)]" 
                           : "bg-[#4c1d95]/40 text-white/70 hover:bg-[#4c1d95]/60 hover:text-white"
                     )}
                  >
                     {category}
                  </button>
               ))}
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-2 gap-4 overflow-y-auto p-1 custom-scrollbar">
               {SERVICES.map((service, i) => (
                  <motion.button
                     key={i}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className={cn(
                        "h-16 rounded-[2rem] px-6 flex items-center justify-between text-white border border-white/10 shadow-lg",
                        service.color
                     )}
                  >
                     <span className="font-bold text-sm">{service.name}</span>
                     {service.price && <span className="font-bold text-sm">${service.price.toFixed(2)}</span>}
                  </motion.button>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
