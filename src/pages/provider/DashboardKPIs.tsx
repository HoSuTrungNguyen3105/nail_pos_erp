import { MetricWidget } from '../../components/dashboard/MetricWidget';

interface KPIData {
    title: string;
    value: string;
    change: string;
    changeValue: string;
    isPositive: boolean;
    icon: React.ReactNode;
    trend: string;
    period: string;
    color: string;
}

interface DashboardKPIsProps {
    kpiData: KPIData[];
}

export const DashboardKPIs = ({ kpiData }: DashboardKPIsProps) => {
    return (
        <>
            {kpiData.map((kpi, index) => (
                <MetricWidget
                    key={index}
                    config={{
                        id: `kpi-${index}`,
                        title: kpi.title,
                        type: 'metric',
                        size: 'medium',
                        position: { x: 0, y: 0 },
                        refreshable: true
                    }}
                    value={kpi.value}
                    label={kpi.title}
                    change={kpi.change}
                    changeValue={kpi.changeValue}
                    trend={kpi.trend as 'up' | 'down' | 'neutral'}
                    icon={kpi.icon}
                    color={kpi.color}
                />
            ))}
        </>
    );
};
