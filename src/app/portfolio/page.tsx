"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Sample artwork data - replace with your actual artwork
const artworks = [
    {
        id: 1,
        title: "Untitled I",
        year: "2024",
        medium: "Oil on canvas",
        dimensions: "48 x 36 inches",
        src: "/images/artwork-1.jpg",
        description: "Description of the artwork, inspiration, or story behind it.",
    },
    {
        id: 2,
        title: "Urban Reflection",
        year: "2023",
        medium: "Acrylic on wood",
        dimensions: "60 x 40 inches",
        src: "/images/artwork-2.jpg",
        description: "Another piece with its own story and context.",
    },
    // Add more artworks...
    {
        id: 3,
        title: "Abstract Study",
        year: "2024",
        medium: "Mixed media",
        dimensions: "24 x 24 inches",
        src: "/images/artwork-3.jpg",
        description: "Exploration of color and form.",
    },
    {
        id: 4,
        title: "Landscape Memory",
        year: "2023",
        medium: "Oil on canvas",
        dimensions: "36 x 48 inches",
        src: "/images/artwork-4.jpg",
        description: "Inspired by childhood landscapes.",
    },
    {
        id: 5,
        title: "Portrait Study",
        year: "2024",
        medium: "Charcoal on paper",
        dimensions: "18 x 24 inches",
        src: "/images/artwork-5.jpg",
        description: "Character study in monochrome.",
    },
    {
        id: 6,
        title: "Color Theory",
        year: "2024",
        medium: "Acrylic on canvas",
        dimensions: "30 x 30 inches",
        src: "/images/artwork-6.jpg",
        description: "Exploration of complementary colors.",
    },
];

export default function Portfolio() {
    const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);
    const [filter, setFilter] = useState("all");

    const filters = ["all", "2024", "2023", "oil", "acrylic", "mixed media"];

    const filteredArtworks = artworks.filter((artwork) => {
        if (filter === "all") return true;
        return (
            artwork.year === filter || artwork.medium.toLowerCase().includes(filter.toLowerCase())
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
            <div className="py-20 px-4 text-center bg-neutral-50">
                <h1 className="text-4xl md:text-5xl font-light mb-4 text-neutral-800">Portfolio</h1>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                    A collection of recent works exploring themes of identity, memory, and the human
                    condition.
                </p>
            </div>

            {/* Filter Buttons */}
            <div className="py-8 px-4 border-b border-neutral-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4">
                        {filters.map((filterOption) => (
                            <button
                                key={filterOption}
                                onClick={() => setFilter(filterOption)}
                                className={`px-4 py-2 text-sm font-light transition-colors duration-200 ${
                                    filter === filterOption
                                        ? "bg-neutral-800 text-white"
                                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                }`}
                            >
                                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="py-12 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArtworks.map((artwork) => (
                        <div key={artwork.id} className="group cursor-pointer">
                            <div
                                className="relative aspect-[4/5] mb-4 overflow-hidden bg-neutral-100"
                                onClick={() => openLightbox(artwork.id)}
                            >
                                <Image
                                    src={artwork.src}
                                    alt={artwork.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-lg font-light text-neutral-800">
                                    {artwork.title}
                                </h3>
                                <p className="text-sm text-neutral-600">
                                    {artwork.year} • {artwork.medium}
                                </p>
                                <p className="text-sm text-neutral-500">{artwork.dimensions}</p>
                            </div>
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
                                src={selectedArt.src}
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
                            </div>
                            <p className="text-neutral-300 leading-relaxed">
                                {selectedArt.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
