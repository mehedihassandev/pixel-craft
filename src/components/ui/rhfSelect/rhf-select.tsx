'use client';

import React from 'react';
import { Control, Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Define the option type for select items
export interface SelectOption {
  value: string;
  label: string;
}

// Create a generic type for the RhfSelect component
type RhfSelectProps<T extends FieldValues> = {
  control: Control<T>;
  options: SelectOption[];
  label?: string;
  helperText?: string;
  error?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
} & Omit<ControllerProps<T>, 'render' | 'control'>;

export const RhfSelect = <T extends FieldValues>({
  control,
  options,
  label,
  helperText,
  error: externalError,
  placeholder = 'Select an option',
  className,
  id,
  ...props
}: RhfSelectProps<T>) => {
  const selectId = id || String(props.name);

  return (
    <Controller
      control={control}
      {...props}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const hasError = !!error || externalError;

        return (
          <div className="space-y-2">
            {label && (
              <Label htmlFor={selectId} className={hasError ? 'text-destructive' : ''}>
                {label}
              </Label>
            )}
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger
                id={selectId}
                className={cn(
                  'w-full',
                  hasError && 'border-destructive focus:ring-destructive',
                  className
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export default RhfSelect;
