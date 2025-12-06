"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Artwork } from "@/data/artworks";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { artworks } from "@/data/artworks";
import { useRouter } from "next/navigation";

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
    const [isImageTransitioning, setIsImageTransitioning] = useState(false);

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

    const handleImageChange = (index: number) => {
        // Don't fade out if clicking the same image
        if (index === selectedImageIndex) return;

        // Start fade out
        setIsImageTransitioning(true);

        // Preload the new image first
        const newImageUrl = getCloudinaryUrl(allImages[index], "large");
        const img = document.createElement("img");

        img.onload = () => {
            // Image fully loaded - now switch and fade in
            setTimeout(() => {
                setSelectedImageIndex(index);
                setIsImageTransitioning(false);
            }, 250);
        };

        img.onerror = () => {
            // If image fails to load, still switch (fallback)
            console.error("Failed to preload image");
            setTimeout(() => {
                setSelectedImageIndex(index);
                setIsImageTransitioning(false);
            }, 250);
        };

        // Start loading the image
        img.src = newImageUrl;
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
        // Mobile/Tablet detection - under 1024px bypasses progressive loading
        const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

        // On mobile/tablet, use completely raw URL with no transformations
        // Images are already optimized, so no processing needed
        if (isMobile) {
            const cloudName = "dutoeewfl"; // Your cloud name
            const cleanPath = allImages[selectedImageIndex].replace(/^\//, "");
            return `https://res.cloudinary.com/${cloudName}/image/upload/${cleanPath}`;
        }

        // DESKTOP ONLY: Progressive loading system below
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
        artwork.images.main,
        artwork.images.cropped || artwork.images.main,
        ...(artwork.images.croppedAlts || []),
        ...(artwork.images.details || []),
    ];

    const router = useRouter();

    // Find current artwork index and get prev/next
    const currentIndex = artworks.findIndex((art) => art.id === artwork.id);
    const prevArtwork =
        currentIndex > 0 ? artworks[currentIndex - 1] : artworks[artworks.length - 1];
    const nextArtwork =
        currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : artworks[0];

    const navigateToArtwork = (slug: string) => {
        router.push(`/portfolio/${slug}`);
    };

    return (
        <div className="bg-white">
            {/* Artwork Navigation Arrows - Fixed Position */}
            <button
                onClick={() => navigateToArtwork(prevArtwork.slug)}
                className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 transition-colors z-40"
                aria-label="Previous artwork"
            >
                <ChevronLeft size={28} strokeWidth={1} />
            </button>

            <button
                onClick={() => navigateToArtwork(nextArtwork.slug)}
                className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 transition-colors z-40"
                aria-label="Next artwork"
            >
                <ChevronRight size={28} strokeWidth={1} />
            </button>
            {/* Main Layout: Image first on mobile (order-1), sidebar second (order-2); side-by-side on desktop */}
            <div className="flex flex-col md:flex-row transition-all duration-300 ease-in-out">
                {/* IMAGE SECTION - Shows first on mobile, on right on desktop - HIGH PRIORITY, doesn't shrink */}
                <div className="w-full md:flex-[2] lg:min-w-[400px] order-1 md:order-2 transition-all duration-300 ease-in-out">
                    {/* Mobile + Tablet: White top padding with Back to Portfolio (left) and View HD (right) */}
                    <div className="md:hidden bg-white px-6 py-6 flex items-center justify-between">
                        <Link
                            href="/portfolio"
                            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors text-sm"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            <ArrowLeft size={16} strokeWidth={1} />
                            Back to Portfolio
                        </Link>
                        <button
                            onClick={() => {
                                // Mobile/Tablet: Open raw Cloudinary URL in new tab for perfect quality
                                const cloudName = "dutoeewfl";
                                const cleanPath = allImages[selectedImageIndex].replace(/^\//, "");
                                const rawUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${cleanPath}`;
                                window.open(rawUrl, "_blank");
                            }}
                            className="border border-neutral-300 rounded-sm text-neutral-800 px-3 py-2 hover:bg-neutral-800 hover:text-white transition-colors duration-300 text-xs font-light"
                        >
                            View HD
                        </button>
                    </div>

                    {/* Image Container - MOBILE: full size no constraints, TABLET/DESKTOP: height + padding */}
                    <div className="w-full h-auto md:h-[80vh] lg:h-screen bg-white flex items-center justify-center md:py-8 md:px-4 lg:py-6 lg:px-2">
                        <Image
                            src={getCloudinaryUrl(allImages[selectedImageIndex], "large")}
                            alt={`${artwork.title} - Featured View`}
                            width={1200}
                            height={1500}
                            className={`w-full h-auto md:w-auto md:h-auto md:max-w-full md:max-h-full object-contain cursor-zoom-in transition-opacity duration-500 ${isImageTransitioning ? "opacity-0" : "opacity-100"}`}
                            onClick={() => {
                                // Mobile/Tablet: Open raw URL in new tab, Desktop: Open lightbox
                                if (typeof window !== "undefined" && window.innerWidth < 1024) {
                                    const cloudName = "dutoeewfl";
                                    const cleanPath = allImages[selectedImageIndex].replace(
                                        /^\//,
                                        "",
                                    );
                                    const rawUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${cleanPath}`;
                                    window.open(rawUrl, "_blank");
                                } else {
                                    openLightbox(selectedImageIndex);
                                }
                            }}
                            priority
                        />
                    </div>
                </div>

                {/* DETAILS SIDEBAR - Shows second on mobile, on left on desktop - LOW PRIORITY, shrinks first */}
                <div className="w-full md:flex-[0.8] lg:min-w-[260px] p-8 lg:p-12 bg-white order-2 md:order-1 transition-all duration-300 ease-in-out flex justify-center lg:justify-end">
                    <div className="w-full max-w-[85%] transform ">
                        {/* Back Navigation - Desktop only */}
                        <div className="hidden md:block mb-8 lg:mb-16">
                            <Link
                                href="/portfolio"
                                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors text-sm"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                <ArrowLeft size={16} strokeWidth={1} />
                                Back to Portfolio
                            </Link>
                        </div>

                        {/* Details Section After Changes*/}
                        <div className="space-y-6 lg:space-y-8 md:mt-12 lg:mt-32">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-light mb-3 lg:mb-4 text-neutral-800 leading-tight">
                                    {artwork.title}
                                </h1>
                                <div
                                    className="space-y-1 lg:space-y-1.5 text-neutral-600 mb-4 lg:mb-6"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    <p className="text-sm lg:text-sm">{artwork.year}</p>
                                    <p className="text-xs lg:text-sm">{artwork.medium}</p>
                                    <p className="text-xs lg:text-sm">{artwork.dimensions}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                {/* <h3 className="text-lg lg:text-xl font-light mb-3 lg:mb-3 text-neutral-800"> */}
                                {/*     About this Work */}
                                {/* </h3> */}
                                <p
                                    className="text-neutral-600 leading-relaxed text-sm lg:text-sm"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    {artwork.description}
                                </p>
                            </div>

                            {/* Buttons section - elegant, compact, side by side */}
                            <div className="flex gap-3">
                                {/* Inquire button - filled/primary */}
                                <Link
                                    href={`/contact?artwork=${encodeURIComponent(artwork.title)}`}
                                    className="inline-flex items-center justify-center bg-neutral-800 text-white px-4 py-2 hover:bg-neutral-700 transition-colors duration-300 text-xs lg:text-sm font-light"
                                >
                                    Inquire
                                </Link>

                                {/* View High Resolution - Desktop only (mobile/tablet has it in top padding) - outline/secondary */}
                                <button
                                    onClick={() => openLightbox(selectedImageIndex)}
                                    className="hidden md:inline-flex items-center justify-center border border-neutral-300 text-neutral-600 px-4 py-2 hover:border-neutral-800 hover:text-neutral-800 transition-colors duration-300 text-xs lg:text-sm font-light"
                                >
                                    View HD
                                </button>
                            </div>

                            {/* ───── GALLERY: Mobile (<768px) + Desktop (≥1024px) ───── */}
                            {artwork.images.details && artwork.images.details.length > 0 && (
                                <div className="block md:hidden lg:block mt-40 lg:mt-12">
                                    {/* Mobile: full-width stacked */}
                                    <div className="md:hidden space-y-6">
                                        {artwork.images.details.map((detail, index) => (
                                            <div
                                                key={detail}
                                                className="relative w-screen left-1/2 -translate-x-1/2 px-4"
                                            >
                                                <Image
                                                    src={getCloudinaryUrl(detail, "large")}
                                                    alt={`${artwork.title} - Detail ${index + 1}`}
                                                    width={1200}
                                                    height={1500}
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {/* Desktop: thumbnail grid */}
                                    <div className="hidden lg:grid lg:grid-cols-5 gap-3">
                                        {artwork.images.details.map((detail, index) => {
                                            const imageIndex =
                                                2 +
                                                (artwork.images.croppedAlts?.length || 0) +
                                                index;
                                            return (
                                                <div
                                                    key={detail}
                                                    className="relative aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => handleImageChange(imageIndex)}
                                                >
                                                    <Image
                                                        src={getCloudinaryUrl(detail, "medium")}
                                                        alt={`${artwork.title} - Detail ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ────────────────────── TABLET-ONLY GALLERY (768–1023px) ────────────────────── */}
            {artwork.images.details && artwork.images.details.length > 0 && (
                <div className="hidden md:block lg:hidden bg-white px-6 py-8">
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 max-w-4xl mx-auto">
                        {artwork.images.details.map((detail, index) => {
                            const imageIndex =
                                2 + (artwork.images.croppedAlts?.length || 0) + index;
                            return (
                                <button
                                    key={detail}
                                    onClick={() => handleImageChange(imageIndex)}
                                    className="relative aspect-[4/5] bg-neutral-100 overflow-hidden  hover:opacity-80 transition-opacity"
                                >
                                    <Image
                                        src={getCloudinaryUrl(detail, "medium")}
                                        alt={`${artwork.title} - Detail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
            {/* ────────────────────────────────────────────────────────────────────────────── */}

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

                    {/* Zoom controls - Desktop only (1024px+), hidden on mobile/tablet */}
                    <div className="hidden lg:flex fixed top-4 left-4 flex-col gap-2 z-20">
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
                            Reset
                        </button>

                        <div className="text-neutral-800 text-xs text-center bg-white/90 px-2 py-2 rounded">
                            <div className="font-bold">{Math.round(zoomLevel * 100)}%</div>
                        </div>
                    </div>

                    <div className="w-full" style={{ textAlign: "center" }}>
                        <Image
                            src={getCurrentImageUrl()}
                            alt={`${artwork.title} - ${getQualityDescription()}`}
                            width={1200 * zoomLevel}
                            height={1500 * zoomLevel}
                            className="cursor-default"
                            style={{ display: "inline-block", maxWidth: "none", maxHeight: "none" }}
                            priority
                            quality={95}
                        />
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
