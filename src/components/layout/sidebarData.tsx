import React from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  BarChart2,
  CheckSquare,
  FileText,
  Settings,
  Table,
  MessageSquare,
  Lock,
  Activity,
  Package,
  Store,
  Sparkles,
  LayoutGrid,
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
        label: 'eCommerce',
        link: '/admin/ecommerce',
        icon: <ShoppingCart size={20} />,
      },
      {
        label: 'Nail POS',
        link: '/admin/pos',
        icon: <LayoutGrid size={20} />,
      },
      {
        label: 'Analytics',
        link: '/admin/analytics',
        icon: <BarChart2 size={20} />,
      },
      {
        label: 'ERP Dashboard',
        link: '/admin/erp',
        icon: <Activity size={20} />,
      },
      {
        label: 'Salon Dashboard',
        link: '/admin/salon',
        icon: <Package size={20} />,
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
