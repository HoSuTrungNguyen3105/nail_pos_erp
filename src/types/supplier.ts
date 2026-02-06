export type SupplierStatus = 'active' | 'inactive' | 'pending';
export type SupplierType = 'manufacturer' | 'wholesaler' | 'distributor' | 'direct';

export interface Supplier {
  id: string;
  name: string;
  type: SupplierType;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  status: SupplierStatus;
  productsSupplied: string[]; // Equipment categories they supply
  rating?: number; // 1-5 stars
  contractStart?: string;
  contractEnd?: string;
  paymentTerms?: string;
  notes?: string;
  lowStockAlert: boolean; // Should notify when stock is low
  createdAt: string;
  updatedAt: string;
}

export const SUPPLIER_TYPES: { value: SupplierType; label: string }[] = [
  { value: 'manufacturer', label: 'Manufacturer' },
  { value: 'wholesaler', label: 'Wholesaler' },
  { value: 'distributor', label: 'Distributor' },
  { value: 'direct', label: 'Direct Supplier' },
];

export const SUPPLIER_STATUS: { value: SupplierStatus; label: string; color: string }[] = [
  { value: 'active', label: 'Active', color: 'success' },
  { value: 'inactive', label: 'Inactive', color: 'error' },
  { value: 'pending', label: 'Pending', color: 'warning' },
];
