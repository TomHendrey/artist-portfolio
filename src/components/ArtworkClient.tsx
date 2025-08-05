"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, X, ZoomIn } from "lucide-react";
import { getArtworkBySlug, artworks } from "@/data/artworks";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { notFound } from "next/navigation";

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

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

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
        <div className="pt-16 min-h-screen bg-white">
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

            <div className="px-4 max-w-7xl mx-auto pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Images Section */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                            <Image
                                src={getCloudinaryUrl(allImages[selectedImageIndex], "large")}
                                alt={`${artwork.title} - View ${selectedImageIndex + 1}`}
                                fill
                                className="object-cover cursor-zoom-in"
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

                {/* Related Works */}
                {relatedArtworks.length > 0 && (
                    <div className="mt-20 pt-16 border-t border-neutral-200">
                        <h2 className="text-3xl font-light mb-12 text-neutral-800">
                            Related Works
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedArtworks.map((relatedArt) => (
                                <Link
                                    key={relatedArt.id}
                                    href={`/portfolio/${relatedArt.slug}`}
                                    className="group"
                                >
                                    <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-neutral-100">
                                        <Image
                                            src={getCloudinaryUrl(relatedArt.images.main, "medium")}
                                            alt={relatedArt.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-lg font-light text-neutral-800 group-hover:text-neutral-600 transition-colors">
                                        {relatedArt.title}
                                    </h3>
                                    <p className="text-sm text-neutral-600">
                                        {relatedArt.year} • {relatedArt.medium}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-neutral-300 z-10"
                    >
                        <X size={32} />
                    </button>

                    <div className="max-w-[90vw] max-h-[90vh] relative">
                        <Image
                            src={getCloudinaryUrl(allImages[selectedImageIndex], "ultra")}
                            alt={`${artwork.title} - Full Resolution`}
                            width={1200}
                            height={1500}
                            className="max-w-full max-h-full object-contain"
                            priority
                        />
                    </div>

                    {allImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {allImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${
                                        selectedImageIndex === index
                                            ? "bg-white"
                                            : "bg-white/50 hover:bg-white/75"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
