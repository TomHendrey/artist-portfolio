export const getCloudinaryUrl = (
    imagePath: string,
    size: "thumbnail" | "medium" | "large" | "ultra" = "medium",
) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
        console.warn("Cloudinary cloud name not found");
        return imagePath; // fallback to original path
    }

    const transforms = {
        thumbnail: "w_300,q_auto,f_auto",
        medium: "w_1200,q_auto,f_auto",
        large: "w_2400,q_90,f_auto",
        ultra: "", // Original size, optimized quality
    };

    // Remove any leading slash and file extension from imagePath
    const cleanPath = imagePath.replace(/^\//, "").replace(/\.[^/.]+$/, "");

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms[size]}/${cleanPath}`;
};

// Helper to get multiple sizes for responsive images
export const getResponsiveCloudinaryUrls = (imagePath: string) => {
    return {
        thumbnail: getCloudinaryUrl(imagePath, "thumbnail"),
        medium: getCloudinaryUrl(imagePath, "medium"),
        large: getCloudinaryUrl(imagePath, "large"),
        ultra: getCloudinaryUrl(imagePath, "ultra"),
    };
};
