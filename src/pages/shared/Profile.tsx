import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Tabs,
  Tab,
  Divider,
  alpha,
  Stack,
  IconButton,
  Grid
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Bell, Shield, Camera } from 'lucide-react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function UserProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', mb: 1 }}>
          Account Settings
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Manage your profile and security preferences.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Navigation Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card
            sx={{
              background: 'rgba(30, 41, 59, 0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 4,
              p: 1
            }}
          >
            <Tabs
              orientation="vertical"
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
                '& .MuiTab-root': {
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  textTransform: 'none',
                  minHeight: 48,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  mb: 0.5,
                  '&.Mui-selected': {
                    color: '#fff',
                    bgcolor: 'rgba(217, 70, 239, 0.1)',
                    '& svg': { color: '#d946ef' }
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff'
                  }
                }
              }}
            >
              <Tab
                value="general"
                label="General"
                icon={<User size={18} />}
                iconPosition="start"
              />
              <Tab
                value="security"
                label="Security"
                icon={<Lock size={18} />}
                iconPosition="start"
              />
              <Tab
                value="notifications"
                label="Notifications"
                icon={<Bell size={18} />}
                iconPosition="start"
              />
            </Tabs>
          </Card>
        </Grid>

        {/* Content Area */}
        <Grid size={{ xs: 12, md: 9 }}>
          <TabPanel value={activeTab} index="general">
            <Card
              sx={{
                background: 'rgba(30, 41, 59, 0.4)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', mb: 4 }}>
                  Profile Information
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 6 }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        background: 'linear-gradient(135deg, #d946ef, #7c3aed)',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        boxShadow: '0 0 0 4px rgba(217, 70, 239, 0.1)'
                      }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: '#d946ef',
                        color: '#fff',
                        '&:hover': { bgcolor: '#c026d3' },
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        border: '2px solid #0f172a'
                      }}
                    >
                      <Camera size={14} />
                    </IconButton>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
                      Profile Photo
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      Update your avatar and personal details
                    </Typography>
                    <Button variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>
                      Change Avatar
                    </Button>
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      defaultValue={user?.name}
                      variant="outlined"
                      slotProps={{
                        input: { sx: { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)' } }
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      defaultValue={user?.email}
                      disabled
                      variant="outlined"
                      slotProps={{
                        input: { sx: { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.01)' } }
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      defaultValue="+1 (555) 000-0000"
                      variant="outlined"
                      slotProps={{
                        input: { sx: { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)' } }
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Role"
                      defaultValue={user?.role}
                      disabled
                      variant="outlined"
                      slotProps={{
                        input: { sx: { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.01)' } }
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1,
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #d946ef, #7c3aed)',
                      '&:hover': {
                        boxShadow: '0 8px 16px rgba(217, 70, 239, 0.4)'
                      }
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={activeTab} index="security">
            <Card
              sx={{
                background: 'rgba(30, 41, 59, 0.4)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', mb: 4 }}>
                  Security Settings
                </Typography>

                <Stack spacing={3}>
                  <SecurityItem
                    icon={<Lock size={20} />}
                    iconColor="#3b82f6"
                    title="Password"
                    subtitle="Last changed 3 months ago"
                    actionLabel="Change"
                  />
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                  <SecurityItem
                    icon={<Shield size={20} />}
                    iconColor="#22c55e"
                    title="Two-Factor Authentication"
                    subtitle="Add an extra layer of security to your account"
                    actionLabel="Enable"
                  />
                </Stack>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={activeTab} index="notifications">
            <Card
              sx={{
                background: 'rgba(30, 41, 59, 0.4)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
                py: 10
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: 'text.disabled'
                  }}
                >
                  <Bell size={32} />
                </Box>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Notification settings are coming soon.
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
}

const SecurityItem = ({ icon, iconColor, title, subtitle, actionLabel }: { icon: React.ReactNode; iconColor: string; title: string; subtitle: string; actionLabel: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
      <Box
        sx={{
          p: 1.5,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: alpha(iconColor, 0.1),
          color: iconColor,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
    <Button
      variant="outlined"
      size="small"
      sx={{
        borderRadius: 2.5,
        textTransform: 'none',
        borderColor: 'rgba(255,255,255,0.1)',
        color: 'text.secondary',
        '&:hover': {
          borderColor: '#fff',
          color: '#fff',
          bgcolor: 'rgba(255, 255, 255, 0.05)'
        }
      }}
    >
      {actionLabel}
    </Button>
  </Box>
);

