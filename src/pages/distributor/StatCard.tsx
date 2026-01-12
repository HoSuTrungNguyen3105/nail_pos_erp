import {
    Box,
    Card,
    CardContent,
    Typography,
    alpha
} from '@mui/material';
import {
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const ANALYTICS_DATA = [
    { metric: 'Total Products', value: '2,847', change: '+12%', trend: 'up' },
    { metric: 'In Stock', value: '2,634', change: '+8%', trend: 'up' },
    { metric: 'Low Stock', value: '156', change: '-5%', trend: 'down' },
    { metric: 'Out of Stock', value: '57', change: '-15%', trend: 'down' },
];

const StatCard = ({ stat }: { stat: typeof ANALYTICS_DATA[0] }) => {
    const isUp = stat.trend === 'up';
    return (
        <Card sx={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 4
        }}>
            <CardContent sx={{ p: '20px !important' }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
                            {stat.metric}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
                            {stat.value}
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                        sx={{
                            color: isUp ? '#2dd4bf' : '#f43f5e',
                            bgcolor: alpha(isUp ? '#2dd4bf' : '#f43f5e', 0.1),
                            px: 1,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: '0.75rem',
                            fontWeight: 700
                        }}
                    >
                        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {stat.change}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default StatCard;
