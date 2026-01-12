import React from 'react';
import SEO from './components/SEO';
import { ShoppingCart, TrendingUp, Package, DollarSign } from 'lucide-react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const stats = [
  { icon: ShoppingCart, label: 'Total Orders', value: '1,234', color: '#d946ef' },
  { icon: Package, label: 'Products', value: '567', color: '#14b8a6' },
  { icon: DollarSign, label: 'Revenue', value: '$45,678', color: '#a855f7' },
  { icon: TrendingUp, label: 'Growth', value: '+12.5%', color: '#3b82f6' },
];

const Ecommerce: React.FC = () => {
  return (
    <>
      <SEO
        title="eCommerce - TailAdmin"
        description="Manage your online store, products, orders, and sales analytics."
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Page Header */}
        <Box>
          <Typography variant="h4" fontWeight={700} color="white">
            eCommerce Dashboard
          </Typography>
          <Typography mt={1} color="text.secondary">
            Manage your online store and track sales performance
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <Grid size={3} sx={{ md: 6 , lg: 3}} key={idx}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all .2s',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: `${stat.color}33`,
                      }}
                    >
                      <Icon size={24} color={stat.color} />
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h5" fontWeight={700} color="white">
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Coming Soon Section */}
        <Box
          sx={{
            p: 6,
            borderRadius: 3,
            textAlign: 'center',
            background:
              'linear-gradient(135deg, rgba(217,70,239,0.1), rgba(147,51,234,0.1))',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <ShoppingCart size={64} color="#d946ef" />
          <Typography variant="h5" fontWeight={700} color="white" mt={2}>
            eCommerce Module
          </Typography>
          <Typography
            mt={1}
            color="text.secondary"
            maxWidth={500}
            mx="auto"
          >
            Full eCommerce management features including product catalog,
            inventory, orders, and customer management are coming soon.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Ecommerce;
