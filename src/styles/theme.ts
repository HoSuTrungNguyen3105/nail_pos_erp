import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#d946ef', // Fuchsia/Purple from Zota logo
            light: '#e879f9',
            dark: '#a21caf',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#2dd4bf', // Teal/Aqua accent
            light: '#5eead4',
            dark: '#14b8a6',
            contrastText: '#134e4a',
        },
        background: {
            default: '#2e1065', // Deep Purple
            paper: 'rgba(255, 255, 255, 0.05)', // Glassmorphism base
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
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
        divider: 'rgba(255, 255, 255, 0.1)',
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
                    borderRadius: '12px',
                    fontWeight: 600,
                    padding: '10px 20px',
                    transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
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
                    backgroundColor: '#2e1065',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundImage: 'none',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    marginBottom: '4px',
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    },
                    '&.Mui-selected': {
                        background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.25), rgba(147, 51, 234, 0.15))',
                        border: '1px solid rgba(217, 70, 239, 0.25)',
                        boxShadow: '0 10px 30px rgba(217, 70, 239, 0.12)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.3), rgba(147, 51, 234, 0.2))',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1e293b',
                    backgroundImage: 'none',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: '16px',
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '24px',
                    gap: '8px',
                },
            },
        },
    },
});
