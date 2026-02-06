import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Stack,
    TextField,
    IconButton,
    Paper,
    Divider,
    Checkbox,
    FormControlLabel,
    Tabs,
    Tab,
    useTheme,
} from '@mui/material';
import {
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    Search,
    UserPlus,
    Info,
    Scissors,
    Sparkles,
    Droplets,
    Wind,
    Save,
    Globe,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Sub-components ---

const ServiceIcon = ({ icon: Icon, active, onClick }: { icon: any, active?: boolean, onClick: () => void }) => (
    <IconButton
        onClick={onClick}
        sx={{
            width: 50,
            height: 50,
            borderRadius: 2,
            border: '2px solid',
            borderColor: active ? 'primary.main' : 'divider',
            bgcolor: active ? 'primary.light' : 'white',
            color: active ? 'primary.contrastText' : 'text.secondary',
            '&:hover': { bgcolor: active ? 'primary.light' : 'grey.50' }
        }}
    >
        <Icon size={24} />
    </IconButton>
);

const CalendarDay = ({ day, active, isToday, onClick }: { day: number | string, active?: boolean, isToday?: boolean, onClick: () => void }) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 45 }}>
        {day !== '' ? (
            <IconButton
                onClick={onClick}
                sx={{
                    width: 40,
                    height: 40,
                    fontSize: '0.9rem',
                    fontWeight: active ? 700 : 500,
                    bgcolor: active ? '#0061f2' : (isToday ? '#f1f5f9' : 'transparent'),
                    color: active ? 'white' : 'text.primary',
                    border: isToday ? '1px solid #e2e8f0' : 'none',
                    '&:hover': { bgcolor: active ? '#0056d6' : '#f8fafc' },
                    position: 'relative'
                }}
            >
                {day}
                {isToday && !active && (
                    <Box sx={{ width: 4, height: 4, bgcolor: '#0061f2', borderRadius: '50%', position: 'absolute', bottom: 6 }} />
                )}
            </IconButton>
        ) : null}
    </Box>
);

const TimeSlot = ({ time, selected, onClick }: { time: string, selected?: boolean, onClick: () => void }) => (
    <Button
        fullWidth
        variant="outlined"
        onClick={onClick}
        sx={{
            py: 1.5,
            mb: 1.5,
            borderRadius: 2,
            border: '1px solid',
            borderColor: selected ? '#0061f2' : '#0061f2',
            color: selected ? 'white' : '#0061f2',
            bgcolor: selected ? '#0061f2' : 'transparent',
            fontWeight: 800,
            fontSize: '1rem',
            '&:hover': {
                bgcolor: selected ? '#0056d6' : 'rgba(0, 97, 242, 0.04)',
                borderColor: '#0061f2'
            }
        }}
    >
        {time}
    </Button>
);

export default function NailBooking() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState(14);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const calendarDays = [
        '', '', '', '', '', '', 1,
        2, 3, 4, 5, 6, 7, 8,
        9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22,
        23, 24, 25, 26, 27, 28
    ];

    const timeSlots = [
        '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00'
    ];

    return (
        <Box sx={{ p: 4, width: '100%', mx: 'auto' }}>
            <Paper elevation={0} sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'white'
            }}>
                {/* Header Blue Bar */}
                <Box sx={{ bgcolor: '#00bcd4', p: 1.5, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 700 }}>
                        Booking / Appointment
                    </Typography>
                    <IconButton
                        size="small"
                        sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
                        onClick={() => navigate('/admin/pos')}
                    >
                        <RotateCcw size={18} />
                    </IconButton>
                </Box>

                {/* Internal Tabs */}
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{
                        '& .MuiTabs-indicator': { height: 4, bgcolor: '#00bcd4' },
                        '& .MuiTab-root': { py: 2, fontWeight: 700, fontSize: '0.9rem' }
                    }}
                >
                    <Tab label="Booking" />
                    <Tab label="General Appointment" />
                </Tabs>

                <Box sx={{ p: 4 }}>
                    <Grid container spacing={6}>
                        {/* Section 1: Date & Time Picker */}
                        <Grid size={12}>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', mb: 4 }}>
                                Select a Date & Time
                            </Typography>

                            <Grid container spacing={5}>
                                {/* Calendar Column */}
                                <Grid size={{ xs: 12, md: 7 }}>
                                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 4 }}>
                                        <IconButton size="small"><ChevronLeft /></IconButton>
                                        <Typography variant="h6" fontWeight={700} sx={{ minWidth: 150, textAlign: 'center' }}>
                                            February 2026
                                        </Typography>
                                        <IconButton size="small" sx={{ bgcolor: '#eff6ff', color: '#0061f2' }}><ChevronRight /></IconButton>
                                    </Stack>

                                    <Grid container spacing={1} sx={{ mb: 1 }}>
                                        {daysOfWeek.map(day => (
                                            <Grid key={day} size={1.71}>
                                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', textAlign: 'center' }}>
                                                    {day}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Grid container spacing={1}>
                                        {calendarDays.map((day, idx) => (
                                            <Grid key={idx} size={1.71}>
                                                <CalendarDay
                                                    day={day}
                                                    active={day === selectedDate}
                                                    isToday={day === 7}
                                                    onClick={() => typeof day === 'number' && setSelectedDate(day)}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 4 }}>
                                        <Globe size={18} color="black" />
                                        <Typography variant="body2" fontWeight={700}>Time zone</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1, ml: 3.5, cursor: 'pointer' }}>
                                        <Typography variant="body2" color="text.primary">Indochina Time (00:32)</Typography>
                                        <Box component="span" sx={{ borderTop: '5px solid black', borderLeft: '4px solid transparent', borderRight: '4px solid transparent' }} />
                                    </Stack>
                                </Grid>

                                {/* Time Slot Column */}
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
                                        Saturday, February 14
                                    </Typography>

                                    <Box sx={{
                                        height: 400,
                                        overflowY: 'auto',
                                        pr: 1,
                                        '&::-webkit-scrollbar': { width: 6 },
                                        '&::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: 3 }
                                    }}>
                                        {timeSlots.map(time => (
                                            <TimeSlot
                                                key={time}
                                                time={time}
                                                selected={time === selectedTime}
                                                onClick={() => setSelectedTime(time)}
                                            />
                                        ))}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid size={12}><Divider /></Grid>

                        {/* Row: Stylist */}
                        <Grid size={12}>
                            <Stack direction="row" spacing={4} alignItems="center">
                                <Box sx={{ minWidth: 100 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Stylist</Typography>
                                </Box>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                                    <TextField
                                        placeholder="James"
                                        size="small"
                                        sx={{ width: 200, bgcolor: 'white' }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size="small" color="primary" />}
                                        label={<Typography variant="body2" fontWeight={700}>Request</Typography>}
                                    />
                                </Stack>
                            </Stack>
                        </Grid>

                        {/* Customer Box */}
                        <Grid size={12}>
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, borderColor: '#00bcd4' }}>
                                <Stack direction="row" spacing={4}>
                                    <Box sx={{ minWidth: 100 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Customer</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                                            <Button
                                                variant="contained"
                                                startIcon={<Search size={18} />}
                                                sx={{ bgcolor: '#00bcd4', '&:hover': { bgcolor: '#00acc1' }, borderRadius: 2 }}
                                            >
                                                Search
                                            </Button>
                                            <Button
                                                variant="contained"
                                                startIcon={<UserPlus size={18} />}
                                                sx={{ bgcolor: '#00bcd4', '&:hover': { bgcolor: '#00acc1' }, borderRadius: 2 }}
                                            >
                                                Register
                                            </Button>
                                        </Stack>

                                        <Grid container spacing={3}>
                                            <Grid size={{ xs: 12, md: 8 }}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Typography variant="body2" sx={{ minWidth: 60 }}>Name</Typography>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        defaultValue="Elizabeth Wilson"
                                                        sx={{ bgcolor: 'white' }}
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        startIcon={<Info size={16} />}
                                                        sx={{ bgcolor: '#00bcd4', minWidth: 100 }}
                                                    >
                                                        Detail
                                                    </Button>
                                                </Stack>
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 8 }}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Typography variant="body2" sx={{ minWidth: 60 }}>Phone</Typography>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        defaultValue="0123 456 789"
                                                        sx={{ bgcolor: 'white' }}
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox size="small" color="primary" />}
                                                        label={<Typography variant="body2" sx={{ minWidth: 120 }}>New Customer</Typography>}
                                                    />
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>

                        {/* Service Icons */}
                        <Grid size={12}>
                            <Stack direction="row" spacing={4} alignItems="center">
                                <Box sx={{ minWidth: 100 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Service</Typography>
                                </Box>
                                <Stack direction="row" spacing={2}>
                                    <ServiceIcon icon={Scissors} active={selectedService === 'cut'} onClick={() => setSelectedService('cut')} />
                                    <ServiceIcon icon={Sparkles} active={selectedService === 'art'} onClick={() => setSelectedService('art')} />
                                    <ServiceIcon icon={Droplets} active={selectedService === 'polish'} onClick={() => setSelectedService('polish')} />
                                    <ServiceIcon icon={Wind} active={selectedService === 'dry'} onClick={() => setSelectedService('dry')} />
                                </Stack>
                            </Stack>
                        </Grid>

                        {/* Break */}
                        <Grid size={12}>
                            <Stack direction="row" spacing={4} alignItems="center">
                                <Box sx={{ minWidth: 100 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Break</Typography>
                                </Box>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Checkbox size="small" />
                                    <TextField
                                        placeholder="3:00 PM"
                                        size="small"
                                        sx={{ width: 140 }}
                                    />
                                    <Typography variant="h6">≫</Typography>
                                    <TextField
                                        placeholder="0 hr 15 min"
                                        size="small"
                                        sx={{ width: 140 }}
                                    />
                                </Stack>
                            </Stack>
                        </Grid>

                        {/* Memo */}
                        <Grid size={12}>
                            <Stack direction="row" spacing={4}>
                                <Box sx={{ minWidth: 100 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', mt: 1 }}>Memo</Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Enter appointment notes..."
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Stack>
                        </Grid>

                        {/* Repeat */}
                        <Grid size={12}>
                            <Stack direction="row" spacing={4} alignItems="center">
                                <Box sx={{ minWidth: 100 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Repeat</Typography>
                                </Box>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Checkbox size="small" />
                                    <TextField
                                        placeholder="Fortnightly"
                                        size="small"
                                        sx={{ width: 180 }}
                                    />
                                    <TextField
                                        defaultValue="5"
                                        size="small"
                                        sx={{ width: 60, '& .MuiInputBase-input': { textAlign: 'center' } }}
                                    />
                                    <Typography variant="body2">times</Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                {/* Footer */}
                <Divider />
                <Box sx={{ p: 2, bgcolor: 'grey.50', display: 'flex', justifyContent: 'center', gap: 4 }}>
                    <Button
                        variant="text"
                        startIcon={<RotateCcw size={18} />}
                        sx={{ color: '#00bcd4', fontWeight: 800, px: 4 }}
                        onClick={() => navigate('/admin/pos')}
                    >
                        Return
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Save size={18} />}
                        sx={{ bgcolor: '#00bcd4', '&:hover': { bgcolor: '#00acc1' }, fontWeight: 800, px: 6, borderRadius: 2 }}
                        onClick={() => navigate('/admin/pos')}
                    >
                        Save
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
