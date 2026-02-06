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
  Badge,
  Grid,
} from '@mui/material';
import {
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Scissors,
  ShoppingBag,
  Clock,
  Plus,
  ArrowUpRight,
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
      <Box sx={{ 
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
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3}>
          {/* Feed Section */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: '#333' }}>
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
                        bgcolor: 'black',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 600,
                        px: 2,
                        py: 0.5,
                        borderRadius: '6px',
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#333' },
                      }}
                    >
                      Cash out
                    </Button>
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#4ADE80', fontSize: '14px', fontWeight: 600 }}>
                      {item.initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{item.customerName}</Typography>
                      <Typography variant="caption" color="text.secondary">{item.service}</Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="text.secondary">
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
            <Typography variant="h6" fontWeight={700} mt={4} mb={2} sx={{ color: '#333' }}>
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
                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#10B981', fontSize: '14px', fontWeight: 600 }}>
                      {customer.initials}
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight={600}>{customer.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{customer.service}</Typography>
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
                      bgcolor: 'black',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: 600,
                      py: 1,
                      borderRadius: '8px',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#333' },
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
              <Typography variant="h6" fontWeight={700} sx={{ color: '#333' }}>
                Today's Bookings
              </Typography>
              <Button
                size="small"
                startIcon={<Plus size={16} />}
                sx={{
                  bgcolor: 'black',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 600,
                  px: 2,
                  py: 0.75,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#333' },
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
                      <Clock size={16} color="#666" />
                      <Typography variant="body2" fontWeight={600}>{booking.time}</Typography>
                      {booking.endTime && (
                        <Typography variant="caption" color="text.secondary">- {booking.endTime}</Typography>
                      )}
                    </Stack>
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight={600}>{booking.customerName}</Typography>
                      {booking.stylistName && (
                        <Typography variant="caption" color="text.secondary">
                          Stylist: {booking.stylistName}
                        </Typography>
                      )}
                      {booking.service && (
                        <Typography variant="caption" display="block" color="text.secondary">
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
            <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: '#333' }}>
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
                    <Typography variant="caption" fontWeight={600} color="text.secondary">
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
                    <Typography variant="body2" flex={1} color={apt.status === 'walk-in' ? 'success.main' : 'text.primary'}>
                      {apt.customerName || apt.service}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Card>

            {/* Revenue Section */}
            <Typography variant="h6" fontWeight={700} mt={4} mb={2} sx={{ color: '#333' }}>
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
                <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                  Services
                </Typography>
                <Typography variant="h5" fontWeight={700} mb={2}>
                  R{mockRevenue.services.amount.toLocaleString()}.00
                </Typography>
                <Button
                  fullWidth
                  size="small"
                  sx={{
                    bgcolor: 'black',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 600,
                    py: 0.75,
                    borderRadius: '6px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#333' },
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
                <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                  Products
                </Typography>
                <Typography variant="h5" fontWeight={700} mb={2}>
                  R{mockRevenue.products.amount.toLocaleString()}.00
                </Typography>
                <Button
                  fullWidth
                  size="small"
                  sx={{
                    bgcolor: 'black',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 600,
                    py: 0.75,
                    borderRadius: '6px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#333' },
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
            <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: '#333' }}>
              Stylists
            </Typography>
            <Stack spacing={3}>
              {mockStylists.map((stylist) => (
                <Box key={stylist.id}>
                  <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: 'black', fontSize: '14px', fontWeight: 600 }}>
                      {stylist.initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{stylist.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{stylist.role}</Typography>
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
                            <Typography variant="caption" color="text.secondary">
                              {task.duration}
                            </Typography>
                          )}
                        </Stack>
                        {task.status === 'waiting' && (
                          <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
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
