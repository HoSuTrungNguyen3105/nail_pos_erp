import React from 'react';
import {
    Box,
    Typography,
    Button,
    Tabs,
    Tab,
    Select,
    MenuItem,
    alpha,
    Stack
} from '@mui/material';
import {
    TrendingDown,
    RefreshCw,
    Download,
    BarChart3,
    DollarSign,
    ShoppingCart,
    Users,
    Target
} from 'lucide-react';

interface ReportsHeaderProps {
    reportType: string;
    setReportType: (val: string) => void;
    timeRange: string;
    setTimeRange: (val: string) => void;
    handleRefresh: () => void;
    isRefreshing: boolean;
}

const reportTypes = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={18} /> },
    { id: 'financial', label: 'Financial', icon: <DollarSign size={18} /> },
    { id: 'sales', label: 'Sales', icon: <ShoppingCart size={18} /> },
    { id: 'customers', label: 'Customers', icon: <Users size={18} /> },
    { id: 'products', label: 'Products', icon: <Target size={18} /> },
];

const ReportsHeader = ({
    reportType,
    setReportType,
    timeRange,
    setTimeRange,
    handleRefresh,
    isRefreshing
}: ReportsHeaderProps) => {
    return (
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', lg: 'center' }, mb: 4 }}>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                    Analytics Dashboard
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    Comprehensive business intelligence and performance metrics
                </Typography>
            </Box>

            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<TrendingDown size={18} />}
                    sx={{
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 600,
                        borderColor: alpha('#ef4444', 0.2),
                        '&:hover': { bgcolor: alpha('#ef4444', 0.05), borderColor: '#ef4444' }
                    }}
                >
                    Report Loss/Damage
                </Button>

                <Box sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3, p: 0.5, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Tabs
                        value={reportType}
                        onChange={(_, val) => setReportType(val)}
                        sx={{
                            minHeight: 40,
                            '& .MuiTabs-indicator': { display: 'none' },
                        }}
                    >
                        {reportTypes.map((type) => (
                            <Tab
                                key={type.id}
                                value={type.id}
                                label={type.label}
                                icon={type.icon}
                                iconPosition="start"
                                sx={{
                                    minHeight: 40,
                                    borderRadius: 2.5,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: 'text.secondary',
                                    '&.Mui-selected': {
                                        color: '#fff',
                                        bgcolor: 'primary.main',
                                        boxShadow: '0 4px 12px rgba(217, 70, 239, 0.3)',
                                    },
                                    '&:hover': { color: '#fff' }
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>

                <Select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    size="small"
                    sx={{
                        borderRadius: 3,
                        bgcolor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        '& .MuiSelect-select': { py: 1, pl: 2, fontWeight: 600 },
                    }}
                >
                    <MenuItem value="7d">Last 7 days</MenuItem>
                    <MenuItem value="30d">Last 30 days</MenuItem>
                    <MenuItem value="90d">Last 90 days</MenuItem>
                    <MenuItem value="1y">Last year</MenuItem>
                </Select>

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        startIcon={<RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />}
                        sx={{ borderRadius: 3, borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}
                    >
                        Refresh
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<Download size={16} />}
                        sx={{
                            borderRadius: 3,
                            bgcolor: 'rgba(255,255,255,0.05)',
                            color: '#fff',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                        }}
                    >
                        Export
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ReportsHeader;
