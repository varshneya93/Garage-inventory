"use client";

import { useState } from "react";
import { ProjectImage } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { X, GripVertical, Upload } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  images: ProjectImage[];
  onChange: (images: ProjectImage[]) => void;
}

export function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      const data = await response.json();
      const newImages = data.files.map((file: any, index: number) => ({
        id: `temp-${Date.now()}-${index}`,
        url: file.url,
        alt: file.name,
        sortOrder: images.length + index,
      }));

      onChange([...images, ...newImages]);
      toast.success("Images uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload images");
      console.error(error);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleUrlAdd = () => {
    const url = prompt("Enter image URL:");
    if (!url) return;

    const newImage = {
      id: `temp-${Date.now()}`,
      url,
      alt: "",
      sortOrder: images.length,
    } as ProjectImage;

    onChange([...images, newImage]);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const updateAlt = (index: number, alt: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], alt };
    onChange(updated);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...images];
    const draggedItem = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    onChange(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            disabled={isUploading}
            className="cursor-pointer"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleUrlAdd}
          disabled={isUploading}
        >
          Add URL
        </Button>
      </div>

      {images.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <Upload className="size-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No images uploaded yet. Upload files or add image URLs.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {images.map((image, index) => (
            <Card
              key={image.id || index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className="p-4 cursor-move"
            >
              <div className="flex gap-3">
                <div className="flex items-center">
                  <GripVertical className="size-5 text-muted-foreground" />
                </div>
                <div className="aspect-video w-24 overflow-hidden rounded bg-muted shrink-0">
                  <img
                    src={image.url}
                    alt={image.alt || ""}
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2 min-w-0">
                  <Input
                    value={image.alt || ""}
                    onChange={(e) => updateAlt(index, e.target.value)}
                    placeholder="Alt text"
                    className="h-8"
                  />
                  <p className="text-xs text-muted-foreground truncate">
                    {image.url}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImage(index)}
                  className="shrink-0"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
