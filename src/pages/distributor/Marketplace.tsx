import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Search,
  ShoppingCart,
  TrendingUp,
  Star,
  Package,
  DollarSign,
  Grid,
  List,
  SlidersHorizontal,
  Download,
  Eye,
  Heart,
  Plus
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function Marketplace() {
  const categories = ['All', 'Gel Systems', 'Polish', 'Tools', 'Equipment', 'Accessories', 'Furniture', 'Consumables'];
  const brands = ['All Brands', 'Zota Premium', 'Elite Pro', 'Nail Master', 'Beauty Tech'];
  const priceRanges = ['All Prices', 'Under $50', '$50-$100', '$100-$500', 'Over $500'];

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBrand, setActiveBrand] = useState('All Brands');
  const [activePriceRange, setActivePriceRange] = useState('All Prices');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Analytics data for marketplace insights
  const analyticsData = [
    { metric: 'Total Products', value: '2,847', change: '+12%', trend: 'up' },
    { metric: 'In Stock', value: '2,634', change: '+8%', trend: 'up' },
    { metric: 'Low Stock', value: '156', change: '-5%', trend: 'down' },
    { metric: 'Out of Stock', value: '57', change: '-15%', trend: 'down' },
  ];

  const categoryDistribution = [
    { name: 'Gel Systems', value: 35, color: '#8b5cf6' },
    { name: 'Polish', value: 28, color: '#f59e0b' },
    { name: 'Tools', value: 20, color: '#22c55e' },
    { name: 'Equipment', value: 12, color: '#3b82f6' },
    { name: 'Accessories', value: 5, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Stats */}
        {analyticsData.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">{stat.metric}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                <TrendingUp size={14} className={stat.trend === 'down' ? 'rotate-180' : ''} />
                {stat.change}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Enhanced Banner */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="relative z-10 p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Wholesale Marketplace</h1>
              <p className="text-white/80 max-w-xl mb-4">
                Access premium nail supplies at exclusive distributor prices. Bulk discounts applied automatically at checkout.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Package size={16} />
                  2,847 Products Available
                </span>
                <span className="flex items-center gap-1">
                  <Star size={16} />
                  4.8 Average Rating
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign size={16} />
                  Up to 40% Off Wholesale
                </span>
              </div>
            </div>

            {/* Category Distribution Chart */}
            <div className="w-full lg:w-64 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#000'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Filters & Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="flex gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={16} />
              <Input
                className="pl-9 h-10"
                placeholder="Search products, brands, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-[var(--primary)] text-white' : ''}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filters
            </Button>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-3">
            <div className="flex bg-[var(--muted)] rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </Button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-md text-sm"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>

            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === cat
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--muted)]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-medium mb-3">Brands</h4>
                <select
                  value={activeBrand}
                  onChange={(e) => setActiveBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-md"
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <select
                  value={activePriceRange}
                  onChange={(e) => setActivePriceRange(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-md"
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Product Grid/List */}
      <div className={viewMode === 'grid'
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        : "space-y-4"
      }>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => (
          <ProductCard key={i} index={i} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}

const ProductCard = ({ index, viewMode }: { index: number; viewMode: 'grid' | 'list' }) => {
  const product = {
    name: `Zota Premium Gel V${index}`,
    sku: `ZPG-${200+index}`,
    price: 12.50 + (index * 2.5),
    originalPrice: 24.00 + (index * 5),
    rating: 4.5 + (Math.random() * 0.5),
    reviews: Math.floor(Math.random() * 500) + 10,
    stock: index === 2 ? 0 : Math.floor(Math.random() * 1000) + 50, // Mock out of stock for index 2
    category: ['Gel Systems', 'Polish', 'Tools', 'Equipment', 'Accessories'][index % 5],
    brand: 'Zota Premium',
    discount: index % 3 === 0 ? 40 : 0,
    isNew: index % 4 === 0,
    isBestseller: index % 5 === 0,
  };

  if (viewMode === 'list') {
    return (
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Package size={32} />
            </div>
            {product.discount > 0 && (
              <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
            {product.stock === 0 && (
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xs font-bold px-2 py-1 border border-white rounded">OUT OF STOCK</span>
                 </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">{product.brand} • {product.category}</p>
                <p className="text-xs text-[var(--muted-foreground)]">SKU: {product.sku}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {product.isNew && <span className="badge bg-blue-500 text-white">New</span>}
                {product.isBestseller && <span className="badge bg-orange-500 text-white">Bestseller</span>}
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-[var(--muted-foreground)]">({product.reviews} reviews)</span>
            </div>

            {/* Price & Stock */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[var(--primary)]">${product.price.toFixed(2)}</span>
                <span className="text-xs font-medium text-[var(--primary)] bg-[var(--primary)]/10 px-1.5 py-0.5 rounded">Wholesale</span>
                {product.discount > 0 && (
                  <span className="text-sm text-[var(--muted-foreground)] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.stock > 0 ? (
                    <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded">
                      {product.stock} in stock
                    </span>
                ) : (
                    <span className="text-xs bg-red-500/10 text-red-600 px-2 py-1 rounded font-bold">
                      Out of Stock
                    </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Heart size={16} />
                </Button>
                <Button size="sm" disabled={product.stock === 0}>
                  <Plus size={16} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
          <Package size={48} />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1 z-10">
          {product.discount > 0 && (
            <span className="badge bg-red-500 text-white border-none">-{product.discount}%</span>
          )}
          {product.isNew && <span className="badge bg-blue-500 text-white border-none">New</span>}
          {product.isBestseller && <span className="badge bg-orange-500 text-white border-none">Hot</span>}
        </div>
        
        {product.stock === 0 && (
             <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
                <span className="text-white font-bold border-2 border-white px-4 py-2 rounded transform -rotate-12">OUT OF STOCK</span>
             </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 bg-white/90 hover:bg-white">
            <Heart size={16} />
          </Button>
        </div>

        {/* Quick Add Overlay */}
        {product.stock > 0 && (
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 via-black/60 to-transparent z-10">
              <Button className="w-full bg-white text-black hover:bg-gray-100" size="sm">
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
            </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold truncate pr-2">{product.name}</h3>
          <p className="text-xs text-[var(--muted-foreground)] mb-1">{product.brand} • {product.category}</p>
          <p className="text-xs text-[var(--muted-foreground)]">SKU: {product.sku}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star size={12} className="text-yellow-400 fill-current" />
          <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-xs text-[var(--muted-foreground)]">({product.reviews})</span>
        </div>

        {/* Price & Stock */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[var(--primary)]">${product.price.toFixed(2)}</span>
              <span className="text-[10px] font-bold text-[var(--primary)] uppercase bg-[var(--primary)]/10 px-1 rounded">Wholesale</span>
            </div>
            <div className="flex gap-2 items-center">
                {product.discount > 0 && (
                    <span className="text-xs text-[var(--muted-foreground)] line-through">
                    ${product.originalPrice.toFixed(2)}
                    </span>
                )}
                 {product.stock > 0 ? (
                    <p className="text-xs text-green-600 mt-0.5">{product.stock} in stock</p>
                 ) : (
                    <p className="text-xs text-red-600 mt-0.5 font-bold">Out of stock</p>
                 )}
            </div>
          </div>
          <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity" disabled={product.stock === 0}>
            <Eye size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
};
