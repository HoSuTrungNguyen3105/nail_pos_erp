import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Stack,
    IconButton,
} from '@mui/material';
import {
    PlusCircle,
    FileText,
    List,
    Truck,
    RefreshCw,
    Percent,
    RotateCcw,
    LayoutGrid,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HubCard = ({ title, icon: Icon, onClick, color = '#6366f1' }: { title: string, icon: any, onClick?: () => void, color?: string }) => (
    <Card
        component={motion.div}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        sx={{
            height: '100%',
            cursor: 'pointer',
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                borderColor: color,
            }
        }}
        onClick={onClick}
    >
        <CardContent sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4
        }}>
            <Box sx={{
                width: 64,
                height: 64,
                borderRadius: 3,
                bgcolor: `${color}15`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                boxShadow: `0 8px 16px -4px ${color}30`
            }}>
                <Icon size={32} />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', textAlign: 'center' }}>
                {title}
            </Typography>
        </CardContent>
    </Card>
);

const SectionHeader = ({ title }: { title: string }) => (
    <Box sx={{ mb: 3, mt: 5 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', borderBottom: '2px solid', borderColor: 'divider', pb: 1, display: 'inline-block' }}>
            {title}
        </Typography>
    </Box>
);

export default function POSManagementHub() {
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h4" sx={{
                    fontWeight: 900,
                    background: 'linear-gradient(90deg, #6366f1 0%, #d946ef 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1
                }}>
                    Point of Sale Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Central hub for all your sales operations, invoices, and distribution.
                </Typography>
            </Box>

            {/* Add New Sales Section */}
            <SectionHeader title="Add New Sales" />
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <HubCard
                        title="POS Interface"
                        icon={PlusCircle}
                        color="#4f46e5"
                        onClick={() => navigate('/admin/pos')}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <HubCard
                        title="Quick Sale"
                        icon={LayoutGrid}
                        color="#0ea5e9"
                        onClick={() => { }}
                    />
                </Grid>
            </Grid>

            {/* Manage Sales Section */}
            <SectionHeader title="Manage Sales" />
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <HubCard
                        title="Invoices"
                        icon={FileText}
                        color="#f59e0b"
                        onClick={() => { }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <HubCard
                        title="List POS"
                        icon={List}
                        color="#10b981"
                        onClick={() => { }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <HubCard
                        title="Shipments"
                        icon={Truck}
                        color="#6366f1"
                        onClick={() => { }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <HubCard
                        title="Subscriptions"
                        icon={RefreshCw}
                        color="#8b5cf6"
                        onClick={() => { }}
                    />
                </Grid>
            </Grid>

            {/* Miscellaneous Section */}
            <SectionHeader title="Miscellaneous" />
            <Grid container spacing={3} sx={{ mb: 8 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <HubCard
                        title="Discounts"
                        icon={Percent}
                        color="#ec4899"
                        onClick={() => { }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <HubCard
                        title="Sell Return"
                        icon={RotateCcw}
                        color="#ef4444"
                        onClick={() => { }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
