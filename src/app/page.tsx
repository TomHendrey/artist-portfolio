import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { artworks } from "@/data/artworks";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import HeroSection from "@/components/HeroSection";

export default function Home() {
    // Get first 3 artworks for featured section
    const featuredArtworks = artworks.slice(0, 3);
    const featuredSeriesName = "Surfaces"; // Change this to update throughout

    return (
        <div className="min-h-screen">
            {/* Dynamic Hero Section with rotating images */}
            <HeroSection />

            {/* Featured Works Preview - VERTICAL STACKED LAYOUT */}
            <section className="py-60 px-4 mx-auto" style={{ maxWidth: "45rem" }}>
                <h2 className="text-left mb-20">
                    <div className="text-2xl md:text-3xl font-light text-neutral-800 mb-6">
                        Featured Works
                    </div>
                    <div
                        className="text-lg md:text-xl text-neutral-600"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        {featuredSeriesName}
                    </div>
                </h2>

                <div className="space-y-40">
                    {featuredArtworks.map((artwork) => (
                        <div key={artwork.id}>
                            <Link href={`/portfolio/${artwork.slug}`} className="block">
                                <div className="w-full bg-white">
                                    <Image
                                        src={getCloudinaryUrl(artwork.images.main, "large")}
                                        alt={artwork.title}
                                        width={1200}
                                        height={1500}
                                        className="w-full h-auto"
                                        sizes="(max-width: 768px) 100vw, 80vw"
                                        priority={artwork.id <= 3}
                                    />
                                </div>
                            </Link>
                            <div className="space-y-1 pb-22 md:pb-0 mt-6">
                                <Link href={`/portfolio/${artwork.slug}`}>
                                    <h3 className="text-base pb-1 font-light text-neutral-800 hover:text-neutral-600 transition-colors">
                                        {artwork.title}
                                    </h3>
                                </Link>
                                <p
                                    className="text-sm text-neutral-600"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    {artwork.year} • {artwork.medium}
                                </p>
                                <p
                                    className="text-sm text-neutral-500"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    {artwork.dimensions}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View Series Button */}
                <div className="mt-20 text-left">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-800 px-8 py-3 hover:bg-neutral-800 hover:text-white transition-colors duration-300"
                    >
                        View {featuredSeriesName}
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-30 px-4 bg-neutral-100">
                <div className="max-w-4xl mx-auto text-left-center">
                    <h2 className="text-3xl md:text-4xl font-light mb-8 text-neutral-800">
                        Studio
                    </h2>
                    <p
                        className="text-lg text-neutral-600 mb-8 leading-relaxed"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        Hendrey Kendall White is the collaborative practice of Thomas Hendrey and
                        Alexander Kendall White. The studio explores contemporary painting by
                        blending digital processes and traditional painting techniques,
                        investigating how the collection and transformation of information shapes
                        our understanding of the world.{" "}
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
