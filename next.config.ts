import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* Image configuration for Cloudinary */
    images: {
        unoptimized: true, // Add this line

        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**", // Allow all paths from Cloudinary
            },
        ],
        // Optimize for your Cloudinary setup
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
};

export default nextConfig;
