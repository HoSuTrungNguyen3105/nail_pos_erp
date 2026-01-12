import {
    Box,
    Checkbox,
    Chip,
    IconButton,
    Rating,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
    alpha
} from '@mui/material';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { InputTableWrapperCustom, type HeaderColumn } from '../../components/ui/Table';
import { type Product } from './Marketplace';

interface ProductTableProps {
    products: Product[];
    selected: number[];
    toggleRow: (id: number) => void;
    handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductTable = ({ products, selected, toggleRow, handleSelectAll }: ProductTableProps) => {
    const headersColumn: HeaderColumn[] = [
        { label: "Product", key: "name", minWidth: 250 },
        { label: "Category", key: "category", minWidth: 150 },
        { label: "Price", key: "price", width: 120 },
        { label: "Stock", key: "stock", width: 120 },
        { label: "Rating", key: "rating", width: 150 },
        { label: "Actions", key: "action", width: 150 },
    ];

    const isSelectedAll = selected.length === products.length && products.length > 0;

    return (
        <InputTableWrapperCustom
            headersColumn={headersColumn}
            isSelectedAll={isSelectedAll}
            handleSelectAll={handleSelectAll}
            hasCheckbox={true}
        >
            {products.map((product) => {
                const isChecked = selected.includes(product.id);
                const isOutOfStock = product.stock === 0;

                return (
                    <TableRow key={product.id}>
                        <TableCell sx={{ width: 48 }}>
                            <Checkbox
                                checked={isChecked}
                                onChange={() => toggleRow(product.id)}
                                sx={{
                                    color: 'rgba(217,70,239,0.5)',
                                    '&.Mui-checked': { color: '#e879f9' },
                                }}
                            />
                        </TableCell>

                        {/* Product Info */}
                        <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                    component="img"
                                    src={product.image}
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 2,
                                        objectFit: 'cover',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                />
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#fff' }}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        SKU: {product.sku}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>

                        {/* Category */}
                        <TableCell>
                            <Chip
                                label={product.category}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                    borderRadius: 1.5
                                }}
                            />
                        </TableCell>

                        {/* Price */}
                        <TableCell>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#d946ef' }}>
                                    ${product.price.toFixed(2)}
                                </Typography>
                                {product.discount > 0 && (
                                    <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                        ${product.originalPrice.toFixed(2)}
                                    </Typography>
                                )}
                            </Box>
                        </TableCell>

                        {/* Stock */}
                        <TableCell>
                            <Chip
                                label={isOutOfStock ? 'Out of Stock' : `${product.stock} items`}
                                size="small"
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: isOutOfStock ? alpha('#f43f5e', 0.1) : product.stock < 100 ? alpha('#fbbf24', 0.1) : alpha('#2dd4bf', 0.1),
                                    color: isOutOfStock ? '#f43f5e' : product.stock < 100 ? '#fbbf24' : '#2dd4bf',
                                    borderRadius: 1.5
                                }}
                            />
                        </TableCell>

                        {/* Rating */}
                        <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Rating value={product.rating} precision={0.1} size="small" readOnly />
                                <Typography variant="caption" color="text.secondary">
                                    ({product.reviews})
                                </Typography>
                            </Box>
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="Add to Cart">
                                    <IconButton
                                        size="small"
                                        disabled={isOutOfStock}
                                        sx={{
                                            bgcolor: alpha('#d946ef', 0.1),
                                            color: '#d946ef',
                                            '&:hover': { bgcolor: alpha('#d946ef', 0.2) }
                                        }}
                                    >
                                        <ShoppingCart size={16} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Quick View">
                                    <IconButton
                                        size="small"
                                        sx={{
                                            bgcolor: 'rgba(255,255,255,0.05)',
                                            color: 'text.secondary',
                                            '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' }
                                        }}
                                    >
                                        <Eye size={16} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Add to Wishlist">
                                    <IconButton
                                        size="small"
                                        sx={{
                                            bgcolor: 'rgba(255,255,255,0.05)',
                                            color: 'text.secondary',
                                            '&:hover': { color: '#f43f5e', bgcolor: alpha('#f43f5e', 0.1) }
                                        }}
                                    >
                                        <Heart size={16} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </TableCell>
                    </TableRow>
                );
            })}
        </InputTableWrapperCustom>
    );
};

export default ProductTable;
