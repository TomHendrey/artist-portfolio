"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

// Desktop hero images (≥1024px) - landscape with grey sidebar
const HERO_IMAGES_DESKTOP = [
    "v1762476069/hero-1_uuype3.jpg",
    "v1762476056/hero-2_gsog6d.jpg",
    "v1762527301/hero-5_hguuuz.jpg",
    "v1762531810/hero-14_vsudfh.jpg",
    "v1762595712/hero-17_fwpd79.jpg",
];

// Mobile/Tablet hero images (<1024px) - portrait/square crops
const HERO_IMAGES_MOBILE = [
    "v1762601265/hero-22-md_uteqnr.jpg", // REPLACE with your mobile versions
    "v1762602276/hero-24-md_dk8cml.jpg",
    "v1762601261/hero-31-md_ir9wys.jpg",
    "v1762601264/hero-25-md_fgw3qa.jpg",
    "v1762601266/hero-29-md_w9o3ec.jpg",
];

export default function HeroSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    // Detect screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // Check on mount
        checkMobile();

        // Check on resize
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Select image set based on screen size
    const HERO_IMAGES = isMobile ? HERO_IMAGES_MOBILE : HERO_IMAGES_DESKTOP;

    useEffect(() => {
        // Preload all hero images for smooth transitions
        HERO_IMAGES.forEach((imagePath) => {
            const img = new Image();
            img.src = getCloudinaryUrl(imagePath, "large");
        });
    }, [HERO_IMAGES]);

    useEffect(() => {
        // Rotate images every 20 seconds
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
            setNextImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 20000); // 20 seconds per image

        return () => clearInterval(interval);
    }, [HERO_IMAGES.length]);

    return (
        <>
            <style>{`
                @keyframes kenburns {
                    from {
                        transform: scale(1) translateZ(0);
                    }
                    to {
                        transform: scale(1.23) translateZ(0);
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
                                        backgroundPosition: isMobile ? "left center" : "center",
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
                        <h1 className="font-helvetica text-2xl xs:text-3xl md:text-5xl lg:text-3xl font-light mb-6 tracking-wide drop-shadow-lg lg:drop-shadow-none lg:max-w-[260px] xl:max-w-none 2xl:max-w-none ">
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
                            className="inline-flex items-center gap-2 lg:font-light bg-white text-neutral-800 lg:bg-neutral-900 lg:text-white px-8 py-3 hover:bg-neutral-100 lg:hover:bg-neutral-700 transition-colors duration-300 text-sm md:text-base"
                        >
                            View Works
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
