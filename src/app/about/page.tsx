/*
 * IMAGE HANDLING ON THIS PAGE - two deliberate approaches:
 *
 * 1. Small reference images (Mariner, Luminet) use next/image and let Next resize them.
 *    Fine at ~320px wide on low-detail documentary scans.
 *
 * 2. The two large images (studio portrait, Surfaces detail) use a plain <img> with a
 *    hand-built srcSet, bypassing Next's optimizer. Next resizes to its own fixed widths
 *    and re-encodes, which on detailed textures produced visible aliasing. Files are
 *    exported from Photoshop at the exact widths listed in each srcSet.
 *    The Surfaces detail also uses <picture> to serve a different, tighter crop on phones.
 *
 * Longer term both could move to a custom Cloudinary loader on next/image, which would
 * unify this page with the homepage and remove the hand exports.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function About() {
    return (
        <div className="pt-10 md:pt-16 min-h-screen bg-white">
            <div className="px-6 max-w-4xl mx-auto pt-24 pb-20">
                {/* Studio portrait - hand-sized exports served straight from Cloudinary */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://res.cloudinary.com/dutoeewfl/image/upload/v1791728919/Studio_Portrait_04_412k.jpg"
                    srcSet="https://res.cloudinary.com/dutoeewfl/image/upload/v1791728917/Studio_Portrait_05_247k.jpg 672w,
                            https://res.cloudinary.com/dutoeewfl/image/upload/v1791728919/Studio_Portrait_04_412k.jpg 896w,
                            https://res.cloudinary.com/dutoeewfl/image/upload/v1791728920/Studio_Portrait_03_812k.jpg 1344w,
                            https://res.cloudinary.com/dutoeewfl/image/upload/v1791728917/Studio_Portrait_02_1.3.jpg 1792w"
                    sizes="(max-width: 944px) calc(100vw - 48px), 896px"
                    width={1792}
                    height={1152}
                    alt="Kendall White and Tom Hendrey seated in the studio in front of two Surfaces paintings"
                    className="w-full h-auto"
                />
                <p
                    className="text-xs text-neutral-400 mt-4"
                    style={{ fontFamily: "Courier New, monospace" }}
                >
                    Kendall White and Tom Hendrey
                </p>

                {/* ===================== STUDIO ===================== */}
                <div
                    className="space-y-8 text-neutral-700 md:text-neutral-600 leading-loose text-[16px] md:text-[15px] tracking-tighter md:tracking-tight"
                    style={{ fontFamily: "Courier New, monospace" }}
                >
                    <h2
                        className="text-3xl font-light mt-24 mb-8 text-neutral-800 tracking-tight"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Studio
                    </h2>

                    <p>Hendrey Kendall White is a collaborative studio project begun in 2020.</p>

                    <p>
                        Kendall White (b. 1990) is a graduate of the Bartlett School of
                        Architecture, UCL (March 2016). His professional life began at Pinewood
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

                {/* Studio, full width - closes the Studio section */}
                <div className="mt-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757660/studio_wide_900.jpg"
                        srcSet="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757660/studio_wide_900.jpg 900w,
                                https://res.cloudinary.com/dutoeewfl/image/upload/v1791757663/studio_wide_1344.jpg 1344w,
                                https://res.cloudinary.com/dutoeewfl/image/upload/v1791757664/studio_wide_1800.jpg 1800w"
                        sizes="(max-width: 944px) calc(100vw - 48px), 896px"
                        width={1800}
                        height={1200}
                        alt="The studio, with a Surfaces panel mounted on the cutting machine"
                        className="w-full h-auto"
                    />
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

                {/* ===================== SURFACES =====================
                    No separator rule here: the full-width image is the section break. */}
                <div className="pt-32 md:pt-48">
                    <div
                        className="space-y-8 text-neutral-700 md:text-neutral-600 leading-loose text-[16px] md:text-[15px] tracking-tighter md:tracking-tight"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        <h2
                            className="text-3xl font-light mb-8 text-neutral-800 tracking-tight"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Surfaces
                        </h2>

                        <p>
                            On 15 July, 1965, NASA&apos;s Mariner 4 transmitted the first close-up
                            images of Mars from approximately 10,500 miles away. The spacecraft sent
                            data back to Earth over 8.5 hours as a series of binary numbers
                            representing brightness values across a 200-pixel grid. At JPL,
                            engineers couldn&apos;t wait for official photographic processing.
                            Instead, they hand-coloured a printout of the raw numerical data, using
                            pencils to shade squares according to the transmitted values. Engineers
                            with pencils, translating numbers into a visible landscape. This act
                            revealed Mars as a cratered, moon-like surface.
                        </p>

                        <div className="my-16 max-w-[340px] sm:max-w-[320px] mx-0">
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
                        <div className="my-16 max-w-3xl">
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

                        <p className="pt-4">
                            Painting has always been a system for encoding and transmitting
                            information across time and space, a way of making the invisible or
                            distant present. These works extend that tradition into a contemporary
                            technology driven world. They are records of our compulsion to extend
                            perception beyond its natural limits, to transform the unreachable into
                            something we can see and contemplate.
                        </p>
                    </div>

                    {/* Surfaces opening image - landscape on desktop, narrow crop on phones.
                        <picture> means the browser downloads only the one it uses.
                        CHECK: the 1800w entry below points at a file named "1080" - confirm it is
                        actually 1800px wide, or correct the width descriptor to match. */}
                    <div className="pt-24">
                        <picture>
                            <source
                                media="(max-width: 767px)"
                                srcSet="https://res.cloudinary.com/dutoeewfl/image/upload/v1791740541/surface-4-closeup-4-720.jpg 720w,
                                        https://res.cloudinary.com/dutoeewfl/image/upload/v1791740545/surface-4-closeup-4-1080.jpg 1080w"
                                sizes="calc(100vw - 48px)"
                                width={1080}
                                height={1440}
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://res.cloudinary.com/dutoeewfl/image/upload/v1791740541/surface4-closeup-5-900.jpg"
                                srcSet="https://res.cloudinary.com/dutoeewfl/image/upload/v1791740541/surface4-closeup-5-900.jpg 900w,
                                        https://res.cloudinary.com/dutoeewfl/image/upload/v1791740542/surface4-closeup-5-1350.jpg 1350w,
                                        https://res.cloudinary.com/dutoeewfl/image/upload/v1791740544/surface-4-closeup-1080.jpg 1800w"
                                sizes="(max-width: 944px) calc(100vw - 48px), 896px"
                                width={1800}
                                height={1200}
                                alt="Close-up detail of Surface IV, thick black pigment built up over a warm copper ground with the wood grain visible beneath"
                                className="w-full h-auto"
                            />
                        </picture>
                        <p
                            className="text-xs text-neutral-400 mt-4"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            Surface IV, detail
                        </p>
                    </div>

                    {/* ===================== PROCESS =====================
                        Hand-sized exports served straight from Cloudinary, same approach as the
                        studio portrait. Captions are drafts - rewrite in your own words.
                        TODO: write the short process paragraph in the slot marked below.
                        TODO: add the height map image in the slot marked below. */}
                    <div className="pt-32 md:pt-48">
                        <div
                            className="space-y-8 text-neutral-700 md:text-neutral-600 leading-loose text-[16px] md:text-[15px] tracking-tighter md:tracking-tight"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            <h2
                                className="text-3xl font-light mb-8 text-neutral-800 tracking-tight"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Process
                            </h2>

                            {/* PROCESS PARAGRAPH GOES HERE - three or four sentences of plain fact:
                                where the source data comes from, how the cutting paths are
                                generated, what goes onto the panel and in what order. */}
                        </div>
                    </div>

                    <div className="pt-16 space-y-24">
                        {/* HEIGHT MAP GOES HERE - full width.
                            Copy the studio image block from the Studio section above and swap
                            the URLs, width, height, alt and caption. */}

                        {/* Pair 1: pigment mixed, then laid onto the panel */}
                        <div className="max-w-[888px]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757660/pastel_432.jpg"
                                        srcSet="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757660/pastel_432.jpg 432w,
                                            https://res.cloudinary.com/dutoeewfl/image/upload/v1791757661/pastel_648.jpg 648w,
                                            https://res.cloudinary.com/dutoeewfl/image/upload/v1791757662/pastel_864.jpg 864w"
                                        sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 944px) calc(50vw - 36px), 432px"
                                        width={864}
                                        height={1152}
                                        alt="Pigment worked on a glass slab, with the machine's laptop and a set of scales on the same bench"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757659/applied_432.jpg"
                                        srcSet="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757659/applied_432.jpg 432w,
                                            https://res.cloudinary.com/dutoeewfl/image/upload/v1791757659/applied_648.jpg 648w,
                                            https://res.cloudinary.com/dutoeewfl/image/upload/v1791757659/applied_864.jpg 864w"
                                        sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 944px) calc(50vw - 36px), 432px"
                                        width={864}
                                        height={1152}
                                        alt="A gloved hand laying a band of purple pigment onto a bare panel with a blade"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                            <p
                                className="text-xs text-neutral-400 mt-4"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                Pigment mixed in the studio, then laid onto the panel by hand
                            </p>
                        </div>

                        {/* Pair 2: the machine cutting, then the mark it leaves */}
                        <div className="max-w-[888px]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757659/gantry_432.jpg"
                                        srcSet="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757659/gantry_432.jpg 432w,
                                            https://res.cloudinary.com/dutoeewfl/image/upload/v1791757660/gantry_648.jpg 648w,
                                            https://res.cloudinary.com/dutoeewfl/image/upload/v1791757663/gantry_864.jpg 864w"
                                        sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 944px) calc(50vw - 36px), 432px"
                                        width={864}
                                        height={1152}
                                        alt="The cutting machine over a panel, with a line of removed pigment collected along the bottom rail"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757659/layers_432.jpg"
                                        srcSet="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757659/layers_432.jpg 432w,
                                            https://res.cloudinary.com/dutoeewfl/image/upload/v1791757660/layers_648.jpg 648w,
                                            https://res.cloudinary.com/dutoeewfl/image/upload/v1791757661/layers_864.jpg 864w"
                                        sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 944px) calc(50vw - 36px), 432px"
                                        width={864}
                                        height={1152}
                                        alt="Close detail of the ribbed texture left by the cutting head, with lower layers showing through"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                            <p
                                className="text-xs text-neutral-400 mt-4"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                The cutting process removes the pigment rather than adding it, in a
                                reversal of traditional painting techniques
                            </p>
                        </div>

                        {/* Result, full width */}
                        <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757662/macro_detail_900.jpg"
                                srcSet="https://res.cloudinary.com/dutoeewfl/image/upload/v1791757662/macro_detail_900.jpg 900w,
                                        https://res.cloudinary.com/dutoeewfl/image/upload/v1791757663/macro_detail_1344.jpg 1344w,
                                        https://res.cloudinary.com/dutoeewfl/image/upload/v1791757665/macro_detail_1800.jpg 1800w"
                                sizes="(max-width: 944px) calc(100vw - 48px), 896px"
                                width={1800}
                                height={1200}
                                alt="Close detail of a finished surface, black over purple over a copper ground"
                                className="w-full h-auto"
                            />
                            <p
                                className="text-xs text-neutral-400 mt-4"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                The final stage reveals black over purple cut back into the surface
                                to expose each layer
                            </p>
                        </div>

                        {/* Link through to the works */}
                        <div className="pt-12 pb-24">
                            <Link
                                href="/works"
                                className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-800 px-8 py-3 hover:bg-neutral-800 hover:text-white transition-colors duration-300"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                View Surfaces
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
