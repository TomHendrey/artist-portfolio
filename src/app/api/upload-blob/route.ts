import { put } from "@vercel/blob";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const folder = (formData.get("folder") as string) || "high-res";

        if (!file) {
            return Response.json({ error: "No file provided" }, { status: 400 });
        }

        console.log(
            `📤 Uploading ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB) to Vercel Blob...`,
        );

        // Upload to Vercel Blob
        const blob = await put(`${folder}/${file.name}`, file, {
            access: "public", // Makes it accessible via direct URL
        });

        console.log(`✅ Upload successful: ${blob.url}`);

        return Response.json({
            success: true,
            url: blob.url,
            filename: file.name,
            size: file.size,
            folder: folder,
        });
    } catch (error) {
        console.error("❌ Upload failed:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return Response.json({ error: "Upload failed", details: errorMessage }, { status: 500 });
    }
}
