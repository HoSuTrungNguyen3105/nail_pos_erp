import { api } from '../lib/axios';
import type { MarketplaceProduct, ProductFilters } from '../types/marketplace';

export const productService = {
    getProducts: async (filters?: ProductFilters): Promise<MarketplaceProduct[]> => {
        // Construct query params from filters
        const params = new URLSearchParams();
        if (filters) {
            if (filters.category && filters.category !== 'All') params.append('category', filters.category);
            if (filters.brand && filters.brand !== 'All Brands') params.append('brand', filters.brand);
            if (filters.search) params.append('q', filters.search);
            // Add other filters as needed
        }

        try {
            const response = await api.get<MarketplaceProduct[]>('/products', { params });
            return response.data;
        } catch (error) {
            // fallback for demo purposes if API doesn't exist yet
            console.warn('API call failed, returning mock data for fallback', error);
            // We can throw error here if we want strict API usage, or return mock data.
            // For now, let's propagate the error so react-query handles it, 
            // OR we can implement a mock adapter. 
            // Given the user asked to "use call api", I will assume they want real API calls.
            throw error;
        }
    },

    getProductById: async (id: number): Promise<MarketplaceProduct> => {
        const response = await api.get<MarketplaceProduct>(`/products/${id}`);
        return response.data;
    }
};
