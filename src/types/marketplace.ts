export interface MarketplaceProduct {
    id: number;
    name: string;
    sku: string;
    price: number;
    originalPrice: number;
    image: string;
    rating: number;
    reviews: number;
    stock: number;
    category: string;
    brand: string;
    discount: number;
    isNew: boolean;
    isBestseller: boolean;
}

export interface ProductFilters {
    category: string;
    brand: string;
    priceRange: string;
    search: string;
    sortBy: string;
}
