import { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Stack,
    Button,
    IconButton,
    InputBase,
    Paper,
    Tooltip
} from '@mui/material';
import {
    Search,
    User,
    Plus,
    Minus,
    Printer,
    Bell,
    CreditCard,
    LayoutGrid,
    Clock,
    MoreHorizontal,
} from 'lucide-react';
import { motion } from 'framer-motion';
import ChairCard from './dashboard/ChairCard';

// --- Mock Data ---

const AREAS = ['Tất cả', 'VIP', 'Tầng 3', 'Tầng 2', 'Tầng 1'];

interface Chair {
    id: string;
    name: string;
    status: 'available' | 'occupied' | 'active' | 'selected';
    price?: number;
    time?: string;
    technician?: string;
    serviceType?: string;
}

const CHAIRS: Chair[] = [
    { id: '101', name: 'Phòng VIP1', status: 'occupied', price: 328000, time: '84p', technician: 'Nhi' },
    { id: '102', name: 'Phòng VIP2', status: 'occupied', price: 328000, time: '84p', technician: 'Linh' },
    { id: '103', name: 'Phòng VIP3', status: 'available' },
    { id: '104', name: 'Phòng VIP4', status: 'available' },
    { id: '105', name: 'Phòng VIP5', status: 'available' },
    { id: '106', name: 'Phòng VIP6', status: 'available' },
    { id: '111', name: 'Phòng VIP 11', status: 'selected', price: 201000, time: '5g3p', technician: 'Hồng' },
    { id: '115', name: 'Phòng VIP 15', status: 'occupied', price: 446000, time: '5g54p', technician: 'Uyên' },
    { id: '301', name: 'Bàn 301', status: 'occupied', price: 10000, time: '13p', technician: 'Vy' },
    { id: '302', name: 'Bàn 302', status: 'active', price: 344000, time: '33p', technician: 'Tú' },
    { id: '303', name: 'Bàn 303', status: 'available' },
    { id: '304', name: 'Bàn 304', status: 'available' },
    { id: '305', name: 'Bàn 305', status: 'available' },
    { id: '306', name: 'Bàn 306', status: 'available' },
];

const CART_ITEMS = [
    { id: 1, name: 'Sơn Gel OPI (Màu đỏ)', qty: 1, price: 50000 },
    { id: 2, name: 'Đắp bột Clear', qty: 1, price: 125000 },
    { id: 3, name: 'Phá gel cũ', qty: 1, price: 20000 },
    { id: 4, name: 'Combo Chăm sóc Tay Chân', qty: 1, price: 199000, subtext: ['Cắt da', 'Dưỡng móng', 'Massage'] },
];

export default function NailPOS() {
    const [activeArea, setActiveArea] = useState('Tất cả');
    const [selectedChair, setSelectedChair] = useState<string | null>('302');

    return (
        <Box sx={{
            height: 'calc(100vh - 100px)',
            display: 'flex',
            bgcolor: '#f1f5f9',
            m: -4, // Counteract parent padding
            overflow: 'hidden'
        }}>
            {/* Left Section: Chair Layout (70%) */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2, overflow: 'hidden' }}>

                {/* Top Toolbar */}
                <Box sx={{ bgcolor: 'white', borderRadius: 3, p: 1, mb: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 0.5 }}>
                        {AREAS.map(area => (
                            <Button
                                key={area}
                                size="small"
                                variant={activeArea === area ? 'contained' : 'text'}
                                onClick={() => setActiveArea(area)}
                                sx={{
                                    borderRadius: 3,
                                    px: 3,
                                    whiteSpace: 'nowrap',
                                    bgcolor: activeArea === area ? 'primary.main' : 'transparent',
                                    color: activeArea === area ? 'white' : 'text.secondary',
                                    '&:hover': { bgcolor: activeArea === area ? 'primary.dark' : 'grey.100' }
                                }}
                            >
                                {area}
                            </Button>
                        ))}
                        <Box sx={{ flex: 1 }} />
                        <Stack direction="row" spacing={1}>
                            <IconButton size="small"><Search size={18} /></IconButton>
                            <IconButton size="small"><LayoutGrid size={18} /></IconButton>
                        </Stack>
                    </Stack>
                </Box>

                {/* Status Bar */}
                <Stack direction="row" spacing={3} sx={{ px: 1, mb: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main' }} />
                        <Typography variant="caption" fontWeight={700}>Tất cả (51)</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid', borderColor: 'divider' }} />
                        <Typography variant="caption" color="text.secondary">Còn trống (44)</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#1e293b' }} />
                        <Typography variant="caption" color="text.secondary">Sử dụng (7)</Typography>
                    </Stack>
                </Stack>

                {/* Chair Grid */}
                <Box sx={{
                    flex: 1,
                    overflowY: 'auto',
                    pr: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: 2,
                    pb: 2
                }}>
                    {CHAIRS.map(chair => (
                        <ChairCard
                            key={chair.id}
                            chair={chair}
                            isSelected={selectedChair === chair.id}
                            onClick={() => setSelectedChair(
                                selectedChair === chair.id ? null : chair.id
                            )}
                        />
                    ))}
                </Box>
            </Box>

            {/* Right Section: Bill Panel (30%) */}
            <Paper sx={{
                width: 400,
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '1px solid',
                borderColor: 'divider',
                bgcolor: 'white',
                elevation: 0
            }}>
                {/* Bill Header */}
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ p: 0.5, bgcolor: 'primary.light', borderRadius: 1, color: 'white' }}>
                                <LayoutGrid size={16} />
                            </Box>
                            Bàn {selectedChair} / Tầng 3
                        </Typography>
                        <IconButton size="small"><MoreHorizontal size={18} /></IconButton>
                    </Stack>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        p: 1,
                        border: '1px solid',
                        borderColor: 'grey.200'
                    }}>
                        <Search size={16} className="text-slate-400 ml-1" />
                        <InputBase
                            placeholder="Tìm khách hàng (F4)"
                            sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }}
                        />
                        <IconButton size="small" sx={{ color: 'primary.main' }}><Plus size={18} /></IconButton>
                    </Box>
                </Box>

                {/* Cart Items */}
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                    <Stack spacing={2.5}>
                        {CART_ITEMS.map((item, i) => (
                            <Box key={item.id}>
                                <Stack direction="row" spacing={2}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700, minWidth: 20 }}>
                                        {i + 1}.
                                    </Typography>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" fontWeight={800}>{item.name}</Typography>
                                        {item.subtext && item.subtext.map(st => (
                                            <Typography key={st} variant="caption" color="text.secondary" display="block">
                                                - {st}
                                            </Typography>
                                        ))}
                                    </Box>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ bgcolor: 'grey.50', borderRadius: 2, px: 1 }}>
                                        <IconButton size="small" sx={{ color: 'text.secondary' }}><Minus size={14} /></IconButton>
                                        <Typography variant="body2" fontWeight={700}>{item.qty}</Typography>
                                        <IconButton size="small" sx={{ color: 'text.secondary' }}><Plus size={14} /></IconButton>
                                    </Stack>
                                    <Box sx={{ textAlign: 'right', minWidth: 80 }}>
                                        <Typography variant="body2" fontWeight={700}>{item.price.toLocaleString()}</Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'none' }}>
                                            {item.price.toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                {/* Bill Actions & Total */}
                <Box sx={{ p: 2, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        {[
                            { icon: <User size={18} />, label: 'Admin' },
                            { icon: <Clock size={18} />, label: 'Giao' },
                            { icon: <Bell size={18} />, label: 'Ghi chú' }
                        ].map((btn, i) => (
                            <Tooltip key={i} title={btn.label}>
                                <IconButton sx={{
                                    bgcolor: 'white',
                                    border: '1px solid',
                                    borderColor: 'grey.200',
                                    borderRadius: 2
                                }}>
                                    {btn.icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                        <Box sx={{ flex: 1 }} />
                        <Typography variant="h5" fontWeight={900}>
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 1, fontWeight: 700 }}>Tổng tiền</Typography>
                            344,000
                        </Typography>
                    </Stack>

                    <Grid container spacing={1}>
                        <Grid size={3}>
                            <Button fullWidth variant="outlined" sx={{ height: 56, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Bell size={18} />
                                <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 700 }}>Thông báo</Typography>
                            </Button>
                        </Grid>
                        <Grid size={3}>
                            <Button fullWidth variant="outlined" sx={{ height: 56, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Printer size={18} />
                                <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 700 }}>In tạm tính</Typography>
                            </Button>
                        </Grid>
                        <Grid size={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    height: 56,
                                    borderRadius: 3,
                                    background: 'linear-gradient(90deg, #4f46e5 0%, #d946ef 100%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5
                                }}
                            >
                                <CreditCard size={18} />
                                <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 800 }}>THANH TOÁN (F9)</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}
