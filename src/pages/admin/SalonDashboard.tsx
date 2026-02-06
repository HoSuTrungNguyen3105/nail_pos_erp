import React, { useState } from 'react';
import {
  Box,
  Card,
  Avatar,
  Typography,
  IconButton,
  Button,
  Stack,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  ChevronLeft,
  ChevronRight,
  Scissors,
  ShoppingBag,
  Clock,
  Plus,
  ArrowUpRight,
  UserRound,
  Award,
  Users,
  Crown,
  TrendingUp,
  TrendingDown,
  Bell,
  User,
  Pencil,
  Trash2,
  Eye,
} from 'lucide-react';
import type { Stylist, Customer, Booking, FeedItem, Appointment, RevenueMetrics } from '../../types/salon';

// Mock data
const mockStylists: Stylist[] = [
  {
    id: '1',
    name: 'Kate Hanekom',
    role: 'Senior stylist',
    initials: 'KH',
    tasks: [
      { id: '1', type: 'service', description: 'Washing', status: 'waiting', color: '#FFF4E6' },
      { id: '2', type: 'service', description: 'Blow drying', color: '#FFF9C4' },
      { id: '3', type: 'service', description: 'Curling & styling', status: 'waiting', color: '#F5F5F5' },
      { id: '4', type: 'service', description: 'Highlighted look', status: 'waiting', color: '#F5F5F5' },
    ],
  },
  {
    id: '2',
    name: 'Bruce Harlow',
    role: 'Barber',
    initials: 'BH',
    tasks: [
      { id: '1', type: 'walk-in', description: 'Accepting walk-ins', color: '#FFF9C4' },
    ],
  },
  {
    id: '3',
    name: 'Anna Knight',
    role: 'Stylist',
    initials: 'AK',
    tasks: [
      { id: '1', type: 'break', description: 'Currently on a break', duration: '30mins' },
    ],
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    role: 'Colour assistance',
    initials: 'SJ',
    tasks: [
      { id: '1', type: 'service', description: 'Requires assistance at colour station', color: '#FFF9C4' },
      { id: '2', type: 'service', description: 'Cutting', status: 'waiting', color: '#F5F5F5' },
      { id: '3', type: 'service', description: 'Mixing colour', color: '#FFF9C4' },
    ],
  },
];

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Maria Green',
    initials: 'MG',
    service: 'Cut, colour & blowdry',
    status: 'in-progress',
  },
  {
    id: '2',
    name: 'Jake Hill',
    initials: 'JH',
    service: 'Cut, shave & style',
    status: 'waiting',
  },
];

const mockBookings: Booking[] = [
  {
    id: '1',
    time: '09:00',
    endTime: '10:30',
    customerName: 'Sarah Thomson',
    stylistName: 'Jackie Van Wyk',
    service: 'Cut & colour',
    status: 'scheduled',
  },
  {
    id: '2',
    time: '09:30',
    endTime: '10:45',
    customerName: 'Micheal Grey',
    stylistName: '',
    service: '',
    status: 'scheduled',
  },
];

const mockFeed: FeedItem[] = [
  {
    id: '1',
    type: 'cash-out',
    customerName: 'Jill Oakley',
    service: 'Cut, colour & blowdry',
    products: 'Extreme Clean Shampoo',
    amount: 1500,
    status: 'ready',
    initials: 'JO',
  },
];

const mockRevenue: RevenueMetrics = {
  services: {
    amount: 10000,
    transactions: 15,
  },
  products: {
    amount: 5000,
    transactions: 8,
  },
};

const mockAppointments: Appointment[] = [
  { id: '1', date: '2024-04-09', time: '09:00', customerName: 'Sarah Thomson', service: 'Cut & Colour', status: 'scheduled' },
  { id: '2', date: '2024-04-09', time: '10:46', customerName: '', service: 'Walk-in Available', status: 'walk-in' },
  { id: '3', date: '2024-04-09', time: '11:00', customerName: 'Jack Riley', service: "Men's Cut & Shave", status: 'scheduled' },
];

// New Dashboard Mock Data
const memberStats = [
  { id: 1, count: 105, label: 'Total Member', icon: UserRound, color: '#EC4899', bgColor: '#FCE7F3' },
  { id: 2, count: 25, label: 'New Member', icon: Award, color: '#F59E0B', bgColor: '#FEF3C7' },
  { id: 3, count: 25, label: 'Regular Member', icon: Users, color: '#10B981', bgColor: '#D1FAE5' },
  { id: 4, count: 35, label: 'VIP Member', icon: Crown, color: '#F59E0B', bgColor: '#FEF3C7' },
];

const repurchaseData = [
  { date: '6-13', value: 12 },
  { date: '6-14', value: 15 },
  { date: '6-15', value: 20 },
  { date: '6-16', value: 14 },
  { date: '6-17', value: 10 },
];

const bestSellers = [
  { id: 1, amount: 560, date: 'March 17, 2020', trend: 'up' },
  { id: 2, amount: 160, date: 'March 10, 2020', trend: 'down' },
];

const bookingDates = [
  { date: 10, month: 'Mar', isActive: false },
  { date: 11, month: 'Mar', isActive: false },
  { date: 12, month: 'Mar', isActive: false },
  { date: 13, month: 'Mar', isActive: false },
  { date: 14, month: 'Mar', isActive: true },
  { date: 15, month: 'Mar', isActive: false },
  { date: 16, month: 'Mar', isActive: false },
];

const bookingTimeData = [
  { id: 1, name: 'Isabella Moran', phone: '556-987-479', datetime: 'Mar 14, 2020, 3:30pm', avatar: 'IM' },
  { id: 2, name: 'Sam Conner', phone: '556-987-479', datetime: 'Mar 14, 2020, 4:30pm', avatar: 'SC' },
];

const newCustomersData = [
  { id: 1, name: 'Isabella Moran', phone: '556-987-479', registerDate: 'Mar 14, 2020, 3:30pm', avatar: 'IM' },
  { id: 2, name: 'Kattey Perry', phone: '556-987-479', registerDate: 'Mar 14, 2020, 3:30pm', avatar: 'KP' },
];

const SalonDashboard: React.FC = () => {
  const [currentMonth] = useState(new Date(2024, 3, 1)); // April 2024

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 0,
        m: -4,
        background: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 40%, #6b21a8 70%, #be123c 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 70, 239, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Header */}
      {/* <Box sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(10px)',
        px: 4, 
        py: 2, 
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        zIndex: 10,
      }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={3} flex={1}>
            <Box sx={{ bgcolor: 'black', p: 1.5, borderRadius: '12px' }}>
              <Scissors size={24} color="white" />
            </Box>
            <Box sx={{ position: 'relative', flex: 1, maxWidth: 400 }}>
              <Search size={20} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input
                type="text"
                placeholder="Search..."
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" fontWeight={600}>Jane Smith</Typography>
                <Typography variant="caption" color="text.secondary">Reception</Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'black', width: 40, height: 40, fontSize: '14px', fontWeight: 600 }}>
                JS
              </Avatar>
              <ChevronRight size={16} />
            </Stack>
          </Stack>
        </Stack>
      </Box> */}

      {/* New Dashboard Section */}
      <Box sx={{ p: 4, bgcolor: '#F5F5F5', position: 'relative', zIndex: 1 }}>
        {/* Dashboard Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" fontWeight={600} sx={{ color: '#000' }}>
            Dashboard
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton sx={{ position: 'relative' }}>
              <Bell size={20} color="#000" />
              <Box sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                bgcolor: '#EF4444',
                borderRadius: '50%',
              }} />
            </IconButton>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar src="/api/placeholder/40/40" sx={{ width: 40, height: 40 }} />
              <Box>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#000' }}>
                  Samantha
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Salon Admin
                </Typography>
              </Box>
              <ChevronRight size={16} color="#000" />
            </Stack>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {/* Member Stats Cards */}
          <Grid size={{ xs: 12 }}>
            <Grid container spacing={2}>
              {memberStats.map((stat) => (
                <Grid key={stat.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{
                    p: 2.5,
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    bgcolor: '#fff',
                  }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '12px',
                        bgcolor: stat.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <stat.icon size={28} color={stat.color} />
                      </Box>
                      <Box>
                        <Typography variant="h5" fontWeight={700} sx={{ color: '#000' }}>
                          {stat.count} Member
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Repurchase Rate Chart and Best Seller */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{
              p: 3,
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              bgcolor: '#fff',
            }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#000', mb: 2 }}>
                Repurchase rate
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                <Typography variant="caption" sx={{ color: '#000' }}>Total Sales</Typography>
              </Stack>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={repurchaseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis
                    stroke="#9CA3AF"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 25]}
                    ticks={[0, 5, 10, 15, 20, 25]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: any) => [`$${value}`, 'Sales']}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ fill: '#F59E0B', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2}>
              {bestSellers.map((seller) => (
                <Card key={seller.id} sx={{
                  p: 2.5,
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  bgcolor: '#fff',
                }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h4" fontWeight={700} sx={{ color: '#000' }}>
                        ${seller.amount}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#000', mt: 0.5 }}>
                        Best Seller
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                        {seller.date}
                      </Typography>
                    </Box>
                    <Box sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: seller.trend === 'up' ? '#D1FAE5' : '#FEE2E2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {seller.trend === 'up' ? (
                        <TrendingUp size={20} color="#10B981" />
                      ) : (
                        <TrendingDown size={20} color="#EF4444" />
                      )}
                    </Box>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Booking Time Section */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#000', mb: 2 }}>
              Booking time
            </Typography>
            <Stack direction="row" spacing={1} mb={3}>
              {bookingDates.map((booking, idx) => (
                <Box
                  key={idx}
                  sx={{
                    flex: 1,
                    textAlign: 'center',
                    py: 2,
                    borderRadius: '12px',
                    bgcolor: booking.isActive ? '#F59E0B' : '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ color: booking.isActive ? '#fff' : '#000' }}
                  >
                    {booking.date}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: booking.isActive ? '#fff' : '#9CA3AF' }}
                  >
                    {booking.month}
                  </Typography>
                  <Box sx={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: booking.isActive ? '#fff' : '#F59E0B',
                    mx: 'auto',
                    mt: 0.5,
                  }} />
                </Box>
              ))}
            </Stack>

            {/* Booking Time Table */}
            <Card sx={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                      <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: '12px', borderBottom: '1px solid #E5E7EB' }}>
                        USER NAME
                      </TableCell>
                      <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: '12px', borderBottom: '1px solid #E5E7EB' }}>
                        DATE & TIME
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookingTimeData.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell sx={{ borderBottom: '1px solid #F3F4F6' }}>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar sx={{ width: 36, height: 36, bgcolor: '#EC4899', fontSize: '12px' }}>
                              {booking.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600} sx={{ color: '#000' }}>
                                {booking.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#F59E0B' }}>
                                {booking.phone}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ color: '#000', fontSize: '14px', borderBottom: '1px solid #F3F4F6' }}>
                          {booking.datetime}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          {/* New Customers Section */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#000', mb: 2 }}>
              New Customers
            </Typography>
            <Stack direction="row" spacing={2} mb={3}>
              <Box sx={{
                flex: 1,
                p: 3,
                borderRadius: '12px',
                bgcolor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center',
              }}>
                <User size={32} color="#9CA3AF" style={{ margin: '0 auto' }} />
                <Typography variant="body2" sx={{ color: '#9CA3AF', mt: 1 }}>
                  Women
                </Typography>
              </Box>
              <Box sx={{
                flex: 1,
                p: 3,
                borderRadius: '12px',
                bgcolor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center',
              }}>
                <User size={32} color="#9CA3AF" style={{ margin: '0 auto' }} />
                <Typography variant="body2" sx={{ color: '#9CA3AF', mt: 1 }}>
                  Man
                </Typography>
              </Box>
              <Box sx={{
                flex: 1,
                p: 3,
                borderRadius: '12px',
                bgcolor: '#F59E0B',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center',
              }}>
                <Crown size={32} color="#fff" style={{ margin: '0 auto' }} />
                <Typography variant="body2" sx={{ color: '#fff', mt: 1 }}>
                  VIP
                </Typography>
              </Box>
              <Box sx={{
                flex: 1,
                p: 3,
                borderRadius: '12px',
                bgcolor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Users size={20} color="#9CA3AF" />
                  <Typography variant="body2" fontWeight={600} sx={{ color: '#000' }}>
                    Add new Customer
                  </Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                  Regular Member
                </Typography>
                <Button
                  size="small"
                  sx={{
                    mt: 1,
                    bgcolor: '#F59E0B',
                    color: '#fff',
                    fontSize: '11px',
                    px: 2,
                    py: 0.5,
                    borderRadius: '6px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#D97706' },
                  }}
                >
                  ADD
                </Button>
              </Box>
            </Stack>

            {/* New Customers Table */}
            <Card sx={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                      <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: '12px', borderBottom: '1px solid #E5E7EB' }}>
                        USER NAME
                      </TableCell>
                      <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: '12px', borderBottom: '1px solid #E5E7EB' }}>
                        REGISTER DATE
                      </TableCell>
                      <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: '12px', borderBottom: '1px solid #E5E7EB' }}>
                        DETAILS
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newCustomersData.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell sx={{ borderBottom: '1px solid #F3F4F6' }}>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar sx={{ width: 36, height: 36, bgcolor: '#EC4899', fontSize: '12px' }}>
                              {customer.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600} sx={{ color: '#000' }}>
                                {customer.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#F59E0B' }}>
                                {customer.phone}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ color: '#000', fontSize: '14px', borderBottom: '1px solid #F3F4F6' }}>
                          {customer.registerDate}
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #F3F4F6' }}>
                          <Stack direction="row" spacing={1}>
                            <IconButton size="small" sx={{ color: '#9CA3AF' }}>
                              <Eye size={16} />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#9CA3AF' }}>
                              <Pencil size={16} />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#9CA3AF' }}>
                              <Trash2 size={16} />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3}>
          {/* Feed Section */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: '#ffffff' }}>
              Feed
            </Typography>
            <Stack spacing={2}>
              {mockFeed.map((item) => (
                <Card key={item.id} sx={{
                  p: 2.5,
                  bgcolor: 'rgba(254, 252, 232, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid #FEF3C7',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="body2" fontWeight={600} color="#713F12">
                      Ready for cash out
                    </Typography>
                    <Button
                      size="small"
                      sx={{
                        bgcolor: '#d946ef',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 600,
                        px: 2,
                        py: 0.5,
                        borderRadius: '6px',
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#a21caf' },
                      }}
                    >
                      Cash out
                    </Button>
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#2dd4bf', fontSize: '14px', fontWeight: 600 }}>
                      {item.initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{item.customerName}</Typography>
                      <Typography variant="caption" color="#000">{item.service}</Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="#000">
                      <strong>Products:</strong> {item.products}
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      R{item.amount.toFixed(2)}
                    </Typography>
                  </Stack>
                </Card>
              ))}
            </Stack>

            {/* Customers Section */}
            <Typography variant="h6" fontWeight={700} mt={4} mb={2} sx={{ color: '#ffffff' }}>
              Customers
            </Typography>
            <Stack spacing={2}>
              {mockCustomers.map((customer) => (
                <Card key={customer.id} sx={{
                  p: 2.5,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#d946ef', fontSize: '14px', fontWeight: 600 }}>
                      {customer.initials}
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight={600}>{customer.name}</Typography>
                      <Typography variant="caption" color="#000">{customer.service}</Typography>
                    </Box>
                    {customer.status === 'in-progress' && (
                      <Chip label="Cut in progress" size="small" sx={{ bgcolor: '#FEF3C7', color: '#713F12', fontSize: '11px', height: 20 }} />
                    )}
                    {customer.status === 'waiting' && (
                      <Chip label="Waiting" size="small" sx={{ bgcolor: '#DBEAFE', color: '#1E40AF', fontSize: '11px', height: 20 }} />
                    )}
                  </Stack>
                  <Button
                    fullWidth
                    sx={{
                      bgcolor: '#d946ef',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: 600,
                      py: 1,
                      borderRadius: '8px',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#a21caf' },
                    }}
                    endIcon={<ArrowUpRight size={16} />}
                  >
                    View client card
                  </Button>
                </Card>
              ))}
            </Stack>

            {/* Today's Bookings */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#ffffff' }}>
                Today's Bookings
              </Typography>
              <Button
                size="small"
                startIcon={<Plus size={16} />}
                sx={{
                  bgcolor: '#d946ef',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 600,
                  px: 2,
                  py: 0.75,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#a21caf' },
                }}
              >
                Add new
              </Button>
            </Stack>
            <Stack spacing={2}>
              {mockBookings.map((booking) => (
                <Card key={booking.id} sx={{
                  p: 2.5,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}>
                  <Stack direction="row" spacing={2}>
                    <Stack alignItems="center" spacing={0.5}>
                      <Clock size={16} color="#d946ef" />
                      <Typography variant="body2" fontWeight={600}>{booking.time}</Typography>
                      {booking.endTime && (
                        <Typography variant="caption" color="#000">- {booking.endTime}</Typography>
                      )}
                    </Stack>
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight={600}>{booking.customerName}</Typography>
                      {booking.stylistName && (
                        <Typography variant="caption" color="#000">
                          Stylist: {booking.stylistName}
                        </Typography>
                      )}
                      {booking.service && (
                        <Typography variant="caption" display="block" color="#000">
                          {booking.service}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Calendar Section */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: '#ffffff' }}>
              Calendar
            </Typography>
            <Card sx={{
              p: 3,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <IconButton size="small">
                  <ChevronLeft size={20} />
                </IconButton>
                <Typography variant="body1" fontWeight={600}>{monthName}</Typography>
                <IconButton size="small">
                  <ChevronRight size={20} />
                </IconButton>
              </Stack>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, mb: 2 }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <Box key={idx} sx={{ textAlign: 'center', py: 1 }}>
                    <Typography variant="caption" fontWeight={600} color="#000">
                      {day}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
                {days.map((day, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      textAlign: 'center',
                      py: 1.5,
                      borderRadius: '8px',
                      bgcolor: day === 9 ? '#FEF3C7' : 'transparent',
                      cursor: day ? 'pointer' : 'default',
                      '&:hover': day ? { bgcolor: day === 9 ? '#FEF3C7' : '#F5F5F5' } : {},
                    }}
                  >
                    {day && (
                      <Typography variant="body2" fontWeight={day === 9 ? 600 : 400}>
                        {day}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 3, borderTop: '1px solid #E0E0E0', pt: 2 }}>
                {mockAppointments.map((apt) => (
                  <Stack key={apt.id} direction="row" justifyContent="space-between" alignItems="center" py={1.5} borderBottom="1px solid #F5F5F5">
                    <Typography variant="body2" fontWeight={600} sx={{ minWidth: 60 }}>
                      {apt.time}
                    </Typography>
                    <Typography variant="body2" flex={1} color={apt.status === 'walk-in' ? 'success.main' : '#000'}>
                      {apt.customerName || apt.service}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Card>

            {/* Revenue Section */}
            <Typography variant="h6" fontWeight={700} mt={4} mb={2} sx={{ color: '#ffffff' }}>
              Revenue
            </Typography>
            <Stack direction="row" spacing={2}>
              <Card sx={{
                flex: 1,
                p: 2.5,
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}>
                <Box sx={{ width: 32, height: 32, bgcolor: '#FEF3C7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Scissors size={18} color="#713F12" />
                </Box>
                <Typography variant="caption" color="#000" display="block" mb={1}>
                  Services
                </Typography>
                <Typography variant="h5" fontWeight={700} mb={2}>
                  R{mockRevenue.services.amount.toLocaleString()}.00
                </Typography>
                <Button
                  fullWidth
                  size="small"
                  sx={{
                    bgcolor: '#d946ef',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 600,
                    py: 0.75,
                    borderRadius: '6px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#a21caf' },
                  }}
                  endIcon={<ArrowUpRight size={14} />}
                >
                  {mockRevenue.services.transactions} transactions
                </Button>
              </Card>

              <Card sx={{
                flex: 1,
                p: 2.5,
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}>
                <Box sx={{ width: 32, height: 32, bgcolor: '#FEF3C7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <ShoppingBag size={18} color="#713F12" />
                </Box>
                <Typography variant="caption" color="#000" display="block" mb={1}>
                  Products
                </Typography>
                <Typography variant="h5" fontWeight={700} mb={2}>
                  R{mockRevenue.products.amount.toLocaleString()}.00
                </Typography>
                <Button
                  fullWidth
                  size="small"
                  sx={{
                    bgcolor: '#d946ef',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 600,
                    py: 0.75,
                    borderRadius: '6px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#a21caf' },
                  }}
                  endIcon={<ArrowUpRight size={14} />}
                >
                  {mockRevenue.products.transactions} transactions
                </Button>
              </Card>
            </Stack>
          </Grid>

          {/* Stylists Section */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: '#ffffff' }}>
              Stylists
            </Typography>
            <Stack spacing={3}>
              {mockStylists.map((stylist) => (
                <Box key={stylist.id}>
                  <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: '#2dd4bf', fontSize: '14px', fontWeight: 600, color: '#134e4a' }}>
                      {stylist.initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{stylist.name}</Typography>
                      <Typography variant="caption" color="#000">{stylist.role}</Typography>
                    </Box>
                  </Stack>

                  <Stack spacing={1}>
                    {stylist.tasks.map((task) => (
                      <Box
                        key={task.id}
                        sx={{
                          p: 1.5,
                          bgcolor: task.color || '#F5F5F5',
                          borderRadius: '8px',
                          border: '1px solid #E0E0E0',
                        }}
                      >
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="caption" fontWeight={task.type === 'service' ? 500 : 600}>
                            {task.description}
                          </Typography>
                          {task.duration && (
                            <Typography variant="caption" color="#000">
                              {task.duration}
                            </Typography>
                          )}
                        </Stack>
                        {task.status === 'waiting' && (
                          <Typography variant="caption" color="#000" display="block" mt={0.5}>
                            • Waiting
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SalonDashboard;
