"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

// Hero images - easy to update with your close-up detail shots
const HERO_IMAGES = [
    "v1762476069/hero-1_uuype3.jpg",
    "v1762476056/hero-2_gsog6d.jpg",
    "v1762527301/hero-5_hguuuz.jpg",
    "v1762531810/hero-14_vsudfh.jpg",
    "v1762595712/hero-17_fwpd79.jpg",
];

export default function HeroSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState(1);

    useEffect(() => {
        // Preload all hero images for smooth transitions
        HERO_IMAGES.forEach((imagePath) => {
            const img = new Image();
            img.src = getCloudinaryUrl(imagePath, "large");
        });
    }, []);

    useEffect(() => {
        // Rotate images every 20 seconds
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
            setNextImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 20000); // 20 seconds per image

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <style>{`
                @keyframes kenburns {
    from {
        transform: scale(1) translateZ(0);  // Start zoomed OUT
    }
    to {
        transform: scale(1.1) translateZ(0);  // End just slightly zoomed in
    }
}
                
                .kenburns-active {
                    animation: kenburns 102s linear infinite;
                    will-change: transform;
                }
            `}</style>

            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Rotating background images with Ken Burns zoom effect */}
                <div className="absolute inset-0">
                    {HERO_IMAGES.map((imagePath, index) => {
                        const isActive = index === currentImageIndex;
                        return (
                            <div
                                key={`${imagePath}-${index}`}
                                className={`absolute inset-0 transition-opacity duration-[3000ms] ${
                                    isActive
                                        ? "opacity-100 z-10"
                                        : index === nextImageIndex
                                          ? "opacity-0 z-5"
                                          : "opacity-0 z-0"
                                }`}
                            >
                                <div
                                    key={`inner-${index}`}
                                    className="w-full h-full kenburns-active"
                                    style={{
                                        backgroundImage: `url(${getCloudinaryUrl(imagePath, "large")})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backfaceVisibility: "hidden",
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Text content overlay */}
                <div className="relative z-10 text-center lg:text-left text-white lg:text-neutral-900 px-6 md:px-8 lg:pl-10 xl:pl-10 2xl:pl-35 lg:pr-[60%] w-full">
                    <div className="">
                        <h1 className="font-helvetica text-3xl md:text-5xl lg:text-3xl font-light mb-6 tracking-wide drop-shadow-lg lg:drop-shadow-none lg:max-w-[260px] xl:max-w-none 2xl:max-w-none">
                            Hendrey - Kendall White
                        </h1>
                        <p
                            className="text-xl md:text-2xl lg:text-[17px] xl:text-xl font-light mb-8 drop-shadow-lg lg:drop-shadow-none"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            Contemporary Painting
                        </p>
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 bg-white text-neutral-800 lg:bg-neutral-900 lg:text-white px-8 py-3 hover:bg-neutral-100 lg:hover:bg-neutral-800 transition-colors duration-300 text-sm md:text-base"
                        >
                            View Works
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
