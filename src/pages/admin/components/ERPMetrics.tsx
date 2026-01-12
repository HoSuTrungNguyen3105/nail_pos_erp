import { Grid } from '@mui/material';
import React from 'react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, ResponsiveContainer 
} from 'recharts';

export interface MetricItem {
  title: string;
  value: string | number;
  subValue: string;
  gradient: string;
  icon: React.ReactNode;
  chartType: 'area-smooth' | 'area-linear' | 'line' | 'bar';
  data?: any[];
}

interface MetricCardProps {
  item: MetricItem;
}

// Dummy data for charts if not provided
const DEFAULT_DATA = [
  { v: 30 }, { v: 45 }, { v: 35 }, { v: 55 }, { v: 40 }, { v: 65 }, { v: 50 },
  { v: 30 }, { v: 45 }, { v: 35 }, { v: 55 }, { v: 40 }, { v: 65 }, { v: 50 }
];

const MetricCard: React.FC<MetricCardProps> = ({ item }) => {
  const { title, value, gradient, icon, chartType, data = DEFAULT_DATA } = item;

  const renderChart = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        {(() => {
          switch (chartType) {
            case 'area-smooth':
              return (
                <AreaChart data={data}>
                  <Area type="monotone" dataKey="v" stroke="rgba(255,255,255,0.5)" strokeWidth={2} fill="rgba(255,255,255,0.2)" />
                </AreaChart>
              );
            case 'area-linear':
              return (
                <AreaChart data={data}>
                  <Area type="linear" dataKey="v" stroke="rgba(255,255,255,0.5)" strokeWidth={2} fill="rgba(255,255,255,0.2)" />
                </AreaChart>
              );
            case 'line':
              return (
                <LineChart data={data}>
                  <Line type="monotone" dataKey="v" stroke="rgba(255,255,255,0.5)" strokeWidth={2} dot={{ r: 3, fill: 'rgba(255,255,255,0.5)', strokeWidth: 0 }} />
                </LineChart>
              );
            case 'bar':
              return (
                <BarChart data={data}>
                  <Bar dataKey="v" fill="rgba(255,255,255,0.3)" />
                </BarChart>
              );
            default:
              return null;
          }
        })()}
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`relative overflow-hidden rounded-xl p-6 text-white shadow-lg ${gradient} min-h-[160px] flex flex-col justify-between`}>
      <div className="flex justify-between items-start z-10 relative">
        <div>
          <div className="mb-2 opacity-80">
             {React.isValidElement(icon) 
                ? icon
                : icon}
          </div>
          <h3 className="text-3xl font-bold leading-tight">{value}</h3>
          <p className="text-sm font-medium opacity-80 mt-1">{title}</p>
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-60">
        {renderChart()}
      </div>
    </div>
  );
};

interface ERPMetricsProps {
  items: MetricItem[];
}

const ERPMetrics: React.FC<ERPMetricsProps> = ({ items }) => {
  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
          <MetricCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ERPMetrics;
