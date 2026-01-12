import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Grid
} from '@mui/material';
import { Eye, FileText, Target } from 'lucide-react';
import {
    BarChart,
    Bar,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ComposedChart,
    Line
} from 'recharts';

interface ReportsChartsProps {
    revenueData: any[];
    customerSegments: any[];
    productData: any[];
    regionalData: any[];
}

const ReportsCharts = ({
    revenueData,
    customerSegments,
    productData,
    regionalData
}: ReportsChartsProps) => {
    return (
        <Grid container spacing={3}>
            {/* Main Charts: Revenue & Profit Trend and Customer Segments */}
            <Grid size={{ xs: 12, xl: 8 }}>
                <ChartContainer title="Revenue & Profit Trends" subtitle="Monthly performance analysis" icon={<Eye size={18} />}>
                    <ResponsiveContainer width="100%" height={350}>
                        <ComposedChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                            />
                            <YAxis
                                yAxisId="left"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    backdropFilter: 'blur(8px)',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                                }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: 20 }} />
                            <Bar yAxisId="left" dataKey="revenue" fill="#d946ef" radius={[4, 4, 0, 0]} name="Revenue" barSize={30} isAnimationActive={false} />
                            <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, fill: '#22c55e' }} activeDot={{ r: 6 }} name="Profit" isAnimationActive={false} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </Grid>

            <Grid size={{ xs: 12, xl: 4 }}>
                <ChartContainer title="Customer Segments" subtitle="Distribution by type">
                    <ResponsiveContainer width="100%" height={350}>
                        <RechartsPieChart>
                            <Pie
                                data={customerSegments}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={8}
                                dataKey="value"
                                isAnimationActive={false}
                            >
                                {customerSegments.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    backdropFilter: 'blur(8px)',
                                    color: '#fff'
                                }}
                            />
                            <Legend layout="vertical" verticalAlign="middle" align="right" />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </Grid>

            {/* Secondary Charts: Product & Regional */}
            <Grid size={{ xs: 12, xl: 6 }}>
                <ChartContainer title="Product Performance" subtitle="Revenue by product category" icon={<FileText size={18} />}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={productData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px'
                                }}
                            />
                            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} isAnimationActive={false} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </Grid>

            <Grid size={{ xs: 12, xl: 6 }}>
                <ChartContainer title="Regional Performance" subtitle="Sales by region vs targets" icon={<Target size={18} />}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={regionalData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="sales" fill="#22c55e" name="Actual Sales" radius={[4, 4, 0, 0]} barSize={25} isAnimationActive={false} />
                            <Bar dataKey="target" fill="#f43f5e" name="Target" radius={[4, 4, 0, 0]} barSize={25} isAnimationActive={false} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </Grid>
        </Grid>
    );
};

const ChartContainer = ({ title, subtitle, icon, children }: { title: string; subtitle: string; icon?: React.ReactNode; children: React.ReactNode }) => (
    <Card
        sx={{
            background: 'rgba(30, 41, 59, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 4,
            height: '100%',
        }}
    >
        <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                        {title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {subtitle}
                    </Typography>
                </Box>
                {icon && (
                    <IconButton size="small" sx={{ color: 'text.secondary', bgcolor: 'rgba(255,255,255,0.03)', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' } }}>
                        {icon}
                    </IconButton>
                )}
            </Box>
            {children}
        </CardContent>
    </Card>
);

export default ReportsCharts;
