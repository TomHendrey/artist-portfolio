import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { artworks } from "@/data/artworks";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import HeroSection from "@/components/HeroSection";

export default function Home() {
    // Get first 3 artworks for featured section
    const featuredArtworks = artworks.slice(0, 3);
    const featuredSeriesName = "Surfaces";

    return (
        <div className="min-h-screen bg-white">
            {/* Dynamic Hero Section with rotating images */}
            <HeroSection />

            {/* Featured Works Preview - VERTICAL STACKED LAYOUT */}
            <section className="pt-30 pb-26 md:pt-60 md:pb-60 px-4 mx-auto max-w-[95%] md:max-w-[1400px]">
                <h2 className="text-left mb-10 md:mb-20">
                    <div className="text-2xl md:text-3xl font-light text-neutral-800 mb-2">
                        Featured Works
                    </div>
                    <div
                        className="text-base pt-2 text-neutral-600"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        {featuredSeriesName}
                    </div>
                </h2>

                <div className="space-y-32 md:space-y-60">
                    {featuredArtworks.map((artwork) => {
                        // Use featured image if available, otherwise use main image
                        const imageUrl = artwork.images.featured || artwork.images.main;
                        const mobileImageUrl = artwork.images.featuredMobile || artwork.images.main;

                        return (
                            <div key={artwork.id}>
                                <Link href={`/works/${artwork.slug}`} className="block">
                                    {/* Desktop/Tablet - horizontal cropping with WIDE featured image */}
                                    <div className="hidden md:block w-full bg-white relative overflow-hidden h-[650px] md:h-[850px]">
                                        <Image
                                            src={getCloudinaryUrl(imageUrl, "large")} // This uses the featured image
                                            alt={artwork.title}
                                            fill
                                            className="object-cover object-center"
                                            sizes="1400px"
                                            priority={artwork.id <= 3}
                                        />
                                    </div>

                                    {/* Mobile - proportional scaling with ORIGINAL main image */}
                                    <div className="block md:hidden w-full bg-white">
                                        <Image
                                            src={getCloudinaryUrl(mobileImageUrl, "large")} // Always use main, not featured
                                            alt={artwork.title}
                                            width={1200}
                                            height={1500}
                                            className="w-full h-auto"
                                            sizes="100vw"
                                            priority={artwork.id <= 3}
                                        />
                                    </div>
                                </Link>
                                <div className="space-y-1 pb-22 md:pb-0 mt-6">
                                    <Link href={`/works/${artwork.slug}`}>
                                        <h3 className="text-base pb-2 font-light text-neutral-800 hover:text-neutral-600 transition-colors">
                                            {artwork.title}
                                        </h3>
                                    </Link>
                                    <p
                                        className="text-sm text-neutral-600"
                                        style={{ fontFamily: "Courier New, monospace" }}
                                    >
                                        {artwork.medium}
                                    </p>

                                    <p
                                        className="text-sm text-neutral-500"
                                        style={{ fontFamily: "Courier New, monospace" }}
                                    >
                                        {artwork.dimensions}
                                    </p>
                                    <p
                                        className="text-sm text-neutral-600"
                                        style={{ fontFamily: "Courier New, monospace" }}
                                    >
                                        {artwork.year}{" "}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View Series Button */}
                <div className="mt-10 md:mt-20 text-left">
                    <Link
                        href="/works"
                        className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-800 px-8 py-3 hover:bg-neutral-800 hover:text-white transition-colors duration-300"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        View {featuredSeriesName}
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-20 px-6 bg-neutral-100">
                <div className="max-w-4xl mx-auto text-left-center">
                    <h2 className="text-3xl md:text-4xl font-light mb-12 text-neutral-800">
                        Studio
                    </h2>
                    <p
                        className="text-base  text-neutral-700 mb-14 leading-loose tracking-tight"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        H K W is the collaborative practice of artists Thomas Hendrey and Kendall
                        White. The studio explores contemporary painting by blending digital
                        processes and traditional painting techniques, investigating how the
                        collection and transformation of information shapes contemporary human
                        nature, in this transitional space between past and future modality of
                        thought and action.{" "}
                    </p>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-800 px-8 py-3 hover:bg-neutral-800 hover:text-white transition-colors duration-300"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        Read More
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
