import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import MarketplaceFilters from './MarketplaceFilters';
import PromoBanner from './PromoBanner';
import ProductCard from './ProductCard';
import StatCard from './StatCard';
import ProductTable from './ProductTable';

export interface Product {
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

  const products: Product[] = useMemo(() => [0, 1, 2].map((i) => ({
    id: i + 1,
    name: `Nail Gel Polish - ${i + 1}`,
    sku: `ZPG-${200 + i}`,
    price: 24.99 + (i * 5),
    originalPrice: 35.00 + (i * 5),
    image: `https://images.unsplash.com/photo-1604654894611-6973b376cbde?w=400&q=80`,
    rating: 4.5 + (Math.random() * 0.5),
    reviews: Math.floor(Math.random() * 500) + 10,
    stock: i === 2 ? 0 : Math.floor(Math.random() * 1000) + 50,
    category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1],
    brand: 'Zota Premium',
    discount: i % 3 === 0 ? 40 : 0,
    isNew: i % 4 === 0,
    isBestseller: i % 5 === 0,
  })), []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.checked ? products.map((r) => r.id) : []);
  };

  const toggleRow = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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
      <MarketplaceFilters
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
