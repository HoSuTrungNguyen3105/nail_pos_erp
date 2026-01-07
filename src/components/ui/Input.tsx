import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && <label className="label">{label}</label>}
        <input
          className={cn('input', error && 'border-destructive focus-visible:border-destructive', className)}
          ref={ref}
          {...props}
        />
        {error && <span className="text-sm text-[var(--destructive)]">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
