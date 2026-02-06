import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Stack,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    IconButton,
    InputAdornment,
    Paper,
    Divider,
} from '@mui/material';
import {
    Plus,
    Minus,
    ChevronLeft,
    Calendar,
    Save,
    X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Components ---

const NumberInput = ({ label, value, onChange }: { label: string, value: number, onChange: (val: number) => void }) => (
    <Box>
        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>{label}</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
                size="small"
                onClick={() => onChange(Math.max(0, value - 1))}
                sx={{ bgcolor: 'grey.100', borderRadius: 1.5 }}
            >
                <Minus size={16} />
            </IconButton>
            <TextField
                value={value}
                size="small"
                sx={{ width: 80, '& .MuiInputBase-input': { textAlign: 'center', fontWeight: 700 } }}
                onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            />
            <IconButton
                size="small"
                onClick={() => onChange(value + 1)}
                sx={{ bgcolor: 'grey.100', borderRadius: 1.5 }}
            >
                <Plus size={16} />
            </IconButton>
        </Stack>
    </Box>
);

export default function InventoryForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: 'French Tips Nails',
        category: '',
        price: '30',
        stock: 50,
        lot: '',
        color: '#ff4d94',
        size: '15ml',
        expiration: '',
        description: 'French Tips Nails Nude Pink Manicure Bling Diamond 3D Handmade Square Reusable Nails',
        binId: '',
        depositType: 'Percentage',
        depositAmount: '10'
    });

    const handleChange = (field: string) => (event: any) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const handleNumberChange = (field: string) => (value: number) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <Box sx={{ maxWidth: 1300 }}>
            {/* Header */}
            <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton onClick={() => navigate('/admin/inventory')}>
                            <ChevronLeft size={24} />
                        </IconButton>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>Edit Product / Service</Typography>
                            <Typography variant="caption" color="text.secondary">Manage inventory details and batch information</Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<Save size={18} />}
                            sx={{
                                bgcolor: '#10b981',
                                '&:hover': { bgcolor: '#059669' },
                                borderRadius: 2,
                                px: 4,
                                textTransform: 'none',
                                fontWeight: 700
                            }}
                            onClick={() => navigate('/admin/inventory')}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<X size={18} />}
                            sx={{ borderRadius: 2, px: 3, textTransform: 'none', fontWeight: 700, borderColor: 'divider', color: 'text.secondary' }}
                            onClick={() => navigate('/admin/inventory')}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Paper>

            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <Grid container spacing={4}>
                    {/* Row 1 */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Product Name: *</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.name}
                            onChange={handleChange('name')}
                            placeholder="Enter product name"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Category:</Typography>
                        <FormControl fullWidth size="small">
                            <Select value={formData.category} onChange={handleChange('category')} displayEmpty>
                                <MenuItem value="">Select Category</MenuItem>
                                <MenuItem value="polish">Nail Polish</MenuItem>
                                <MenuItem value="gel">Gel colors</MenuItem>
                                <MenuItem value="tools">Tools</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Price:($) *</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.price}
                            onChange={handleChange('price')}
                        />
                    </Grid>

                    {/* Row 2 - Stock & Lot */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <NumberInput
                            label="Stock Quantity: *"
                            value={formData.stock}
                            onChange={handleNumberChange('stock')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Lot / Batch ID:</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.lot}
                            onChange={handleChange('lot')}
                            placeholder="e.g. LOT-2024-001"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Storage Bin:</Typography>
                        <FormControl fullWidth size="small">
                            <Select value={formData.binId} onChange={handleChange('binId')} displayEmpty>
                                <MenuItem value="">Select Bin</MenuItem>
                                <MenuItem value="A1">Bin A1 - Main Storage</MenuItem>
                                <MenuItem value="B2">Bin B2 - Tool Drawer</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Row 3 - Attributes */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Color Variant:</Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 2,
                                    bgcolor: formData.color,
                                    border: '2px solid white',
                                    boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
                                }}
                            />
                            <TextField
                                size="small"
                                value={formData.color}
                                onChange={handleChange('color')}
                                sx={{ flex: 1 }}
                            />
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Product Expiration Date</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            value={formData.expiration}
                            onChange={handleChange('expiration')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Calendar size={18} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Description:</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={handleChange('description')}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    {/* Deposit Section (Optional but in image) */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Deposit Type</Typography>
                        <FormControl fullWidth size="small">
                            <Select value={formData.depositType} onChange={handleChange('depositType')}>
                                <MenuItem value="Percentage">Percentage</MenuItem>
                                <MenuItem value="Fixed">Fixed Amount</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Deposit Amount(%)</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.depositAmount}
                            onChange={handleChange('depositAmount')}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
