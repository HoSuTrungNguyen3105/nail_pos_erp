import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab
} from '@mui/material';
import CRMCustomers from './CRMCustomers';
import CRMPromotions from './CRMPromotions';

export default function CRM() {
  const [activeTab, setActiveTab] = useState('customers');

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', mb: 1 }}>
            Customer Relationships
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Manage customers and marketing campaigns.
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: 'rgba(30, 41, 59, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            p: 0.5
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              minHeight: 40,
              '& .MuiTabs-indicator': {
                display: 'none',
              },
              '& .MuiTab-root': {
                minHeight: 32,
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: 'text.secondary',
                px: 3,
                transition: 'all 0.2s',
                '&.Mui-selected': {
                  color: '#fff',
                  bgcolor: '#d946ef',
                  boxShadow: '0 4px 12px rgba(217, 70, 239, 0.3)'
                },
                '&:hover:not(.Mui-selected)': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff'
                }
              }
            }}
          >
            <Tab value="customers" label="Customers" />
            <Tab value="promotions" label="Promotions" />
          </Tabs>
        </Box>
      </Box>

      <Box>
        {activeTab === 'customers' ? (
          <CRMCustomers />
        ) : (
          <CRMPromotions />
        )}
      </Box>
    </Container>
  );
}
