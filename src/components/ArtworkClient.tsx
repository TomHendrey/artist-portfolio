"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Artwork } from "@/data/artworks";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface ArtworkClientProps {
    artwork: Artwork;
}

export default function ArtworkClient({ artwork }: ArtworkClientProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [imageLoading, setImageLoading] = useState(false);
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
        const timer = setTimeout(() => setImageLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [zoomLevel]);

    useEffect(() => {
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    useEffect(() => {
        const handleBeforeUnload = () => {
            document.body.style.overflow = "unset";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            document.body.style.overflow = "unset";
        };
    }, []);

    useEffect(() => {
        if (lightboxOpen && artwork.images.highRes) {
            console.log("🚀 Starting progressive loading for", artwork.title);
            setIsLoadingHighRes(true);
            setMediumResLoaded(false);
            setUltraResLoaded(false);
            setCurrentImageQuality("base");

            setLoadingProgress("Showing base quality (8MB)");

            if (artwork.images.highRes.medium) {
                setLoadingProgress("Loading high quality (18MB)...");
                preloadImage(artwork.images.highRes.medium, "Medium (18MB)")
                    .then(() => {
                        setMediumResLoaded(true);
                        setCurrentImageQuality("medium");
                        setLoadingProgress("High quality loaded!");

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
                                        setTimeout(() => setLoadingProgress(""), 3000);
                                    })
                                    .catch((error) => {
                                        console.error("Ultra res load failed:", error);
                                        setIsLoadingHighRes(false);
                                        setLoadingProgress("Ultra quality failed to load");
                                    });
                            }, 500);
                        }
                    })
                    .catch((error) => {
                        console.error("Medium res load failed:", error);
                        setLoadingProgress("High quality failed to load");
                    });
            }
        }

        if (!lightboxOpen) {
            setMediumResLoaded(false);
            setUltraResLoaded(false);
            setIsLoadingHighRes(false);
            setCurrentImageQuality("base");
            setLoadingProgress("");
        }
    }, [lightboxOpen, artwork.images.highRes]);

    useEffect(() => {
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
        document.body.style.backgroundColor = "#e9e9e9";
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = "unset";
        document.body.style.backgroundColor = "";
    };

    const zoomIn = () => {
        setZoomLevel((prev) => Math.min(10, prev + 0.5));
    };

    const zoomOut = () => {
        setZoomLevel((prev) => Math.max(0.25, prev - 0.5));
    };

    const resetZoom = () => {
        setZoomLevel(1);
    };

    const getImageSizeForZoom = (zoomLevel: number) => {
        if (zoomLevel >= 2) {
            return "ultra";
        }
        return "large";
    };

    const openDetailLightbox = (index: number) => {
        setSelectedDetailIndex(index);
        setDetailLightboxOpen(true);
        document.body.style.overflow = "hidden";
        document.body.style.backgroundColor = "#e9e9e9";
    };

    const closeDetailLightbox = () => {
        setDetailLightboxOpen(false);
        document.body.style.overflow = "unset";
        document.body.style.backgroundColor = "";
    };

    const navigateDetail = (direction: "prev" | "next") => {
        const detailsLength = artwork.images.details?.length || 0;
        if (direction === "prev") {
            setSelectedDetailIndex((prev) => (prev > 0 ? prev - 1 : detailsLength - 1));
        } else {
            setSelectedDetailIndex((prev) => (prev < detailsLength - 1 ? prev + 1 : 0));
        }
    };

    const preloadImage = (url: string, quality: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
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

    const getCurrentImageUrl = () => {
        const hasHighRes = artwork.images.highRes;

        if (!hasHighRes) {
            return getCloudinaryUrl(allImages[selectedImageIndex], "ultra");
        }

        if (zoomLevel >= 1.5) {
            if (hasHighRes.ultra && ultraResLoaded) {
                return hasHighRes.ultra;
            } else if (hasHighRes.medium && mediumResLoaded) {
                return hasHighRes.medium;
            }
        }

        if (zoomLevel >= 1.2 && hasHighRes.medium && mediumResLoaded) {
            return hasHighRes.medium;
        }

        if (hasHighRes.base) {
            return getCloudinaryUrl(hasHighRes.base, "large");
        }

        return getCloudinaryUrl(allImages[selectedImageIndex], "large");
    };

    const loadUltraQuality = () => {
        if (artwork.images.highRes?.ultra && ultraResLoaded) {
            setCurrentImageQuality("ultra");
        }
    };

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

    const allImages = [
        artwork.images.cropped || artwork.images.main,
        ...(artwork.images.croppedAlts || []),
        artwork.images.main,
        ...(artwork.images.details || []),
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#e9e9e9" }}>
            {/* Main Layout: Image first on mobile (order-1), sidebar second (order-2); side-by-side on desktop */}
            <div className="flex flex-col lg:flex-row">
                {/* IMAGE SECTION - Shows first on mobile, on right on desktop - HIGH PRIORITY, doesn't shrink */}
                <div className="w-full lg:flex-1 lg:flex-shrink-0 order-1 lg:order-2">
                    <button
                        onClick={() => openLightbox(selectedImageIndex)}
                        className="fixed top-4 lg:top-8 right-4 lg:right-12 border border-neutral-300 rounded-sm text-neutral-800 px-3 lg:px-4 py-2 hover:bg-neutral-800 hover:text-white transition-colors duration-300 text-xs lg:text-sm font-light z-50 bg-white"
                    >
                        View High Resolution
                    </button>

                    {/* Image Container with white padding frame on desktop */}
                    <div className="w-full h-[70vh] lg:h-screen bg-white">
                        {/* White padding wrapper - adds frame on desktop */}
                        <div className="w-full h-full flex items-center justify-center py-6 px-2 sm:py-8 sm:px-4 md:py-10 md:px-8 lg:py-12 lg:px-12 lg:pr-24 xl:py-12 xl:px-16 xl:pr-40">
                            {/* Gray container */}
                            <div
                                className="relative w-full h-full flex items-center justify-center"
                                style={{ backgroundColor: "#e9e9e9" }}
                            >
                                <Image
                                    src={getCloudinaryUrl(
                                        artwork.images.cropped || artwork.images.main,
                                        "large",
                                    )}
                                    alt={`${artwork.title} - Featured View`}
                                    width={1200}
                                    height={1500}
                                    className="max-w-full max-h-full object-contain cursor-zoom-in"
                                    style={{ width: "auto", height: "auto" }}
                                    onClick={() => openLightbox(selectedImageIndex)}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* DETAILS SIDEBAR - Shows second on mobile, on left on desktop - LOW PRIORITY, shrinks first */}
                <div className="w-full lg:w-[28rem] lg:flex-shrink-1 lg:min-w-[16rem] p-8 lg:p-12 bg-white order-2 lg:order-1">
                    {/* Back Navigation */}
                    <div className="mb-8 lg:mb-12">
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Portfolio
                        </Link>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-8 lg:space-y-12">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-light mb-4 lg:mb-6 text-neutral-800 leading-tight">
                                {artwork.title}
                            </h1>
                            <div className="space-y-2 lg:space-y-3 text-neutral-600 mb-6 lg:mb-8">
                                <p className="text-base lg:text-lg">{artwork.year}</p>
                                <p className="text-sm lg:text-base">{artwork.medium}</p>
                                <p className="text-sm lg:text-base">{artwork.dimensions}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg lg:text-xl font-light mb-4 lg:mb-6 text-neutral-800">
                                About this Work
                            </h3>
                            <p
                                className="text-neutral-600 leading-relaxed text-sm lg:text-base"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                {artwork.description}
                            </p>
                        </div>

                        {/* Contact for Purchase */}
                        <div>
                            <h3 className="text-lg lg:text-xl font-light mb-4 lg:mb-6 text-neutral-800">
                                Inquire About This Work
                            </h3>
                            <p
                                className="text-neutral-600 mb-6 lg:mb-8 leading-relaxed text-sm lg:text-base"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                For pricing information, additional images, or to arrange a studio
                                visit, please get in touch.
                            </p>
                            <Link
                                href={`/contact?artwork=${encodeURIComponent(artwork.title)}`}
                                className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-800 px-4 lg:px-6 py-2 lg:py-3 hover:bg-neutral-800 hover:text-white transition-colors duration-300 text-sm lg:text-base"
                            >
                                Contact About This Work
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 overflow-auto"
                    style={{ backgroundColor: "#e9e9e9" }}
                >
                    <button
                        onClick={closeLightbox}
                        className="fixed top-4 right-4 text-neutral-800 hover:text-neutral-600 z-20"
                    >
                        <X size={32} />
                    </button>

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

                        <div className="text-neutral-800 text-xs bg-white/90 px-2 py-1 rounded">
                            <div>
                                Image: {Math.round(1200 * zoomLevel)}×{Math.round(1500 * zoomLevel)}
                                px
                            </div>
                        </div>
                    </div>

                    {/* Lightbox image - no padding wrapper, starts at left edge */}
                    <div className="w-full h-full flex items-center justify-center pl-0 pr-2 sm:pr-4 md:pr-12 lg:pr-24 xl:pr-40">
                        <div
                            className="relative w-full h-full flex items-center justify-center"
                            style={{ backgroundColor: "#e9e9e9" }}
                        >
                            <Image
                                src={getCurrentImageUrl()}
                                alt={`${artwork.title} - ${getQualityDescription()}`}
                                width={1200 * zoomLevel}
                                height={1500 * zoomLevel}
                                className="cursor-default"
                                style={{ maxWidth: "none", maxHeight: "none" }}
                                priority
                                quality={95}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Images Section */}
            {artwork.images.details && artwork.images.details.length > 0 && (
                <div className="w-full bg-white py-20 lg:py-36 px-4 lg:px-8 border-t border-neutral-200">
                    <div className="max-w-7xl mx-auto">
                        <h3 className="text-2xl lg:text-3xl font-light mb-8 lg:mb-12 text-neutral-800">
                            Gallery
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
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

            {/* Detail Images Lightbox */}
            {detailLightboxOpen && artwork.images.details && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center py-10 lg:py-20"
                    style={{ backgroundColor: "#e9e9e9" }}
                >
                    <button
                        onClick={closeDetailLightbox}
                        className="fixed top-4 right-4 text-neutral-800 hover:text-neutral-600 z-60"
                    >
                        <X size={32} />
                    </button>

                    {artwork.images.details.length > 1 && (
                        <button
                            onClick={() => navigateDetail("prev")}
                            className="fixed left-4 top-1/2 -translate-y-1/2 text-neutral-800 hover:text-neutral-600 z-60"
                        >
                            <ChevronLeft size={48} />
                        </button>
                    )}

                    {artwork.images.details.length > 1 && (
                        <button
                            onClick={() => navigateDetail("next")}
                            className="fixed right-4 top-1/2 -translate-y-1/2 text-neutral-800 hover:text-neutral-600 z-60"
                        >
                            <ChevronRight size={48} />
                        </button>
                    )}

                    <div className="max-w-[90vw] lg:max-w-[85vw] h-[85vh] lg:h-[95vh] flex items-center justify-center">
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
