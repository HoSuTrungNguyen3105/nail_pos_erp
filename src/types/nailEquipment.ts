export interface NailEquipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  brand?: string;
  quantity: number;
  price: number;
  unit: string;
  status: EquipmentStatus;
  description?: string;
  supplier?: string;
  lastRestocked?: string;
  minQuantity: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type EquipmentCategory = 
  | 'nail-polish'
  | 'gel'
  | 'acrylic'
  | 'tools'
  | 'files-buffers'
  | 'uv-lamps'
  | 'drills'
  | 'brushes'
  | 'acetone-removers'
  | 'treatments'
  | 'decorations'
  | 'sanitizers'
  | 'other';

export type EquipmentStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';

export const EQUIPMENT_CATEGORIES: { value: EquipmentCategory; label: string }[] = [
  { value: 'nail-polish', label: 'Nail Polish' },
  { value: 'gel', label: 'Gel Polish' },
  { value: 'acrylic', label: 'Acrylic Products' },
  { value: 'tools', label: 'Nail Tools' },
  { value: 'files-buffers', label: 'Files & Buffers' },
  { value: 'uv-lamps', label: 'UV/LED Lamps' },
  { value: 'drills', label: 'Electric Drills' },
  { value: 'brushes', label: 'Brushes' },
  { value: 'acetone-removers', label: 'Acetone & Removers' },
  { value: 'treatments', label: 'Nail Treatments' },
  { value: 'decorations', label: 'Decorations' },
  { value: 'sanitizers', label: 'Sanitizers & Cleaners' },
  { value: 'other', label: 'Other' },
];

export const EQUIPMENT_STATUS: { value: EquipmentStatus; label: string; color: string }[] = [
  { value: 'in-stock', label: 'In Stock', color: 'success' },
  { value: 'low-stock', label: 'Low Stock', color: 'warning' },
  { value: 'out-of-stock', label: 'Out of Stock', color: 'error' },
  { value: 'discontinued', label: 'Discontinued', color: 'default' },
];
