import React, { useState, useRef } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Dialog,
    Stack,
    IconButton,
    Card
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { X, Gift, Sparkles, Trophy } from 'lucide-react';
import SEO from './components/SEO';

const PRIZES = [
    { label: '5% OFF', color: '#D81B60', type: 'discount' },
    { label: 'THANKS', color: '#FFFFFF', type: 'text' },
    { label: '25% OFF', color: '#880E4F', type: 'discount' },
    { label: 'GIFT', color: '#D81B60', type: 'gift' },
    { label: '$10 OFF', color: '#FFFFFF', type: 'discount' },
    { label: 'THANKS', color: '#880E4F', type: 'text' },
    { label: '15% OFF', color: '#D81B60', type: 'discount' },
    { label: '$5 OFF', color: '#FFFFFF', type: 'discount' },
];

export default function LuckySpin() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<null | typeof PRIZES[0]>(null);
    const [openModal, setOpenModal] = useState(false);
    const controls = useAnimation();
    const wheelRef = useRef<HTMLDivElement>(null);

    const spin = async () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setResult(null);

        const randomRotation = Math.floor(Math.random() * 360) + 1440; // At least 4 full rotations

        await controls.start({
            rotate: randomRotation,
            transition: {
                duration: 4,
                ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for "momentum" feel
            }
        });

        const finalAngle = randomRotation % 360;
        const segmentAngle = 360 / PRIZES.length;
        // Calculation: (360 - angle) to get the top segment, then index
        const prizeIndex = Math.floor(((360 - finalAngle + segmentAngle / 2) % 360) / segmentAngle);

        setResult(PRIZES[prizeIndex]);
        setOpenModal(true);
        setIsSpinning(false);
    };

    const resetWheel = () => {
        controls.set({ rotate: 0 });
        setOpenModal(false);
    };

    return (
        <Box sx={{
            minHeight: 'calc(100vh - 100px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #2e1065 0%, #d946ef 100%)',
            borderRadius: 4,
            p: 4,
            position: 'relative',
            overflow: 'hidden'
        }}>
            <SEO title="Magical Nails of Fortune | Hiweb" />

            {/* Decorative background elements */}
            <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
            <Box sx={{ position: 'absolute', bottom: -100, left: -50, width: 300, height: 300, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />

            <Grid container spacing={6} alignItems="center" sx={{ position: 'relative', zIndex: 1, maxWidth: 1200 }}>
                {/* Left Side: Wheel */}
                <Grid size={7} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ position: 'relative', width: { xs: 320, sm: 480 }, height: { xs: 320, sm: 480 } }}>

                        {/* Pointer (Top Center) */}
                        <Box sx={{
                            position: 'absolute',
                            top: -20,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 10,
                            width: 0,
                            height: 0,
                            borderLeft: '15px solid transparent',
                            borderRight: '15px solid transparent',
                            borderTop: '30px solid #ffd700',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }} />

                        {/* Main Wheel Container */}
                        <motion.div
                            animate={controls}
                            style={{ width: '100%', height: '100%' }}
                        >
                            {/* Outer Gold Border */}
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                border: '12px solid #ffd700',
                                boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)',
                                position: 'relative',
                                background: '#4a0e4e',
                                overflow: 'hidden'
                            }}>
                                {/* Luminous Dots on Border */}
                                {[...Array(24)].map((_, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            position: 'absolute',
                                            width: 8,
                                            height: 8,
                                            bgcolor: 'white',
                                            borderRadius: '50%',
                                            boxShadow: '0 0 8px white',
                                            top: '50%',
                                            left: '50%',
                                            transform: `translate(-50%, -50%) rotate(${i * 15}deg) translateY(-${230}px)`
                                        }}
                                    />
                                ))}

                                {/* Prize Segments */}
                                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-22.5deg)' }}>
                                    {PRIZES.map((prize, i) => {
                                        const angle = 360 / PRIZES.length;
                                        const startAngle = i * angle;
                                        const endAngle = (i + 1) * angle;

                                        const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                                        const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                                        const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                                        const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                                        return (
                                            <g key={i}>
                                                <path
                                                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                                                    fill={prize.color}
                                                    stroke="#ffffff33"
                                                    strokeWidth="0.5"
                                                />
                                                {/* Text labels */}
                                                <text
                                                    x="75"
                                                    y="50"
                                                    fill={prize.color === '#FFFFFF' ? '#4a0e4e' : '#FFFFFF'}
                                                    fontSize="3.5"
                                                    fontWeight="900"
                                                    transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                                                    textAnchor="middle"
                                                    style={{ textTransform: 'uppercase' }}
                                                >
                                                    {prize.label}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </svg>

                                {/* Central Hub */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 80,
                                    height: 80,
                                    bgcolor: '#4a0e4e',
                                    borderRadius: '50%',
                                    border: '4px solid #ffd700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 15px rgba(0,0,0,0.5)'
                                }}>
                                    <Typography variant="caption" sx={{ color: '#ffd700', fontWeight: 900, fontSize: '0.75rem' }}>ZOTA</Typography>
                                </Box>
                            </Box>
                        </motion.div>
                    </Box>
                </Grid>

                {/* Right Side: Content */}
                <Grid size={5}>
                    <Stack spacing={4}>
                        <Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontFamily: '"Cursive", "Pacifico", sans-serif',
                                    color: 'white',
                                    textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
                                    mb: -1
                                }}
                            >
                                Magical
                            </Typography>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    color: 'white',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                Nails of Fortune
                            </Typography>
                        </Box>

                        <Paper sx={{
                            p: 4,
                            borderRadius: 4,
                            bgcolor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            maxWidth: 400
                        }}>
                            <Typography variant="body1" sx={{ color: 'white', opacity: 0.9, textAlign: 'center', mb: 3 }}>
                                Try your luck and give it a spin! You could win exclusive rewards and discounts for your salon.
                            </Typography>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={spin}
                                disabled={isSpinning}
                                sx={{
                                    height: 60,
                                    fontSize: '1.25rem',
                                    fontWeight: 800,
                                    borderRadius: '30px',
                                    background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)', // Blue gradient like image
                                    boxShadow: '0 10px 20px rgba(0,210,255,0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #00d2ff 20%, #3a7bd5 120%)',
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                {isSpinning ? 'SPINNING...' : 'LUCKY SPIN'}
                            </Button>
                        </Paper>

                        <Stack direction="row" spacing={2} sx={{ color: 'white', opacity: 0.7 }}>
                            <Sparkles size={20} />
                            <Typography variant="body2">Winners are announced every Friday at 5:00 PM</Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>

            {/* Result Modal */}
            <Dialog
                open={openModal}
                onClose={resetWheel}
                PaperProps={{
                    sx: {
                        bgcolor: '#1e293b',
                        backgroundImage: 'none',
                        color: 'white',
                        borderRadius: 4,
                        maxWidth: 400,
                        textAlign: 'center',
                        p: 4
                    }
                }}
            >
                <IconButton
                    onClick={resetWheel}
                    sx={{ position: 'absolute', top: 10, right: 10, color: 'grey.500' }}
                >
                    <X size={20} />
                </IconButton>

                <Box sx={{ mb: 2 }}>
                    <Box
                        component={motion.div}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                            boxShadow: '0 0 30px rgba(217, 70, 239, 0.4)'
                        }}
                    >
                        {result?.type === 'gift' ? <Gift size={40} /> : <Trophy size={40} />}
                    </Box>
                    <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>CONGRATULATIONS!</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8, mb: 3 }}>You have officialy won:</Typography>

                    <Box sx={{
                        p: 3,
                        borderRadius: 3,
                        bgcolor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        mb: 4
                    }}>
                        <Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.light' }}>
                            {result?.label}
                        </Typography>
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={resetWheel}
                        sx={{ borderRadius: 3, height: 50, fontWeight: 700 }}
                    >
                        CLAIM PRIZE
                    </Button>
                </Box>
            </Dialog>
        </Box>
    );
}

// Reuse Grid since it's common
import Grid from '@mui/material/Grid';
