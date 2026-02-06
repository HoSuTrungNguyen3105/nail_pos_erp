import { Box, Grid, IconButton, Stack, Typography, Chip } from '@mui/material';
import { ChevronLeft, ChevronRight, Globe, Clock } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Component cho ngày trong calendar
function CalendarDay({ day, active, isToday, onClick }: any) {
    return (
        <Box
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            sx={{
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                cursor: typeof day === 'number' ? 'pointer' : 'default',
                bgcolor: active ? 'primary.main' : isToday ? '#eff6ff' : 'transparent',
                color: active ? 'white' : isToday ? 'primary.main' : day ? 'text.primary' : 'text.disabled',
                fontWeight: active || isToday ? 800 : 600,
                border: isToday && !active ? '2px solid' : 'none',
                borderColor: 'primary.main',
                transition: 'all 0.2s',
                '&:hover': typeof day === 'number' ? {
                    bgcolor: active ? 'primary.dark' : '#f1f5f9',
                } : {}
            }}
        >
            {day}
        </Box>
    );
}

// Component cho time slot
function TimeSlot({ time, selected, onClick }: any) {
    return (
        <Box
            component={motion.div}
            whileHover={{ x: 4 }}
            onClick={onClick}
            sx={{
                px: 2.5,
                py: 1.5,
                mb: 1.5,
                borderRadius: 2,
                cursor: 'pointer',
                bgcolor: selected ? 'primary.main' : 'white',
                color: selected ? 'white' : 'text.primary',
                border: '2px solid',
                borderColor: selected ? 'primary.main' : '#e2e8f0',
                fontWeight: 700,
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: selected ? 'primary.dark' : '#f8fafc',
                }
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <Clock size={16} />
                <span>{time}</span>
            </Stack>
            {selected && (
                <Box
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                        fontWeight: 900,
                        fontSize: '0.75rem'
                    }}
                >
                    ✓
                </Box>
            )}
        </Box>
    );
}

// Component chọn giờ (Hour Selector)
function HourSelector({ selectedHour, onSelectHour }: { selectedHour: number | null, onSelectHour: (hour: number) => void }) {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
        <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#64748b' }}>
                Select Hour
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: 1.5,
                maxHeight: 200,
                overflowY: 'auto',
                pr: 1,
                '&::-webkit-scrollbar': { width: 6 },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: 3 }
            }}>
                {hours.map(hour => (
                    <Box
                        key={hour}
                        component={motion.div}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectHour(hour)}
                        sx={{
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            cursor: 'pointer',
                            bgcolor: selectedHour === hour ? 'primary.main' : 'white',
                            color: selectedHour === hour ? 'white' : 'text.primary',
                            border: '2px solid',
                            borderColor: selectedHour === hour ? 'primary.main' : '#e2e8f0',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            transition: 'all 0.2s',
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: selectedHour === hour ? 'primary.dark' : '#f8fafc',
                            }
                        }}
                    >
                        {hour.toString().padStart(2, '0')}:00
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

// Component chọn phút (Minute Selector)
function MinuteSelector({ selectedMinute, onSelectMinute }: { selectedMinute: number | null, onSelectMinute: (minute: number) => void }) {
    const minutes = [0, 15, 30, 45];

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#64748b' }}>
                Select Minute
            </Typography>
            <Stack direction="row" spacing={1.5}>
                {minutes.map(minute => (
                    <Box
                        key={minute}
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectMinute(minute)}
                        sx={{
                            flex: 1,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            cursor: 'pointer',
                            bgcolor: selectedMinute === minute ? 'primary.main' : 'white',
                            color: selectedMinute === minute ? 'white' : 'text.primary',
                            border: '2px solid',
                            borderColor: selectedMinute === minute ? 'primary.main' : '#e2e8f0',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            transition: 'all 0.2s',
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: selectedMinute === minute ? 'primary.dark' : '#f8fafc',
                            }
                        }}
                    >
                        :{minute.toString().padStart(2, '0')}
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}

// Main Component
export default function DateTimePicker() {
    const [selectedDate, setSelectedDate] = useState<number | null>(7);
    const [selectedTime, setSelectedTime] = useState<string | null>('09:00 AM');
    const [selectedHour, setSelectedHour] = useState<number | null>(9);
    const [selectedMinute, setSelectedMinute] = useState<number | null>(0);
    const [viewMode, setViewMode] = useState<'slots' | 'custom'>('slots'); // 'slots' hoặc 'custom'

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const calendarDays = [
        '', '', '', '', '', 1, 2,
        3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23,
        24, 25, 26, 27, 28, '', ''
    ];

    const timeSlots = [
        '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
        '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
    ];

    // Format time từ hour và minute
    const formatCustomTime = () => {
        if (selectedHour === null || selectedMinute === null) return null;
        const hour = selectedHour > 12 ? selectedHour - 12 : selectedHour === 0 ? 12 : selectedHour;
        const period = selectedHour >= 12 ? 'PM' : 'AM';
        return `${hour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')} ${period}`;
    };

    return (
        <Grid container>
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
                            <IconButton size="small" sx={{ bgcolor: '#eff6ff', color: '#0061f2' }}>
                                <ChevronRight />
                            </IconButton>
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

                    {/* Time Selection Column */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Saturday, February 14
                            </Typography>
                        </Stack>

                        {/* View Mode Toggle */}
                        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                            <Chip
                                label="Quick Slots"
                                onClick={() => setViewMode('slots')}
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: viewMode === 'slots' ? 'primary.main' : '#f1f5f9',
                                    color: viewMode === 'slots' ? 'white' : '#64748b',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: viewMode === 'slots' ? 'primary.dark' : '#e2e8f0',
                                    }
                                }}
                            />
                            <Chip
                                label="Custom Time"
                                onClick={() => setViewMode('custom')}
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: viewMode === 'custom' ? 'primary.main' : '#f1f5f9',
                                    color: viewMode === 'custom' ? 'white' : '#64748b',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: viewMode === 'custom' ? 'primary.dark' : '#e2e8f0',
                                    }
                                }}
                            />
                        </Stack>

                        {/* Time Slots View */}
                        {viewMode === 'slots' && (
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
                                        onClick={() => {
                                            setSelectedTime(time);
                                            setSelectedHour(null);
                                            setSelectedMinute(null);
                                        }}
                                    />
                                ))}
                            </Box>
                        )}

                        {/* Custom Time View */}
                        {viewMode === 'custom' && (
                            <Box>
                                <HourSelector
                                    selectedHour={selectedHour}
                                    onSelectHour={(hour) => {
                                        setSelectedHour(hour);
                                        setSelectedTime(null);
                                    }}
                                />
                                <MinuteSelector
                                    selectedMinute={selectedMinute}
                                    onSelectMinute={(minute) => {
                                        setSelectedMinute(minute);
                                        setSelectedTime(null);
                                    }}
                                />

                                {/* Selected Time Display */}
                                {selectedHour !== null && selectedMinute !== null && (
                                    <Box
                                        component={motion.div}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        sx={{
                                            mt: 3,
                                            p: 2.5,
                                            bgcolor: '#eff6ff',
                                            border: '2px solid #3b82f6',
                                            borderRadius: 2,
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
                                            Selected Time
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 800 }}>
                                            {formatCustomTime()}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}