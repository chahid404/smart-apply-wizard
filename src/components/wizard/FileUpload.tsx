/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { ResumeData } from "@/types/resume";
import { generateMockResumeData } from "@/utils/mockResumeData";
import { motion } from "framer-motion";
import { File, ScanSearch, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import StatusAlert from "../ui/StatusAlert";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onResumeDataExtracted: (data: ResumeData) => void;
  selectedFile: File | null;
}

export const FileUpload = ({ onFileSelect, onResumeDataExtracted, selectedFile }: FileUploadProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanSuccess, setScanSuccess] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileSelect(file);
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
              // Generate and save mock data
              const mockData = generateMockResumeData();
              localStorage.setItem("resumeData", JSON.stringify(mockData));
              onResumeDataExtracted(mockData);
              setScanSuccess(true);
            }, 500);
          }
        }, 50);
      }
    },
    [onFileSelect, onResumeDataExtracted]
  );
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
            <button
              onClick={() => {
                onFileSelect(null as any);
                setScanSuccess(null);
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-300"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}
      {isScanning && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-6 border rounded-lg bg-white space-y-4">
          <div className="flex items-center space-x-3">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
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
          <div className="text-xs text-gray-500 text-center">Analyzing skills, experience, and qualifications...</div>
        </motion.div>
      )}
      <StatusAlert status={scanSuccess} successMessage="Resume scanned successfully!" errorMessage="Resume scan failed. Please try again." />
    </div>
  );
};
