import { Box, Typography } from '@mui/material';
import {
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import { ChartWidget } from '../../components/dashboard/ChartWidget';

interface DashboardTrendChartsProps {
    revenueData: any[];
    categoryData: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Box
                sx={{
                    bgcolor: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    p: 1.5,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1, fontWeight: 700 }}>{label}</Typography>
                {payload.map((entry: any, index: number) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Box sx={{ w: 8, h: 8, borderRadius: '50%', bgcolor: entry.color }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {entry.name}: <span style={{ color: '#fff', fontWeight: 600 }}>{entry.value.toLocaleString()}</span>
                        </Typography>
                    </Box>
                ))}
            </Box>
        );
    }
    return null;
};

export const DashboardTrendCharts = ({ revenueData, categoryData }: DashboardTrendChartsProps) => {
    return (
        <>
            <ChartWidget
                config={{
                    id: 'revenue-chart',
                    title: 'Revenue & Orders Trend',
                    type: 'chart',
                    size: 'large',
                    position: { x: 0, y: 0 },
                    refreshable: true,
                    expandable: true,
                    exportable: true
                }}
                chartType="area"
                data={revenueData}
                height={350}
            >
                <AreaChart data={revenueData}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="month"
                        stroke="rgba(255,255,255,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="rgba(255,255,255,0.3)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        name="Revenue"
                        isAnimationActive={false}
                    />
                    <Area
                        type="monotone"
                        dataKey="target"
                        stroke="#22c55e"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fillOpacity={1}
                        fill="url(#colorTarget)"
                        name="Target"
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ChartWidget>

            <ChartWidget
                config={{
                    id: 'category-pie',
                    title: 'Sales by Category',
                    type: 'chart',
                    size: 'large',
                    position: { x: 0, y: 0 },
                    refreshable: true
                }}
                chartType="pie"
                data={categoryData}
                height={350}
            >
                <PieChart>
                    <Pie
                        data={categoryData}
                        cx="50%"
                        cy="45%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={8}
                        dataKey="value"
                        isAnimationActive={false}
                    >
                        {categoryData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth={1}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: '20px' }}
                        formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 600 }}>{value}</span>}
                    />
                </PieChart>
            </ChartWidget>
        </>
    );
};
