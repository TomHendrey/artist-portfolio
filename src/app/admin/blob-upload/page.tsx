"use client";

import BlobImageUploader from "@/components/BlobImageUploader";
import Image from "next/image";
import { useState } from "react";

interface UploadedImage {
    url: string;
    filename: string;
    size: number;
    folder: string;
}

export default function BlobUploadPage() {
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

    const handleUploadComplete = (result: UploadedImage) => {
        console.log("Blob upload complete:", result);
        setUploadedImages((prev) => [...prev, result]);
    };

    const handleUploadError = (error: string) => {
        console.error("Blob upload error:", error);
    };

    return (
        <div className="min-h-screen bg-neutral-50 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-light text-neutral-800 mb-8 text-center">
                    Upload High-Resolution Images to Vercel Blob
                </h1>

                <BlobImageUploader
                    onUploadComplete={handleUploadComplete}
                    onUploadError={handleUploadError}
                    folder="composite-details"
                    className="mb-12"
                />

                {/* Show recently uploaded images */}
                {uploadedImages.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-light text-neutral-700 mb-6">
                            Recently Uploaded ({uploadedImages.length})
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {uploadedImages.map((image, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg border">
                                    <div className="relative w-full h-48 rounded mb-3 overflow-hidden">
                                        <Image
                                            src={image.url}
                                            alt={`Upload ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="text-sm text-neutral-600 space-y-1">
                                        <p>
                                            <strong>File:</strong> {image.filename}
                                        </p>
                                        <p>
                                            <strong>Size:</strong>{" "}
                                            {(image.size / (1024 * 1024)).toFixed(2)} MB
                                        </p>
                                        <p>
                                            <strong>URL:</strong>{" "}
                                            <a
                                                href={image.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline break-all"
                                            >
                                                {image.url}
                                            </a>
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => navigator.clipboard.writeText(image.url)}
                                        className="mt-2 text-xs bg-neutral-100 hover:bg-neutral-200 px-2 py-1 rounded"
                                    >
                                        Copy URL
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
