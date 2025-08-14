interface UploadOptions {
    folder?: string;
    onProgress?: (progress: number) => void;
}

interface CloudinaryUploadResponse {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    bytes: number;
    type: string;
    url: string;
    secure_url: string;
}

export async function uploadLargeImageToCloudinary(
    file: File,
    options: UploadOptions = {},
): Promise<CloudinaryUploadResponse> {
    const { folder = "artworks", onProgress } = options;

    try {
        // Step 1: Get signature from our API
        const timestamp = Math.round(new Date().getTime() / 1000);

        const signatureResponse = await fetch("/api/cloudinary-signature", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ timestamp, folder }),
        });

        if (!signatureResponse.ok) {
            throw new Error("Failed to get upload signature");
        }

        const { signature, api_key } = await signatureResponse.json();

        // Step 2: Prepare form data for upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);
        formData.append("api_key", api_key);
        formData.append("folder", folder);

        // Step 3: Upload to Cloudinary with progress tracking
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

        if (!cloudName) {
            throw new Error("Cloudinary cloud name not configured");
        }

        const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            },
        );

        if (!uploadResponse.ok) {
            const errorData = await uploadResponse.text();
            throw new Error(`Upload failed: ${errorData}`);
        }

        const result = await uploadResponse.json();

        if (result.error) {
            throw new Error(result.error.message);
        }

        return result;
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}

// Helper function to format file sizes
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Helper function to validate file before upload
export function validateImageFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: "Please select a valid image file (JPEG, PNG, or WebP)",
        };
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: `File size (${formatFileSize(file.size)}) exceeds 100MB limit`,
        };
    }

    return { valid: true };
}
