import React from 'react';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';

// Omit default size to handle conflict or custom mapping
interface InputProps extends Omit<TextFieldProps, 'size' | 'error'> {
  label?: string;
  error?: string | boolean; 
  size?: 'small' | 'medium'; // MUI standard sizes
}

export const Input = React.forwardRef<HTMLDivElement, InputProps>(
  ({ className, label, error, variant = 'outlined', ...props }, ref) => {
    const isError = !!error;
    const helperText = typeof error === 'string' ? error : props.helperText;

    return (
      <TextField
        ref={ref}
        label={label}
        error={isError}
        helperText={helperText}
        variant={variant}
        fullWidth
        className={className}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
