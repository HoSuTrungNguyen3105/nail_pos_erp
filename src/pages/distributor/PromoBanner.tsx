import {
    Box,
    Card,
    CardContent,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Star,
    Package,
    DollarSign,
} from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const CATEGORY_DISTRIBUTION = [
    { name: 'Gel Systems', value: 35, color: '#d946ef' },
    { name: 'Polish', value: 28, color: '#8b5cf6' },
    { name: 'Tools', value: 20, color: '#2dd4bf' },
    { name: 'Equipment', value: 12, color: '#3b82f6' },
    { name: 'Accessories', value: 5, color: '#f43f5e' },
];

const PromoBanner = () => {
    return (
        <Card sx={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #2e1065 0%, #7c3aed 50%, #d946ef 100%)',
            borderRadius: 6,
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: 'none'
        }}>
            <CardContent sx={{ p: { xs: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Typography variant="h3" sx={{ fontWeight: 800, color: '#fff', mb: 2, letterSpacing: '-0.02em' }}>
                            Wholesale Marketplace
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, maxWidth: 600, fontWeight: 400 }}>
                            Access premium nail supplies at exclusive distributor prices. Bulk discounts applied automatically at checkout.
                        </Typography>

                        <Box display="flex" flexWrap="wrap" gap={3}>
                            {[
                                { icon: <Package size={18} />, label: '2,847 Products' },
                                { icon: <Star size={18} />, label: '4.8 Avg Rating' },
                                { icon: <DollarSign size={18} />, label: 'Up to 40% Off' }
                            ].map((item, i) => (
                                <Box key={i} display="flex" alignItems="center" gap={1} sx={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
                                    <Box sx={{ color: 'fuchsia.300' }}>{item.icon}</Box>
                                    {item.label}
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Box sx={{ height: 180, width: '100%', position: 'relative' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={CATEGORY_DISTRIBUTION}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={70}
                                        dataKey="value"
                                        stroke="none"
                                        isAnimationActive={false}
                                    >
                                        {CATEGORY_DISTRIBUTION.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        isAnimationActive={false}
                                        contentStyle={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '12px',
                                            color: '#fff',
                                            fontSize: '12px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center'
                                }}
                            >
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontWeight: 700 }}>
                                    Inventory
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            {/* Decorative Blur */}
            <Box sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                bgcolor: 'rgba(217, 70, 239, 0.2)',
                filter: 'blur(100px)',
                zIndex: 0
            }} />
        </Card>
    );
};

export default PromoBanner;