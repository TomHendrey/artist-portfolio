// components/DirectBlobUploader.tsx
"use client";

import React, { useState, useCallback } from "react";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { put } from "@vercel/blob";

// Helper function to format file sizes
function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

interface UploadResult {
    url: string;
    filename: string;
    size: number;
    folder: string;
}

interface DirectBlobUploaderProps {
    onUploadComplete?: (result: UploadResult) => void;
    onUploadError?: (error: string) => void;
    folder?: string;
    className?: string;
}

export default function DirectBlobUploader({
    onUploadComplete,
    onUploadError,
    folder = "high-res",
    className = "",
}: DirectBlobUploaderProps) {
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

        // Allow large files for direct Vercel Blob upload
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            setError("Please select a valid image file (JPEG, PNG, or WebP)");
            return;
        }

        setSelectedFile(file);
    };

    const startUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setError("");
        setUploadProgress(0);

        try {
            const token = process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN;

            if (!token) {
                throw new Error("Blob storage token not configured");
            }

            console.log(
                `📤 Starting direct upload of ${selectedFile.name} (${formatFileSize(selectedFile.size)})`,
            );

            // Direct upload to Vercel Blob (bypasses API entirely)
            const blob = await put(`${folder}/${selectedFile.name}`, selectedFile, {
                access: "public",
                token: token,
                onUploadProgress: (progress) => {
                    const percentage = Math.round((progress.loaded / progress.total) * 100);
                    setUploadProgress(percentage);
                    console.log(`📊 Upload progress: ${percentage}%`);
                },
            });

            console.log("✅ Direct upload successful:", blob.url);

            const result = {
                url: blob.url,
                filename: selectedFile.name,
                size: selectedFile.size,
                folder: folder,
            };

            setUploadResult(result);
            onUploadComplete?.(result);
            setSelectedFile(null);
        } catch (err) {
            console.error("❌ Direct upload failed:", err);
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
                    onClick={() => document.getElementById("direct-blob-file-input")?.click()}
                >
                    <Upload className="mx-auto mb-4 text-neutral-400" size={48} />
                    <h3 className="text-lg font-medium text-neutral-700 mb-2">
                        Direct Upload to Vercel Blob
                    </h3>
                    <p className="text-neutral-500 mb-4">
                        Drag and drop your large composite images here, or click to browse
                    </p>
                    <p className="text-sm text-neutral-400">
                        Supports JPEG, PNG, WebP • No size limits! (Direct upload)
                    </p>
                    <input
                        id="direct-blob-file-input"
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
                            Direct Upload to Blob
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
                        <span className="font-medium">Uploading directly to Vercel Blob...</span>
                    </div>

                    <div className="w-full bg-neutral-200 rounded-full h-2 mb-2">
                        <div
                            className="bg-neutral-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>

                    <p className="text-sm text-neutral-500">
                        {uploadProgress}% complete • Direct upload (no API limits)
                    </p>
                </div>
            )}

            {/* Upload Success */}
            {uploadResult && (
                <div className="border border-green-200 bg-green-50 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="text-green-600" size={24} />
                        <span className="font-medium text-green-800">
                            Direct Upload Successful!
                        </span>
                    </div>

                    <div className="text-sm text-green-700 space-y-1">
                        <p>
                            <strong>File:</strong> {uploadResult.filename}
                        </p>
                        <p>
                            <strong>Size:</strong> {formatFileSize(uploadResult.size)}
                        </p>
                        <p>
                            <strong>URL:</strong>{" "}
                            <a
                                href={uploadResult.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline break-all"
                            >
                                {uploadResult.url}
                            </a>
                        </p>
                    </div>

                    <div className="mt-4 p-3 bg-white rounded border text-xs">
                        <p className="font-medium mb-1">Add to your artwork data:</p>
                        <code className="text-green-800 break-all">
                            details: [&quot;{uploadResult.url}&quot;]
                        </code>
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
