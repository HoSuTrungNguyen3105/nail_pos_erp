// Product Categories
export type ProductCategory = 'gel' | 'polish' | 'machines' | 'accessories';

// Base Product Interface
export interface ProductBase {
    id: string; // SKU or UUID
    name: string;
    category: ProductCategory;
    price: number; // Wholesale price
    stock: number;
    minStockThreshold: number; // Safety threshold
    status: 'active' | 'inactive' | 'archived';
    description?: string;
    images?: string[];
    createdAt: string;
    updatedAt: string;
}

// 1. Gel Products
// Group: Viscosity, Curing Time, Color Board
export type GelViscosity = 'thin' | 'medium' | 'thick' | 'builder';
export type GelType = 'base' | 'top' | 'builder' | 'color' | 'art' | 'jelly';

export interface GelProduct extends ProductBase {
    category: 'gel';
    gelType: GelType;
    viscosity: GelViscosity;
    curingTime: string; // e.g., "30s LED / 60s UV"
    colorHex?: string; // For Color Gels
    collection?: string; // e.g. "Summer Vibes 2024"
}

// 2. Polish Products (Sơn)
// Group: Color Code, Volume, Bottle Shape
export interface PolishProduct extends ProductBase {
    category: 'polish';
    colorCode: string; // e.g. "RD-001"
    volume: number; // in ml
    bottleShape: 'round' | 'square' | 'custom';
    finish: 'glossy' | 'matte' | 'glitter' | 'cat-eye';
}

// 3. Machine Products (Máy móc)
// Group: Serial/IMEI, Warranty, Power
export interface MachineProduct extends ProductBase {
    category: 'machines';
    serialNumber: string; // Critical for warranty
    warrantyPeriod: number; // In months
    powerRating: number; // Wattage (W)
    voltage: string; // e.g. "110V-240V"
    model: string;
}

// 4. Accessory Products (Phụ kiện)
// Group: Set vs Piece
export type AccessoryUnit = 'piece' | 'set' | 'box' | 'pack';

export interface AccessoryProduct extends ProductBase {
    category: 'accessories';
    unit: AccessoryUnit;
    piecesPerUnit: number; // 1 for piece, >1 for set/box
    material?: string; // e.g. "Stainless Steel", "Wood"
    isConsumable: boolean; // True for files, buffers (ha hao)
}

// Discriminated Union for all Product types
export type Product =
    | GelProduct
    | PolishProduct
    | MachineProduct
    | AccessoryProduct;

// Order Related Types
export type OrderStatus = 'received' | 'packing' | 'shipping' | 'completed' | 'cancelled';

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    distributorid: string; // Who bought it
    status: OrderStatus;
    items: OrderItem[];
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}
