import React from 'react';
import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// Override MUI's variant and size types with our custom ones
interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'contained' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'medium' | 'small' | 'large' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'contained', size = 'medium', isLoading, children, ...props }, ref) => {
    // Map custom variants to MUI variants if needed, or use MUI defaults
    const muiVariant = variant === 'primary' ? 'contained' : 
                       variant === 'secondary' ? 'outlined' : 
                       variant === 'ghost' ? 'text' : 
                       variant === 'outline' ? 'outlined' : 
                       (variant === 'contained' || variant === 'outlined' || variant === 'text') ? variant : 'contained';
    
    // Map size
    const muiSize = size === 'md' ? 'medium' : 
                    size === 'sm' ? 'small' : 
                    size === 'lg' ? 'large' : 
                    (size === 'medium' || size === 'small' || size === 'large') ? size : 'medium';

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        size={muiSize}
        disabled={isLoading || props.disabled}
        className={className} // MUI handles className forwarding, but styles might depend on sx
        {...props}
        sx={{
            // Add custom SX if needed for specific overrides not in theme
            ...props.sx
        }}
      >
        {isLoading ? (
          <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
        ) : null}
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = 'Button';
