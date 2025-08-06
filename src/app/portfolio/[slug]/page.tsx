import { notFound } from "next/navigation";
import { getArtworkBySlug } from "@/data/artworks";
import ArtworkClient from "@/components/ArtworkClient";

interface ArtworkDetailProps {
    params: {
        slug: string;
    };
}

export default function ArtworkDetail({ params }: ArtworkDetailProps) {
    const artwork = getArtworkBySlug(params.slug);

    if (!artwork) {
        notFound();
    }

    return <ArtworkClient artwork={artwork} />;
}
