'use client';

import React from 'react';
import { Control, Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// Create a generic type for the RhfTextField component
type RhfTextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  onCustomChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add onCustomChange prop
  trim?: boolean; // Add a trim prop to enable/disable trimming
  label?: string;
  helperText?: string;
  error?: boolean;
} & Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> &
  Omit<ControllerProps<T>, 'render' | 'control'>;

export const RhfTextField = <T extends FieldValues>({
  control,
  onCustomChange,
  trim = true,
  label,
  helperText,
  error: externalError,
  className,
  id,
  ...props
}: RhfTextFieldProps<T>) => {
  const inputId = id || String(props.name);

  return (
    <Controller
      control={control}
      {...props}
      render={({ field: { onChange, value, onBlur, name }, fieldState: { error } }) => {
        const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
          let trimmedValue = value;

          if (trim && typeof value === 'string') {
            trimmedValue = trimmedValue.trim(); // Trim leading and trailing spaces
            // Replace multiple spaces with single space
            trimmedValue = trimmedValue.replace(/\s+/g, ' ');
          }

          if (trimmedValue !== value) {
            onChange(trimmedValue);
          }

          // Call the original onBlur
          onBlur();

          // Call custom onBlur if provided
          if (props.onBlur) {
            props.onBlur(event);
          }
        };

        const hasError = !!error || externalError;

        return (
          <div className="space-y-2">
            {label && (
              <Label htmlFor={inputId} className={hasError ? 'text-destructive' : ''}>
                {label}
              </Label>
            )}
            <Input
              id={inputId}
              onChange={e => {
                if (onCustomChange) {
                  onCustomChange(e);
                } else {
                  // Handle number inputs better
                  if (props.type === 'number') {
                    const value = e.target.value;
                    if (value === '') {
                      onChange(''); // Allow empty string temporarily
                    } else {
                      const numValue = parseFloat(value);
                      onChange(isNaN(numValue) ? '' : numValue);
                    }
                  } else {
                    onChange(e.target.value);
                  }
                }
              }}
              onBlur={handleBlur}
              value={value ?? ''}
              className={cn(
                hasError && 'border-destructive focus-visible:ring-destructive',
                className
              )}
              {...props}
            />
            {(error?.message || helperText) && (
              <p className={cn('text-sm', hasError ? 'text-destructive' : 'text-muted-foreground')}>
                {error?.message || helperText}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default RhfTextField;
