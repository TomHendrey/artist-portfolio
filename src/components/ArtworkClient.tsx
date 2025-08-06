"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, X, ZoomIn } from "lucide-react";
import { getArtworkBySlug, artworks, Artwork } from "@/data/artworks";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { notFound } from "next/navigation";

interface ArtworkClientProps {
    artwork: Artwork;
}

// Trigger when zoom level changes

export default function ArtworkClient({ artwork }: ArtworkClientProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [imageLoading, setImageLoading] = useState(false);

    useEffect(() => {
        setImageLoading(true);
        const timer = setTimeout(() => setImageLoading(false), 1000); // Minimum loading time
        return () => clearTimeout(timer);
    }, [zoomLevel]);

    // Create array of all images (main + details)
    const allImages = [artwork.images.main, ...(artwork.images.details || [])];

    // Get related artworks (same category, excluding current)
    const relatedArtworks = artworks
        .filter((art) => art.category === artwork.category && art.id !== artwork.id)
        .slice(0, 3);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = "unset";
    };

    return (
        <div className="pt-16 min-h-screen" style={{ backgroundColor: "#f4f4f4" }}>
            <div className="flex min-h-screen pb-20">
                <div className="w-80 flex-shrink-0 p-8 bg-white border-r border-neutral-200">
                    {/* Back Navigation */}
                    <div className="py-8 px-4 max-w-7xl mx-auto">
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Portfolio
                        </Link>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-light mb-4 text-neutral-800">
                                {artwork.title}
                            </h1>

                            <div className="space-y-2 text-neutral-600 mb-8">
                                <p className="text-lg">{artwork.year}</p>
                                <p>{artwork.medium}</p>
                                <p>{artwork.dimensions}</p>
                                {artwork.available && (
                                    <p className="text-green-600 font-medium">
                                        Available for Purchase
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-xl font-light mb-4 text-neutral-800">
                                About this Work
                            </h3>
                            <p
                                className="text-neutral-600 leading-relaxed"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                {artwork.description}
                            </p>
                        </div>

                        {/* Contact for Purchase */}
                        <div>
                            <h3 className="text-xl font-light mb-4 text-neutral-800">
                                Inquire About This Work
                            </h3>
                            <p
                                className="text-neutral-600 mb-4"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                For pricing information, additional images, or to arrange a studio
                                visit, please get in touch.
                            </p>
                            <Link
                                href={`/contact?artwork=${encodeURIComponent(artwork.title)}`}
                                className="inline-block bg-neutral-800 text-white px-6 py-3 hover:bg-neutral-700 transition-colors"
                            >
                                Contact About This Work
                            </Link>
                        </div>

                        {/* Artwork Details */}
                        <div className="border-t border-neutral-200 pt-8">
                            <h3 className="text-xl font-light mb-4 text-neutral-800">
                                Work Details
                            </h3>
                            <div className="space-y-2 text-sm text-neutral-600">
                                <div className="flex justify-between">
                                    <span>Medium:</span>
                                    <span>{artwork.medium}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Dimensions:</span>
                                    <span>{artwork.dimensions}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Year:</span>
                                    <span>{artwork.year}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Status:</span>
                                    <span
                                        className={
                                            artwork.available ? "text-green-600" : "text-red-600"
                                        }
                                    >
                                        {artwork.available
                                            ? "Available"
                                            : "Sold/Private Collection"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-8 ">
                    {/* Images Section */}
                    <div className="max-w-4xl mx-auto">
                        {/* Main Image */}
                        <div className="relative h-[90vh] bg-neutral-100 overflow-auto">
                            <Image
                                src={getCloudinaryUrl(allImages[selectedImageIndex], "large")}
                                alt={`${artwork.title} - View ${selectedImageIndex + 1}`}
                                fill
                                className="w-full h-full object-cover cursor-zoom-in"
                                onClick={() => openLightbox(selectedImageIndex)}
                                priority
                            />
                            <button
                                onClick={() => openLightbox(selectedImageIndex)}
                                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                                <ZoomIn size={20} />
                            </button>
                        </div>

                        {/* Thumbnail Navigation */}
                        {allImages.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {allImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`flex-shrink-0 w-20 h-20 relative overflow-hidden border-2 transition-colors ${
                                            selectedImageIndex === index
                                                ? "border-neutral-800"
                                                : "border-neutral-200 hover:border-neutral-400"
                                        }`}
                                    >
                                        <Image
                                            src={getCloudinaryUrl(image, "thumbnail")}
                                            alt={`${artwork.title} thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50  flex items-center justify-center p-4 overflow-auto"
                    style={{ backgroundColor: "#f4f4f4" }}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-neutral-800 hover:text-neutral-600 z-10"
                    >
                        <X size={32} />
                    </button>

                    <div className="max-w-[90vw] max-h-[90vh] relative ">
                        <Image
                            src={getCloudinaryUrl(allImages[selectedImageIndex], "ultra")}
                            alt={`${artwork.title} - Full Resolution`}
                            width={1200 * zoomLevel}
                            height={1500 * zoomLevel}
                            className="max-w-full max-h-full object-contain cursor-zoom-in"
                            onClick={() => setZoomLevel(zoomLevel === 1 ? 2 : 1)}
                            priority
                        />
                        {imageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center ">
                                <div className="w-8 h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
