import React from 'react';
import { Box, Card, CardContent, Grid, Typography, alpha } from '@mui/material';
import { ArrowUp, ArrowDown } from 'lucide-react';

export interface KPIProp {
    title: string;
    value: string;
    change: string;
    changeValue: string;
    period: string;
    icon: React.ReactNode;
    trend: 'up' | 'down';
    color: string;
}

const ReportsKPIs = ({ kpis }: { kpis: KPIProp[] }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                {kpis.map((kpi, index) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }} key={index}>
                        <Card
                            sx={{
                                background: 'rgba(30, 41, 59, 0.4)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: 4,
                                height: '100%',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    borderColor: alpha(kpi.color, 0.5),
                                    boxShadow: `0 12px 24px -8px ${alpha(kpi.color, 0.3)}`,
                                }
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 3,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: alpha(kpi.color, 0.1),
                                            color: kpi.color,
                                        }}
                                    >
                                        {React.isValidElement(kpi.icon)
                                            ? React.cloneElement(kpi.icon as React.ReactElement<any>, { size: 24 })
                                            : kpi.icon}
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 2,
                                            bgcolor: kpi.trend === 'up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: kpi.trend === 'up' ? '#22c55e' : '#ef4444',
                                        }}
                                    >
                                        {kpi.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                            {kpi.change}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', mb: 0.5 }}>
                                        {kpi.value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                                        {kpi.title}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                                        {kpi.changeValue} {kpi.period}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ReportsKPIs;
