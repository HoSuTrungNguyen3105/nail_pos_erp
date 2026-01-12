import { Box, Button, Stack } from '@mui/material';
import { RefreshCw, Download } from 'lucide-react';

interface DashboardHeaderProps {
    timeRange: string;
    setTimeRange: (range: string) => void;
    isRefreshing: boolean;
    onRefresh: () => void;
}

export const DashboardHeader = ({
    timeRange,
    setTimeRange,
    isRefreshing,
    onRefresh
}: DashboardHeaderProps) => {
    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        bgcolor: 'rgba(30, 41, 59, 0.4)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                        p: 0.5
                    }}
                >
                    {['7d', '30d', '90d', '1y'].map((range) => (
                        <Button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            sx={{
                                minWidth: 60,
                                borderRadius: 2.5,
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                color: timeRange === range ? '#fff' : 'text.secondary',
                                bgcolor: timeRange === range ? '#d946ef' : 'transparent',
                                boxShadow: timeRange === range ? '0 4px 12px rgba(217, 70, 239, 0.3)' : 'none',
                                '&:hover': {
                                    bgcolor: timeRange === range ? '#d946ef' : 'rgba(255,255,255,0.05)',
                                    color: '#fff'
                                }
                            }}
                        >
                            {range}
                        </Button>
                    ))}
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        onClick={onRefresh}
                        disabled={isRefreshing}
                        startIcon={<RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />}
                        sx={{
                            borderRadius: 3,
                            textTransform: 'none',
                            fontWeight: 700,
                            borderColor: 'rgba(255,255,255,0.2)',
                            color: '#fff',
                            '&:hover': {
                                borderColor: '#fff',
                                bgcolor: 'rgba(255,255,255,0.05)'
                            }
                        }}
                    >
                        Refresh All
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Download size={18} />}
                        sx={{
                            borderRadius: 3,
                            textTransform: 'none',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            px: 3
                        }}
                    >
                        Export
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};
