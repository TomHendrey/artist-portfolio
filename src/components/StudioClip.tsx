"use client";

import { useEffect, useRef, useState } from "react";

interface StudioClipProps {
    /** Landscape cut, carrying f_auto,q_auto,ac_none,w_1280 */
    src: string;
    /** Landscape poster, same asset with so_<seconds> and .jpg */
    poster: string;
    /** Portrait cut for phones, carrying f_auto,q_auto,ac_none,w_1080 */
    srcMobile: string;
    /** Portrait poster */
    posterMobile: string;
    /** Described for screen readers: <video> has no alt attribute */
    label: string;
}

/**
 * Plays once when it scrolls into view, then stops on its last frame.
 *
 * Serves a portrait cut below the md breakpoint and a landscape one above it.
 * The choice is made on mount rather than on resize, because swapping src on a
 * playing video restarts it. A play marker sits over the clip whenever it is
 * not running, which covers reduced motion, refused autoplay, and the end.
 */
export default function StudioClip({
    src,
    poster,
    srcMobile,
    posterMobile,
    label,
}: StudioClipProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hasPlayed = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [chosen, setChosen] = useState<{ src: string; poster: string } | null>(null);

    // 767px is one below Tailwind's md, so this matches the md: classes below.
    useEffect(() => {
        const isPhone = window.matchMedia("(max-width: 767px)").matches;
        setChosen(isPhone ? { src: srcMobile, poster: posterMobile } : { src, poster });
    }, [src, poster, srcMobile, posterMobile]);

    useEffect(() => {
        if (!chosen) return;
        const video = videoRef.current;
        if (!video) return;

        // React will not render muted into server HTML, so set both the
        // property and the attribute before anything tries to play.
        video.muted = true;
        video.setAttribute("muted", "");

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting || hasPlayed.current) continue;
                    hasPlayed.current = true;
                    // Ignore rejection: some browsers still refuse, marker stays up.
                    video.play().catch(() => {});
                    observer.disconnect();
                }
            },
            // Fires before the clip is fully on screen so it has time to buffer.
            { threshold: 0.25, rootMargin: "25% 0px" },
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [chosen]);

    // Always from the start, whether this is a first play or a replay.
    const play = () => {
        const video = videoRef.current;
        if (!video) return;
        hasPlayed.current = true;
        video.currentTime = 0;
        video.play().catch(() => {});
    };

    return (
        <div className="mx-auto max-w-[420px] md:max-w-none">
            <div className="relative aspect-[9/16] md:aspect-video">
                <video
                    ref={videoRef}
                    src={chosen?.src}
                    poster={chosen?.poster}
                    muted
                    playsInline
                    preload="metadata"
                    onClick={play}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    aria-label={label}
                    className="h-full w-full cursor-pointer object-cover"
                />

                <button
                    type="button"
                    onClick={play}
                    aria-label={label}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                        isPlaying ? "pointer-events-none opacity-0" : "opacity-100"
                    }`}
                >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60">
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5 translate-x-[1px] fill-white/90"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
}
