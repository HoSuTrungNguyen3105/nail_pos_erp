import {
    Box,
    Card,
    Typography,
    Button,
    IconButton,
    Tooltip as MuiTooltip,
    Chip,
    alpha
} from '@mui/material';
import {
    ShoppingCart,
    Star,
    Package,
    Eye,
    Heart,
} from 'lucide-react';
import { type Product } from './Marketplace';

const ProductCard = ({ product, viewMode }: { product: Product; viewMode: 'grid' | 'list' }) => {
    const isGrid = viewMode === 'grid';

    const cardContent = (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: isGrid ? 'column' : 'row',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            // '&:hover': {
            //     background: 'rgba(255, 255, 255, 0.04)',
            //     borderColor: 'rgba(217, 70, 239, 0.3)',
            //     boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            //     '& .quick-actions': { opacity: 1 },
            //     '& .add-button': { transform: 'translateY(0)' }
            // }
        }}>
            {/* Image Area */}
            <Box sx={{
                position: 'relative',
                width: isGrid ? '100%' : 160,
                pt: isGrid ? '75%' : 0,
                bgcolor: 'rgba(255,255,255,0.03)',
                flexShrink: 0
            }}>
                <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.1)'
                }}>
                    <Package size={isGrid ? 64 : 40} strokeWidth={1} />
                </Box>

                {/* Badges */}
                <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 1, flexDirection: 'column' }}>
                    {product.discount > 0 && (
                        <Chip label={`-${product.discount}%`} size="small" color="error" sx={{ fontWeight: 800, fontSize: '0.65rem', height: 20 }} />
                    )}
                    {product.isNew && (
                        <Chip label="NEW" size="small" color="info" sx={{ fontWeight: 800, fontSize: '0.65rem', height: 20 }} />
                    )}
                    {product.isBestseller && (
                        <Chip label="HOT" size="small" color="warning" sx={{ fontWeight: 800, fontSize: '0.65rem', height: 20 }} />
                    )}
                </Box>

                {product.stock === 0 && (
                    <Box sx={{
                        position: 'absolute', inset: 0, zIndex: 10, bgcolor: 'rgba(0,0,0,0.6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Typography variant="button" sx={{
                            color: '#fff', border: '2px solid #fff', px: 2, py: 1,
                            borderRadius: 1, fontWeight: 900, transform: 'rotate(-10deg)'
                        }}>
                            OUT OF STOCK
                        </Typography>
                    </Box>
                )}

                {/* Quick Add Overlay (Grid Only) */}
                {isGrid && product.stock > 0 && (
                    <Box className="add-button" sx={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, p: 2,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        transform: 'translateY(100%)',
                        transition: 'transform 0.3s ease',
                        zIndex: 11
                    }}>
                        <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            startIcon={<ShoppingCart size={16} />}
                            sx={{ bgcolor: '#fff', color: '#000', '&:hover': { bgcolor: '#f1f5f9' }, fontWeight: 700 }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                )}
            </Box>

            {/* Info Area */}
            <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Box>
                        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700, color: '#fff', maxWidth: 180 }}>
                            {product.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                            {product.brand} • {product.category}
                        </Typography>
                    </Box>
                    <Box className="quick-actions" sx={{ opacity: { xs: 1, md: 0 } }}>
                        <MuiTooltip title="Add to Wishlist">
                            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#f43f5e' } }}>
                                <Heart size={18} />
                            </IconButton>
                        </MuiTooltip>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Box display="flex" alignItems="center" gap={0.5} sx={{ color: '#fbbf24' }}>
                        <Star size={14} fill="currentColor" />
                        <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600 }}>{product.rating.toFixed(1)}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>({product.reviews} reviews)</Typography>
                </Box>

                <Box mt="auto" display="flex" justifyContent="space-between" alignItems="flex-end">
                    <Box>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#d946ef' }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                            <Typography variant="caption" sx={{
                                bgcolor: alpha('#d946ef', 0.1), color: '#d946ef', px: 0.8, py: 0.2, borderRadius: 1, fontWeight: 700, fontSize: '0.6rem'
                            }}>
                                WHOLESALE
                            </Typography>
                        </Box>
                        {product.discount > 0 && (
                            <Typography variant="caption" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                                ${product.originalPrice.toFixed(2)}
                            </Typography>
                        )}
                        <Typography variant="caption" sx={{ display: 'block', color: product.stock > 0 ? '#2dd4bf' : '#f43f5e', mt: 0.5, fontWeight: 600 }}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                        </Typography>
                    </Box>

                    <Box>
                        {!isGrid && (
                            <Button
                                variant="contained"
                                size="small"
                                disabled={product.stock === 0}
                                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
                            >
                                Add to Cart
                            </Button>
                        )}
                        <MuiTooltip title="Quick View">
                            <IconButton size="small" sx={{ ml: 1, color: 'rgba(255,255,255,0.3)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                <Eye size={18} />
                            </IconButton>
                        </MuiTooltip>
                    </Box>
                </Box>
            </Box>
        </Card>
    );

    return cardContent;
};

export default ProductCard;