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
    const [isFullscreen, setIsFullscreen] = useState(false);

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

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                // User pressed ESC - exit fullscreen mode but stay in lightbox
                setIsFullscreen(false);
                setZoomLevel(1); // Reset zoom when exiting fullscreen
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        setZoomLevel(1);
        setLightboxOpen(true);
        document.body.style.overflow = "hidden";
        document.body.style.backgroundColor = "#e9e9e9";

        // Request fullscreen after a small delay (to let lightbox render)
        // setTimeout(() => {
        //     if (document.documentElement.requestFullscreen) {
        //         document.documentElement.requestFullscreen().catch((err) => {
        //             console.log("Fullscreen request failed:", err);
        //         });
        //     }
        // }, 100);
    };

    const closeLightbox = () => {
        // Exit fullscreen if active
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        setLightboxOpen(false);
        setIsFullscreen(false);
        document.body.style.overflow = "unset";
        document.body.style.backgroundColor = "";
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            // Enter fullscreen
            document.documentElement
                .requestFullscreen()
                .then(() => {
                    setIsFullscreen(true);
                    // Fit image to screen height when entering fullscreen
                    const viewportHeight = window.innerHeight;
                    const imageHeight = 1500;
                    const fitZoom = viewportHeight / imageHeight;
                    setZoomLevel(fitZoom); // Start at fit-to-height (~0.7)
                })
                .catch((err) => {
                    console.log("Fullscreen failed:", err);
                });
        } else {
            // Exit fullscreen (back to normal lightbox)
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
                setZoomLevel(1); // Reset to 100% when exiting fullscreen
            });
        }
    };

    const navigateLightboxImage = (direction: "prev" | "next") => {
        const totalImages = allImages.length;

        if (direction === "prev") {
            const newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : totalImages - 1;
            handleImageChange(newIndex);
        } else {
            const newIndex = selectedImageIndex < totalImages - 1 ? selectedImageIndex + 1 : 0;
            handleImageChange(newIndex);
        }

        // Reset zoom to fit-to-height if in fullscreen mode
        if (isFullscreen) {
            const viewportHeight = window.innerHeight;
            const imageHeight = 1500;
            const fitZoom = viewportHeight / imageHeight;
            setZoomLevel(fitZoom);
        }
    };

    const zoomIn = () => {
        const detailStartIndex = 2 + (artwork.images.croppedAlts?.length || 0);
        const isDetailImage = selectedImageIndex >= detailStartIndex;

        if (isFullscreen) {
            // FULLSCREEN MODE: Discrete zoom levels (fit, 100%, 150%)
            const viewportHeight = window.innerHeight;
            const imageHeight = 1500;
            const fitZoom = viewportHeight / imageHeight; // ~0.7

            // Define discrete zoom levels for fullscreen
            const zoomLevels = [fitZoom, 1.0, 1.5];

            // Find next zoom level
            const currentIndex = zoomLevels.findIndex(
                (level) => Math.abs(level - zoomLevel) < 0.01,
            );
            if (currentIndex < zoomLevels.length - 1) {
                setZoomLevel(zoomLevels[currentIndex + 1]);
            }
        } else {
            // NORMAL MODE: Incremental zoom with max limits
            const maxZoom = isDetailImage ? 1.5 : 10;
            setZoomLevel((prev) => Math.min(maxZoom, prev + 0.5));
        }
    };

    const zoomOut = () => {
        if (isFullscreen) {
            // FULLSCREEN MODE: Discrete zoom levels (fit, 100%, 150%)
            const viewportHeight = window.innerHeight;
            const imageHeight = 1500;
            const fitZoom = viewportHeight / imageHeight; // ~0.7

            // Define discrete zoom levels for fullscreen
            const zoomLevels = [fitZoom, 1.0, 1.5];

            // Find previous zoom level
            const currentIndex = zoomLevels.findIndex(
                (level) => Math.abs(level - zoomLevel) < 0.01,
            );
            if (currentIndex > 0) {
                setZoomLevel(zoomLevels[currentIndex - 1]);
            }
        } else {
            // NORMAL MODE: Incremental zoom with 50% minimum
            setZoomLevel((prev) => Math.max(0.5, prev - 0.5));
        }
    };

    const resetZoom = () => {
        if (isFullscreen) {
            // FULLSCREEN MODE: Reset to fit-to-height
            const viewportHeight = window.innerHeight;
            const imageHeight = 1500;
            const fitZoom = viewportHeight / imageHeight;
            setZoomLevel(fitZoom);
        } else {
            // NORMAL MODE: Reset to 100%
            setZoomLevel(1);
        }
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
        setZoomLevel(1);

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
        const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

        if (isMobile) {
            const cloudName = "dutoeewfl";
            const cleanPath = (
                hdImages[selectedImageIndex] || allImages[selectedImageIndex]
            ).replace(/^\//, "");
            return `https://res.cloudinary.com/${cloudName}/image/upload/${cleanPath}`;
        }

        // DESKTOP: Check if viewing a detail image
        const detailStartIndex = 2 + (artwork.images.croppedAlts?.length || 0);
        const isDetailImage = selectedImageIndex >= detailStartIndex;

        // For detail images: use HD version (2400px) for lightbox
        if (isDetailImage && selectedImageIndex < hdImages.length) {
            const hdImage = hdImages[selectedImageIndex];
            if (hdImage) {
                return getCloudinaryUrl(hdImage, "large");
            }
        }

        // For main composite: use progressive loading system (existing code)
        const hasHighRes = artwork.images.highRes;

        if (!hasHighRes) {
            const hdImage = hdImages[selectedImageIndex] || allImages[selectedImageIndex];
            return getCloudinaryUrl(hdImage, "large");
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

    // CHANGE TO (use medium versions for main display):
    const allImages = [
        artwork.images.main,
        ...(artwork.images.croppedAlts || []),
        ...(artwork.images.detailsMedium || artwork.images.details || []), // Use 1600px versions
    ];

    const thumbnailImages = [
        artwork.images.main, // Will need thumbnail version later
        ...(artwork.images.croppedAlts || []),
        ...(artwork.images.detailsThumb || []), // 400px thumbnails
    ];

    const hdImages = [
        artwork.images.main,
        ...(artwork.images.croppedAlts || []),
        ...(artwork.images.details || []), // 2400px HD versions
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
                <ChevronLeft size={40} strokeWidth={1} />
            </button>

            <button
                onClick={() => navigateToArtwork(nextArtwork.slug)}
                className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 transition-colors z-40"
                aria-label="Next artwork"
            >
                <ChevronRight size={40} strokeWidth={1} />
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
                                        {/* Main image thumbnail - first position */}
                                        <div
                                            className="relative aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => handleImageChange(0)} // Goes to main image
                                        >
                                            <Image
                                                src={getCloudinaryUrl(
                                                    artwork.images.main,
                                                    "medium",
                                                )} // Use small quality for now
                                                alt={`${artwork.title} - Main view`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Detail thumbnails */}
                                        {artwork.images.detailsThumb?.map((thumb, index) => {
                                            const imageIndex =
                                                2 +
                                                (artwork.images.croppedAlts?.length || 0) +
                                                index;
                                            return (
                                                <div
                                                    key={thumb}
                                                    className="relative aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => handleImageChange(imageIndex)}
                                                >
                                                    <Image
                                                        src={getCloudinaryUrl(thumb, "medium")}
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
                <div className="hidden md:block lg:hidden bg-white px-4 py-8">
                    <div className="grid grid-cols-10 gap-3 max-w-4xl mx-auto">
                        {/* Main image thumbnail - first position */}
                        <button
                            onClick={() => handleImageChange(0)}
                            className="relative aspect-[4/5] bg-neutral-100 overflow-hidden hover:opacity-80 transition-opacity"
                        >
                            <Image
                                src={getCloudinaryUrl(artwork.images.main, "medium")}
                                alt={`${artwork.title} - Main view`}
                                fill
                                className="object-cover"
                            />
                        </button>

                        {/* Detail thumbnails */}
                        {artwork.images.detailsThumb?.map((thumb, index) => {
                            const imageIndex =
                                2 + (artwork.images.croppedAlts?.length || 0) + index;
                            return (
                                <button
                                    key={thumb}
                                    onClick={() => handleImageChange(imageIndex)}
                                    className="relative aspect-[4/5] bg-neutral-100 overflow-hidden hover:opacity-80 transition-opacity"
                                >
                                    <Image
                                        src={getCloudinaryUrl(thumb, "medium")}
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
            {lightboxOpen &&
                (() => {
                    const detailStartIndex = 1 + (artwork.images.croppedAlts?.length || 0);
                    const isDetailImage = selectedImageIndex >= detailStartIndex;
                    const bgColor = isDetailImage ? "#ffffff" : "#e9e9e9";

                    return (
                        <div
                            className="fixed inset-0 z-50 overflow-auto"
                            style={{ backgroundColor: bgColor }}
                        >
                            <button
                                onClick={closeLightbox}
                                className="fixed top-4 right-8 text-neutral-800 hover:text-neutral-600 z-20"
                            >
                                <X size={40} strokeWidth={1} />
                            </button>
                            {/* Previous Image Arrow */}
                            {allImages.length > 1 && (
                                <button
                                    onClick={() => navigateLightboxImage("prev")}
                                    className="fixed left-6 top-1/2 -translate-y-1/2 text-neutral-800 hover:text-neutral-600 transition-colors z-20"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={40} strokeWidth={1} />
                                </button>
                            )}

                            {/* Next Image Arrow */}
                            {allImages.length > 1 && (
                                <button
                                    onClick={() => navigateLightboxImage("next")}
                                    className="fixed right-6 top-1/2 -translate-y-1/2 text-neutral-800 hover:text-neutral-600 transition-colors z-20"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={40} strokeWidth={1} />
                                </button>
                            )}

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
                                <button
                                    onClick={toggleFullscreen}
                                    className="bg-neutral-800/70 text-white px-3 py-2 rounded hover:bg-neutral-800/90 text-sm flex items-center justify-center gap-1"
                                    title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                >
                                    {isFullscreen ? (
                                        // Exit fullscreen icon (arrows pointing in)
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                        </svg>
                                    ) : (
                                        // Enter fullscreen icon (arrows pointing out)
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div
                                className="w-full min-h-screen flex items-center justify-center"
                                style={{ overflow: "auto" }}
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
                    );
                })()}

            {/* Detail Images Lightbox */}
            {detailLightboxOpen && artwork.images.details && (
                <div className="fixed inset-0 z-50 flex items-center justify-center py-10 lg:py-20 bg-white">
                    <button
                        onClick={closeDetailLightbox}
                        className="fixed top-4 right-4 text-neutral-800 hover:text-neutral-600 z-60"
                    >
                        <X size={32} />
                    </button>

                    {artwork.images.details.length > 1 && (
                        <button
                            onClick={() => navigateDetail("prev")}
                            className=" fixed right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 transition-colors z-40"
                        >
                            <ChevronLeft size={48} />
                        </button>
                    )}

                    {artwork.images.details.length > 1 && (
                        <button
                            onClick={() => navigateDetail("next")}
                            className="fixed right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 transition-colors z-40"
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
