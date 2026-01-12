import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Avatar,
    IconButton,
    Grid,
    alpha
} from '@mui/material';
import { Search, Plus, Phone, Mail, Edit2 } from 'lucide-react';

export default function CRMCustomers() {
    const customers = [
        { id: 1, name: 'Customer A', phone: '+1 234 567 8901', email: 'customer1@email.com', spent: 420.50 },
        { id: 2, name: 'Customer B', phone: '+1 234 567 8902', email: 'customer2@email.com', spent: 350.75 },
        { id: 3, name: 'Customer C', phone: '+1 234 567 8903', email: 'customer3@email.com', spent: 890.20 },
        { id: 4, name: 'Customer D', phone: '+1 234 567 8904', email: 'customer4@email.com', spent: 120.00 },
        { id: 5, name: 'Customer E', phone: '+1 234 567 8905', email: 'customer5@email.com', spent: 560.40 },
    ];

    return (
        <Card
            sx={{
                background: 'rgba(30, 41, 59, 0.4)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
            }}
        >
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        placeholder="Search customers..."
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={18} color="rgba(255,255,255,0.5)" />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: 3,
                                    bgcolor: 'rgba(255,255,255,0.03)',
                                    width: { xs: '100%', sm: 320 }
                                }
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<Plus size={18} />}
                        sx={{
                            borderRadius: 3,
                            textTransform: 'none',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #d946ef, #7c3aed)',
                            px: 3
                        }}
                    >
                        Add Customer
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {customers.map((customer) => (
                        <Grid size={12} key={customer.id}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 2,
                                    borderRadius: 3,
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    bgcolor: 'rgba(255, 255, 255, 0.01)',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                                        transform: 'translateX(4px)',
                                        borderColor: 'rgba(217, 70, 239, 0.3)'
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                    <Avatar
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            background: `linear-gradient(135deg, ${alpha('#d946ef', 0.2)}, ${alpha('#7c3aed', 0.2)})`,
                                            color: '#d946ef',
                                            fontWeight: 700,
                                            border: '1px solid rgba(217, 70, 239, 0.2)'
                                        }}
                                    >
                                        {customer.name.charAt(customer.name.length - 1)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                                            {customer.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                                <Phone size={12} />
                                                <Typography variant="caption">{customer.phone}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                                <Mail size={12} />
                                                <Typography variant="caption">{customer.email}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#d946ef' }}>
                                            ${customer.spent.toFixed(2)}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            Total Spent
                                        </Typography>
                                    </Box>
                                    <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#fff' } }}>
                                        <Edit2 size={18} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}
