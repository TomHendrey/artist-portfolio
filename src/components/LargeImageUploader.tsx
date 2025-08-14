"use client";

import React, { useState, useCallback } from "react";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import {
    uploadLargeImageToCloudinary,
    validateImageFile,
    formatFileSize,
} from "@/lib/cloudinary-upload";

interface UploadResult {
    public_id: string;
    url: string;
    secure_url: string;
    width: number;
    height: number;
    bytes: number;
}

interface LargeImageUploaderProps {
    onUploadComplete?: (result: UploadResult) => void;
    onUploadError?: (error: string) => void;
    folder?: string;
    className?: string;
}

export default function LargeImageUploader({
    onUploadComplete,
    onUploadError,
    folder = "artworks",
    className = "",
}: LargeImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
    const [error, setError] = useState<string>("");

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelection(files[0]);
        }
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelection(files[0]);
        }
    };

    const handleFileSelection = (file: File) => {
        setError("");
        setUploadResult(null);

        const validation = validateImageFile(file);
        if (!validation.valid) {
            setError(validation.error || "Invalid file");
            return;
        }

        setSelectedFile(file);
    };

    const startUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadProgress(0);
        setError("");

        try {
            const result = await uploadLargeImageToCloudinary(selectedFile, {
                folder,
                onProgress: setUploadProgress,
            });

            setUploadResult(result);
            onUploadComplete?.(result);

            // Clear the selected file after successful upload
            setSelectedFile(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Upload failed";
            setError(errorMessage);
            onUploadError?.(errorMessage);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const clearSelection = () => {
        setSelectedFile(null);
        setError("");
        setUploadResult(null);
    };

    return (
        <div className={`w-full max-w-2xl mx-auto ${className}`}>
            {/* Drop Zone */}
            {!selectedFile && !uploadResult && (
                <div
                    className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${
                isDragging
                    ? "border-blue-400 bg-blue-50"
                    : "border-neutral-300 hover:border-neutral-400"
            }
          `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-input")?.click()}
                >
                    <Upload className="mx-auto mb-4 text-neutral-400" size={48} />
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                        Upload Large Composite Image
                    </h3>
                    <p className="text-neutral-500 mb-4">
                        Drag and drop your image here, or click to browse
                    </p>
                    <p className="text-sm text-neutral-400">
                        Supports JPEG, PNG, WebP • Up to 100MB
                    </p>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                    />
                </div>
            )}

            {/* File Selected */}
            {selectedFile && !isUploading && !uploadResult && (
                <div className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="font-medium text-neutral-700">{selectedFile.name}</h4>
                            <p className="text-sm text-neutral-500">
                                {formatFileSize(selectedFile.size)}
                            </p>
                        </div>
                        <button
                            onClick={clearSelection}
                            className="text-neutral-400 hover:text-neutral-600"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={startUpload}
                            className="flex-1 bg-neutral-800 text-white px-4 py-2 rounded hover:bg-neutral-700 transition-colors"
                        >
                            Upload Image
                        </button>
                        <button
                            onClick={clearSelection}
                            className="px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Uploading */}
            {isUploading && (
                <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-neutral-300 border-t-neutral-600"></div>
                        <span className="font-medium">Uploading {selectedFile?.name}...</span>
                    </div>

                    <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div
                            className="bg-neutral-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>

                    <p className="text-sm text-neutral-500 mt-2">{uploadProgress}% complete</p>
                </div>
            )}

            {/* Upload Success */}
            {uploadResult && (
                <div className="border border-green-200 bg-green-50 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="text-green-600" size={24} />
                        <span className="font-medium text-green-800">Upload Successful!</span>
                    </div>

                    <div className="text-sm text-green-700 space-y-1">
                        <p>
                            <strong>Public ID:</strong> {uploadResult.public_id}
                        </p>
                        <p>
                            <strong>Dimensions:</strong> {uploadResult.width} ×{" "}
                            {uploadResult.height}px
                        </p>
                        <p>
                            <strong>Size:</strong> {formatFileSize(uploadResult.bytes)}
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setUploadResult(null);
                            setSelectedFile(null);
                        }}
                        className="mt-4 text-sm text-green-600 hover:text-green-800 underline"
                    >
                        Upload Another Image
                    </button>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="border border-red-200 bg-red-50 rounded-lg p-4 flex items-center gap-3">
                    <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                    <span className="text-red-700">{error}</span>
                </div>
            )}
        </div>
    );
}
