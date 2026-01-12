import { Box, Typography, Button, alpha, Stack } from '@mui/material';
import { Activity, Eye, CheckCircle, AlertTriangle, Clock, Gift, ShoppingBag, UserPlus } from 'lucide-react';
import { DashboardWidget } from '../../components/dashboard/DashboardWidget';

interface ActivityItem {
    time: string;
    action: string;
    details: string;
    status: 'success' | 'warning' | 'info';
}

interface DashboardFeedsProps {
    activityData: ActivityItem[];
}

export const DashboardFeeds = ({ activityData }: DashboardFeedsProps) => {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
            <DashboardWidget
                config={{
                    id: 'activity-feed',
                    title: 'Live Activity Feed',
                    type: 'list',
                    size: 'large',
                    position: { x: 0, y: 0 },
                    refreshable: true
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha('#d946ef', 0.1), color: '#d946ef' }}>
                            <Activity size={20} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                            System Activities
                        </Typography>
                    </Box>
                    <Button variant="text" size="small" endIcon={<Eye size={16} />} sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        View All
                    </Button>
                </Box>
                <Stack spacing={2} sx={{ maxHeight: 400, overflowY: 'auto', pr: 1 }}>
                    {activityData.map((activity, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                gap: 2,
                                p: 2,
                                borderRadius: 3,
                                bgcolor: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.04)',
                                    transform: 'translateX(4px)'
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    p: 1.5,
                                    height: 'fit-content',
                                    borderRadius: '50%',
                                    bgcolor: activity.status === 'success' ? alpha('#22c55e', 0.1) :
                                        activity.status === 'warning' ? alpha('#f59e0b', 0.1) :
                                            alpha('#3b82f6', 0.1),
                                    color: activity.status === 'success' ? '#22c55e' :
                                        activity.status === 'warning' ? '#f59e0b' :
                                            '#3b82f6',
                                }}
                            >
                                {activity.status === 'success' ? <CheckCircle size={18} /> :
                                    activity.status === 'warning' ? <AlertTriangle size={18} /> :
                                        <Clock size={18} />}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#fff' }}>
                                        {activity.action}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                        {activity.time}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {activity.details}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </DashboardWidget>

            <DashboardWidget
                config={{
                    id: 'pending-actions',
                    title: 'Quick Actions & Alerts',
                    type: 'custom',
                    size: 'large',
                    position: { x: 0, y: 0 }
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', mb: 2.5 }}>
                        Critical Alerts
                    </Typography>
                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            background: `linear-gradient(135deg, ${alpha('#ef4444', 0.15)}, ${alpha('#ef4444', 0.05)})`,
                            border: `1px solid ${alpha('#ef4444', 0.2)}`,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: 2, position: 'relative', zIndex: 1 }}>
                            <AlertTriangle size={24} color="#ef4444" />
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f87171', mb: 0.5 }}>
                                    Low Inventory Warning
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                                    3 critical items are below safety stock levels. This may impact 12 upcoming orders.
                                </Typography>
                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#ef4444',
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        '&:hover': { bgcolor: '#dc2626' }
                                    }}
                                >
                                    Restock Now
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', mb: 2.5 }}>
                    Quick Actions
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                    {[
                        { label: 'New Order', icon: <ShoppingBag size={20} />, color: '#d946ef' },
                        { label: 'Add User', icon: <UserPlus size={20} />, color: '#3b82f6' },
                        { label: 'Promotions', icon: <Gift size={20} />, color: '#f59e0b' },
                        { label: 'Reports', icon: <Activity size={20} />, color: '#22c55e' },
                    ].map((action, i) => (
                        <Button
                            key={i}
                            variant="outlined"
                            sx={{
                                flexDirection: 'column',
                                gap: 1.5,
                                py: 3,
                                borderRadius: 3,
                                border: '1px solid rgba(255,255,255,0.05)',
                                bgcolor: 'rgba(255,255,255,0.01)',
                                color: 'text.secondary',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    borderColor: action.color,
                                    color: '#fff',
                                    '& svg': { color: action.color }
                                }
                            }}
                        >
                            <Box sx={{ color: action.color, opacity: 0.8, transition: 'all 0.2s' }}>
                                {action.icon}
                            </Box>
                            {action.label}
                        </Button>
                    ))}
                </Box>
            </DashboardWidget>
        </Box>
    );
};
