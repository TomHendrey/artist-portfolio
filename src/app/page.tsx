import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section
                className="relative h-screen flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: "#f0f1f1" }}
            >
                <div
                    className="absolute inset-0 z-0 hidden md:block
                    "
                >
                    <div className="absolute right-8 md:right-16 lg:right-24 top-[53%] -translate-y-1/2 w-[600px] md:w-[750px] lg:w-[850px] h-[95vh]">
                        <Image
                            src="/images/Surface-1-bg5.jpg"
                            alt="Featured artwork"
                            fill
                            className="object-contain"
                            priority
                            quality={90}
                        />
                    </div>
                </div>

                <div className="relative z-10 text-center md:text-left text-neutral-700 px-4 max-w-7xl mx-auto w-full">
                    <div className="md:max-w-lg">
                        <h1 className="font-helvetica text-2xl md:text-5xl font-light mb-6 tracking-wide whitespace-nowrap">
                            Hendrey - Kendall White
                        </h1>
                        <p
                            className="text-xl md:text-2xl font-light mb-8"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            Contemporary Painting
                        </p>
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-800 px-8 py-3 hover:bg-neutral-800 hover:text-white transition-colors duration-300"
                        >
                            View Works
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Works Preview */}
            <section className="py-60 px-4 max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-light text-left mb-16 text-neutral-800">
                    Featured Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <Link
                            key={i}
                            href={`/portfolio`}
                            className="group relative aspect-[4/5] overflow-hidden bg-neutral-200"
                        >
                            <Image
                                src={`/images/featured-${i}.jpg`} // Replace with your images
                                alt={`Featured artwork ${i}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </Link>
                    ))}
                </div>
            </section>

            {/* About Preview */}
            <section className="py-30 px-4 bg-neutral-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-light mb-8 text-neutral-800">
                        About the Artists
                    </h2>
                    <p
                        className="text-lg text-neutral-600 mb-8 leading-relaxed"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur.{" "}
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
