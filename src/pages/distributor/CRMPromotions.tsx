import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Grid,
    alpha,
    Stack
} from '@mui/material';
import { Gift, Calendar, Edit2, XCircle } from 'lucide-react';

export default function CRMPromotions() {
    const promotions = [
        {
            id: 1,
            title: 'Buy 5 Get 1 Free (Gel Polish)',
            description: 'Active until Dec 31, 2024',
            status: 'Active',
            statusColor: '#22c55e',
            date: 'Jan 15, 2024',
            type: 'BOGO',
            gradient: 'linear-gradient(135deg, rgba(217, 70, 239, 0.1), rgba(124, 58, 237, 0.1))'
        },
        {
            id: 2,
            title: 'New Salon Welcome Kit',
            description: '20% off first order over $500',
            status: 'Active',
            statusColor: '#22c55e',
            used: 45,
            type: 'Discount',
            gradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(59, 130, 246, 0.1))'
        }
    ];

    return (
        <Grid container spacing={3}>
            {promotions.map((promo) => (
                <Grid size={{ xs: 12, md: 6 }} key={promo.id}>
                    <Card
                        sx={{
                            background: 'rgba(30, 41, 59, 0.4)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 4,
                            overflow: 'hidden',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: 4,
                                height: '100%',
                                background: promo.statusColor
                            }
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '100%',
                                height: '100%',
                                background: promo.gradient,
                                zIndex: 0
                            }}
                        />
                        <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
                                        {promo.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {promo.description}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={promo.status}
                                    size="small"
                                    sx={{
                                        bgcolor: alpha(promo.statusColor, 0.1),
                                        color: promo.statusColor,
                                        fontWeight: 700,
                                        borderRadius: 1,
                                        border: `1px solid ${alpha(promo.statusColor, 0.2)}`
                                    }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: 'text.secondary',
                                        bgcolor: 'rgba(255,255,255,0.03)',
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 2
                                    }}
                                >
                                    {promo.date ? <Calendar size={14} /> : <Gift size={14} />}
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                        {promo.date ? `Created on ${promo.date}` : `Used ${promo.used} times`}
                                    </Typography>
                                </Box>
                            </Box>

                            <Stack direction="row" spacing={1.5}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    startIcon={<Edit2 size={14} />}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        borderColor: 'rgba(255,255,255,0.1)',
                                        color: 'text.secondary',
                                        '&:hover': {
                                            borderColor: '#fff',
                                            color: '#fff',
                                            bgcolor: 'rgba(255,255,255,0.05)'
                                        }
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="small"
                                    variant="text"
                                    startIcon={<XCircle size={14} />}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        color: alpha('#ef4444', 0.8),
                                        '&:hover': {
                                            color: '#ef4444',
                                            bgcolor: alpha('#ef4444', 0.1)
                                        }
                                    }}
                                >
                                    End Promotion
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
