import { Box, Stack, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { User, Clock, DollarSign, Armchair, CheckCircle2, Sparkles, Scissors, Droplet, Hand } from 'lucide-react';

interface ChairCardProps {
    chair: {
        name: string;
        status: 'available' | 'occupied' | 'active' | 'selected';
        price?: number;
        time?: string;
        technician?: string;
        serviceType?: string;
        serviceIcon?: 'manicure' | 'pedicure' | 'nailart' | 'spa';
    };
    isSelected: boolean;
    onClick: () => void;
}

function ChairCard({ chair, isSelected, onClick }: ChairCardProps) {
    const isOccupied = chair.status === 'occupied' || chair.status === 'active' || chair.status === 'selected';

    // Status configuration
    const statusConfig = {
        available: {
            color: '#10b981',
            bgColor: '#ecfdf5',
            borderColor: '#d1fae5',
            label: 'Available',
            icon: <CheckCircle2 size={16} />
        },
        occupied: {
            color: '#f59e0b',
            bgColor: '#fffbeb',
            borderColor: '#fef3c7',
            label: 'In Service',
            icon: <Clock size={16} />
        },
        active: {
            color: '#3b82f6',
            bgColor: '#eff6ff',
            borderColor: '#dbeafe',
            label: 'Active',
            icon: <User size={16} />
        },
        selected: {
            color: '#8b5cf6',
            bgColor: '#f5f3ff',
            borderColor: '#ede9fe',
            label: 'Selected',
            icon: <CheckCircle2 size={16} />
        }
    };

    // Service icon mapping
    const serviceIcons = {
        manicure: <Hand size={32} strokeWidth={2} />,
        pedicure: <Droplet size={32} strokeWidth={2} />,
        nailart: <Sparkles size={32} strokeWidth={2} />,
        spa: <Scissors size={32} strokeWidth={2} />
    };

    const currentStatus = statusConfig[chair.status];
    const currentServiceIcon = chair.serviceIcon ? serviceIcons[chair.serviceIcon] : null;

    return (
        <Box
            component={motion.div}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            sx={{
                minWidth: '180px',
                maxWidth: '220px',
                bgcolor: 'white',
                borderRadius: 3,
                p: 3,
                mt: 1,
                cursor: 'pointer',
                border: '2px solid',
                borderColor: isSelected ? 'primary.main' : currentStatus.borderColor,
                boxShadow: isSelected
                    ? '0 20px 25px -5px rgba(99, 102, 241, 0.1), 0 8px 10px -6px rgba(99, 102, 241, 0.1)'
                    : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    borderColor: isSelected ? 'primary.main' : 'primary.light',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
                }
            }}
        >
            {/* Status Badge */}
            <Chip
                icon={currentStatus.icon}
                label={currentStatus.label}
                size="small"
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    height: 24,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    bgcolor: currentStatus.bgColor,
                    color: currentStatus.color,
                    border: `1px solid ${currentStatus.borderColor}`,
                    '& .MuiChip-icon': {
                        color: currentStatus.color,
                        fontSize: '0.875rem'
                    }
                }}
            />

            {/* Chair Visual Representation */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 2,
                mt: 1
            }}>
                {/* Chair Icon Container */}
                <Box sx={{
                    width: 130,
                    height: 130,
                    borderRadius: 3,
                    bgcolor: isOccupied ? currentStatus.bgColor : '#f8fafc',
                    border: '3px solid',
                    borderColor: isOccupied ? currentStatus.borderColor : '#e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                }}>
                    {/* Chair Icon */}
                    <Armchair
                        size={48}
                        strokeWidth={2}
                        style={{
                            color: isOccupied ? currentStatus.color : '#94a3b8',
                            marginBottom: isOccupied && currentServiceIcon ? 8 : 0
                        }}
                    />

                    {/* Service Icon - Shows what service is being performed */}
                    {isOccupied && currentServiceIcon && (
                        <Box
                            component={motion.div}
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                width: 42,
                                height: 42,
                                borderRadius: '50%',
                                bgcolor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: `2px solid ${currentStatus.color}`,
                                color: currentStatus.color
                            }}
                        >
                            {currentServiceIcon}
                        </Box>
                    )}

                    {/* Service Info Overlay */}
                    {isOccupied && chair.time && (
                        <Box sx={{
                            position: 'absolute',
                            bottom: 8,
                            bgcolor: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1.5,
                            border: `1.5px solid ${currentStatus.borderColor}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <Clock size={12} style={{ color: currentStatus.color }} />
                            <Typography sx={{
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: currentStatus.color
                            }}>
                                {chair.time}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Chair Name */}
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: isOccupied ? '#1e293b' : '#64748b',
                    mb: 1.5,
                    textAlign: 'center'
                }}
            >
                {chair.name}
            </Typography>

            {/* Details Section */}
            <Stack spacing={1.5}>
                {/* Technician Info */}
                {chair.technician && (
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                            bgcolor: '#f1f5f9',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            justifyContent: 'center'
                        }}
                    >
                        <User size={16} style={{ color: '#3b82f6' }} />
                        <Typography sx={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: '#475569'
                        }}>
                            {chair.technician}
                        </Typography>
                    </Stack>
                )}

                {/* Service Type with Icon */}
                {chair.serviceType && (
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                            bgcolor: '#faf5ff',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            justifyContent: 'center',
                            border: '1px solid #e9d5ff'
                        }}
                    >
                        {currentServiceIcon && (
                            <Box sx={{
                                color: '#9333ea',
                                display: 'flex',
                                '& svg': { width: 16, height: 16 }
                            }}>
                                {currentServiceIcon}
                            </Box>
                        )}
                        <Typography sx={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#7c3aed'
                        }}>
                            {chair.serviceType}
                        </Typography>
                    </Stack>
                )}

                {/* Price Info */}
                {chair.price && (
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                            bgcolor: '#f0fdf4',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            justifyContent: 'center',
                            border: '1px solid #bbf7d0'
                        }}
                    >
                        <DollarSign size={16} style={{ color: '#16a34a' }} />
                        <Typography sx={{
                            fontSize: '0.9rem',
                            fontWeight: 800,
                            color: '#15803d'
                        }}>
                            {chair.price.toLocaleString()}
                        </Typography>
                    </Stack>
                )}
            </Stack>

            {/* Selection Indicator */}
            {isSelected && (
                <Box
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    sx={{
                        position: 'absolute',
                        top: -8,
                        left: -8,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '3px solid white'
                    }}
                >
                    <CheckCircle2 size={18} color="white" />
                </Box>
            )}
        </Box>
    );
}

export default ChairCard;