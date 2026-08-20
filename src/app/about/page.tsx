"use client";

import { useState } from "react";
import Image from "next/image";

export default function About() {
    const [activeSection, setActiveSection] = useState<"about" | "studio">("studio"); // Changed default to "studio"

    return (
        <div className="pt-10 md:pt-16 min-h-screen bg-white">
            {/* Fixed Toggle Navigation - Three options */}
            <div className="py-6 px-6 max-w-5xl mx-auto">
                <div className="mb-12 text-sm " style={{ fontFamily: "Courier New, monospace" }}>
                    <button
                        onClick={() => setActiveSection("studio")}
                        className={`${
                            activeSection === "studio"
                                ? "text-neutral-800 cursor-default"
                                : "text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                        }`}
                    >
                        Studio
                    </button>

                    <span className="mx-2 text-neutral-400">|</span>

                    <button
                        onClick={() => setActiveSection("about")}
                        className={`${
                            activeSection === "about"
                                ? "text-neutral-800 cursor-default"
                                : "text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                        }`}
                    >
                        About - Surfaces {/* Changed from "About" */}
                    </button>
                </div>
            </div>

            {activeSection === "about" ? (
                // ABOUT SECTION - Surfaces text with images
                <div className="px-6 max-w-4xl mx-auto pb-20">
                    {/* Studio Image */}
                    <div className="mb-16 max-w-[340px] sm:max-w-[320px] mx-0 ">
                        <Image
                            src="https://res.cloudinary.com/dutoeewfl/image/upload/v1770335700/image-asset-7.jpg"
                            alt="Custom cutting machine"
                            width={1600}
                            height={1200}
                            className="w-full h-auto"
                        />
                    </div>
                    {/* About Content */}
                    <div>
                        {/* Body Text */}
                        <div
                            className="space-y-8 text-neutral-800 md:text-neutral-700 leading-loose text-[16px] md:text-[15px] tracking-tighter md:tracking-tight"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            <div className="space-y-8">
                                <h2
                                    className="text-3xl font-light mt-20 mb-16 text-neutral-800 tracking-tight"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    About
                                </h2>

                                <p>
                                    On July 15, 1965, NASA&apos;s Mariner 4 transmitted the first
                                    close-up images of Mars from approximately 10,500 miles away.
                                    The spacecraft sent data back to Earth over 8.5 hours as a
                                    series of binary numbers representing brightness values across a
                                    200-pixel grid. At JPL, engineers couldn&apos;t wait for
                                    official photographic processing. Instead, they hand-coloured a
                                    printout of the raw numerical data, using pencils to shade
                                    squares according to the transmitted values. Engineers with
                                    pencils, translating numbers into a visible landscape. This act
                                    revealed Mars as a cratered, moon-like surface.
                                </p>

                                <div className="my-30  max-w-[340px] sm:max-w-[320px] mx-0 ">
                                    <Image
                                        src="https://res.cloudinary.com/dutoeewfl/image/upload/v1770213259/nasa-mars-7.jpg"
                                        alt="Custom cutting machine"
                                        width={1600}
                                        height={1200}
                                        className="w-full h-auto"
                                    />
                                    <div className="text-xs text-neutral-400 mt-4">
                                        Engineers at JPL hand-coloring the first ever colour image
                                        of the surface of Mars, 1965
                                    </div>
                                </div>

                                <p className="pt-4">
                                    Thirteen years later, French astrophysicist Jean-Pierre Luminet
                                    used a 1960s IBM 7040 computer to calculate the appearance of a
                                    black hole, then plotted the results by hand with ink on paper,
                                    creating the first visualisation of a phenomenon that had never
                                    been directly observed.
                                </p>
                                <p className="pt-4">
                                    These moments represent something fundamental: the
                                    transformation of invisible information into visible form. Data
                                    is collected through instruments, transmitted across vast
                                    distances as electromagnetic signals, converted into numerical
                                    values, processed, and finally displayed as images we can
                                    comprehend. Each stage is a translation between different states
                                    of information.
                                </p>

                                {/* Luminet Black Hole Image - left aligned */}
                                <div className="my-30 max-w-3xl">
                                    <Image
                                        src="https://res.cloudinary.com/dutoeewfl/image/upload/v1770074251/blackhole-12.jpg"
                                        alt="Jean-Pierre Luminet's hand-plotted black hole simulation, 1978"
                                        width={1600}
                                        height={1200}
                                        className="w-full h-auto"
                                    />
                                    <p className="text-xs text-neutral-400 mt-4">
                                        Jean-Pierre Luminet&apos;s hand-plotted black hole
                                        simulation, 1978
                                    </p>
                                </div>

                                <p className="pt-4">
                                    This process is inherently imperfect. Signals degrade across
                                    distance, introducing noise and distortion. Bandwidth
                                    limitations compress and pixelate. Transmission errors create
                                    artifacts. Yet these imperfections have become a language of
                                    their own. Scan lines, compression artifacts, colour shifts, and
                                    digital noise are not simply failures but signatures of the
                                    technological process itself. They tell us not just what we are
                                    seeing, but how we are seeing it.
                                </p>

                                <p className="pt-4">
                                    The paintings in this series are physical embodiments of this
                                    information chain. Like the hand-coloured Mariner printouts or
                                    Luminet&apos;s plotted calculations, they translate transmitted
                                    data, in this case from Mars, through manual processes:
                                    algorithmic cutting paths combined with oil paint applied and
                                    layered by hand. By the time these images become completed
                                    paintings, they are already many steps removed from their
                                    source. Each painting is an image of a distant world, but also a
                                    record of everything required to make it visible.
                                </p>

                                <p className="pb-30 pt-4">
                                    Painting has always been a system for encoding and transmitting
                                    information across time and space, a way of making the invisible
                                    or distant present. These works extend that tradition into a
                                    contemporary technology driven world. They are records of our
                                    compulsion to extend perception beyond its natural limits, to
                                    transform the unreachable into something we can see and
                                    contemplate.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // STUDIO SECTION - Practical info
                <div className="px-6 max-w-4xl mx-auto pb-20">
                    {/* Studio Image */}
                    <div className="mb-16 max-w-[340px] sm:max-w-[320px] mx-0 ">
                        <Image
                            src="https://res.cloudinary.com/dutoeewfl/image/upload/v1770303228/machine-1.jpg"
                            alt="Custom cutting machine"
                            width={1600}
                            height={1200}
                            className="w-full h-auto"
                        />
                    </div>
                    {/* Studio Content */}
                    <div>
                        {/* Body Text */}
                        <div
                            className="space-y-8 text-neutral-800 md:text-neutral-700 leading-loose text-[16px] md:text-[15px] tracking-tighter md:tracking-tight"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            <div className="space-y-8">
                                <h2
                                    className="text-3xl font-light mt-20 mb-16 text-neutral-800 tracking-tight"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    Studio
                                </h2>

                                <p>
                                    H K W is the collaborative practice of artists Thomas Hendrey
                                    and Kendall White. The studio explores contemporary painting by
                                    blending digital processes and traditional painting techniques,
                                    investigating how the collection and transformation of
                                    information shapes contemporary human nature, in this
                                    transitional space between past and future modality of thought
                                    and action.
                                </p>
                            </div>
                        </div>
                        {/* Placeholder for future content */}
                        <div className="pt-20 space-y-2 text-neutral-700 ">
                            <p>Alex Kendall White</p>
                            <div
                                className="text-neutral-500 text-sm"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                <p>The Bartlett School Of Architecture - MA, Architecture</p>
                                {/* <p>University Of Kent - BA, Architecture</p> */}
                            </div>
                        </div>
                        {/* Placeholder for future content */}
                        <div className="pt-8 space-y-2 text-neutral-700 ">
                            <p>Thomas Hendrey</p>
                            <div
                                className="text-neutral-500 text-sm"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                <p>Camberwell College of Arts - BA, Fine Art</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
