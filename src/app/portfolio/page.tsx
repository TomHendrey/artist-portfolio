"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { artworks } from "@/data/artworks";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export default function Portfolio() {
    const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);
    const [filter, setFilter] = useState<string>("all");

    // Generate filters from artwork data
    const allYears = [...new Set(artworks.map((art) => art.year))].sort().reverse().map(String);
    const allCategories = [...new Set(artworks.map((art) => art.category).filter(Boolean))].map(
        String,
    );
    const allMediums = [...new Set(artworks.map((art) => art.medium.split(" ")[0].toLowerCase()))];

    const filters: string[] = ["all", ...allYears, ...allCategories, ...allMediums];

    const filteredArtworks = artworks.filter((artwork) => {
        if (filter === "all") return true;
        return (
            artwork.year === filter ||
            artwork.category === filter ||
            artwork.medium.toLowerCase().includes(filter.toLowerCase())
        );
    });

    const openLightbox = (id: number) => {
        setSelectedArtwork(id);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setSelectedArtwork(null);
        document.body.style.overflow = "unset";
    };

    const navigateLightbox = (direction: "prev" | "next") => {
        if (selectedArtwork === null) return;

        const currentIndex = filteredArtworks.findIndex((art) => art.id === selectedArtwork);
        let newIndex;

        if (direction === "prev") {
            newIndex = currentIndex > 0 ? currentIndex - 1 : filteredArtworks.length - 1;
        } else {
            newIndex = currentIndex < filteredArtworks.length - 1 ? currentIndex + 1 : 0;
        }

        setSelectedArtwork(filteredArtworks[newIndex].id);
    };

    const selectedArt = selectedArtwork ? artworks.find((art) => art.id === selectedArtwork) : null;

    return (
        <div className="pt-16 min-h-screen bg-white">
            {/* Simplified Header */}
            <div className="py-12 px-4">
                <div className="max-w-[1400px] mx-auto text-left">
                    <h1 className="text-2xl md:text-3xl font-light text-neutral-800 mb-4 ml-4">
                        Surfaces
                    </h1>
                    <p
                        className="text-base  text-neutral-600 max-w-2xl ml-4"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        Studies from the surface of Mars
                    </p>
                </div>
            </div>

            {/* Gallery Grid with Increased Row Spacing */}
            <div className="py-4 px-4 max-w-[1400px] mx-auto pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-32">
                    {filteredArtworks.map((artwork) => (
                        <div key={artwork.id} className="group">
                            {/* Link to individual artwork page */}
                            <Link href={`/portfolio/${artwork.slug}`} className="block">
                                <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-neutral-100">
                                    <Image
                                        src={getCloudinaryUrl(artwork.images.main, "medium")}
                                        alt={artwork.title}
                                        fill
                                        className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={artwork.id <= 6}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                </div>
                            </Link>

                            <div className="space-y-1 pb-22 md:pb-0 mt-6">
                                <Link href={`/portfolio/${artwork.slug}`}>
                                    <h3 className="text-base pb-2 font-light text-neutral-800 hover:text-neutral-600 transition-colors">
                                        {artwork.title}
                                    </h3>
                                </Link>
                                <p
                                    className="text-sm text-neutral-600"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    {artwork.medium}
                                </p>

                                <p
                                    className="text-sm text-neutral-500"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    {artwork.dimensions}
                                </p>
                                <p
                                    className="text-sm text-neutral-600"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    {artwork.year}{" "}
                                </p>
                            </div>

                            {/* Quick view button - Desktop only */}
                            {/* <button */}
                            {/*     onClick={() => openLightbox(artwork.id)} */}
                            {/*     className="hidden lg:pb-4 md:block mt-2 text-xs text-neutral-500 hover:text-neutral-700 transition-colors" */}
                            {/*     style={{ fontFamily: "Courier New, monospace" }} */}
                            {/* > */}
                            {/*     Quick View */}
                            {/* </button> */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedArtwork && selectedArt && (
                <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-4">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-8 text-neutral-400 hover:text-neutral-800 z-10"
                        aria-label="Close"
                    >
                        <X size={40} strokeWidth={1} />
                    </button>

                    <button
                        onClick={() => navigateLightbox("prev")}
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 transition-colors z-10"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={40} strokeWidth={1} />
                    </button>

                    <button
                        onClick={() => navigateLightbox("next")}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 transition-colors z-10"
                        aria-label="Next"
                    >
                        <ChevronRight size={40} strokeWidth={1} />
                    </button>

                    <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-8">
                        {/* Image container */}
                        <div className="flex-1 relative flex items-center justify-center max-h-[90vh]">
                            <Image
                                src={getCloudinaryUrl(selectedArt.images.main, "large")}
                                alt={selectedArt.title}
                                width={1200}
                                height={1500}
                                className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
                            />
                        </div>

                        {/* Details sidebar */}
                        <div className="lg:w-80 space-y-4">
                            <h2
                                className="text-2xl font-light text-neutral-800"
                                style={{
                                    fontFamily:
                                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                                }}
                            >
                                {selectedArt.title}
                            </h2>
                            <div style={{ fontFamily: "Courier New, monospace" }}>
                                <p className="text-neutral-600">{selectedArt.year}</p>
                                <p className="text-neutral-600">{selectedArt.medium}</p>
                                <p className="text-neutral-600">{selectedArt.dimensions}</p>
                                {selectedArt.description && (
                                    <p className="text-sm text-neutral-600 leading-relaxed">
                                        {selectedArt.description}
                                    </p>
                                )}
                            </div>

                            <Link
                                href={`/portfolio/${selectedArt.slug}`}
                                className="inline-block mt-4 text-sm text-neutral-800 hover:text-neutral-600 border-b border-neutral-800"
                                style={{ fontFamily: "Courier New, monospace" }}
                                onClick={closeLightbox}
                            >
                                View Full Details
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
