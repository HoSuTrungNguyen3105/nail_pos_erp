import React from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  CheckSquare,
  FileText,
  Settings,
  Table,
  MessageSquare,
  Lock,
  Package,
  Store,
  Sparkles,
  LayoutGrid,
  Calendar,
  Users,
  Wallet,
  BarChart,
  UserCheck,
  Zap,
  QrCode,
  Globe,
} from 'lucide-react';
import type { MenuItemData } from './AdminMenuItem';

export interface SidebarSection {
  label: string;
  submenuHdr?: boolean;
  link?: string;
  icon?: React.ReactNode;
  submenuItems?: MenuItemData[];
}

export const SidebarData: SidebarSection[] = [
  {
    label: 'MENU',
    submenuHdr: true,
    submenuItems: [
      {
        label: 'Dashboard',
        link: '/admin',
        icon: <LayoutDashboard size={20} />,
      },
      {
        label: 'Contacts',
        link: '/admin/contacts',
        icon: <Users size={20} />,
      },
      {
        label: 'Inventory',
        link: '/admin/inventory',
        icon: <Package size={20} />,
      },
      {
        label: 'Point of sale',
        link: '/admin/pos',
        icon: <LayoutGrid size={20} />,
      },
      {
        label: 'Expenses',
        link: '/admin/expenses',
        icon: <Wallet size={20} />,
      },
      {
        label: 'Reports',
        link: '/admin/reports',
        icon: <BarChart size={20} />,
      },
      {
        label: 'Bookings',
        link: '/admin/booking',
        icon: <Calendar size={20} />,
      },
      {
        label: 'HRM',
        link: '/admin/hrm',
        icon: <UserCheck size={20} />,
      },
      {
        label: 'Essentials',
        link: '/admin/essentials',
        icon: <Zap size={20} />,
      },
      {
        label: 'Catalogue QR',
        link: '/admin/catalogue-qr',
        icon: <QrCode size={20} />,
      },
      {
        label: 'Woocommerce',
        link: '/admin/woocommerce',
        icon: <Globe size={20} />,
      },
    ],
  },
  {
    label: 'TASK',
    submenuHdr: true,
    submenuItems: [
      {
        label: 'Task',
        link: '/admin/task',
        icon: <CheckSquare size={20} />,
      },
      {
        label: 'Forms',
        link: '/admin/forms',
        icon: <FileText size={20} />,
        submenu: true,
        submenuItems: [
          {
            label: 'Form Elements',
            link: '/admin/forms/elements',
          },
          {
            label: 'Form Layout',
            link: '/admin/forms/layout',
          },
        ],
      },
    ],
  },
  {
    label: 'INVENTORY',
    submenuHdr: true,
    submenuItems: [
      {
        label: 'Nail Supply Hub',
        link: '/admin/nail-supply-hub',
        icon: <ShoppingCart size={20} />,
      },
      {
        label: 'Nail Equipment',
        link: '/admin/nail-equipment',
        icon: <Package size={20} />,
      },
      {
        label: 'Suppliers',
        link: '/admin/suppliers',
        icon: <Store size={20} />,
      },
    ],
  },
  {
    label: 'PAGES',
    submenuHdr: true,
    submenuItems: [
      {
        label: 'Settings',
        link: '/admin/settings',
        icon: <Settings size={20} />,
      },
      {
        label: 'Tables',
        link: '/admin/tables',
        icon: <Table size={20} />,
      },
    ],
  },
  {
    label: 'SUPPORT',
    submenuHdr: true,
    submenuItems: [
      {
        label: 'Messages',
        link: '/admin/messages',
        icon: <MessageSquare size={20} />,
      },
      {
        label: 'Authentication',
        link: '/admin/auth',
        icon: <Lock size={20} />,
        submenu: true,
        submenuItems: [
          {
            label: 'Sign In',
            link: '/admin/auth/signin',
          },
          {
            label: 'Sign Up',
            link: '/admin/auth/signup',
          },
        ],
      },
    ],
  },
  {
    label: 'REWARDS',
    submenuHdr: true,
    submenuItems: [
      {
        label: 'Magical Spin',
        link: '/admin/lucky-spin',
        icon: <Sparkles size={20} />,
      },
    ],
  },
];
