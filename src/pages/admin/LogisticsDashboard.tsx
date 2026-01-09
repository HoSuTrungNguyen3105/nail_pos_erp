import React, { type ReactNode } from 'react';
import { Truck, Package, ShoppingCart, AlertTriangle, CheckCircle, Clock, MapPin, XCircle, RotateCcw, PauseCircle } from 'lucide-react';
import SEO from './components/SEO';

export interface MetricPillProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient: string;
    ringColor?: string; // NEW
}

const MetricPill: React.FC<MetricPillProps> = ({
  title,
  value,
  icon,
  gradient,
  ringColor = 'ring-white/30',
}) => {
  return (
    <div
      className={`
        relative flex items-center justify-between px-5 py-4
        rounded-full bg-gradient-to-r ${gradient}
        text-white shadow-md
        ring-1 ${ringColor}
        transition-all duration-200
        hover:shadow-lg hover:scale-[1.02]
      `}
    >
      {/* Glow layer */}
      <div
        className={`
          absolute inset-0 rounded-full blur-md opacity-30
          bg-gradient-to-r ${gradient}
          -z-10
        `}
      />

      <div className="flex items-center gap-3">
        <div className="bg-white/20 ring-1 ring-white/30 p-2 rounded-full flex items-center justify-center">
          {icon}
        </div>

        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-xl font-bold leading-none">{value}</p>
        </div>
      </div>
    </div>
  );
};

// Vehicle Table Component
interface Vehicle {
  id: string;
  type: string;
  name: string;
  status: 'Active' | 'Idle' | 'Maintenance';
  location: string;
  lastService: string;
  nextMaintenance: string;
  driver: string;
  driverAvatar?: string;
}

const VEHICLES: Vehicle[] = [
  { id: 'WD-EXP-118', type: 'Toyota Highlander 2024', name: 'Toyota Highlander 2024', status: 'Active', location: 'Belgrade, SB', lastService: '2025-01-07', nextMaintenance: '2025-12-23', driver: 'John Doe' },
  { id: 'VR-EXP-150', type: 'Lexus 350 2020', name: 'Lexus 350 2020', status: 'Idle', location: 'San Diego, LA', lastService: '2025-01-01', nextMaintenance: '2025-10-08', driver: 'Jane Smith' },
  { id: 'TE-CAR-120', type: 'Ford F-150', name: 'Ford F-150', status: 'Maintenance', location: 'Houston, TX', lastService: '2025-01-05', nextMaintenance: '2025-11-15', driver: 'Mike Johnson' },
  { id: 'LH-AUX-8UH', type: 'Kia Gran Reeper', name: 'Kia Gran Reeper', status: 'Active', location: 'Houston, TX', lastService: '2025-01-03', nextMaintenance: '2025-11-15', driver: 'Emily Davis' },
  { id: 'QU-326-305', type: 'Chev the Destroyer', name: 'Chev the Destroyer', status: 'Maintenance', location: 'Caracas, VZ', lastService: '2025-01-09', nextMaintenance: '2025-12-14', driver: 'Emily Davis' },
];

const LogisticsDashboard: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/10';
      case 'Idle': return 'text-yellow-400 bg-yellow-400/10';
      case 'Maintenance': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <>
      <SEO
        title="Logistics Dashboard - Admin"
        description="Comprehensive logistics dashboard for tracking shipments, vehicles, and delivery metrics."
      />

      <main className="space-y-6">
        {/* Page Header */}
        <header>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Welcome back to,</p>
              <h1 className="text-2xl font-bold text-white">Logistics Dashboard</h1>
            </div>
          </div>
        </header>

        {/* Metrics Grid - 2 rows x 4 columns matching the image */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Row 1 */}
          <MetricPill
            title="Total Shipments"
            value={869}
            icon={<Package className="w-5 h-5" />}
            gradient="from-cyan-400 to-blue-500"
          />
          <MetricPill
            title="Pending"
            value={562}
            icon={<Clock className="w-5 h-5" />}
            gradient="from-pink-500 to-red-500"
          />
          <MetricPill
            title="Delivered"
            value={624}
            icon={<CheckCircle className="w-5 h-5" />}
            gradient="from-purple-500 to-indigo-600"
          />
          <MetricPill
            title="Cancelled"
            value={47}
            icon={<XCircle className="w-5 h-5" />}
            gradient="from-blue-600 to-blue-800"
          />

          {/* Row 2 */}
          <MetricPill
            title="In Transit"
            value={365}
            icon={<Truck className="w-5 h-5" />}
            gradient="from-green-400 to-emerald-500"
          />
          <MetricPill
            title="Returned"
            value={26}
            icon={<RotateCcw className="w-5 h-5" />}
            gradient="from-amber-400 to-orange-500"
          />
          <MetricPill
            title="On Hold"
            value={78}
            icon={<PauseCircle className="w-5 h-5" />}
            gradient="from-teal-400 to-green-500"
          />
          <MetricPill
            title="Failed"
            value={15}
            icon={<AlertTriangle className="w-5 h-5" />}
            gradient="from-orange-500 to-red-600"
          />
        </section>

        {/* Vehicle List Table */}
        <section className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Vehicle List</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-500/20">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white">Vehicle ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white">Type</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white">Current Location</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white">Last Service Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white">Next Maintenance</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white">Driver Assigned</th>
                </tr>
              </thead>
              <tbody>
                {VEHICLES.map((vehicle, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                          <Truck className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-medium">{vehicle.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300">{vehicle.type}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {vehicle.location}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300">{vehicle.lastService}</td>
                    <td className="py-4 px-6 text-slate-300">{vehicle.nextMaintenance}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                          {vehicle.driver.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-slate-300">{vehicle.driver}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Section - 4 columns */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Vehicle Status */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Vehicle Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Active</span>
                <span className="text-green-400 font-semibold">35%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500" style={{ width: '35%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Idle</span>
                <span className="text-yellow-400 font-semibold">45%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500" style={{ width: '45%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Maintenance</span>
                <span className="text-blue-400 font-semibold">20%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-500" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>

          {/* Orders by Country */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Orders by Country</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-500"></div>
                  <span className="text-slate-300">United States</span>
                </div>
                <span className="text-white font-semibold">1,245</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                  <span className="text-slate-300">Canada</span>
                </div>
                <span className="text-white font-semibold">856</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500"></div>
                  <span className="text-slate-300">Mexico</span>
                </div>
                <span className="text-white font-semibold">432</span>
              </div>
            </div>
          </div>

          {/* Avg Delivery Time */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Avg Delivery Time</h3>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl font-bold text-white mb-2">2.5</p>
                <p className="text-slate-400">Days</p>
                <p className="text-sm text-teal-400 mt-2">↓ 15% faster</p>
              </div>
            </div>
          </div>

          {/* Total Revenue (new fourth widget) */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Total Revenue</h3>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl font-bold text-white mb-2">$1.2M</p>
                <p className="text-slate-300">This Month</p>
                <p className="text-sm text-green-400 mt-2">↑ 8% MoM</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LogisticsDashboard;
