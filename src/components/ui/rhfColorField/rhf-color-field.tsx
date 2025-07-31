"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface RhfColorFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    error?: boolean;
}

export const RhfColorField = React.forwardRef<
    HTMLInputElement,
    RhfColorFieldProps
>(({ label, helperText, error, className, id, placeholder, ...props }, ref) => {
    const inputId = id || props.name;

    return (
        <div className="space-y-2">
            {label && (
                <Label
                    htmlFor={inputId}
                    className={cn(error && "text-red-500")}
                >
                    {label}
                </Label>
            )}
            <div className="flex items-center gap-2">
                <div
                    className="w-10 h-10 rounded border border-input"
                    style={{
                        backgroundColor: `#${
                            props.value || placeholder || "ffffff"
                        }`,
                    }}
                />
                <Input
                    {...props}
                    ref={ref}
                    id={inputId}
                    placeholder={placeholder}
                    className={cn(
                        "flex-1",
                        error && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                    maxLength={6}
                    pattern="^[0-9a-fA-F]{6}$"
                />
            </div>
            {helperText && (
                <p
                    className={cn(
                        "text-sm",
                        error ? "text-red-500" : "text-muted-foreground"
                    )}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
});

RhfColorField.displayName = "RhfColorField";
