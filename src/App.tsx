import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import { RequireAuth } from './components/auth/RequireAuth';
import { ProviderLayout } from './components/layout/ProviderLayout';
import ProviderDashboard from './pages/provider/Dashboard';
import ProductManagement from './pages/provider/ProductManagement';
import OrderProcessing from './pages/provider/OrderProcessing';
import Inventory from './pages/provider/Inventory';

import { DistributorLayout } from './components/layout/DistributorLayout';
import Marketplace from './pages/distributor/Marketplace';
import Warehouse from './pages/distributor/Warehouse';
import Reports from './pages/distributor/Reports';
import CRM from './pages/distributor/CRM';
import UserProfile from './pages/shared/Profile';
import Notifications from './pages/shared/Notifications';

import { ZotaPosLayout } from './components/layout/ZotaPosLayout';
import ZotaQueue from './pages/distributor/ZotaQueue';
import ZotaTicket from './pages/distributor/ZotaTicket';
import ZotaAppointment from './pages/distributor/ZotaAppointment';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />
      
      {/* New Zota POS Route (Bypasses Distributor Layout for Full Screen) */}
      <Route>
      {/* element={<RequireAuth allowedRoles={['distributor']} />} */}
         <Route path="/pos-system" element={<ZotaPosLayout />}>
            <Route index element={<ZotaQueue />} />
            <Route path="ticket/:id" element={<ZotaTicket />} />
            <Route path="appointment" element={<ZotaAppointment />} />
         </Route>
      </Route>

      {/* Provider Routes */}
      <Route element={<RequireAuth allowedRoles={['admin', 'provider']} />}>
        <Route path="/provider" element={<ProviderLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProviderDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderProcessing />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="notifications" element={<Notifications />} />
                    {/* <Route path="distributors" element={<Distribu />} /> */}
        </Route>
      </Route>

      {/* Distributor Routes */}
      <Route>
        {/* element={<RequireAuth allowedRoles={['distributor']} /> */}
        <Route path="/distributor" element={<DistributorLayout />}>
          <Route index element={<Navigate to="marketplace" replace />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="pos" element={<Navigate to="/pos-system" replace />} />
          <Route path="reports" element={<Reports />} />
          <Route path="crm" element={<CRM />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
