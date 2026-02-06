export interface StylistTask {
  id: string;
  type: 'service' | 'break' | 'walk-in';
  description: string;
  status?: 'in-progress' | 'waiting' | 'completed';
  duration?: string;
  color?: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  tasks: StylistTask[];
}

export interface Customer {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  service: string;
  status?: 'in-progress' | 'waiting' | 'completed';
}

export interface Booking {
  id: string;
  time: string;
  endTime?: string;
  customerName: string;
  stylistName: string;
  service: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

export interface FeedItem {
  id: string;
  type: 'cash-out' | 'notification' | 'alert';
  customerName: string;
  service: string;
  products?: string;
  amount: number;
  status: 'ready' | 'pending';
  avatar?: string;
  initials: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  customerName: string;
  service: string;
  status: 'scheduled' | 'walk-in';
}

export interface RevenueMetrics {
  services: {
    amount: number;
    transactions: number;
  };
  products: {
    amount: number;
    transactions: number;
  };
}
