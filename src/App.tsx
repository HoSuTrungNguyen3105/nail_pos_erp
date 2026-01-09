import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
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
import HiwebSidebar from './components/layout/HiwebSidebar';
import RouteLoadingFallback from './components/ui/RouteLoadingFallback';
import LogisticsDashboard from './pages/admin/LogisticsDashboard';

// Lazy load admin pages for better performance
const TailAdminDashboard = lazy(() => import('./pages/admin/dashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Ecommerce = lazy(() => import('./pages/admin/Ecommerce'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Task = lazy(() => import('./pages/admin/Task'));
const Forms = lazy(() => import('./pages/admin/Forms'));
const FormElements = lazy(() => import('./pages/admin/FormElements'));
const FormLayout = lazy(() => import('./pages/admin/FormLayout'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const Tables = lazy(() => import('./pages/admin/Tables'));
const Messages = lazy(() => import('./pages/admin/Messages'));
const Auth = lazy(() => import('./pages/admin/Auth'));
const SignIn = lazy(() => import('./pages/admin/SignIn'));
const SignUp = lazy(() => import('./pages/admin/SignUp'));

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />
      
      {/* Zota POS Routes - Full Screen */}
      <Route>
        {/* element={<RequireAuth allowedRoles={['distributor']} />} */}
        <Route path="/pos-system" element={<ZotaPosLayout />}>
          <Route index element={<ZotaQueue />} />
          <Route path="ticket/:id" element={<ZotaTicket />} />
          <Route path="appointment" element={<ZotaAppointment />} />
        </Route>
      </Route>

      {/* Provider Routes */}
      <Route>
        {/* element={<RequireAuth allowedRoles={['admin', 'provider']} />} */}
        <Route path="/provider" element={<ProviderLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProviderDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderProcessing />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="notifications" element={<Notifications />} />
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

      {/* Admin Routes - Lazy Loaded with Suspense */}
      <Route path="/admin" element={<HiwebSidebar />}>
        <Route 
          index 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <TailAdminDashboard />
            </Suspense>
          } 
        />
        <Route 
          path="ecommerce" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <Ecommerce />
            </Suspense>
          } 
        />
        <Route 
          path="analytics" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <Analytics />
            </Suspense>
          } 
        />
        <Route 
          path="task" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <Task />
            </Suspense>
          } 
        />
        <Route 
          path="forms" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <Forms />
            </Suspense>
          } 
        />
        <Route 
          path="forms/elements" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <FormElements />
            </Suspense>
          } 
        />
        <Route 
          path="forms/layout" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <FormLayout />
            </Suspense>
          } 
        />
        <Route 
          path="settings" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <Settings />
            </Suspense>
          } 
        />
        <Route 
          path="tables" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <Tables />
            </Suspense>
          } 
        />
        <Route 
          path="messages" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <Messages />
            </Suspense>
          } 
        />
        <Route 
          path="auth" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <Auth />
            </Suspense>
          } 
        />
          <Route 
          path="LogisticsDashboard" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <LogisticsDashboard />
            </Suspense>
          } 
        />
        <Route 
          path="auth/signin" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <SignIn />
            </Suspense>
          } 
        />
        <Route 
          path="auth/signup" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <SignUp />
            </Suspense>
          } 
        />
        <Route 
          path="old-dashboard" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <AdminDashboard />
            </Suspense>
          } 
        />
      </Route>

      {/* Fallback */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
