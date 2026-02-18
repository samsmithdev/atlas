"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, File as FileIcon, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { generateUploadUrl, createAsset } from "@/actions/storage"; // Import your actions

interface UploadPaneProps {
  onUploadComplete?: (asset: any) => void; // Callback when done
  projectId?: string; // Optional context
  className?: string;
}

export function UploadPane({ onUploadComplete, projectId, className }: UploadPaneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

  // 1. Handle File Selection
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFile(acceptedFiles[0]); // Just handling single file for now
      setStatus("idle");
      setProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    maxFiles: 1 
  });

  // 2. The Upload Logic
  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");

    try {
      // A. Get Presigned URL from Server
      const { success, data, error } = await generateUploadUrl(file.name, file.type);
      
      if (!success || !data) throw new Error(error || "Failed to get upload URL");

      // B. Upload directly to Minio (Browser -> Unraid)
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", data.url, true);
      xhr.setRequestHeader("Content-Type", file.type);

      // Track progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(percentComplete);
        }
      };

      // Wrap XHR in promise
      await new Promise<void>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) resolve();
          else reject(new Error("Upload failed"));
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(file);
      });

      // C. Save Metadata to DB
      const newAsset = await createAsset({
        name: data.originalName,
        objectName: data.objectName,
        mimeType: data.mimeType,
        size: file.size,
        bucket: "jarvis-assets", // Or from env
        projectId
      });

      setStatus("success");
      if (onUploadComplete) onUploadComplete(newAsset);

    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  // 3. Render
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      {/* If no file selected, show Dropzone */}
      {!file && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
            isDragActive 
              ? "border-primary bg-primary/10" 
              : "border-muted-foreground/25 hover:border-primary/50"
          )}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Audio, Video, PDF, or Images (Max 1GB)
          </p>
        </div>
      )}

      {/* If file selected, show Preview Pane */}
      {file && (
        <Card className="p-4 relative overflow-hidden">
          <div className="flex items-center space-x-4">
            <div className="bg-muted p-2 rounded">
              <FileIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            
            {status === "idle" && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Progress Bar */}
          {status === "uploading" && (
            <div className="mt-4 space-y-1">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-right text-muted-foreground">
                {Math.round(progress)}%
              </p>
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="mt-4 flex items-center text-green-500 text-sm font-medium">
              <CheckCircle className="h-4 w-4 mr-2" />
              Upload Complete
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="mt-4 flex items-center text-red-500 text-sm font-medium">
              <AlertCircle className="h-4 w-4 mr-2" />
              Upload Failed
            </div>
          )}

          {/* Action Buttons */}
          {status === "idle" && (
            <div className="mt-4 flex justify-end">
              <Button onClick={handleUpload} size="sm">
                Start Upload
              </Button>
            </div>
          )}
          
          {/* Reset Button (after success/error) */}
          {(status === "success" || status === "error") && (
            <div className="mt-4 flex justify-end">
               <Button 
                variant="outline" 
                size="sm"
                onClick={() => { setFile(null); setStatus("idle"); }}
              >
                Upload Another
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}