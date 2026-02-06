import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Stack,
    Tabs,
    Tab,
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
    Avatar,
    Badge,
} from '@mui/material';
import {
    Search,
    ShoppingCart,
    Package,
    Store,
    Truck,
    DollarSign,
    TrendingUp,
    Filter,
    Plus,
    Eye,
    CheckCircle2,
    Clock,
    MoreVertical,
} from 'lucide-react';
import { MetricWidget } from '../../components/dashboard/MetricWidget';
import SEO from './components/SEO';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function NailSupplyHub() {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box>
            {/* <SEO
                title="Nail Supply Hub | Hiweb ERP"
                description="Marketplace and inventory management for Suppliers and Salons."
            /> */}

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
                        Nail Supply Hub
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Zota Ecosystem: Connecting Suppliers with Nail Salons worldwide.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Plus size={20} />}
                    sx={{ display: tabValue === 1 ? 'flex' : 'none' }}
                >
                    Post New Product
                </Button>
            </Stack>

            {/* Main KPI Row (Platform Stats) */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={3}>
                    <MetricWidget
                        config={{ id: 'total-market-sales', title: 'Market GMV', type: 'metric', size: 'small', position: { x: 0, y: 0 } }}
                        value="$42,850"
                        label="Total Ecosystem Sales"
                        change="+12.5%"
                        trend="up"
                        icon={<DollarSign size={20} />}
                        color="#4f46e5"
                    />
                </Grid>
                <Grid size={3}>
                    <MetricWidget
                        config={{ id: 'active-suppliers', title: 'Suppliers', type: 'metric', size: 'small', position: { x: 0, y: 0 } }}
                        value="124"
                        label="Verified Vendors"
                        change="+4"
                        trend="up"
                        icon={<Store size={20} />}
                        color="#d946ef"
                    />
                </Grid>
                <Grid size={3}>
                    <MetricWidget
                        config={{ id: 'pending-orders', title: 'Pending Orders', type: 'metric', size: 'small', position: { x: 0, y: 0 } }}
                        value="38"
                        label="Awaiting Processing"
                        change="-2"
                        trend="down"
                        icon={<Clock size={20} />}
                        color="#3b82f6"
                    />
                </Grid>
                <Grid size={3}>
                    <MetricWidget
                        config={{ id: 'logistic-status', title: 'In Transit', type: 'metric', size: 'small', position: { x: 0, y: 0 } }}
                        value="1,240"
                        label="SKUs Moving"
                        change="Normal"
                        trend="neutral"
                        icon={<Truck size={20} />}
                        color="#22c55e"
                    />
                </Grid>
            </Grid>

            {/* Navigation Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                        '& .MuiTabs-indicator': {
                            height: 3,
                            borderRadius: '3px 3px 0 0',
                            background: 'linear-gradient(90deg, #4f46e5 0%, #d946ef 100%)',
                        },
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            minWidth: 120,
                            '&.Mui-selected': {
                                color: 'primary.dark',
                            }
                        }
                    }}
                >
                    <Tab label="Marketplace" icon={<ShoppingCart size={18} />} iconPosition="start" />
                    <Tab label="Supplier Portal" icon={<Store size={18} />} iconPosition="start" />
                    <Tab label="Order Tracking" icon={<Truck size={18} />} iconPosition="start" />
                    <Tab label="Insights" icon={<TrendingUp size={18} />} iconPosition="start" />
                </Tabs>
            </Box>

            {/* Tab Contents */}
            <CustomTabPanel value={tabValue} index={0}>
                <MarketplaceView />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                <SupplierPortalView />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={2}>
                <OrderTrackingView />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={3}>
                <InsightsView />
            </CustomTabPanel>
        </Box>
    );
}

// --- View Components ---

function MarketplaceView() {
    const products = [
        { id: 1, name: 'Zota Builder Gel - Clear', supplier: 'Luxe Nail Supply', price: 18.50, stock: 'In Stock', rating: 4.8, image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=100&h=100&fit=crop' },
        { id: 2, name: 'Professional UV LED 48W', supplier: 'TechNail Co.', price: 45.00, stock: 'Limited', rating: 4.9, image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=100&h=100&fit=crop' },
        { id: 3, name: 'Precision Brush Set (5pcs)', supplier: 'Artisan Nails', price: 12.00, stock: 'In Stock', rating: 4.7, image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=100&h=100&fit=crop' },
        { id: 4, name: 'Dust Collector Pro', supplier: 'TechNail Co.', price: 89.99, stock: 'Out of Stock', rating: 4.5, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=100&h=100&fit=crop' },
    ];

    return (
        <Box>
            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <TextField
                    placeholder="Find salon supplies, tools, furniture..."
                    fullWidth
                    size="small"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Search size={18} /></InputAdornment>,
                    }}
                    sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                />
                <Button variant="outlined" startIcon={<Filter size={18} />}>Filters</Button>
            </Stack>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid size={3} key={product.id}>
                        <Card sx={{
                            height: '100%',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }
                        }}>
                            <Box sx={{ height: 180, bgcolor: 'grey.100', position: 'relative' }}>
                                <Box
                                    component="img"
                                    src={product.image}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                {product.stock === 'Out of Stock' && (
                                    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography color="white" fontWeight={700}>Sold Out</Typography>
                                    </Box>
                                )}
                            </Box>
                            <CardContent sx={{ p: 2 }}>
                                <Typography variant="caption" color="primary.main" fontWeight={700}>{product.supplier}</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, height: 48, overflow: 'hidden' }}>{product.name}</Typography>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" color="text.primary" fontWeight={800}>${product.price.toFixed(2)}</Typography>
                                    <Button size="small" variant="contained" disabled={product.stock === 'Out of Stock'}>Order</Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

function SupplierPortalView() {
    const salesData = [
        { id: 'ORD-8821', salon: 'Pink Petals Nails', date: '2 mins ago', amount: 320.50, status: 'Processing' },
        { id: 'ORD-8819', salon: 'Modern Manicure', date: '1 hour ago', amount: 145.00, status: 'Shipped' },
        { id: 'ORD-8815', salon: 'Elite Spa & Nails', date: 'Yesterday', amount: 1200.00, status: 'Delivered' },
    ];

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid size={8}>
                    <Card>
                        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" fontWeight={700}>Inventory Management</Typography>
                            <Stack direction="row" spacing={1}>
                                <Button size="small" variant="outlined">Export CSV</Button>
                                <Button size="small" variant="contained" startIcon={<Plus size={16} />}>Add Stock</Button>
                            </Stack>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Stock Level</TableCell>
                                        <TableCell>Orders</TableCell>
                                        <TableCell>Revenue</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {['Zota Gel V1', 'UV Lamp Pro', 'Base Coat X'].map((item, i) => (
                                        <TableRow key={item}>
                                            <TableCell>
                                                <Stack direction="row" spacing={1.5} alignItems="center">
                                                    <Avatar sx={{ width: 32, height: 32, bgcolor: i === 1 ? 'indigo.100' : 'fuchsia.100', color: i === 1 ? 'indigo.700' : 'fuchsia.700', fontSize: 12 }}>{item[0]}</Avatar>
                                                    <Typography variant="body2" fontWeight={600}>{item}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ width: '100%', maxWidth: 100 }}>
                                                    <Box sx={{ height: 6, bgcolor: 'grey.100', borderRadius: 3, position: 'relative' }}>
                                                        <Box sx={{ position: 'absolute', top: 0, left: 0, height: '100%', width: i === 2 ? '15%' : '75%', bgcolor: i === 2 ? 'error.main' : 'success.main', borderRadius: 3 }} />
                                                    </Box>
                                                    <Typography variant="caption" color="text.secondary">{i === 2 ? '12 left' : '450 units'}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>12</TableCell>
                                            <TableCell>${(450 * (i + 1)).toLocaleString()}</TableCell>
                                            <TableCell align="right">
                                                <IconButton size="small"><MoreVertical size={16} /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
                <Grid size={12}>
                    <Card>
                        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="h6" fontWeight={700}>Recent B2B Orders</Typography>
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <Stack spacing={2}>
                                {salesData.map((order) => (
                                    <Box key={order.id} sx={{ p: 1.5, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
                                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                                            <Typography variant="caption" fontWeight={700} sx={{ color: 'primary.main' }}>{order.id}</Typography>
                                            <Chip label={order.status} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                                        </Stack>
                                        <Typography variant="body2" fontWeight={700}>{order.salon}</Typography>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                                            <Typography variant="caption" color="text.secondary">{order.date}</Typography>
                                            <Typography variant="body2" fontWeight={800}>${order.amount.toFixed(2)}</Typography>
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                            <Button fullWidth variant="text" sx={{ mt: 2, fontSize: '0.75rem' }}>View Sales Dashboard</Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

function OrderTrackingView() {
    const shipments = [
        { id: 'SH-992', destination: 'Miami, FL', items: 12, status: 'In Transit', carrier: 'FedEx', eta: 'Tomorrow' },
        { id: 'SH-990', destination: 'Dallas, TX', items: 5, status: 'Processing', carrier: 'N/A', eta: 'Feb 12' },
        { id: 'SH-985', destination: 'San Jose, CA', items: 24, status: 'Delivered', carrier: 'UPS', eta: 'Completed' },
    ];

    return (
        <Card>
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Ecosystem Logistic Tracking</Typography>
                <Stack spacing={3}>
                    {shipments.map((shipment) => (
                        <Box key={shipment.id} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid size={3}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Box sx={{ p: 1.5, bgcolor: shipment.status === 'Delivered' ? 'success.light' : 'primary.light', borderRadius: 2, color: 'white' }}>
                                            {shipment.status === 'Delivered' ? <CheckCircle2 /> : <Truck />}
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" fontWeight={700}>{shipment.id}</Typography>
                                            <Typography variant="caption" color="text.secondary">{shipment.destination}</Typography>
                                        </Box>
                                    </Stack>
                                </Grid>
                                <Grid size={2}>
                                    <Typography variant="caption" display="block" color="text.secondary">Quantity</Typography>
                                    <Typography variant="body2" fontWeight={600}>{shipment.items} Items</Typography>
                                </Grid>
                                <Grid size={2}>
                                    <Typography variant="caption" display="block" color="text.secondary">Carrier</Typography>
                                    <Typography variant="body2" fontWeight={600}>{shipment.carrier}</Typography>
                                </Grid>
                                <Grid size={2}>
                                    <Typography variant="caption" display="block" color="text.secondary">ETA</Typography>
                                    <Typography variant="body2" fontWeight={600}>{shipment.eta}</Typography>
                                </Grid>
                                <Grid size={3} sx={{ textAlign: 'right' }}>
                                    <Button size="small" variant="outlined" endIcon={<Eye size={14} />}>Track Details</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Card>
    );
}

function InsightsView() {
    return (
        <Grid container spacing={3}>
            <Grid size={6}>
                <Card sx={{ p: 3, height: '100%' }}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>Top Selling Categories</Typography>
                    <Stack spacing={2}>
                        {['Builder Gels', 'UV Lamps', 'Nail Accessories', 'Furniture'].map((cat, i) => (
                            <Box key={cat}>
                                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                                    <Typography variant="body2">{cat}</Typography>
                                    <Typography variant="body2" fontWeight={700}>{100 - (i * 15)}%</Typography>
                                </Stack>
                                <Box sx={{ height: 8, bgcolor: 'grey.100', borderRadius: 4 }}>
                                    <Box sx={{
                                        height: '100%',
                                        width: `${100 - (i * 15)}%`,
                                        background: 'linear-gradient(90deg, #4f46e5 0%, #d946ef 100%)',
                                        borderRadius: 4
                                    }} />
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Card>
            </Grid>
            <Grid size={6}>
                <Card sx={{ p: 3, height: '100%', background: 'linear-gradient(135deg, #4f46e5 0%, #d946ef 100%)', color: 'white' }}>
                    <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>Admin Hub Control</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 4 }}>Access platform-wide settings and supplier verification tools.</Typography>
                    <Stack spacing={2}>
                        <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.dark', '&:hover': { bgcolor: 'grey.100' } }}>Verify 12 New Suppliers</Button>
                        <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>Marketplace Settings</Button>
                    </Stack>
                </Card>
            </Grid>
        </Grid>
    );
}
