"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  Image as ImageIcon,
  Loader2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MediaUploadZone } from "@/components/admin/media/media-upload-zone";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteFile, setDeleteFile] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Load media files
  const loadFiles = useCallback(async () => {
    try {
      const response = await fetch("/api/media");
      if (!response.ok) throw new Error("Failed to load media");
      
      const data = await response.json();
      setFiles(data.files || []);
      setFilteredFiles(data.files || []);
    } catch (error) {
      toast.error("Failed to load media files");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  // Filter files based on search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredFiles(files);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredFiles(
        files.filter((file) =>
          file.name.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, files]);

  const handleUpload = async (uploadedFiles: File[]) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload files");

      toast.success(`${uploadedFiles.length} file(s) uploaded successfully`);
      await loadFiles();
    } catch (error) {
      toast.error("Failed to upload files");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteFile) return;

    try {
      const response = await fetch(`/api/media?url=${encodeURIComponent(deleteFile)}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete file");

      toast.success("File deleted successfully");
      await loadFiles();
    } catch (error) {
      toast.error("Failed to delete file");
      console.error(error);
    } finally {
      setDeleteFile(null);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <MediaUploadZone onUpload={handleUpload} isUploading={isUploading} />

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="pl-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <Badge variant="secondary">
          {filteredFiles.length} {filteredFiles.length === 1 ? "file" : "files"}
        </Badge>
      </div>

      {filteredFiles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="size-12 mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">
              {searchQuery ? "No files found" : "No media files yet"}
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFiles.map((file) => (
            <Card key={file.url} className="overflow-hidden group">
              <div className="aspect-video w-full overflow-hidden bg-muted relative">
                {file.type.startsWith("image/") ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <ImageIcon className="size-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => copyToClipboard(file.url)}
                  >
                    {copiedUrl === file.url ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteFile(file.url)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-medium truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteFile} onOpenChange={() => setDeleteFile(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete file?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the file
              from your media library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
