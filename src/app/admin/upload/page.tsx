"use client";

import LargeImageUploader from "@/components/LargeImageUploader";
import { useState } from "react";

interface UploadedImage {
    public_id: string;
    url: string;
    width: number;
    height: number;
    bytes: number;
}

export default function UploadTestPage() {
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

    const handleUploadComplete = (result: UploadedImage) => {
        console.log("Upload complete:", result);
        setUploadedImages((prev) => [...prev, result]);

        // Here you could also:
        // 1. Update your artworks data
        // 2. Save to a database
        // 3. Add to your local data files
    };

    const handleUploadError = (error: string) => {
        console.error("Upload error:", error);
        // Handle error (show toast, etc.)
    };

    return (
        <div className="min-h-screen bg-neutral-50 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-light text-neutral-800 mb-8 text-center">
                    Upload Large Composite Images
                </h1>

                <LargeImageUploader
                    onUploadComplete={handleUploadComplete}
                    onUploadError={handleUploadError}
                    folder="composite-details" // Organize your uploads
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
                                    <img
                                        src={image.url}
                                        alt={`Upload ${index + 1}`}
                                        className="w-full h-48 object-cover rounded mb-3"
                                    />
                                    <div className="text-sm text-neutral-600 space-y-1">
                                        <p>
                                            <strong>Public ID:</strong> {image.public_id}
                                        </p>
                                        <p>
                                            <strong>Dimensions:</strong> {image.width} ×{" "}
                                            {image.height}px
                                        </p>
                                        <p>
                                            <strong>Size:</strong>{" "}
                                            {(image.bytes / (1024 * 1024)).toFixed(2)} MB
                                        </p>
                                    </div>

                                    {/* Copy public_id for easy use in your artwork data */}
                                    <button
                                        onClick={() =>
                                            navigator.clipboard.writeText(image.public_id)
                                        }
                                        className="mt-2 text-xs bg-neutral-100 hover:bg-neutral-200 px-2 py-1 rounded"
                                    >
                                        Copy Public ID
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
