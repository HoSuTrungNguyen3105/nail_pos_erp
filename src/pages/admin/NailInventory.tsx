import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Stack,
    TextField,
    InputAdornment,
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress,
} from '@mui/material';
import {
    Search,
    Package,
    Archive,
    Filter,
    Plus,
    MoreVertical,
    Droplets,
    Scissors,
    Sparkles,
    Calendar,
    Hash,
    Maximize,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// --- Mock Data ---

const STORAGE_BINS = [
    { id: 'BIN-A1', name: 'Polish Main A1', category: 'Polish', usage: 75, items: 124, color: '#6366f1' },
    { id: 'BIN-A2', name: 'Gel Colors A2', category: 'Gel', usage: 45, items: 86, color: '#8b5cf6' },
    { id: 'BIN-B1', name: 'Tools & Scissors B1', category: 'Tools', usage: 90, items: 42, color: '#f59e0b' },
    { id: 'BIN-C1', name: 'Glitter & Gems C1', category: 'Decor', usage: 30, items: 250, color: '#d946ef' },
];

const INVENTORY_ITEMS = [
    {
        id: 'ITM-001',
        name: 'OPI Nail Lacquer - Big Apple Red',
        binId: 'BIN-A1',
        category: 'Polish',
        lot: 'LOT-2024-03-A',
        color: '#cc0000',
        size: '15ml',
        stock: 48,
        status: 'In Stock'
    },
    {
        id: 'ITM-002',
        name: 'Zota Builder Gel - Clear',
        binId: 'BIN-A2',
        category: 'Gel',
        lot: 'LOT-2024-01-C',
        color: '#ffffff',
        size: '50g',
        stock: 5,
        status: 'Low Stock'
    },
    {
        id: 'ITM-003',
        name: 'Professional Cuticle Nipper',
        binId: 'BIN-B1',
        category: 'Tools',
        lot: 'BATCH-N2',
        size: 'Size 14',
        stock: 12,
        status: 'In Stock'
    },
    {
        id: 'ITM-004',
        name: 'Aurora Borealis Crystals (XS)',
        binId: 'BIN-C1',
        category: 'Decor',
        lot: 'G-2023-X',
        color: 'Iridescent',
        size: 'SS3',
        stock: 1200,
        status: 'In Stock'
    },
];

export default function NailInventory() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Box>
            {/* Header Section */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(90deg, #4f46e5 0%, #d946ef 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 0.5
                        }}
                    >
                        Nail Tool Inventory
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your tools, supplies, and batch lots across storage bins.
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<Archive size={20} />}>
                        Manage Bins
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Plus size={20} />}
                        sx={{ background: 'linear-gradient(90deg, #4f46e5 0%, #d946ef 100%)' }}
                        onClick={() => navigate('/admin/inventory/add')}
                    >
                        Add New Item
                    </Button>
                </Stack>
            </Stack>

            {/* Storage bins Section */}
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Package size={22} className="text-indigo-600" />
                Storage Bins (Thùng chứa)
            </Typography>
            <Grid container spacing={3} sx={{ mb: 5 }}>
                {STORAGE_BINS.map((bin) => (
                    <Grid size={3} key={bin.id}>
                        <Card
                            component={motion.div}
                            whileHover={{ y: -5 }}
                            sx={{
                                borderRadius: 4,
                                border: '1px solid',
                                borderColor: 'divider',
                                position: 'relative',
                                overflow: 'visible'
                            }}
                        >
                            <CardContent>
                                <Box sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 2,
                                    bgcolor: `${bin.color}15`,
                                    color: bin.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2
                                }}>
                                    <Archive size={20} />
                                </Box>
                                <Typography variant="subtitle1" fontWeight={800}>{bin.name}</Typography>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                                    Subcategory: {bin.category} • {bin.items} items
                                </Typography>

                                <Box sx={{ mt: 2 }}>
                                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                                        <Typography variant="caption" fontWeight={700}>Capacity</Typography>
                                        <Typography variant="caption" fontWeight={700}>{bin.usage}%</Typography>
                                    </Stack>
                                    <LinearProgress
                                        variant="determinate"
                                        value={bin.usage}
                                        sx={{
                                            height: 6,
                                            borderRadius: 3,
                                            bgcolor: 'grey.100',
                                            '& .MuiLinearProgress-bar': {
                                                bgcolor: bin.color,
                                                borderRadius: 3
                                            }
                                        }}
                                    />
                                </Box>
                            </CardContent>
                            <IconButton
                                size="small"
                                sx={{ position: 'absolute', top: 12, right: 12, color: 'text.secondary' }}
                            >
                                <Maximize size={16} />
                            </IconButton>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Inventory List Controls */}
            <Box sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                        placeholder="Search items by name, lot number, or barcode..."
                        fullWidth
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} className="text-slate-400" />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 3, bgcolor: 'white' }
                        }}
                    />
                    <Button variant="outlined" startIcon={<Filter size={18} />} sx={{ borderRadius: 3, height: 40, minWidth: 120 }}>
                        Filters
                    </Button>
                </Stack>
            </Box>

            {/* Inventory Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 4, elevation: 0, border: '1px solid', borderColor: 'divider' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 800 }}>Product Details</TableCell>
                            <TableCell sx={{ fontWeight: 800 }}>Storage Bin</TableCell>
                            <TableCell sx={{ fontWeight: 800 }}>Batch / Lot</TableCell>
                            <TableCell sx={{ fontWeight: 800 }}>Variation</TableCell>
                            <TableCell sx={{ fontWeight: 800 }}>Stock Level</TableCell>
                            <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {INVENTORY_ITEMS.map((item) => (
                            <TableRow key={item.id} hover>
                                <TableCell>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Box sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 2,
                                            bgcolor: 'grey.100',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'text.secondary'
                                        }}>
                                            {item.category === 'Polish' ? <Droplets size={20} /> :
                                                item.category === 'Tools' ? <Scissors size={20} /> : <Sparkles size={20} />}
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" fontWeight={800}>{item.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{item.id}</Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={item.binId}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 700, borderRadius: 1.5 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Calendar size={14} className="text-slate-400" />
                                        <Typography variant="body2" fontWeight={600}>{item.lot}</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        {item.color && (
                                            <Box
                                                sx={{
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: '50%',
                                                    bgcolor: item.color === 'Iridescent' ? 'linear-gradient(45deg, #fce7f3, #dbeafe)' : item.color,
                                                    border: '1px solid',
                                                    borderColor: 'divider'
                                                }}
                                                title={`Color: ${item.color}`}
                                            />
                                        )}
                                        <Typography variant="caption" fontWeight={700}>{item.size}</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight={800}>
                                        {item.stock.toLocaleString()} <Typography component="span" variant="caption" color="text.secondary">units</Typography>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={item.status}
                                        size="small"
                                        color={item.status === 'In Stock' ? 'success' : 'warning'}
                                        sx={{ fontWeight: 800, px: 1 }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" onClick={() => navigate(`/admin/inventory/edit/${item.id}`)}>
                                        <MoreVertical size={18} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
