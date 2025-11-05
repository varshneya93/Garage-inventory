"use client";

import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaUploadZoneProps {
  onUpload: (files: File[]) => void;
  isUploading: boolean;
}

export function MediaUploadZone({ onUpload, isUploading }: MediaUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (files.length > 0) {
        onUpload(files);
      }
    },
    [onUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onUpload(Array.from(files));
      }
      e.target.value = "";
    },
    [onUpload]
  );

  return (
    <Card
      className={cn(
        "border-2 border-dashed transition-colors",
        isDragging && "border-primary bg-primary/5",
        isUploading && "opacity-50 pointer-events-none"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center py-12">
        {isUploading ? (
          <>
            <Loader2 className="size-12 mb-4 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Uploading files...</p>
          </>
        ) : (
          <>
            <Upload className="size-12 mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-2">
              Drag and drop images here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports: JPG, PNG, GIF, WebP
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInput}
                className="hidden"
                disabled={isUploading}
              />
              <span className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Choose Files
              </span>
            </label>
          </>
        )}
      </CardContent>
    </Card>
  );
}
