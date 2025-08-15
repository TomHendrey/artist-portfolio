import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        console.log("🔧 API Route called - checking environment variables...");
        console.log("Cloud name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
        console.log("API key:", process.env.CLOUDINARY_API_KEY ? "✅ Set" : "❌ Missing");
        console.log("API secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Set" : "❌ Missing");

        // Check if required environment variables are present
        if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error("❌ Missing required environment variables");
            return Response.json({ error: "Missing Cloudinary credentials" }, { status: 500 });
        }

        const body = await request.json();
        const { timestamp, folder = "artworks" } = body;
        console.log("📝 Request body:", { timestamp, folder });

        // Create the signature using Cloudinary's utility
        // Important: Only include parameters that will be sent to Cloudinary
        const params_to_sign = {
            timestamp: timestamp,
            folder: folder,
        };

        console.log("📝 Parameters being signed:", params_to_sign);

        const signature = cloudinary.utils.api_sign_request(
            params_to_sign,
            process.env.CLOUDINARY_API_SECRET!,
        );

        console.log("✅ Signature generated successfully");

        return Response.json({
            signature,
            timestamp,
            api_key: process.env.CLOUDINARY_API_KEY,
            folder,
        });
    } catch (error) {
        console.error("❌ Error generating signature:", error);
        return Response.json({ error: "Failed to generate signature" }, { status: 500 });
    }
}
