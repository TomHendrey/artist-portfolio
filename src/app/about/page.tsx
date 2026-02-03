"use client";

import { useState } from "react";
import Image from "next/image";

export default function About() {
    const [activeSection, setActiveSection] = useState<"about" | "writing">("about");

    return (
        <div className="pt-16 min-h-screen bg-white">
            {/* Fixed Toggle Navigation - Outside both containers */}
            <div className="py-6 px-6 max-w-5xl mx-auto">
                <div className="mb-8 text-sm" style={{ fontFamily: "Courier New, monospace" }}>
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
                        onClick={() => setActiveSection("writing")}
                        className={`${
                            activeSection === "writing"
                                ? "text-neutral-800 cursor-default"
                                : "text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                        }`}
                    >
                        Writing
                    </button>
                </div>
            </div>

            {activeSection === "about" ? (
                // ABOUT SECTION - Clean white background
                <div className="px-6 max-w-5xl mx-auto pb-20">
                    {/* About Content */}
                    <div>
                        {/* Title Section */}
                        <div className="mb-26">
                            <h1
                                className="text-4xl font-light mb-2 text-neutral-800 tracking-tight"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                About
                            </h1>
                            <div className="w-36 h-px bg-neutral-800 mb-12"></div>
                        </div>

                        {/* Body Text */}
                        <div
                            className="space-y-7 text-neutral-600 leading-relaxed text-base "
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            <p>
                                Hendrey Kendall White is the collaborative practice of artists
                                Thomas Hendrey and Alexander Kendall White. The studio explores
                                contemporary painting by blending digital processes and traditional
                                painting techniques, investigating how the collection and
                                transformation of information shapes our understanding of the world.
                            </p>

                            <div className="my-12">
                                <h2
                                    className="text-2xl font-light mb-8 text-neutral-800 tracking-tight"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    Surfaces
                                </h2>

                                <div className="space-y-7">
                                    <p>
                                        Painting transforms observed reality into material marks
                                        that can be read by others - it is, fundamentally, a system
                                        for encoding and transmitting information across time and
                                        space. In this way, it shares something essential with all
                                        image-making technologies: the conversion of one form of
                                        information into another, the translation of the invisible
                                        or distant into something present and visible.
                                    </p>

                                    <p>
                                        On July 15, 1965, NASA&apos;s Mariner 4 transmitted the
                                        first close-up images of Mars from approximately 10,500
                                        miles away. The spacecraft sent data back to Earth over 8.5
                                        hours as a series of binary numbers representing brightness
                                        values across a 200-pixel grid. At JPL, engineers
                                        couldn&apos;t wait for the official photographic processing
                                        and instead hand-colored a printout of the raw numerical
                                        data, using colored pencils to shade squares according to
                                        the transmitted values. This act - engineers with pencils
                                        translating numbers into a visible landscape - revealed Mars
                                        as a cratered, moon-like surface. Thirteen years later,
                                        French astrophysicist Jean-Pierre Luminet used a 1960s IBM
                                        7040 computer to calculate the appearance of a black hole,
                                        then plotted the results by hand with ink on paper, creating
                                        the first visualization of a phenomenon that had never been
                                        directly observed.
                                    </p>

                                    {/* Mariner 4 Image */}
                                    <div className="my-12">
                                        <Image
                                            src="https://res.cloudinary.com/dutoeewfl/image/upload/v1770074195/Mars-Mariner4-2-16.jpg"
                                            alt="Engineers at JPL hand-coloring the first Mariner 4 Mars image, 1965"
                                            width={1600}
                                            height={1200}
                                            className="w-full h-auto"
                                        />
                                        <p className="text-sm text-neutral-500 mt-2 italic">
                                            Engineers at JPL hand-coloring the first Mariner 4 Mars
                                            image, 1965
                                        </p>
                                    </div>

                                    <p>
                                        These moments represent a fundamental process: the
                                        transformation of invisible information into visible form.
                                        The collection of data through instruments, its transmission
                                        across vast distances as electromagnetic signals, conversion
                                        into numerical values, augmentation through processing, and
                                        finally display as images we can comprehend. Each stage is a
                                        translation, a conversion between different states of
                                        information. The Viking landers in 1976 demonstrated this
                                        dramatically when engineers repeatedly adjusted the first
                                        color images from Mars&apos;s surface because the sky
                                        appeared an impossible butterscotch pink rather than the
                                        expected Earth-like blue, revealing how deeply our internal
                                        models of reality shape our interpretation of raw data.
                                    </p>

                                    {/* Luminet Black Hole Image */}
                                    <div className="my-12">
                                        <Image
                                            src="https://res.cloudinary.com/dutoeewfl/image/upload/v1770074251/blackhole-12.jpg"
                                            alt="Jean-Pierre Luminet's hand-plotted black hole simulation, 1978"
                                            width={1600}
                                            height={1200}
                                            className="w-full h-auto"
                                        />
                                        <p className="text-sm text-neutral-500 mt-2 italic">
                                            Jean-Pierre Luminet&apos;s hand-plotted black hole
                                            simulation, 1978
                                        </p>
                                    </div>

                                    <p>
                                        This process is inherently imperfect. Signals degrade across
                                        distance, introducing noise and distortion. Bandwidth
                                        limitations compress and pixelate. Transmission errors
                                        create artifacts and glitches. Yet these imperfections have
                                        become a language of their own - scan lines, compression
                                        artifacts, color shifts, and digital noise are not simply
                                        failures but signatures of the technological process itself.
                                        They tell us not just what we are seeing, but how we are
                                        seeing it. The grainy texture of early Mars images, the
                                        banded structure of transmitted data, the peculiar color
                                        casts of processed imagery - these are the visual markers of
                                        information that has traveled millions of miles and been
                                        transformed multiple times between collection and display.
                                    </p>

                                    <p>
                                        The paintings in this series are physical embodiments of
                                        this information chain. Like the hand-colored Mariner
                                        printouts or Luminet&apos;s plotted calculations, they
                                        translate transmitted cosmic data through manual processes,
                                        combining algorithmic cutting paths with traditional oil
                                        pastel application. The source imagery - Mars surface scans,
                                        orbital photographs, rover panoramas - has already undergone
                                        numerous transformations before becoming paint on canvas.
                                        The work preserves and amplifies the artifacts of
                                        transmission: the compression, the color adjustments, the
                                        digital-to-analog conversions. Each painting is
                                        simultaneously an image of Mars and a record of all the
                                        technological and human interventions required to make that
                                        distant landscape visible.
                                    </p>

                                    {/* Your Paintings - could be multiple images */}
                                    {/* <div className="my-12 space-y-8"> */}
                                    {/*     <div> */}
                                    {/*         <Image */}
                                    {/*             src="https://res.cloudinary.com/dutoeewfl/image/upload/v1765331076/surface-1-closeup-1-24.jpg" */}
                                    {/*             alt="Surfaces series painting detail" */}
                                    {/*             width={1600} */}
                                    {/*             height={1200} */}
                                    {/*             className="w-full h-auto" */}
                                    {/*         /> */}
                                    {/*     </div> */}
                                    {/*     <div> */}
                                    {/*         <Image */}
                                    {/*             src="https://res.cloudinary.com/dutoeewfl/image/upload/v1767658373/surface-2-main-6.jpg" */}
                                    {/*             alt="Surfaces series painting with scan lines visible" */}
                                    {/*             width={1600} */}
                                    {/*             height={1000} */}
                                    {/*             className="w-full h-auto" */}
                                    {/*         /> */}
                                    {/*     </div> */}
                                    {/* </div> */}

                                    <p>
                                        Painting has always been a technology for transmitting
                                        information across distance and time - encoding
                                        three-dimensional space, light, atmosphere, and presence
                                        into pigment on a two-dimensional surface. These works
                                        extend that tradition into the realm of data transmission
                                        and computational imaging. They ask what it means to see
                                        something that cannot be directly perceived, to know a place
                                        that cannot be physically inhabited, to translate
                                        electromagnetic signals into material form. In capturing not
                                        just the landscape but the entire apparatus of seeing - the
                                        cameras, the transmission systems, the processing
                                        algorithms, the display technologies - they become artifacts
                                        of humanity&apos;s drive to extend perception beyond the
                                        limits of the body, to materialize the invisible, to make
                                        the distant present.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // WRITING SECTION - Paper texture container
                <div className="px-6 flex justify-center pb-20">
                    <div
                        className="w-full max-w-5xl px-6 py-12 md:px-20 md:py-16"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.07'/%3E%3C/svg%3E")`,
                            backgroundColor: "#fdfdfb",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                        }}
                    >
                        {/* Title Section */}
                        <div className="mb-26">
                            <h1
                                className="text-4xl md:text-4xl font-light mb-2 text-neutral-800 tracking-tight"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Surfaces
                            </h1>
                            <div className="w-36 h-px bg-neutral-800 mb-12"></div>
                        </div>

                        {/* Body Text */}
                        <div>
                            <div
                                className="space-y-7 text-neutral-600 leading-relaxed text-base "
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                <p>
                                    We are all obliged to engage with our reality - but the nature
                                    of that reality is increasingly defined in detachment from us -
                                    it is reported to us outside of our faculties and experiences.
                                    Our navigation of that reality - our activities of every kind,
                                    are mediated by the same data systems and digital tools…
                                </p>

                                <p className="indent-[1em]">
                                    Tech at once enables and connects but it is equally a detaching
                                    force that negates our faculties, denudes our lives of
                                    immaterial notions. We are conflicted about its desirability or
                                    indeed capability. The general embrace of tech is not reflected
                                    in art. Traditional modes of art are increasingly technophobic.
                                </p>

                                <p className="indent-[1em]">
                                    When we approach genre painting - that is work that explores
                                    &apos;human centric reality&apos;, it has become a ritual act -
                                    self referential field increasingly irrelevant to its actors and
                                    audiences. The choice of painting demands the direct use of an
                                    individual&apos;s faculties: that is the result will be a
                                    reflection of their consciousness, their sense perception, their
                                    active capabilities.
                                </p>

                                <p className="indent-[1em]">
                                    This mode is believed to make present psychological and
                                    metaphysical implications in a painting that go beyond the
                                    content - a painting is hallowed object between artefact and
                                    relic. The content is a coherent act where gesture, materiality,
                                    scale composition etc describe something from the creator
                                    themselves - a perception characterised by their nature, their
                                    presence in reality.
                                </p>

                                <p className="indent-[1em]">
                                    But how can this be contemporarily relevant or conceptually
                                    valid when it is a negation of the creator&apos;s technological
                                    nature?
                                </p>

                                <p className="indent-[1em]">
                                    The choice to use primitive traditional means denies the role,
                                    presence and implications of tech in contemporary humanity -
                                    cognitive, perceptual, active. And the traditional critical
                                    qualities of the treatment of content (dramatisation,
                                    characterisation, personification) as relative to the
                                    author&apos;s nature is impossible when detached from their
                                    technological condition…
                                </p>

                                <p className="indent-[1em]">
                                    We have not painted landscapes - these are not inhabitable
                                    spaces anyone has ever been - do we accept them as place or as
                                    their manifest reality as data expression as interface, format
                                    resolution,(the manner in which they are present in our reality)
                                    - hence portrait format, between data map and image.
                                </p>

                                <p className="indent-[1em]">
                                    Production is in the manner that reflects the integration of
                                    data systems and digital tools in our lives - their nature the
                                    role of these means in contemporary thought, perception, action.
                                </p>

                                <p className="indent-[1em]">
                                    These works explored these themes of detachment and connection,
                                    the conflict between the tacit organic & immeasurable and the
                                    disinterested, data driven and precise nature of computational
                                    media and means. They try and show the present reality of
                                    contemporary people between the traditional and its concerns and
                                    the technological and its values and implications.
                                </p>

                                <p className="indent-[1em]">
                                    How do we regard these works - landscape?
                                </p>

                                <p className="indent-[1em]">
                                    In using technological means are we allowing the moral force of
                                    the content contained - acknowledging these as place and
                                    landscape, the changing face of humanity, or are these works a
                                    subversion of the moral force of painting.
                                </p>
                            </div>

                            {/* Signature */}
                            <div className="mt-16 pt-22 border-t border-neutral-200">
                                <p
                                    className="text-base md:text-lg italic pb-2 font-light text-neutral-800"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    - Kendall White 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
