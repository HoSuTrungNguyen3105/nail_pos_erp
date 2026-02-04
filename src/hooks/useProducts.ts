import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import type { ProductFilters } from '../types/marketplace';

export const useProducts = (filters?: ProductFilters) => {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: () => productService.getProducts(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });
};

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => productService.getProductById(id),
        enabled: !!id,
    });
};
