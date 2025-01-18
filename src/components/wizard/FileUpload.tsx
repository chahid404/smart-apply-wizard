import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Upload, File, X } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export const FileUpload = ({ onFileSelect, selectedFile }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-colors duration-300 cursor-pointer",
            isDragActive ? "border-mint bg-mint/10" : "border-gray-200 hover:border-mint"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center text-center">
            <Upload className={cn("w-12 h-12 mb-4 transition-colors duration-300", isDragActive ? "text-mint" : "text-gray-400")} />
            <p className="text-sm text-gray-600 mb-2">{isDragActive ? "Drop your resume here" : "Drag & drop your resume here"}</p>
            <p className="text-xs text-gray-400">Supports only PDF files</p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="w-6 h-6 text-navy" />
              <div>
                <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
                <p className="text-xs text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <button onClick={() => onFileSelect(null as any)} className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-300">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
