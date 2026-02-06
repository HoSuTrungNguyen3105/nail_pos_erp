import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#d946ef', // Fuchsia
            light: '#e879f9',
            dark: '#4f46e5', // Deep Indigo for gradient start
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#2dd4bf', // Teal/Aqua accent
            light: '#5eead4',
            dark: '#14b8a6',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
            disabled: '#94a3b8',
        },
        error: {
            main: '#be123c', // Pink/Red for errors/actions
            light: '#f43f5e',
            dark: '#881337',
        },
        success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
        },
        warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
        },
        info: {
            main: '#3b82f6',
            light: '#60a5fa',
            dark: '#2563eb',
        },
        grey: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
        },
        divider: 'rgba(0, 0, 0, 0.08)',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 },
        h2: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3 },
        h3: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
        h4: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
        h5: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
        h6: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
        body1: { fontSize: '1rem', lineHeight: 1.5 },
        body2: { fontSize: '0.875rem', lineHeight: 1.5 },
        button: { fontSize: '0.875rem', fontWeight: 600, textTransform: 'none' },
        caption: { fontSize: '0.75rem', lineHeight: 1.4 },
        overline: { fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '50px', // Pill shape from image
                    fontWeight: 600,
                    padding: '10px 24px',
                    transition: 'all 0.3s ease',
                    '&.MuiButton-containedPrimary': {
                        background: 'linear-gradient(90deg, #4f46e5 0%, #d946ef 100%)',
                        boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(90deg, #4338ca 0%, #a21caf 100%)',
                            boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)',
                            transform: 'translateY(-1px)',
                        },
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(217, 70, 239, 0.15)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#ffffff',
                    borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundImage: 'none',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    marginBottom: '4px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(217, 70, 239, 0.04)',
                    },
                    '&.Mui-selected': {
                        background: 'linear-gradient(90deg, rgba(79, 70, 229, 0.1) 0%, rgba(217, 70, 239, 0.1) 100%)',
                        borderLeft: '4px solid #4f46e5',
                        color: '#4f46e5',
                        fontWeight: 700,
                        '&:hover': {
                            background: 'linear-gradient(90deg, rgba(79, 70, 229, 0.15) 0%, rgba(217, 70, 239, 0.15) 100%)',
                        },
                        '& .MuiListItemIcon-root': {
                            color: '#4f46e5',
                        },
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'color 0.2s ease',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    transition: 'background-color 0.2s ease',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    color: '#1e293b',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#ffffff',
                    backgroundImage: 'none',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    paddingBottom: '16px',
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                    padding: '24px',
                    gap: '8px',
                },
            },
        },
    },
});
