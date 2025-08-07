'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Upload, Loader2, Clock, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { HTML_ACCEPT_STRING, SUPPORTED_FORMATS_DISPLAY } from '@/constants/file-validation';

export interface FileValidationError {
  file: string;
  error: string;
}

export interface ImageUploadZoneProps {
  // File handling
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number; // in MB
  maxFiles?: number;

  // UI customization
  title?: string;
  subtitle?: string;
  supportedFormats?: string;
  className?: string;
  disabled?: boolean;

  // Loading states
  isProcessing?: boolean;
  processingText?: string;
  progress?: number;
  estimatedTime?: number;

  // Validation
  validationErrors?: FileValidationError[];

  // Drag and drop
  enableDragDrop?: boolean;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  onFilesSelected,
  accept = HTML_ACCEPT_STRING,
  multiple = false,
  maxFileSize = 50,
  maxFiles,
  title,
  subtitle,
  supportedFormats,
  className,
  disabled = false,
  isProcessing = false,
  processingText = 'Processing...',
  progress,
  estimatedTime,
  validationErrors = [],
  enableDragDrop = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Default texts based on multiple prop
  const defaultTitle = multiple
    ? `Drop your images here, or browse files`
    : `Click to upload an image`;

  const defaultSubtitle = multiple
    ? `Supports ${supportedFormats || SUPPORTED_FORMATS_DISPLAY} • Max size: ${maxFileSize}MB per file`
    : `${supportedFormats || SUPPORTED_FORMATS_DISPLAY} up to ${maxFileSize}MB`;

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      if (!enableDragDrop || disabled) return;
      e.preventDefault();
      setIsDragOver(true);
    },
    [enableDragDrop, disabled]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      if (!enableDragDrop || disabled) return;
      e.preventDefault();
      setIsDragOver(false);
    },
    [enableDragDrop, disabled]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      if (!enableDragDrop || disabled) return;
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        const validFiles = multiple ? files : [files[0]];
        if (maxFiles && validFiles.length > maxFiles) {
          validFiles.splice(maxFiles);
        }
        onFilesSelected(validFiles);
      }
    },
    [enableDragDrop, disabled, multiple, maxFiles, onFilesSelected]
  );

  const handleBrowseFiles = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        onFilesSelected(files);
      }
      // Reset input value to allow selecting the same file again
      e.target.value = '';
    },
    [onFilesSelected]
  );

  const dragProps = enableDragDrop
    ? {
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
      }
    : {};

  return (
    <div className="space-y-4">
      <div
        className={cn(
          `relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer`,
          isDragOver && enableDragDrop
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-gray-400',
          disabled && 'opacity-50 cursor-not-allowed',
          !multiple && 'p-6', // Smaller padding for single file upload
          className
        )}
        onClick={handleBrowseFiles}
        {...dragProps}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        <div className="space-y-4">
          <Upload
            className={cn('mx-auto text-muted-foreground', multiple ? 'h-12 w-12' : 'h-8 w-8')}
          />

          <div>
            {multiple ? (
              <p className="text-lg font-medium">
                {title || 'Drop your images here, or'}{' '}
                <button
                  onClick={handleBrowseFiles}
                  className="text-primary hover:underline font-semibold"
                  disabled={disabled}
                  type="button"
                >
                  browse files
                </button>
              </p>
            ) : (
              <p className={cn('font-medium', multiple ? 'text-lg' : 'text-sm')}>
                {title || defaultTitle}
              </p>
            )}
            <p className={cn('text-gray-500 mt-1', multiple ? 'text-sm' : 'text-xs')}>
              {subtitle || defaultSubtitle}
            </p>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">{processingText}</span>
              </div>
              {progress !== undefined && progress > 0 && (
                <div className="space-y-1">
                  <Progress value={progress} className="w-full max-w-xs mx-auto" />
                  {estimatedTime !== undefined && estimatedTime > 0 && (
                    <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Est. {Math.ceil(estimatedTime)}s remaining</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <div className="font-medium">Some files could not be processed:</div>
              {validationErrors.slice(0, 3).map((error, index) => (
                <div key={index} className="text-sm">
                  • {error.file}: {error.error}
                </div>
              ))}
              {validationErrors.length > 3 && (
                <div className="text-sm text-muted-foreground">
                  ...and {validationErrors.length - 3} more files
                </div>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
