import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { artworks } from "@/data/artworks";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import HeroSection from "@/components/HeroSection";

export default function Home() {
    // Get first 3 artworks for featured section
    const featuredArtworks = artworks.slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* Dynamic Hero Section with rotating images */}
            <HeroSection />

            {/* Featured Works Preview */}
            <section className="py-60 px-4 max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-light text-left mb-16 text-neutral-800">
                    Featured Works - Surfaces
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredArtworks.map((artwork) => (
                        <Link
                            key={artwork.id}
                            href={`/portfolio/${artwork.slug}`}
                            className="group relative aspect-[4/5] overflow-hidden bg-neutral-200"
                        >
                            <Image
                                src={getCloudinaryUrl(artwork.images.main, "medium")}
                                alt={artwork.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={artwork.id <= 3} // Prioritize featured images
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                            {/* Artwork info overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white font-light text-lg">{artwork.title}</h3>
                                <p className="text-white/80 text-sm">
                                    {artwork.year} • {artwork.medium}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* About Preview */}
            <section className="py-30 px-4 bg-neutral-100">
                <div className="max-w-4xl mx-auto text-left-center">
                    <h2 className="text-3xl md:text-4xl font-light mb-8 text-neutral-800">
                        About the Artist
                    </h2>
                    <p
                        className="text-lg text-neutral-600 mb-8 leading-relaxed"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        Hendrey Kendall White is the collaborative practice of Thomas Hendrey and
                        Alexander Kendall White. The studio explores contemporary painting by
                        blending digital processes and traditional painting techniques,
                        investigating how the collection and transformation of information shapes
                        our understanding of landscape.{" "}
                    </p>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-800 px-8 py-3 hover:bg-neutral-800 hover:text-white transition-colors duration-300"
                    >
                        Read More
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
