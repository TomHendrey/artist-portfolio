import Image from "next/image";

export default function About() {
    return (
        <div className="pt-10 md:pt-16 min-h-screen bg-white">
            <div className="px-6 max-w-4xl mx-auto pt-24 pb-20">
                {/* Studio portraits - files are 800x1000, served straight from Cloudinary (unoptimized) */}
                <div className="grid grid-cols-2 gap-4 max-w-[624px] mb-16">
                    <div>
                        <div className="relative aspect-[4/5]">
                            <Image
                                src="https://res.cloudinary.com/dutoeewfl/image/upload/v1790811457/Tom_Studio_02.jpg"
                                alt="Tom Hendrey in the studio"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                        <p
                            className="text-xs text-neutral-400 mt-4"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            Tom Hendrey
                        </p>
                    </div>
                    <div>
                        <div className="relative aspect-[4/5]">
                            <Image
                                src="https://res.cloudinary.com/dutoeewfl/image/upload/v1790811457/Alex_Studio_02.jpg"
                                alt="Kendall White in the studio"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                        <p
                            className="text-xs text-neutral-400 mt-4"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            Kendall White
                        </p>
                    </div>
                </div>

                {/* ===================== STUDIO ===================== */}
                <div
                    className="space-y-8 text-neutral-800 md:text-neutral-700 leading-loose text-[16px] md:text-[15px] tracking-tighter md:tracking-tight"
                    style={{ fontFamily: "Courier New, monospace" }}
                >
                    <h2
                        className="text-3xl font-light mt-20 mb-16 text-neutral-800 tracking-tight"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Studio
                    </h2>

                    <p>Hendrey Kendall White is a collaborative studio project begun in 2020.</p>

                    <p>
                        Kendall White (b. 1990) is a graduate of the Bartlett School of
                        Architecture, UCL (MArch 2016). His professional life began at Pinewood
                        Studios, then MDM Props, before becoming fully engaged as an artist,
                        designer and fabricator specialising in new media sculptural work, making
                        digitally enabled objects and performative environments. It was during this
                        period that Kendall White met Tom Hendrey.
                    </p>

                    <p>
                        Tom Hendrey (b. 1986) graduated from Camberwell College of Arts (BA 2012).
                        His professional life began as an assistant and studio manager to painter
                        Henry Hudson for seven years, where he worked on a series of high-profile
                        painting projects before moving across into managing contemporary sculptural
                        and multimedia work.
                    </p>

                    <p>
                        The collaboration between Tom Hendrey and Kendall White grew from a series
                        of conversations between 2018 and 2019 about the role, presence and
                        implications of data culture and digital tools on the contemporary
                        conception of art.
                    </p>

                    <p>
                        Questioning the relevance and capability of traditional modes of expression,
                        the perception of digitally and manually realised results, and the
                        legitimacy of these values as our individual and collective consciousness
                        becomes increasingly technologically integrated, defined the territory of
                        interest that their respective backgrounds in traditional and digital
                        practice made them uniquely equipped to explore.
                    </p>
                </div>

                {/* Education blocks - kept for a future CV section */}
                {/*
                <div className="pt-20 space-y-2 text-neutral-700 ">
                    <p>Kendall White</p>
                    <div
                        className="text-neutral-500 text-sm"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        <p>The Bartlett School Of Architecture - MA, Architecture</p>
                    </div>
                </div>
                <div className="pt-8 space-y-2 text-neutral-700 ">
                    <p>Thomas Hendrey</p>
                    <div
                        className="text-neutral-500 text-sm"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        <p>Camberwell College of Arts - BA, Fine Art</p>
                    </div>
                </div>
                */}

                {/* Separator between Studio and Surfaces */}
                <div className="mt-40 md:mt-56 border-t border-neutral-200" />

                {/* ===================== SURFACES ===================== */}
                <div className="pt-40 md:pt-56">
                    {/* Surfaces opening image */}
                    <div className="mb-16 max-w-[340px] sm:max-w-[320px] mx-0 ">
                        <Image
                            src="https://res.cloudinary.com/dutoeewfl/image/upload/v1770335700/image-asset-7.jpg"
                            alt="Detail of the studio's custom cutting machine"
                            width={1600}
                            height={1200}
                            className="w-full h-auto"
                        />
                    </div>

                    <div
                        className="space-y-8 text-neutral-800 md:text-neutral-700 leading-loose text-[16px] md:text-[15px] tracking-tighter md:tracking-tight"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        <h2
                            className="text-3xl font-light mt-20 mb-16 text-neutral-800 tracking-tight"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Surfaces
                        </h2>

                        <p>
                            On July 15, 1965, NASA&apos;s Mariner 4 transmitted the first close-up
                            images of Mars from approximately 10,500 miles away. The spacecraft sent
                            data back to Earth over 8.5 hours as a series of binary numbers
                            representing brightness values across a 200-pixel grid. At JPL,
                            engineers couldn&apos;t wait for official photographic processing.
                            Instead, they hand-coloured a printout of the raw numerical data, using
                            pencils to shade squares according to the transmitted values. Engineers
                            with pencils, translating numbers into a visible landscape. This act
                            revealed Mars as a cratered, moon-like surface.
                        </p>

                        <div className="my-30  max-w-[340px] sm:max-w-[320px] mx-0 ">
                            <Image
                                src="https://res.cloudinary.com/dutoeewfl/image/upload/v1770213259/nasa-mars-7.jpg"
                                alt="Engineers at JPL hand-colouring the first Mariner 4 image of Mars, 1965"
                                width={1600}
                                height={1200}
                                className="w-full h-auto"
                            />
                            <p className="text-xs text-neutral-400 mt-4">
                                Engineers at JPL hand-colouring the first Mariner 4 image of Mars,
                                1965
                            </p>
                        </div>

                        <p className="pt-4">
                            Thirteen years later, French astrophysicist Jean-Pierre Luminet used a
                            1960s IBM 7040 computer to calculate the appearance of a black hole,
                            then plotted the results by hand with ink on paper, creating the first
                            visualisation of a phenomenon that had never been directly observed.
                        </p>
                        <p className="pt-4">
                            These moments represent something fundamental: the transformation of
                            invisible information into visible form. Data is collected through
                            instruments, transmitted across vast distances as electromagnetic
                            signals, converted into numerical values, processed, and finally
                            displayed as images we can comprehend. Each stage is a translation
                            between different states of information.
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
                                Jean-Pierre Luminet&apos;s hand-plotted black hole simulation, 1978
                            </p>
                        </div>

                        <p className="pt-4">
                            This process is inherently imperfect. Signals degrade across distance,
                            introducing noise and distortion. Bandwidth limitations compress and
                            pixelate. Transmission errors create artifacts. Yet these imperfections
                            have become a language of their own. Scan lines, compression artifacts,
                            colour shifts, and digital noise are not simply failures but signatures
                            of the technological process itself. They tell us not just what we are
                            seeing, but how we are seeing it.
                        </p>

                        <p className="pt-4">
                            The paintings in this series are physical embodiments of this
                            information chain. Like the hand-coloured Mariner printouts or
                            Luminet&apos;s plotted calculations, they translate transmitted data, in
                            this case from Mars, through manual processes: algorithmic cutting paths
                            combined with oil paint applied and layered by hand. By the time these
                            images become completed paintings, they are already many steps removed
                            from their source. Each painting is an image of a distant world, but
                            also a record of everything required to make it visible.
                        </p>

                        <p className="pb-30 pt-4">
                            Painting has always been a system for encoding and transmitting
                            information across time and space, a way of making the invisible or
                            distant present. These works extend that tradition into a contemporary
                            technology driven world. They are records of our compulsion to extend
                            perception beyond its natural limits, to transform the unreachable into
                            something we can see and contemplate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
