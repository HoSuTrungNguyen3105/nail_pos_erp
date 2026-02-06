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
    RotateCcw,
    Search,
    UserPlus,
    Info,
    Scissors,
    Sparkles,
    Droplets,
    Wind,
    Save,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DateTimePicker from './components/Datetimepicker';

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


export default function NailBooking() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [selectedService, setSelectedService] = useState<string | null>(null);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mx: 'auto' }}>
            <Paper sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'white'
            }}>
                {/* Header Blue Bar */}
                <Box sx={{ background: 'linear-gradient(90deg, #4f46e5 0%, #d946ef 100%)', p: 1.5, display: 'flex', justifyContent: 'center', position: 'relative' }}>
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
                        '& .MuiTabs-indicator': { height: 4, background: 'linear-gradient(90deg, #4f46e5 0%, #d946ef 100%)', },
                        '& .MuiTab-root': { py: 2, fontWeight: 700, fontSize: '0.9rem' }
                    }}
                >
                    <Tab label="Booking" />
                    <Tab label="General Appointment" />
                </Tabs>

                <Box sx={{ p: 2 }}>
                    <Grid container spacing={6}>
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

                        {/* Section 1: Date & Time Picker */}
                        <Grid size={12}>
                            <DateTimePicker />
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
            </Paper >
        </Box >
    );
}
