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
            {/* Header */}
            <div className="py-14 px-4 bg-neutral-50">
                <div className="max-w-7xl mx-auto text-left">
                    <div className="ml-4">
                        <h1 className="text-4xl md:text-5xl font-light mb-4 text-neutral-800">
                            Works
                        </h1>
                        <p
                            className="text-lg text-neutral-600 max-w-2xl"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            A collection of recent works exploring the use of technology, and the
                            transformation of data in contemporary painting.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter Buttons */}
            {/* <div className="py-8 px-4 border-neutral-200"> */}
            {/*     <div className="max-w-7xl mx-auto"> */}
            {/*         <div className="flex flex-wrap gap-4 ml-4"> */}
            {/*             {filters.map((filterOption) => ( */}
            {/*                 <button */}
            {/*                     key={filterOption} */}
            {/*                     onClick={() => setFilter(filterOption)} */}
            {/*                     className={`px-4 py-2 text-sm font-light transition-colors duration-200 ${ */}
            {/*                         filter === filterOption */}
            {/*                             ? "bg-neutral-800 text-white" */}
            {/*                             : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200" */}
            {/*                     }`} */}
            {/*                 > */}
            {/*                     {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)} */}
            {/*                 </button> */}
            {/*             ))} */}
            {/*         </div> */}
            {/*     </div> */}
            {/* </div> */}
            {/**/}
            {/* Gallery Grid */}
            <div className="py-12 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArtworks.map((artwork) => (
                        <div key={artwork.id} className="group">
                            {/* Link to individual artwork page */}
                            <Link href={`/portfolio/${artwork.slug}`} className="block">
                                <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-neutral-100">
                                    <Image
                                        src={getCloudinaryUrl(artwork.images.main, "medium")}
                                        alt={artwork.title}
                                        fill
                                        className="object-cover  group-hover:scale-105 transition-transform duration-500 "
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={artwork.id <= 6} // Prioritize first 6 images
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                </div>
                            </Link>

                            <div className="space-y-1">
                                <Link href={`/portfolio/${artwork.slug}`}>
                                    <h3 className="text-lg font-light text-neutral-800 hover:text-neutral-600 transition-colors">
                                        {artwork.title}
                                    </h3>
                                </Link>
                                <p className="text-sm text-neutral-600">
                                    {artwork.year} • {artwork.medium}
                                </p>
                                <p className="text-sm text-neutral-500">{artwork.dimensions}</p>
                            </div>

                            {/* Quick view button */}
                            <button
                                onClick={() => openLightbox(artwork.id)}
                                className="mt-2 text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
                            >
                                Quick View
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedArtwork && selectedArt && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-neutral-300 z-10"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={() => navigateLightbox("prev")}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-neutral-300 z-10"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <button
                        onClick={() => navigateLightbox("next")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-neutral-300 z-10"
                    >
                        <ChevronRight size={48} />
                    </button>

                    <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8">
                        <div className="flex-1 relative max-h-[80vh]">
                            <Image
                                src={getCloudinaryUrl(selectedArt.images.main, "large")}
                                alt={selectedArt.title}
                                width={800}
                                height={1000}
                                className="max-w-full max-h-full object-contain"
                                priority
                            />
                        </div>

                        <div className="lg:w-80 text-white space-y-4">
                            <h2 className="text-2xl font-light">{selectedArt.title}</h2>
                            <div className="space-y-2 text-neutral-300">
                                <p>{selectedArt.year}</p>
                                <p>{selectedArt.medium}</p>
                                <p>{selectedArt.dimensions}</p>
                                {selectedArt.available && (
                                    <p className="text-green-400">Available for Purchase</p>
                                )}
                            </div>
                            <p className="text-neutral-300 leading-relaxed">
                                {selectedArt.description}
                            </p>
                            <Link
                                href={`/portfolio/${selectedArt.slug}`}
                                className="inline-block mt-4 text-white border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
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
