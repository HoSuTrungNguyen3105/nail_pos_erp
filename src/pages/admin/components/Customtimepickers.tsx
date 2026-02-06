import { Box, IconButton, Stack, Typography, Chip } from '@mui/material';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Spinner style time picker (Alternative compact version)
function SpinnerTimePicker({ selectedHour, selectedMinute, onHourChange, onMinuteChange }: any) {
    return (
        <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#64748b', textAlign: 'center' }}>
                Select Custom Time
            </Typography>

            <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
                {/* Hour Spinner */}
                <Stack alignItems="center" spacing={1}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>
                        Hour
                    </Typography>
                    <Stack alignItems="center" spacing={1}>
                        <IconButton
                            size="small"
                            onClick={() => onHourChange((selectedHour + 1) % 24)}
                            sx={{
                                bgcolor: '#f1f5f9',
                                '&:hover': { bgcolor: '#e2e8f0' }
                            }}
                        >
                            <Plus size={16} />
                        </IconButton>

                        <Box sx={{
                            width: 70,
                            height: 70,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'primary.main',
                            color: 'white',
                            borderRadius: 3,
                            fontSize: '2rem',
                            fontWeight: 800,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            {selectedHour?.toString().padStart(2, '0') || '00'}
                        </Box>

                        <IconButton
                            size="small"
                            onClick={() => onHourChange(selectedHour === 0 ? 23 : selectedHour - 1)}
                            sx={{
                                bgcolor: '#f1f5f9',
                                '&:hover': { bgcolor: '#e2e8f0' }
                            }}
                        >
                            <Minus size={16} />
                        </IconButton>
                    </Stack>
                </Stack>

                {/* Separator */}
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#cbd5e1', mt: 4 }}>
                    :
                </Typography>

                {/* Minute Spinner */}
                <Stack alignItems="center" spacing={1}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>
                        Minute
                    </Typography>
                    <Stack alignItems="center" spacing={1}>
                        <IconButton
                            size="small"
                            onClick={() => onMinuteChange((selectedMinute + 15) % 60)}
                            sx={{
                                bgcolor: '#f1f5f9',
                                '&:hover': { bgcolor: '#e2e8f0' }
                            }}
                        >
                            <Plus size={16} />
                        </IconButton>

                        <Box sx={{
                            width: 70,
                            height: 70,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'primary.main',
                            color: 'white',
                            borderRadius: 3,
                            fontSize: '2rem',
                            fontWeight: 800,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            {selectedMinute?.toString().padStart(2, '0') || '00'}
                        </Box>

                        <IconButton
                            size="small"
                            onClick={() => onMinuteChange(selectedMinute === 0 ? 45 : selectedMinute - 15)}
                            sx={{
                                bgcolor: '#f1f5f9',
                                '&:hover': { bgcolor: '#e2e8f0' }
                            }}
                        >
                            <Minus size={16} />
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>

            {/* AM/PM Toggle */}
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
                <Chip
                    label="AM"
                    onClick={() => {
                        if (selectedHour >= 12) onHourChange(selectedHour - 12);
                    }}
                    sx={{
                        minWidth: 60,
                        fontWeight: 700,
                        bgcolor: selectedHour < 12 ? 'primary.main' : '#f1f5f9',
                        color: selectedHour < 12 ? 'white' : '#64748b',
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: selectedHour < 12 ? 'primary.dark' : '#e2e8f0',
                        }
                    }}
                />
                <Chip
                    label="PM"
                    onClick={() => {
                        if (selectedHour < 12) onHourChange(selectedHour + 12);
                    }}
                    sx={{
                        minWidth: 60,
                        fontWeight: 700,
                        bgcolor: selectedHour >= 12 ? 'primary.main' : '#f1f5f9',
                        color: selectedHour >= 12 ? 'white' : '#64748b',
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: selectedHour >= 12 ? 'primary.dark' : '#e2e8f0',
                        }
                    }}
                />
            </Stack>
        </Box>
    );
}

// Inline hour buttons (Another alternative)
function InlineTimePicker({ selectedHour, selectedMinute, onHourChange, onMinuteChange }: any) {
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = [0, 15, 30, 45];
    const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

    const handleHourSelect = (hour: number) => {
        const actualHour = period === 'PM' ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);
        onHourChange(actualHour);
    };

    const displayHour = selectedHour === 0 ? 12 : selectedHour > 12 ? selectedHour - 12 : selectedHour;

    return (
        <Box>
            {/* AM/PM Toggle */}
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                <Chip
                    label="AM"
                    onClick={() => {
                        setPeriod('AM');
                        if (selectedHour >= 12) onHourChange(selectedHour - 12);
                    }}
                    sx={{
                        minWidth: 80,
                        height: 36,
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        bgcolor: period === 'AM' ? 'primary.main' : '#f1f5f9',
                        color: period === 'AM' ? 'white' : '#64748b',
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: period === 'AM' ? 'primary.dark' : '#e2e8f0',
                        }
                    }}
                />
                <Chip
                    label="PM"
                    onClick={() => {
                        setPeriod('PM');
                        if (selectedHour < 12) onHourChange(selectedHour + 12);
                    }}
                    sx={{
                        minWidth: 80,
                        height: 36,
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        bgcolor: period === 'PM' ? 'primary.main' : '#f1f5f9',
                        color: period === 'PM' ? 'white' : '#64748b',
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: period === 'PM' ? 'primary.dark' : '#e2e8f0',
                        }
                    }}
                />
            </Stack>

            {/* Hour Selection */}
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#64748b' }}>
                Hour
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1.5,
                mb: 3
            }}>
                {hours.map(hour => (
                    <Box
                        key={hour}
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleHourSelect(hour)}
                        sx={{
                            height: 44,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            cursor: 'pointer',
                            bgcolor: displayHour === hour ? 'primary.main' : 'white',
                            color: displayHour === hour ? 'white' : 'text.primary',
                            border: '2px solid',
                            borderColor: displayHour === hour ? 'primary.main' : '#e2e8f0',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            transition: 'all 0.2s',
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: displayHour === hour ? 'primary.dark' : '#f8fafc',
                            }
                        }}
                    >
                        {hour}
                    </Box>
                ))}
            </Box>

            {/* Minute Selection */}
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#64748b' }}>
                Minute
            </Typography>
            <Stack direction="row" spacing={1.5}>
                {minutes.map(minute => (
                    <Box
                        key={minute}
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onMinuteChange(minute)}
                        sx={{
                            flex: 1,
                            height: 44,
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

export { SpinnerTimePicker, InlineTimePicker };