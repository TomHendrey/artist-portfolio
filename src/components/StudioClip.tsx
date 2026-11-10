"use client";

import { useEffect, useRef, useState } from "react";

interface StudioClipProps {
    /** Cloudinary video URL, already carrying f_auto,q_auto,ac_none,w_1280 */
    src: string;
    /** Poster frame, same asset with so_<seconds> and .jpg */
    poster: string;
    /** Described for screen readers: <video> has no alt attribute */
    label: string;
}

/**
 * Plays once when it scrolls into view, then stops on its last frame.
 *
 * A play marker sits over the clip whenever it is not running, which covers
 * three cases: visitors with Reduce motion enabled who never get the autoplay,
 * browsers that refuse it anyway, and everyone once the clip has finished and
 * is holding its last frame. The marker is a button so it can be tabbed to.
 */
export default function StudioClip({ src, poster, label }: StudioClipProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hasPlayed = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
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
    }, []);

    // Always from the start, whether this is a first play or a replay.
    const play = () => {
        const video = videoRef.current;
        if (!video) return;
        hasPlayed.current = true;
        video.currentTime = 0;
        video.play().catch(() => {});
    };

    return (
        <div className="relative">
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                muted
                playsInline
                preload="metadata"
                onClick={play}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                aria-label={label}
                className="w-full h-auto cursor-pointer"
            />

            <button
                type="button"
                onClick={play}
                aria-label={label}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px] fill-white/90">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </span>
            </button>
        </div>
    );
}
