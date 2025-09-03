"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
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
    const [detailLightboxOpen, setDetailLightboxOpen] = useState(false);
    const [selectedDetailIndex, setSelectedDetailIndex] = useState(0);
    const [currentImageQuality, setCurrentImageQuality] = useState<"base" | "medium" | "ultra">(
        "base",
    );
    const [mediumResLoaded, setMediumResLoaded] = useState(false);
    const [ultraResLoaded, setUltraResLoaded] = useState(false);
    const [isLoadingHighRes, setIsLoadingHighRes] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState<string>("");

    useEffect(() => {
        setImageLoading(true);
        const timer = setTimeout(() => setImageLoading(false), 1000); // Minimum loading time
        return () => clearTimeout(timer);
    }, [zoomLevel]);

    // Cleanup function - runs when component unmounts
    useEffect(() => {
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

    // Enhanced progressive loading useEffect with better ultra quality triggers
    useEffect(() => {
        if (lightboxOpen && artwork.images.highRes) {
            console.log("🚀 Starting progressive loading for", artwork.title);
            setIsLoadingHighRes(true);
            setMediumResLoaded(false);
            setUltraResLoaded(false);
            setCurrentImageQuality("base");

            // Start with base quality (8MB Cloudinary)
            setLoadingProgress("Showing base quality (8MB)");

            // Load medium quality (18MB) in background
            if (artwork.images.highRes.medium) {
                setLoadingProgress("Loading high quality (18MB)...");
                preloadImage(artwork.images.highRes.medium, "Medium (18MB)")
                    .then(() => {
                        setMediumResLoaded(true);
                        setCurrentImageQuality("medium");
                        setLoadingProgress("High quality loaded!");

                        // Start ultra quality load after medium is ready - faster trigger
                        if (artwork.images.highRes?.ultra) {
                            setTimeout(() => {
                                setLoadingProgress("Loading ultra quality (46MB)...");
                                preloadImage(artwork.images.highRes!.ultra!, "Ultra (46MB)")
                                    .then(() => {
                                        setUltraResLoaded(true);
                                        setIsLoadingHighRes(false);
                                        setLoadingProgress(
                                            "Ultra quality ready! Try 400-600% zoom!",
                                        );
                                        setTimeout(() => setLoadingProgress(""), 3000); // Show message longer
                                    })
                                    .catch((error) => {
                                        console.error("Ultra res load failed:", error);
                                        setIsLoadingHighRes(false);
                                        setLoadingProgress("Ultra quality failed to load");
                                    });
                            }, 500); // Faster ultra load trigger
                        }
                    })
                    .catch((error) => {
                        console.error("Medium res load failed:", error);
                        setLoadingProgress("High quality failed to load");
                    });
            }
        }

        // Cleanup when lightbox closes
        if (!lightboxOpen) {
            setMediumResLoaded(false);
            setUltraResLoaded(false);
            setIsLoadingHighRes(false);
            setCurrentImageQuality("base");
            setLoadingProgress("");
        }
    }, [lightboxOpen, artwork.images.highRes]);

    // Enhanced zoom-triggered ultra quality loading
    useEffect(() => {
        // Trigger ultra quality loading when user zooms to 2.5x or higher
        if (
            lightboxOpen &&
            zoomLevel >= 2.5 &&
            artwork.images.highRes?.ultra &&
            !ultraResLoaded &&
            !isLoadingHighRes
        ) {
            console.log("🔍 High zoom detected, prioritizing ultra quality load");
            setIsLoadingHighRes(true);
            setLoadingProgress("Loading ultra quality for zoom...");

            preloadImage(artwork.images.highRes.ultra, "Ultra (46MB)")
                .then(() => {
                    setUltraResLoaded(true);
                    setIsLoadingHighRes(false);
                    setLoadingProgress("Ultra quality ready for detailed viewing!");
                    setTimeout(() => setLoadingProgress(""), 2000);
                })
                .catch((error) => {
                    console.error("Ultra res load failed:", error);
                    setIsLoadingHighRes(false);
                    setLoadingProgress("");
                });
        }
    }, [zoomLevel, lightboxOpen, ultraResLoaded, isLoadingHighRes]);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = "unset";
    };

    // EXTREME ZOOM TEST - Push the limits to find optimal maximum
    const zoomIn = () => {
        setZoomLevel((prev) => Math.min(10, prev + 0.5)); // Test up to 10x zoom (1000%!)
    };

    const zoomOut = () => {
        setZoomLevel((prev) => Math.max(0.25, prev - 0.5)); // Go even smaller for overview
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

    // Detail lightbox functions
    const openDetailLightbox = (index: number) => {
        setSelectedDetailIndex(index);
        setDetailLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeDetailLightbox = () => {
        setDetailLightboxOpen(false);
        document.body.style.overflow = "unset";
    };

    const navigateDetail = (direction: "prev" | "next") => {
        const detailsLength = artwork.images.details?.length || 0;
        if (direction === "prev") {
            setSelectedDetailIndex((prev) => (prev > 0 ? prev - 1 : detailsLength - 1));
        } else {
            setSelectedDetailIndex((prev) => (prev < detailsLength - 1 ? prev + 1 : 0));
        }
    };

    // Preload function with progress tracking - FIXED TypeScript error
    const preloadImage = (url: string, quality: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            // Fix: Use HTMLImageElement constructor explicitly
            const img = document.createElement("img") as HTMLImageElement;

            img.onload = () => {
                console.log(`✅ ${quality} quality loaded successfully`);
                resolve();
            };

            img.onerror = (error: string | Event) => {
                console.error(`❌ ${quality} quality failed to load:`, error);
                reject(new Error(`Failed to load ${quality} image`));
            };

            img.src = url;
            console.log(`🔄 Starting ${quality} quality load...`);
        });
    };

    // More aggressive ultra quality triggers for extreme zoom testing
    const getCurrentImageUrl = () => {
        const hasHighRes = artwork.images.highRes;

        if (!hasHighRes) {
            return getCloudinaryUrl(allImages[selectedImageIndex], "ultra");
        }

        // For ANY zoom above 1.5x, prioritize ultra quality if available
        if (zoomLevel >= 1.5) {
            if (hasHighRes.ultra && ultraResLoaded) {
                return hasHighRes.ultra;
            } else if (hasHighRes.medium && mediumResLoaded) {
                return hasHighRes.medium;
            }
        }

        // For zoom between 1.2x-1.5x, use medium if available
        if (zoomLevel >= 1.2 && hasHighRes.medium && mediumResLoaded) {
            return hasHighRes.medium;
        }

        // Base quality for normal zoom
        if (hasHighRes.base) {
            return getCloudinaryUrl(hasHighRes.base, "large");
        }

        return getCloudinaryUrl(allImages[selectedImageIndex], "large");
    };

    // Function to manually trigger ultra quality
    const loadUltraQuality = () => {
        if (artwork.images.highRes?.ultra && ultraResLoaded) {
            setCurrentImageQuality("ultra");
        }
    };

    // Function to get quality description
    const getQualityDescription = () => {
        const currentUrl = getCurrentImageUrl();

        if (currentUrl.includes("surface-1-composite-cropped-46")) {
            return "Ultra Quality (46MB)";
        } else if (currentUrl.includes("surface-1-composite-cropped-18")) {
            return "High Quality (18MB)";
        } else if (currentUrl.includes("surface-1-composite-cropped-8")) {
            return "Base Quality (8MB)";
        } else if (currentUrl.includes("blob.vercel-storage.com")) {
            return "High Resolution";
        } else {
            return "Standard Quality";
        }
    };

    // Create array of all images (main + details)
    const allImages = [
        artwork.images.cropped || artwork.images.main, // Use cropped version for main display
        ...(artwork.images.croppedAlts || []), // Include alternative crops
        artwork.images.main, // Include original main image as option
        ...(artwork.images.details || []), // Include any detail shots
    ];

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
            <div className="flex pb-20">
                {/* Left Sidebar - Fix the className */}
                <div className="w-80 flex-shrink-0 p-8 bg-white border-r border-neutral-200">
                    {/* Back Navigation */}
                    <div className="mb-8">
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
                </div>

                <div className="flex-1 p-8">
                    <button
                        onClick={() => openLightbox(selectedImageIndex)}
                        className="fixed top-20 right-8 border border-neutral-300 rounded-sm text-neutral-800 px-4 py-2 hover:bg-neutral-800 hover:text-white transition-colors duration-300 text-sm font-light z-50"
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
                    </div>
                </div>
            </div>
            {/* Enhanced Lightbox with Progressive Loading */}
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

                    {/* Enhanced Zoom controls - fixed to viewport */}
                    <div className="fixed top-4 left-4 flex flex-col gap-2 z-20">
                        <button
                            onClick={zoomIn}
                            className="bg-neutral-800/70 text-white px-3 py-2 rounded hover:bg-neutral-800/90 text-sm"
                        >
                            + Zoom In
                        </button>
                        <button
                            onClick={zoomOut}
                            className="bg-neutral-800/70 text-white px-3 py-2 rounded hover:bg-neutral-800/90 text-sm"
                        >
                            - Zoom Out
                        </button>
                        <button
                            onClick={resetZoom}
                            className="bg-neutral-800/70 text-white px-3 py-2 rounded hover:bg-neutral-800/90 text-sm"
                        >
                            Reset (100%)
                        </button>

                        {/* Enhanced zoom level display with more info */}
                        <div className="text-neutral-800 text-xs text-center bg-white/90 px-2 py-2 rounded space-y-1">
                            <div className="font-bold">{Math.round(zoomLevel * 100)}%</div>
                            <div className="text-xs opacity-75">
                                {zoomLevel >= 8
                                    ? " Microscope"
                                    : zoomLevel >= 6
                                      ? " Extreme Detail"
                                      : zoomLevel >= 4
                                        ? " Fine Detail"
                                        : zoomLevel >= 2
                                          ? " Close Study"
                                          : " Normal View"}
                            </div>
                        </div>

                        {/* Debug: Show actual image dimensions at current zoom */}
                        <div className="text-neutral-800 text-xs bg-white/90 px-2 py-1 rounded">
                            <div>
                                Image: {Math.round(1200 * zoomLevel)}×{Math.round(1500 * zoomLevel)}
                                px
                            </div>
                        </div>
                    </div>

                    {/* NEW: Progressive Loading Controls - positioned top-right */}
                    {/* {artwork.images.highRes && ( */}
                    {/*     <div className="fixed top-4 right-20 flex flex-col gap-2 z-20 max-w-xs"> */}
                    {/*         {/* Quality indicator */}
                    {/*         <div className="bg-white/90 px-3 py-2 rounded text-xs shadow-lg"> */}
                    {/*             <div className="flex items-center gap-2"> */}
                    {/*                 {getCurrentImageUrl().includes("46") ? ( */}
                    {/*                     <div className="w-2 h-2 bg-green-500 rounded-full"></div> */}
                    {/*                 ) : getCurrentImageUrl().includes("18") ? ( */}
                    {/*                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div> */}
                    {/*                 ) : ( */}
                    {/*                     <div className="w-2 h-2 bg-yellow-500 rounded-full"></div> */}
                    {/*                 )} */}
                    {/*                 <span className="font-medium">{getQualityDescription()}</span> */}
                    {/*             </div> */}
                    {/*         </div> */}
                    {/**/}
                    {/*         {/* Loading progress */}
                    {/*         {loadingProgress && ( */}
                    {/*             <div className="bg-white/90 px-3 py-2 rounded text-xs shadow-lg"> */}
                    {/*                 <div className="flex items-center gap-2"> */}
                    {/*                     {isLoadingHighRes && ( */}
                    {/*                         <div className="animate-spin w-3 h-3 border border-neutral-400 border-t-transparent rounded-full"></div> */}
                    {/*                     )} */}
                    {/*                     <span>{loadingProgress}</span> */}
                    {/*                 </div> */}
                    {/*             </div> */}
                    {/*         )} */}
                    {/**/}
                    {/*         {/* Enhanced Ultra quality upgrade button */}
                    {/*         {artwork.images.highRes?.ultra && */}
                    {/*             ultraResLoaded && */}
                    {/*             zoomLevel >= 2 && */}
                    {/*             !getCurrentImageUrl().includes("46") && ( */}
                    {/*                 <button */}
                    {/*                     onClick={() => setCurrentImageQuality("ultra")} */}
                    {/*                     className="bg-green-600 text-white px-4 py-3 rounded text-sm hover:bg-green-700 shadow-lg font-medium" */}
                    {/*                 > */}
                    {/*                     🔍 Switch to Ultra Quality */}
                    {/*                     <div className="text-xs opacity-90"> */}
                    {/*                         Perfect for {Math.round(zoomLevel * 100)}% zoom */}
                    {/*                     </div> */}
                    {/*                 </button> */}
                    {/*             )} */}
                    {/**/}
                    {/*         {/* Enhanced Help text with zoom recommendations */}
                    {/*         <div className="bg-white/90 px-3 py-2 rounded text-xs text-neutral-600 shadow-lg"> */}
                    {/*             <div className="space-y-1"> */}
                    {/*                 <div>🟡 Base (100%): Fast loading</div> */}
                    {/*                 <div>🔵 High (150%+): Better detail</div> */}
                    {/*                 <div>🟢 Ultra (250%+): Maximum quality</div> */}
                    {/*                 <div className="text-xs opacity-75 mt-1"> */}
                    {/*                     Try 400-600% zoom for incredible detail! */}
                    {/*                 </div> */}
                    {/*             </div> */}
                    {/*         </div> */}
                    {/*     </div> */}
                    {/* )} */}

                    <div
                        className="p-4"
                        style={{
                            width: `${1200 * zoomLevel}px`,
                            height: `${1500 * zoomLevel}px`,
                            margin: "0 auto",
                        }}
                    >
                        <Image
                            src={getCurrentImageUrl()} // ← Updated to use progressive loading
                            alt={`${artwork.title} - ${getQualityDescription()}`}
                            width={1200 * zoomLevel}
                            height={1500 * zoomLevel}
                            className="cursor-default"
                            priority
                            quality={95}
                        />
                    </div>
                </div>
            )}

            {/* Detail Images Section */}
            {artwork.images.details && artwork.images.details.length > 0 && (
                <div className="w-full bg-white py-36 px-8 border-t border-neutral-200">
                    <div className="max-w-7xl mx-auto">
                        <h3 className="text-3xl font-light mb-12 text-neutral-800">Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {artwork.images.details.map((detail, index) => (
                                <div
                                    key={detail}
                                    className="relative aspect-[4/5] bg-neutral-100 overflow-hidden cursor-zoom-in hover:shadow-lg transition-shadow duration-300"
                                    onClick={() => openDetailLightbox(index)}
                                >
                                    <Image
                                        src={getCloudinaryUrl(detail, "medium")}
                                        alt={`${artwork.title} - Detail ${index + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Images Lightbox - Simple version */}
            {detailLightboxOpen && artwork.images.details && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center py-20"
                    style={{ backgroundColor: "#f4f4f4" }}
                >
                    {/* Close button - change to dark colors */}
                    <button
                        onClick={closeDetailLightbox}
                        className="fixed top-4 right-4 text-neutral-800 hover:text-neutral-600 z-60"
                    >
                        <X size={32} />
                    </button>

                    {/* Previous button - change to dark colors */}
                    {artwork.images.details.length > 1 && (
                        <button
                            onClick={() => navigateDetail("prev")}
                            className="fixed left-4 top-1/2 -translate-y-1/2 text-neutral-800 hover:text-neutral-600 z-60"
                        >
                            <ChevronLeft size={48} />
                        </button>
                    )}

                    {/* Next button - change to dark colors */}
                    {artwork.images.details.length > 1 && (
                        <button
                            onClick={() => navigateDetail("next")}
                            className="fixed right-4 top-1/2 -translate-y-1/2 text-neutral-800 hover:text-neutral-600 z-60"
                        >
                            <ChevronRight size={48} />
                        </button>
                    )}

                    {/* Detail Image - now has forced gaps */}
                    <div className="max-w-[85vw] h-[95vh] flex items-center justify-center">
                        <Image
                            src={getCloudinaryUrl(
                                artwork.images.details[selectedDetailIndex],
                                "large",
                            )}
                            alt={`${artwork.title} - Detail ${selectedDetailIndex + 1}`}
                            width={800}
                            height={1200}
                            className="max-w-full max-h-full object-contain"
                            priority
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
