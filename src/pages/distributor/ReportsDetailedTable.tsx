import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TableRow,
    TableCell,
    Stack
} from '@mui/material';
import { Filter, Download, ArrowUp, ArrowDown } from 'lucide-react';
import { InputTableWrapperCustom, type HeaderColumn } from '../../components/ui/Table';

interface ReportsDetailedTableProps {
    revenueData: any[];
}

const ReportsDetailedTable = ({ revenueData }: ReportsDetailedTableProps) => {
    const headersColumn: HeaderColumn[] = [
        { label: "Period", key: "month", minWidth: 150 },
        { label: "Revenue", key: "revenue", minWidth: 120 },
        { label: "Profit", key: "profit", minWidth: 120 },
        { label: "Orders", key: "orders", minWidth: 100 },
        { label: "Customers", key: "customers", minWidth: 120 },
        { label: "Growth", key: "growth", minWidth: 120 },
    ];

    return (
        <Card
            sx={{
                background: 'rgba(30, 41, 59, 0.4)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                            Detailed Performance Metrics
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Monthly breakdown with key indicators
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Filter size={16} />}
                            sx={{ borderRadius: 2, borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}
                        >
                            Filter
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Download size={16} />}
                            sx={{ borderRadius: 2, borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}
                        >
                            CSV
                        </Button>
                    </Stack>
                </Box>

                <InputTableWrapperCustom
                    headersColumn={headersColumn}
                    hasCheckbox={false}
                    isSelectedAll={false}
                    handleSelectAll={() => { }}
                >
                    {revenueData.map((row, index) => {
                        const prevRow = index > 0 ? revenueData[index - 1] : null;
                        const hasGrowth = prevRow ? row.revenue > prevRow.revenue : null;
                        const growthPercent = prevRow ? (((row.revenue - prevRow.revenue) / prevRow.revenue) * 100).toFixed(1) : null;

                        return (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.02) !important' },
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                }}
                            >
                                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>
                                    {row.month} 2024
                                </TableCell>
                                <TableCell align="right" sx={{ color: 'text.primary' }}>
                                    ${row.revenue.toLocaleString()}
                                </TableCell>
                                <TableCell align="right" sx={{ color: '#22c55e', fontWeight: 600 }}>
                                    ${row.profit.toLocaleString()}
                                </TableCell>
                                <TableCell align="right" sx={{ color: 'text.secondary' }}>
                                    {row.orders}
                                </TableCell>
                                <TableCell align="right" sx={{ color: 'text.secondary' }}>
                                    {row.customers}
                                </TableCell>
                                <TableCell align="right">
                                    {growthPercent !== null ? (
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: hasGrowth ? '#22c55e' : '#f43f5e' }}>
                                            {hasGrowth ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                            <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                                {growthPercent}%
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>-</Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </InputTableWrapperCustom>
            </CardContent>
        </Card>
    );
};

export default ReportsDetailedTable;
