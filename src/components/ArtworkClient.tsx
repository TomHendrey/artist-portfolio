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

    // Add this with your other useEffects
    useEffect(() => {
        // Cleanup function - runs when component unmounts
        return () => {
            document.body.style.overflow = "unset"; // Always restore scrolling when component unmounts
        };
    }, []);

    // Also add this to handle browser back button specifically
    useEffect(() => {
        const handleBeforeUnload = () => {
            document.body.style.overflow = "unset";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            document.body.style.overflow = "unset"; // Restore on cleanup
        };
    }, []);

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
        setZoomLevel((prev) => Math.max(0.6, prev - 0.5)); // Min 0.75x zoom
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
                <div className="flex-1 p-8">
                    {" "}
                    {/* Remove relative */}
                    <button
                        onClick={() => openLightbox(selectedImageIndex)}
                        className="fixed top-20 right-8  border  border-neutral-300  rounded-sm text-neutral-800 px-4 py-2 hover:bg-neutral-800 hover:text-white transition-colors duration-300 text-sm font-light z-50"
                    >
                        View High Resolution
                    </button>
                    {/* Images Section */}
                    <div className="w-full">
                        {/* Main Image */}
                        <div className="relative h-[75vh] md:h-[90vh] bg-neutral-100 flex items-center justify-center">
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
                        </div>
                        {/* Detail Images Section */}
                        {artwork.images.details && artwork.images.details.length > 0 && (
                            <div className="mt-16 pt-8 border-t border-neutral-200">
                                <h3 className="text-2xl font-light mb-8 text-neutral-800">
                                    Detail Views
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {artwork.images.details.map((detail, index) => (
                                        <div
                                            key={detail}
                                            className="relative aspect-[4/5] bg-neutral-100 overflow-hidden cursor-zoom-in"
                                        >
                                            <Image
                                                src={getCloudinaryUrl(detail, "medium")}
                                                alt={`${artwork.title} - Detail ${index + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500"
                                                onClick={() =>
                                                    openLightbox(allImages.indexOf(detail))
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
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
