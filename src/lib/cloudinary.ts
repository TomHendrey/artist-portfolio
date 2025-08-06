export const getCloudinaryUrl = (
    imagePath: string,
    size: "thumbnail" | "medium" | "large" | "ultra" = "medium",
) => {
    console.log("Process.env keys:", Object.keys(process.env));
    console.log("Cloudinary env var directly:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    console.log("Type of env var:", typeof process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    console.log("Input imagePath:", imagePath);
    console.log("Cloud name:", cloudName);

    if (!cloudName) {
        console.warn("Cloudinary cloud name not found");
        return imagePath;
    }

    const transforms = {
        thumbnail: "w_300,q_auto,f_auto",
        medium: "w_1200,q_auto,f_auto",
        large: "w_2400,q_90,f_auto",
        ultra: "f_auto",
    };

    const cleanPath = imagePath.replace(/^\//, "");
    const finalUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${transforms[size]}/${cleanPath}`;

    console.log("Final generated URL:", finalUrl);

    return finalUrl;
};
