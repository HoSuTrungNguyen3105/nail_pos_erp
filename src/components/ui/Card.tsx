import React from 'react';
import MuiCard from '@mui/material/Card';
import type { CardProps as MuiCardProps } from '@mui/material/Card';
import { motion } from 'framer-motion';

// Wrap MUI Card with Framer Motion for animations
// Casting to any to avoid complex type intersection issues between MUI and Framer Motion
const MotionCard = motion(MuiCard as any);

interface CardProps extends MuiCardProps {
  // Add any custom props if needed
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MotionCard
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={className}
        {...props}
      >
        {children}
      </MotionCard>
    );
  }
);

Card.displayName = 'Card';
