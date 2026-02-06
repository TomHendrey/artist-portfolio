"use client";

import { useState } from "react";
import Image from "next/image";

export default function About() {
    const [activeSection, setActiveSection] = useState<"about" | "writing" | "studio">("writing");

    return (
        <div className="pt-10 md:pt-16 min-h-screen bg-white">
            {/* Fixed Toggle Navigation - Three options */}
            <div className="py-6 px-6 max-w-5xl mx-auto">
                <div
                    className="mb-12 text-sm lg:ml-4"
                    style={{ fontFamily: "Courier New, monospace" }}
                >
                    <button
                        onClick={() => setActiveSection("writing")}
                        className={`${
                            activeSection === "writing"
                                ? "text-neutral-800 cursor-default"
                                : "text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                        }`}
                    >
                        Text
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
                        About
                    </button>
                    <span className="mx-2 text-neutral-400">|</span>

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
            ) : activeSection === "studio" ? (
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
                                <p>The Bartlette School Of Architecture - MA, Architecture</p>
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
            ) : (
                // TEXT SECTION - Alex's conceptual text
                <div className="px-6 max-w-4xl mx-auto pb-40">
                    {/* Studio Image */}
                    <div className="mb-16 max-w-[340px] sm:max-w-[320px] mx-0 ">
                        <Image
                            // src="https://res.cloudinary.com/dutoeewfl/image/upload/v1770314541/surface-2-g-front-3-16.jpg"
                            src="https://res.cloudinary.com/dutoeewfl/image/upload/v1770336902/text-5.jpg"
                            // src="https:res.cloudinary.com/dutoeewfl/image/upload/v1765331050/surface-1-closeup-2-16.jpg"
                            alt="Custom cutting machine"
                            width={1600}
                            height={1200}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Text Content */}
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
                                    Text
                                </h2>

                                <p>
                                    This project aims to integrate traditional and new media means
                                    in a way that reflects the true nature of contemporary mores and
                                    practice.
                                </p>

                                <p className="pt-4">
                                    Traditional mediums of art hold an adversarial stance towards
                                    technology; the critical and conceptual values we hold for them
                                    frame technological means as incompatible with our nature - a
                                    negation of mind and body that impedes the metaphysical and
                                    psychological transferences that the demands of traditional
                                    practice deploy.
                                </p>

                                <p className="pt-4">
                                    Reciprocally, technologically enabled art - new media - demands
                                    an alternative set of critical values and conceptual interests.
                                    Descending from the values of the Enlightenment and scientific
                                    revolutions, it rejects the notional soft quantities of
                                    traditional practice as petty, limited and irrelevant to
                                    contemporary mores and practice. It ignores its dependency and
                                    moral contingency on these modes, denying their potency and
                                    rendering them illegible.
                                </p>

                                <p className="pt-4">
                                    The dynamic is something of the elephant in the gallery where
                                    contemporary artists downplay or overstate the role and
                                    implications of technology, suggesting that their work is
                                    dissolvable from its context or the present reality of human
                                    consciousness.
                                </p>

                                <p className="pt-4">
                                    In this collaboration between Tom Hendrey and myself - Kendall
                                    White - we have explored this dynamic through genre, examining
                                    how tech at once connects and detaches us from perception and
                                    action, how the traditional notions of place and practice are
                                    altered by data culture and digital tools, and what the abstract
                                    implications are and the demands these must transfer to the
                                    practice of painting.
                                </p>

                                {/* Signature */}
                                <div className="mt-16 pt-8 border-t border-neutral-300">
                                    <p
                                        className="mt-12 text-base font-light text-neutral-800"
                                        style={{ fontFamily: "Inter, sans-serif" }}
                                    >
                                        - Kendall White 2026
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
