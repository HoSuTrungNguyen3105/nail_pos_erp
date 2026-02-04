import { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import PromoBanner from './PromoBanner';
import ProductCard from './ProductCard';
import StatCard from './StatCard';
import ProductTable from './ProductTable';
import FiltersLayout from './FiltersLayout';
import { useProducts } from '../../hooks/useProducts';
import type { MarketplaceProduct } from '../../types/marketplace';

// Exporting Product type alias for backward compatibility or updating import paths recommended
export type Product = MarketplaceProduct;

// --- Constants & Types ---
const CATEGORIES = ['All', 'Gel Systems', 'Polish', 'Tools', 'Equipment', 'Accessories', 'Furniture', 'Consumables'];
const BRANDS = ['All Brands', 'Zota Premium', 'Elite Pro', 'Nail Master', 'Beauty Tech'];
const PRICE_RANGES = ['All Prices', 'Under $50', '$50-$100', '$100-$500', 'Over $500'];

const ANALYTICS_DATA = [
  { metric: 'Total Products', value: '2,847', change: '+12%', trend: 'up' },
  { metric: 'In Stock', value: '2,634', change: '+8%', trend: 'up' },
  { metric: 'Low Stock', value: '156', change: '-5%', trend: 'down' },
  { metric: 'Out of Stock', value: '57', change: '-15%', trend: 'down' },
];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBrand, setActiveBrand] = useState('All Brands');
  const [activePriceRange, setActivePriceRange] = useState('All Prices');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const { data: products = [], isLoading, error } = useProducts({
    category: activeCategory,
    brand: activeBrand,
    priceRange: activePriceRange,
    search: searchQuery,
    sortBy: sortBy
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.checked ? products.map((r) => r.id) : []);
  };

  const toggleRow = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column', gap: 2 }}>
        <Typography color="error" variant="h6">Failed to load products</Typography>
        <Typography color="text.secondary">Please try again later.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 2, mb: 2 }}>
      {/* Analytics Stats */}
      <Grid container spacing={3}>
        {ANALYTICS_DATA.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
            <StatCard stat={stat} />
          </Grid>
        ))}
      </Grid>

      {/* Main Banner */}
      <PromoBanner />

      {/* Filter Section */}
      <FiltersLayout
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
        activePriceRange={activePriceRange}
        setActivePriceRange={setActivePriceRange}
        categories={CATEGORIES}
        brands={BRANDS}
        priceRanges={PRICE_RANGES}
      />

      {/* Product List */}
      {viewMode === 'grid' ? (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 4,
                xl: 3,
              }}
              key={product.id}
            >
              <ProductCard product={product} viewMode={viewMode} />
            </Grid>
          ))}
          {products.length === 0 && (
            <Box sx={{ width: '100%', p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">No products found.</Typography>
            </Box>
          )}
        </Grid>
      ) : (
        <ProductTable
          products={products}
          selected={selected}
          toggleRow={toggleRow}
          handleSelectAll={handleSelectAll}
        />
      )}
    </Box>
  );
}
