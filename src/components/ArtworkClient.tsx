"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Artwork } from "@/data/artworks";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { artworks } from "@/data/artworks";
import { useRouter } from "next/navigation";

interface ArtworkClientProps {
    artwork: Artwork;
}

export default function ArtworkClient({ artwork }: ArtworkClientProps) {
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isImageTransitioning, setIsImageTransitioning] = useState(false);
    const [isEnteringFullscreen, setIsEnteringFullscreen] = useState(false); // Prevent resize handler during fullscreen transition

    // Progressive loading state (for main composite only)
    const [mediumResLoaded, setMediumResLoaded] = useState(false);
    const [ultraResLoaded, setUltraResLoaded] = useState(false);
    const [isLoadingHighRes, setIsLoadingHighRes] = useState(false);

    // Stores the fit zoom level for detail images
    const [fitZoomLevel, setFitZoomLevel] = useState(1);

    // Ref to track the scrollable lightbox container for maintaining zoom position
    const lightboxScrollRef = useRef<HTMLDivElement>(null);

    // ============================================
    // ZOOM CONFIGURATION - EASY TO ADJUST
    // ============================================
    const ZOOM_CONFIG = {
        // Main composite zoom levels (fixed values)
        MAIN_FULLSCREEN: 0.65,
        MAIN_NORMAL: 0.65,

        // Detail image zoom levels
        DETAIL_FULLSCREEN: 0.68, // Fixed: fills fullscreen perfectly
        DETAIL_NORMAL_PERCENTAGE: 0.9, // Percentage: 85% of screen height (responsive!)
        DETAIL_ZOOMED: 1.2, // Fixed: 120% clicked zoom

        // Max zoom level (fallback if artwork doesn't specify)
        MAIN_DEFAULT_MAX_ZOOM: 2.0,
    };

    const MAIN_ZOOM_LEVELS = [0.65, 1.0, 1.5, 2.0, 4.0, 6.0, 8.0];

    // Get max zoom for this artwork (use artwork's maxZoom or fallback to default)
    const maxZoom = artwork.maxZoom || ZOOM_CONFIG.MAIN_DEFAULT_MAX_ZOOM;

    // Filter zoom levels to only include those up to maxZoom
    const availableZoomLevels = MAIN_ZOOM_LEVELS.filter((level) => level <= maxZoom);

    // Helper function: Calculate responsive zoom for detail images in normal lightbox
    const calculateDetailNormalZoom = useCallback(() => {
        const viewportHeight = window.innerHeight;
        const baseHeight = 1500;

        // Calculate zoom that would fit perfectly
        const perfectFitZoom = viewportHeight / baseHeight;

        // Apply percentage to add padding
        return perfectFitZoom * ZOOM_CONFIG.DETAIL_NORMAL_PERCENTAGE;
    }, [ZOOM_CONFIG.DETAIL_NORMAL_PERCENTAGE]);

    // ============================================
    // CLEANUP ON UNMOUNT
    // ============================================
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

    // ============================================
    // PROGRESSIVE LOADING (Main Composite Only)
    // ============================================
    useEffect(() => {
        if (lightboxOpen && artwork.images.highRes) {
            console.log("🚀 Starting progressive loading for", artwork.title);
            setIsLoadingHighRes(true);
            setMediumResLoaded(false);
            setUltraResLoaded(false);

            if (artwork.images.highRes.medium) {
                preloadImage(artwork.images.highRes.medium, "Medium (18MB)")
                    .then(() => {
                        setMediumResLoaded(true);

                        if (artwork.images.highRes?.ultra) {
                            setTimeout(() => {
                                preloadImage(artwork.images.highRes!.ultra!, "Ultra (46MB)")
                                    .then(() => {
                                        setUltraResLoaded(true);
                                        setIsLoadingHighRes(false);
                                    })
                                    .catch((error) => {
                                        console.error("Ultra res load failed:", error);
                                        setIsLoadingHighRes(false);
                                    });
                            }, 500);
                        }
                    })
                    .catch((error) => {
                        console.error("Medium res load failed:", error);
                    });
            }
        }

        if (!lightboxOpen) {
            setMediumResLoaded(false);
            setUltraResLoaded(false);
            setIsLoadingHighRes(false);
        }
    }, [lightboxOpen, artwork.images.highRes, artwork.title]);

    // Load ultra quality when user zooms in past 2.5x
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

            preloadImage(artwork.images.highRes.ultra, "Ultra (46MB)")
                .then(() => {
                    setUltraResLoaded(true);
                    setIsLoadingHighRes(false);
                })
                .catch((error) => {
                    console.error("Ultra res load failed:", error);
                    setIsLoadingHighRes(false);
                });
        }
    }, [zoomLevel, lightboxOpen, ultraResLoaded, isLoadingHighRes, artwork.images.highRes]);

    // ============================================
    // HANDLE ESC KEY - exits fullscreen but keeps lightbox open
    // ============================================
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false);
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    // ============================================
    // HANDLE WINDOW RESIZE - recalculate detail zoom in non-fullscreen
    // ============================================
    useEffect(() => {
        // Block resize handler during fullscreen transitions
        if (!lightboxOpen || isFullscreen || isEnteringFullscreen) return;

        const handleResize = () => {
            const detailStartIndex = 1 + (artwork.images.croppedAlts?.length || 0);
            const isDetailImage = selectedImageIndex >= detailStartIndex;

            if (isDetailImage) {
                // Recalculate responsive zoom for detail images
                const newZoom = calculateDetailNormalZoom();
                setFitZoomLevel(newZoom);

                // Only update zoom if we're at the "fit" level (not zoomed in to 120%)
                const isAtFit = Math.abs(zoomLevel - fitZoomLevel) < 0.05;
                if (isAtFit) {
                    setZoomLevel(newZoom);
                }
            }
            // Main composite stays at fixed 0.65, no recalculation needed
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [
        lightboxOpen,
        isFullscreen,
        isEnteringFullscreen,
        selectedImageIndex,
        zoomLevel,
        fitZoomLevel,
        artwork.images.croppedAlts?.length,
        calculateDetailNormalZoom,
    ]);

    // ============================================
    // LIGHTBOX FUNCTIONS
    // ============================================

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
        setIsEnteringFullscreen(true); // Block resize handler during transition
        document.body.style.overflow = "hidden";
        document.body.style.backgroundColor = "#e9e9e9";

        const detailStartIndex = 1 + (artwork.images.croppedAlts?.length || 0);
        const isDetailImage = index >= detailStartIndex;

        // Set fullscreen zoom immediately (before any rendering)
        // This prevents flash of non-fullscreen zoom
        if (isDetailImage) {
            setFitZoomLevel(ZOOM_CONFIG.DETAIL_FULLSCREEN);
            setZoomLevel(ZOOM_CONFIG.DETAIL_FULLSCREEN);
        } else {
            setZoomLevel(ZOOM_CONFIG.MAIN_FULLSCREEN);
        }

        // Enter fullscreen after brief delay
        setTimeout(() => {
            if (document.documentElement.requestFullscreen) {
                document.documentElement
                    .requestFullscreen()
                    .then(() => {
                        setIsFullscreen(true);
                        setIsEnteringFullscreen(false); // Transition complete, allow resize handler
                        // Zoom already set correctly above
                    })
                    .catch((err) => {
                        console.log("Fullscreen request failed:", err);
                        setIsEnteringFullscreen(false); // Clear flag even if fullscreen fails
                    });
            } else {
                setIsEnteringFullscreen(false); // No fullscreen support, clear flag
            }
        }, 100);
    };

    const closeLightbox = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        setLightboxOpen(false);
        setIsFullscreen(false);
        document.body.style.overflow = "unset";
        document.body.style.backgroundColor = "";
    };

    const toggleFullscreen = () => {
        const detailStartIndex = 1 + (artwork.images.croppedAlts?.length || 0);
        const isDetailImage = selectedImageIndex >= detailStartIndex;

        if (!document.fullscreenElement) {
            // Enter fullscreen
            setIsEnteringFullscreen(true); // Block resize handler during transition
            document.documentElement
                .requestFullscreen()
                .then(() => {
                    setIsFullscreen(true);
                    setIsEnteringFullscreen(false); // Transition complete

                    if (isDetailImage) {
                        setFitZoomLevel(ZOOM_CONFIG.DETAIL_FULLSCREEN);
                        setZoomLevel(ZOOM_CONFIG.DETAIL_FULLSCREEN);
                    } else {
                        setZoomLevel(ZOOM_CONFIG.MAIN_FULLSCREEN);
                    }
                })
                .catch((err) => {
                    console.log("Fullscreen failed:", err);
                    setIsEnteringFullscreen(false); // Clear flag even if fullscreen fails
                });
        } else {
            // Exit fullscreen
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);

                if (isDetailImage) {
                    const detailZoom = calculateDetailNormalZoom();
                    setFitZoomLevel(detailZoom);
                    setZoomLevel(detailZoom);
                } else {
                    setZoomLevel(ZOOM_CONFIG.MAIN_NORMAL);
                }
            });
        }
    };

    // ============================================
    // IMAGE NAVIGATION
    // ============================================

    const navigateLightboxImage = (direction: "prev" | "next") => {
        const totalImages = allImages.length;

        if (direction === "prev") {
            const newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : totalImages - 1;
            handleImageChange(newIndex, true);
        } else {
            const newIndex = selectedImageIndex < totalImages - 1 ? selectedImageIndex + 1 : 0;
            handleImageChange(newIndex, true);
        }
    };

    const handleImageChange = (index: number, resetZoom: boolean = false) => {
        if (index === selectedImageIndex) return;

        setIsImageTransitioning(true);

        const newImageUrl = getCloudinaryUrl(allImages[index], "large");
        const img = document.createElement("img");

        img.onload = () => {
            setTimeout(() => {
                setSelectedImageIndex(index);

                if (resetZoom) {
                    const detailStartIndex = 1 + (artwork.images.croppedAlts?.length || 0);
                    const isDetailImage = index >= detailStartIndex;
                    const currentlyFullscreen = document.fullscreenElement !== null;

                    if (isDetailImage) {
                        const targetZoom = currentlyFullscreen
                            ? ZOOM_CONFIG.DETAIL_FULLSCREEN
                            : calculateDetailNormalZoom();
                        setFitZoomLevel(targetZoom);
                        setZoomLevel(targetZoom);
                    } else {
                        const targetZoom = currentlyFullscreen
                            ? ZOOM_CONFIG.MAIN_FULLSCREEN
                            : ZOOM_CONFIG.MAIN_NORMAL;
                        setZoomLevel(targetZoom);
                    }
                }

                setIsImageTransitioning(false);
            }, 250);
        };

        img.onerror = () => {
            console.error("Failed to preload image");
            setTimeout(() => {
                setSelectedImageIndex(index);

                if (resetZoom) {
                    const detailStartIndex = 1 + (artwork.images.croppedAlts?.length || 0);
                    const isDetailImage = index >= detailStartIndex;
                    const currentlyFullscreen = document.fullscreenElement !== null;

                    if (isDetailImage) {
                        const targetZoom = currentlyFullscreen
                            ? ZOOM_CONFIG.DETAIL_FULLSCREEN
                            : calculateDetailNormalZoom();
                        setFitZoomLevel(targetZoom);
                        setZoomLevel(targetZoom);
                    } else {
                        const targetZoom = currentlyFullscreen
                            ? ZOOM_CONFIG.MAIN_FULLSCREEN
                            : ZOOM_CONFIG.MAIN_NORMAL;
                        setZoomLevel(targetZoom);
                    }
                }

                setIsImageTransitioning(false);
            }, 250);
        };

        img.src = newImageUrl;
    };

    const handleThumbnailClick = (index: number) => {
        handleImageChange(index, true);
    };

    // ============================================
    // ZOOM CONTROLS
    // ============================================

    const handleImageClick = () => {
        const detailStartIndex = 1 + (artwork.images.croppedAlts?.length || 0);
        const isDetailImage = selectedImageIndex >= detailStartIndex;

        if (isDetailImage) {
            const currentlyFullscreen = document.fullscreenElement !== null;
            const fitZoom = currentlyFullscreen
                ? ZOOM_CONFIG.DETAIL_FULLSCREEN
                : calculateDetailNormalZoom();
            const isAtFit = Math.abs(zoomLevel - fitZoom) < 0.05;

            if (isAtFit) {
                setZoomLevel(ZOOM_CONFIG.DETAIL_ZOOMED);
            } else {
                setZoomLevel(fitZoom);
            }
        }
    };

    const zoomIn = () => {
        const detailStartIndex = 1 + (artwork.images.croppedAlts?.length || 0);
        const isDetailImage = selectedImageIndex >= detailStartIndex;

        if (isDetailImage) {
            const currentlyFullscreen = document.fullscreenElement !== null;
            const fitZoom = currentlyFullscreen
                ? ZOOM_CONFIG.DETAIL_FULLSCREEN
                : calculateDetailNormalZoom();
            if (Math.abs(zoomLevel - fitZoom) < 0.05) {
                setZoomLevel(ZOOM_CONFIG.DETAIL_ZOOMED);
            }
        } else {
            // Check if already at max zoom
            const isAtMaxZoom = zoomLevel >= maxZoom;
            if (isAtMaxZoom) return; // Don't zoom further

            // Main composite - maintain scroll position
            const container = lightboxScrollRef.current;
            let scrollPercentX = 0.5; // Default to center
            let scrollPercentY = 0.5;

            if (container) {
                // Calculate current scroll position as percentage
                scrollPercentX =
                    (container.scrollLeft + container.clientWidth / 2) / container.scrollWidth;
                scrollPercentY =
                    (container.scrollTop + container.clientHeight / 2) / container.scrollHeight;
            }

            const currentIndex = availableZoomLevels.findIndex((level) => level >= zoomLevel);
            const nextIndex = Math.min(currentIndex + 1, availableZoomLevels.length - 1);
            const newZoom = availableZoomLevels[nextIndex];

            setZoomLevel(newZoom);

            // Wait for render, then restore scroll position
            setTimeout(() => {
                if (container) {
                    const newScrollLeft =
                        scrollPercentX * container.scrollWidth - container.clientWidth / 2;
                    const newScrollTop =
                        scrollPercentY * container.scrollHeight - container.clientHeight / 2;
                    container.scrollLeft = newScrollLeft;
                    container.scrollTop = newScrollTop;
                }
            }, 0);
        }
    };

    const zoomOut = () => {
        const detailStartIndex = 1 + (artwork.images.croppedAlts?.length || 0);
        const isDetailImage = selectedImageIndex >= detailStartIndex;

        if (isDetailImage) {
            const currentlyFullscreen = document.fullscreenElement !== null;
            const fitZoom = currentlyFullscreen
                ? ZOOM_CONFIG.DETAIL_FULLSCREEN
                : calculateDetailNormalZoom();
            if (Math.abs(zoomLevel - ZOOM_CONFIG.DETAIL_ZOOMED) < 0.05) {
                setZoomLevel(fitZoom);
            }
        } else {
            // Main composite - maintain scroll position
            const container = lightboxScrollRef.current;
            let scrollPercentX = 0.5; // Default to center
            let scrollPercentY = 0.5;

            if (container) {
                // Calculate current scroll position as percentage
                scrollPercentX =
                    (container.scrollLeft + container.clientWidth / 2) / container.scrollWidth;
                scrollPercentY =
                    (container.scrollTop + container.clientHeight / 2) / container.scrollHeight;
            }

            const currentIndex = availableZoomLevels.findIndex((level) => level >= zoomLevel);
            const prevIndex = Math.max(currentIndex - 1, 0);
            const newZoom = availableZoomLevels[prevIndex];

            setZoomLevel(newZoom);

            // Wait for render, then restore scroll position
            setTimeout(() => {
                if (container) {
                    const newScrollLeft =
                        scrollPercentX * container.scrollWidth - container.clientWidth / 2;
                    const newScrollTop =
                        scrollPercentY * container.scrollHeight - container.clientHeight / 2;
                    container.scrollLeft = newScrollLeft;
                    container.scrollTop = newScrollTop;
                }
            }, 0);
        }
    };

    const resetZoom = () => {
        const detailStartIndex = 1 + (artwork.images.croppedAlts?.length || 0);
        const isDetailImage = selectedImageIndex >= detailStartIndex;
        const currentlyFullscreen = document.fullscreenElement !== null;

        if (isDetailImage) {
            const detailZoom = currentlyFullscreen
                ? ZOOM_CONFIG.DETAIL_FULLSCREEN
                : calculateDetailNormalZoom();
            setFitZoomLevel(detailZoom);
            setZoomLevel(detailZoom);
        } else {
            const mainZoom = currentlyFullscreen
                ? ZOOM_CONFIG.MAIN_FULLSCREEN
                : ZOOM_CONFIG.MAIN_NORMAL;
            setZoomLevel(mainZoom);
        }
    };

    // ============================================
    // IMAGE QUALITY HELPERS
    // ============================================

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

        const detailStartIndex = 1 + (artwork.images.croppedAlts?.length || 0);
        const isDetailImage = selectedImageIndex >= detailStartIndex;

        // For detail images: use HD version (2400px)
        if (isDetailImage && selectedImageIndex < hdImages.length) {
            const hdImage = hdImages[selectedImageIndex];
            if (hdImage) {
                return getCloudinaryUrl(hdImage, "large");
            }
        }

        // For main composite: use progressive loading system
        const hasHighRes = artwork.images.highRes;

        if (!hasHighRes) {
            const hdImage = hdImages[selectedImageIndex] || allImages[selectedImageIndex];
            return getCloudinaryUrl(hdImage, "large");
        }

        // Progressive quality switching based on zoom level
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

    // ============================================
    // IMAGE ARRAYS
    // ============================================

    // Main images - 1600px for display
    const allImages = [
        artwork.images.main,
        ...(artwork.images.croppedAlts || []),
        ...(artwork.images.detailsMedium || artwork.images.details || []),
    ];

    // HD images - 2400px for lightbox
    const hdImages = [
        artwork.images.main,
        ...(artwork.images.croppedAlts || []),
        ...(artwork.images.details || []),
    ];

    // ============================================
    // ARTWORK NAVIGATION
    // ============================================

    const router = useRouter();

    const currentIndex = artworks.findIndex((art) => art.id === artwork.id);
    const prevArtwork =
        currentIndex > 0 ? artworks[currentIndex - 1] : artworks[artworks.length - 1];
    const nextArtwork =
        currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : artworks[0];

    const navigateToArtwork = (slug: string) => {
        router.push(`/portfolio/${slug}`);
    };

    // ============================================
    // RENDER
    // ============================================

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

            {/* Main Layout */}
            <div className="flex flex-col md:flex-row transition-all duration-300 ease-in-out">
                {/* IMAGE SECTION */}
                <div className="w-full md:flex-[2] lg:min-w-[400px] order-1 md:order-2 transition-all duration-300 ease-in-out">
                    {/* Mobile + Tablet Header */}
                    <div className="md:hidden bg-white px-6 py-6 flex items-center justify-between">
                        <Link
                            href="/portfolio"
                            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors text-sm"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            <ArrowLeft size={16} strokeWidth={1} />
                            Back t
                        </Link>
                        <button
                            onClick={() => {
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

                    {/* Image Container */}
                    <div className="w-full h-auto md:h-[80vh] lg:h-screen bg-white flex items-center justify-center md:py-8 md:px-4 lg:py-6 lg:px-2">
                        <Image
                            src={getCloudinaryUrl(allImages[selectedImageIndex], "large")}
                            alt={`${artwork.title} - Featured View`}
                            width={1200}
                            height={1500}
                            className={`w-full h-auto md:w-auto md:h-auto md:max-w-full md:max-h-full object-contain cursor-zoom-in transition-opacity duration-500 ${isImageTransitioning ? "opacity-0" : "opacity-100"}`}
                            onClick={() => {
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

                {/* DETAILS SIDEBAR */}
                <div className="w-full md:flex-[0.8] lg:min-w-[260px] p-4 lg:p-12 bg-white order-2 md:order-1 transition-all duration-300 ease-in-out flex justify-center lg:justify-end">
                    <div className="w-full pb-40 max-w-[85%] transform">
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

                        {/* Details Section */}
                        <div className="pt-10 space-y-8 lg:space-y-10 md:mt-52 lg:mt-38">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-light text-neutral-800 mb-8 leading-tight">
                                    {artwork.title}
                                </h1>
                                <div
                                    className="space-y-2 text-neutral-600 mb-8"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    <p className="text-xs lg:text-sm">{artwork.medium}</p>
                                    <p className="text-xs lg:text-sm">{artwork.dimensions}</p>
                                    <p className="text-sm lg:text-sm">{artwork.year}</p>
                                </div>
                            </div>

                            {/* Description */}
                            {/* <div> */}
                            {/*     <p */}
                            {/*         className="text-neutral-600 leading-relaxed text-sm lg:text-sm" */}
                            {/*         style={{ fontFamily: "Courier New, monospace" }} */}
                            {/*     > */}
                            {/*         {artwork.description} */}
                            {/*     </p> */}
                            {/* </div> */}

                            {/* Buttons */}
                            <div className="flex gap-3 pt-10">
                                <Link
                                    href={`/contact?artwork=${encodeURIComponent(artwork.title)}`}
                                    className="inline-flex items-center justify-center bg-neutral-800 text-white px-6 py-2 hover:bg-neutral-700 transition-colors duration-300 text-xs lg:text-sm font-light"
                                >
                                    Enquire
                                </Link>

                                <button
                                    onClick={() => openLightbox(selectedImageIndex)}
                                    className="hidden md:inline-flex items-center justify-center border border-neutral-300 text-neutral-600 px-4 py-2 hover:border-neutral-800 hover:text-neutral-800 transition-colors duration-300 text-xs lg:text-sm font-light"
                                >
                                    View HD
                                </button>
                            </div>

                            {/* Previous/Next Navigation - Mobile Only */}
                            <div className="md:hidden flex gap-4 pt-4">
                                <button
                                    onClick={() => navigateToArtwork(prevArtwork.slug)}
                                    className="flex-1 flex items-center justify-center gap-2 border border-neutral-300 text-neutral-600 px-4 py-2 hover:border-neutral-800 hover:text-neutral-800 transition-colors text-xs"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    <ChevronLeft size={16} strokeWidth={1} />
                                    Prev
                                </button>
                                <button
                                    onClick={() => navigateToArtwork(nextArtwork.slug)}
                                    className="flex-1 flex items-center justify-center gap-2 border border-neutral-300 text-neutral-600 px-4 py-2 hover:border-neutral-800 hover:text-neutral-800 transition-colors text-xs"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    Next
                                    <ChevronRight size={16} strokeWidth={1} />
                                </button>
                            </div>

                            {/* Gallery - Mobile + Desktop */}
                            {artwork.images.details && artwork.images.details.length > 0 && (
                                <div className="block md:hidden lg:block mt-20 lg:mt-20">
                                    {/* Rest of gallery code stays the same */}
                                    {/* Mobile: full-width stacked */}
                                    <div className="md:hidden space-y-28">
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
                                        <div
                                            className="relative aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => handleThumbnailClick(0)}
                                        >
                                            <Image
                                                src={getCloudinaryUrl(
                                                    artwork.images.main,
                                                    "medium",
                                                )}
                                                alt={`${artwork.title} - Main view`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {artwork.images.detailsThumb?.map((thumb, index) => {
                                            const imageIndex =
                                                1 +
                                                (artwork.images.croppedAlts?.length || 0) +
                                                index;
                                            return (
                                                <div
                                                    key={thumb}
                                                    className="relative aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => handleThumbnailClick(imageIndex)}
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

            {/* Tablet Gallery */}
            {artwork.images.details && artwork.images.details.length > 0 && (
                <div className="hidden md:block lg:hidden bg-white px-4 py-8">
                    <div className="grid grid-cols-10 gap-3 max-w-4xl mx-auto">
                        <button
                            onClick={() => handleThumbnailClick(0)}
                            className="relative aspect-[4/5] bg-neutral-100 overflow-hidden hover:opacity-80 transition-opacity"
                        >
                            <Image
                                src={getCloudinaryUrl(artwork.images.main, "medium")}
                                alt={`${artwork.title} - Main view`}
                                fill
                                className="object-cover"
                            />
                        </button>

                        {artwork.images.detailsThumb?.map((thumb, index) => {
                            const imageIndex =
                                1 + (artwork.images.croppedAlts?.length || 0) + index;
                            return (
                                <button
                                    key={thumb}
                                    onClick={() => handleThumbnailClick(imageIndex)}
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
                            {/* Close button */}
                            {zoomLevel < 2.0 && (
                                <button
                                    onClick={closeLightbox}
                                    className="fixed top-4 right-8 text-neutral-800 hover:text-neutral-600 z-20"
                                >
                                    <X size={40} strokeWidth={1} />
                                </button>
                            )}

                            {/* Previous/Next arrows */}
                            {allImages.length > 1 && zoomLevel < 2.0 && (
                                <>
                                    <button
                                        onClick={() => navigateLightboxImage("prev")}
                                        className="fixed left-6 top-1/2 -translate-y-1/2 text-neutral-800 hover:text-neutral-600 transition-colors z-20"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={40} strokeWidth={1} />
                                    </button>

                                    <button
                                        onClick={() => navigateLightboxImage("next")}
                                        className="fixed right-6 top-1/2 -translate-y-1/2 text-neutral-800 hover:text-neutral-600 transition-colors z-20"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={40} strokeWidth={1} />
                                    </button>
                                </>
                            )}

                            {/* Zoom controls */}
                            {(() => {
                                const detailStartIndex =
                                    1 + (artwork.images.croppedAlts?.length || 0);
                                const isDetailImage = selectedImageIndex >= detailStartIndex;
                                const isAtFit = Math.abs(zoomLevel - fitZoomLevel) < 0.05;

                                if (isDetailImage) {
                                    // Detail image controls - minimal
                                    return (
                                        <div className="hidden lg:flex fixed top-4 left-4 flex-col gap-2 z-20">
                                            <button
                                                onClick={isAtFit ? zoomIn : zoomOut}
                                                className="text-neutral-800 hover:text-neutral-600 transition-colors flex items-center justify-center"
                                            >
                                                <span
                                                    className="text-5xl leading-none"
                                                    style={{ fontWeight: 100 }}
                                                >
                                                    {isAtFit ? "+" : "−"}
                                                </span>
                                            </button>

                                            <button
                                                onClick={toggleFullscreen}
                                                className="text-neutral-800 hover:text-neutral-600 transition-colors flex items-center justify-center relative"
                                                style={{ width: "40px", height: "40px" }}
                                                title={
                                                    isFullscreen
                                                        ? "Exit fullscreen"
                                                        : "Enter fullscreen"
                                                }
                                            >
                                                {isFullscreen ? (
                                                    <span
                                                        className="text-lg leading-none"
                                                        style={{
                                                            fontWeight: 100,
                                                            fontFamily: "system-ui",
                                                        }}
                                                    >
                                                        <span
                                                            className="absolute"
                                                            style={{ top: "6px", right: "6px" }}
                                                        >
                                                            ↙
                                                        </span>
                                                        <span
                                                            className="absolute"
                                                            style={{
                                                                bottom: "0px",
                                                                left: "6px",
                                                            }}
                                                        >
                                                            ↗
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="text-lg leading-none"
                                                        style={{
                                                            fontWeight: 100,
                                                            fontFamily: "system-ui",
                                                        }}
                                                    >
                                                        <span
                                                            className="absolute"
                                                            style={{ top: "6px", right: "6px" }}
                                                        >
                                                            ↗
                                                        </span>
                                                        <span
                                                            className="absolute"
                                                            style={{
                                                                bottom: "0px",
                                                                left: "6px",
                                                            }}
                                                        >
                                                            ↙
                                                        </span>
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    );
                                } else {
                                    // Main composite controls - full
                                    const isAtMaxZoom = zoomLevel >= maxZoom;

                                    return (
                                        <div
                                            className="hidden lg:flex fixed top-4 left-4 flex-col gap-2 z-20"
                                            style={{ width: "110px" }}
                                        >
                                            <button
                                                onClick={zoomIn}
                                                disabled={isAtMaxZoom}
                                                className={`bg-neutral-800/70 text-white px-3 py-2 rounded text-xs ${
                                                    isAtMaxZoom
                                                        ? "opacity-40 cursor-not-allowed"
                                                        : "hover:bg-neutral-800/90"
                                                }`}
                                            >
                                                + Zoom In
                                            </button>
                                            <button
                                                onClick={zoomOut}
                                                className="bg-neutral-800/70 text-white px-3 py-2 rounded hover:bg-neutral-800/90 text-xs"
                                            >
                                                - Zoom Out
                                            </button>
                                            <button
                                                onClick={resetZoom}
                                                className="bg-neutral-800/70 text-white px-3 py-2 rounded hover:bg-neutral-800/90 text-xs"
                                            >
                                                Reset
                                            </button>
                                            <div className="bg-neutral-800/70 text-white text-xs text-center px-3 py-2 rounded">
                                                {Math.round(zoomLevel * 100)}%
                                            </div>
                                            {allImages.length > 1 && zoomLevel >= 2.0 && (
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() =>
                                                            navigateLightboxImage("prev")
                                                        }
                                                        className="bg-neutral-800/70 text-white px-3 py-1.5 rounded hover:bg-neutral-800/90 flex items-center justify-center flex-1"
                                                        aria-label="Previous image"
                                                    >
                                                        <ChevronLeft size={20} strokeWidth={1.5} />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            navigateLightboxImage("next")
                                                        }
                                                        className="bg-neutral-800/70 text-white px-3 py-1.5 rounded hover:bg-neutral-800/90 flex items-center justify-center flex-1"
                                                        aria-label="Next image"
                                                    >
                                                        <ChevronRight size={20} strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                            )}

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={toggleFullscreen}
                                                    className="bg-neutral-800/70 text-white px-3 py-1 rounded hover:bg-neutral-800/90 flex items-center justify-center flex-1"
                                                    title={
                                                        isFullscreen
                                                            ? "Exit fullscreen"
                                                            : "Enter fullscreen"
                                                    }
                                                >
                                                    <span
                                                        className="relative"
                                                        style={{
                                                            width: "24px",
                                                            height: "24px",
                                                            display: "block",
                                                        }}
                                                    >
                                                        {isFullscreen ? (
                                                            <span
                                                                className="leading-none"
                                                                style={{
                                                                    fontWeight: 100,
                                                                    fontFamily: "system-ui",
                                                                }}
                                                            >
                                                                <span
                                                                    className="absolute"
                                                                    style={{
                                                                        top: "2px",
                                                                        right: "2px",
                                                                        fontSize: "12px",
                                                                    }}
                                                                >
                                                                    ↙
                                                                </span>
                                                                <span
                                                                    className="absolute"
                                                                    style={{
                                                                        bottom: "0px",
                                                                        left: "3px",
                                                                        fontSize: "12px",
                                                                    }}
                                                                >
                                                                    ↗
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className="leading-none"
                                                                style={{
                                                                    fontWeight: 100,
                                                                    fontFamily: "system-ui",
                                                                }}
                                                            >
                                                                <span
                                                                    className="absolute"
                                                                    style={{
                                                                        top: "2px",
                                                                        right: "2px",
                                                                        fontSize: "12px",
                                                                    }}
                                                                >
                                                                    ↗
                                                                </span>
                                                                <span
                                                                    className="absolute"
                                                                    style={{
                                                                        bottom: "0px",
                                                                        left: "2px",
                                                                        fontSize: "12px",
                                                                    }}
                                                                >
                                                                    ↙
                                                                </span>
                                                            </span>
                                                        )}
                                                    </span>
                                                </button>
                                                {zoomLevel >= 2.0 && (
                                                    <button
                                                        onClick={closeLightbox}
                                                        className="bg-neutral-800/70 text-white px-3 py-1 rounded hover:bg-neutral-800/90 flex items-center justify-center flex-1"
                                                        aria-label="Close"
                                                    >
                                                        <X size={20} strokeWidth={1.5} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                            })()}

                            {/* Image container */}
                            <div
                                ref={lightboxScrollRef}
                                className="w-full overflow-auto"
                                style={{
                                    height: "100vh",
                                    overflow: (() => {
                                        const detailStartIndex =
                                            1 + (artwork.images.croppedAlts?.length || 0);
                                        const isDetailImage =
                                            selectedImageIndex >= detailStartIndex;
                                        const isAtFit = Math.abs(zoomLevel - fitZoomLevel) < 0.05;
                                        if (isDetailImage && isFullscreen && isAtFit) {
                                            return "hidden";
                                        }
                                        return "auto";
                                    })(),
                                }}
                            >
                                <div
                                    className="flex items-center justify-center"
                                    style={{
                                        width: `${1200 * zoomLevel}px`,
                                        height: `${1500 * zoomLevel}px`,
                                        minWidth: "100%",
                                        minHeight: "100%",
                                    }}
                                >
                                    <Image
                                        src={getCurrentImageUrl()}
                                        alt={`${artwork.title} - ${getQualityDescription()}`}
                                        width={1200 * zoomLevel}
                                        height={1500 * zoomLevel}
                                        className={(() => {
                                            const detailStartIndex =
                                                1 + (artwork.images.croppedAlts?.length || 0);
                                            const isDetailImage =
                                                selectedImageIndex >= detailStartIndex;
                                            return isDetailImage
                                                ? "cursor-zoom-in"
                                                : "cursor-default";
                                        })()}
                                        style={{ maxWidth: "none", maxHeight: "none" }}
                                        onClick={handleImageClick}
                                        priority
                                        quality={95}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })()}
        </div>
    );
}
