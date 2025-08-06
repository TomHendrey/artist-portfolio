export const getCloudinaryUrl = (
    imagePath: string,
    size: "thumbnail" | "medium" | "large" | "ultra" = "medium",
) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
        console.warn("Cloudinary cloud name not found");
        return imagePath;
    }

    const transforms = {
        thumbnail: "w_300,q_auto,f_auto",
        medium: "w_1200,q_auto,f_auto",
        large: "w_2400,q_90,f_auto",
        ultra: "",
    };

    // Clean the path - remove leading slash but keep version and extension
    const cleanPath = imagePath.replace(/^\//, "");

    // Return the full Cloudinary URL
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms[size]}/${cleanPath}`;
};
