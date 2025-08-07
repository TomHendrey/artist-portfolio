"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, X, ZoomIn } from "lucide-react";
import { Artwork } from "@/data/artworks";
import { getCloudinaryUrl } from "@/lib/cloudinary";
// import { artworks } from "@/data/artworks";

interface ArtworkClientProps {
    artwork: Artwork;
}

// Trigger when zoom level changes

export default function ArtworkClient({ artwork }: ArtworkClientProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [imageLoading, setImageLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setImageLoading(true);
        const timer = setTimeout(() => setImageLoading(false), 1000); // Minimum loading time
        return () => clearTimeout(timer);
    }, [zoomLevel]);

    // Create array of all images (main + details)
    const allImages = [
        artwork.images.cropped || artwork.images.main, // Use cropped version for main display
        ...(artwork.images.croppedAlts || []), // Include alternative crops
        artwork.images.main, // Include original main image as option
        ...(artwork.images.details || []), // Include any detail shots
    ];

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = "unset";
    };

    const zoomIn = () => {
        setZoomLevel((prev) => Math.min(4, prev + 0.5)); // Max 4x zoom, increment by 0.5
    };

    const zoomOut = () => {
        setZoomLevel((prev) => Math.max(0.65, prev - 0.5)); // Min 0.75x zoom
    };

    const resetZoom = () => {
        setZoomLevel(1);
    };

    const getImageSizeForZoom = (zoomLevel: number) => {
        if (zoomLevel >= 2) {
            return "ultra"; // Use original size for 200%+ zoom
        }
        return "large"; // Use 2400px max for lower zooms
    };

    return (
        <div className="pt-16 min-h-screen" style={{ backgroundColor: "#f4f4f4" }}>
            {/* Mobile toggle button at top */}
            <div className="md:hidden p-4 bg-white border-b border-neutral-200">
                <button
                    className="text-sm text-neutral-600 underline"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "Hide Details" : "Show Details"}
                </button>
            </div>

            <div className="flex min-h-screen pb-20">
                {/* Left Sidebar - collapsible on mobile */}
                <div
                    className={`flex-shrink-0 p-8 bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out 
            ${isOpen ? "w-80 opacity-100" : "w-0 opacity-0 overflow-hidden"} 
            md:w-90 md:opacity-100 md:overflow-visible`}
                >
                    {/* Back Navigation */}
                    <div className="py-8 max-w-7xl mx-auto">
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Portfolio
                        </Link>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-10">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-light mb-4 text-neutral-800">
                                {artwork.title}
                            </h1>
                            <div className="space-y-2 text-neutral-600 mb-8">
                                <p className="text-lg">{artwork.year}</p>
                                <p>{artwork.medium}</p>
                                <p>{artwork.dimensions}</p>
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
                                className="text-neutral-600 mb-8"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                For pricing information, additional images, or to arrange a studio
                                visit, please get in touch.
                            </p>
                            <Link
                                href={`/contact?artwork=${encodeURIComponent(artwork.title)}`}
                                className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-800 px-4 py-3 hover:bg-neutral-800 hover:text-white transition-colors duration-300"
                            >
                                Contact About This Work
                            </Link>
                        </div>
                    </div>
                </div>{" "}
                <div className="flex-1 p-8 ">
                    {/* Images Section */}
                    <div className="max-w-4xl mx-auto">
                        {/* Main Image */}
                        <div className="relative h-[70vh] md:h-[85vh] bg-neutral-100 flex items-center justify-center">
                            <Image
                                src={getCloudinaryUrl(
                                    artwork.images.cropped || artwork.images.main,
                                    "large",
                                )}
                                alt={`${artwork.title} - Featured View`}
                                width={1200}
                                height={800}
                                className="max-w-full max-h-full object-contain cursor-zoom-in"
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
                    className="fixed inset-0 z-50 overflow-auto"
                    style={{ backgroundColor: "#f4f4f4" }}
                >
                    {/* Close button - fixed to viewport */}
                    <button
                        onClick={closeLightbox}
                        className="fixed top-4 right-4 text-neutral-800 hover:text-neutral-600 z-20"
                    >
                        <X size={32} />
                    </button>

                    {/* Zoom controls - fixed to viewport */}
                    <div className="fixed top-4 left-4 flex flex-col gap-2 z-20">
                        <button
                            onClick={zoomIn}
                            className="bg-neutral-800/70 text-white px-3 py-2 rounded hover:bg-neutral-800/90 text-sm"
                        >
                            +
                        </button>
                        <button
                            onClick={zoomOut}
                            className="bg-neutral-800/70 text-white px-3 py-2 rounded hover:bg-neutral-800/90 text-sm"
                        >
                            -
                        </button>
                        <button
                            onClick={resetZoom}
                            className="bg-neutral-800/70 text-white px-3 py-2 rounded hover:bg-neutral-800/90 text-sm"
                        >
                            Reset
                        </button>
                        <div className="text-neutral-800 text-xs text-center bg-white/80 px-2 py-1 rounded">
                            {Math.round(zoomLevel * 100)}%
                        </div>
                    </div>

                    <div
                        className="p-4"
                        style={{
                            width: `${1200 * zoomLevel}px`,
                            height: `${1500 * zoomLevel}px`,
                            margin: "0 auto",
                        }}
                    >
                        <Image
                            src={getCloudinaryUrl(allImages[selectedImageIndex], "ultra")}
                            alt={`${artwork.title} - Full Resolution`}
                            width={1200 * zoomLevel}
                            height={1500 * zoomLevel}
                            className="cursor-default"
                            priority
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
