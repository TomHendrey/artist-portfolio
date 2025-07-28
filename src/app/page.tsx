import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/Surface-1-bg.jpg" // Replace with your hero image
                        alt="Featured artwork"
                        fill
                        className="object-cover object-top"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="relative z-10 text-left text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-wide">
                        Hendrey - Kendall White
                    </h1>
                    <p className="text-xl md:text-2xl text-left font-light mb-8 max-w-2xl ">
                        Contemporary Painting
                    </p>
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-none hover:bg-neutral-100 transition-colors duration-300"
                    >
                        View Works
                        <ArrowRight size={18} />
                    </Link>
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
                    <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                        Brief introduction about your artistic practice, inspiration, and
                        background. Keep this concise but engaging to draw visitors into your full
                        story.
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
