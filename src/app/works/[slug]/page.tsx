import { notFound } from "next/navigation";
import { getArtworkBySlug } from "@/data/artworks";
import ArtworkClient from "@/components/ArtworkClient";

export default async function ArtworkDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const artwork = getArtworkBySlug(slug);

    if (!artwork) {
        notFound();
    }

    return <ArtworkClient artwork={artwork} />;
}
