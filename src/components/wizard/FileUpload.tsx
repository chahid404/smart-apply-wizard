import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Upload, File, X, ScanSearch, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export const FileUpload = ({ onFileSelect, selectedFile }: FileUploadProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setTempFile(acceptedFiles[0]);
        setShowConfirmDialog(true);
      }
    },
    []
  );

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    if (tempFile) {
      onFileSelect(tempFile);
      setIsScanning(true);
      // Simulate scanning progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setScanProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
          }, 500);
        }
      }, 50);
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setTempFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full space-y-4">
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
            <button onClick={() => onFileSelect(null as any)} className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-300">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {isScanning && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-6 border rounded-lg bg-white space-y-4"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <ScanSearch className="w-6 h-6 text-navy" />
            </motion.div>
            <span className="text-sm font-medium text-gray-700">Scanning your resume...</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-navy rounded-full h-2"
              initial={{ width: "0%" }}
              animate={{ width: `${scanProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="text-xs text-gray-500 text-center">
            Analyzing skills, experience, and qualifications...
          </div>
        </motion.div>
      )}

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Resume Upload</DialogTitle>
            <DialogDescription>
              Are you sure you want to upload {tempFile?.name}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <File className="w-6 h-6 text-navy" />
            <div>
              <p className="text-sm font-medium text-gray-700">{tempFile?.name}</p>
              <p className="text-xs text-gray-400">{tempFile && (tempFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleConfirm} className="bg-navy hover:bg-navy-light">
              <Check className="w-4 h-4 mr-2" />
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};