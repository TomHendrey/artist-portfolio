export default function About() {
    return (
        <div className="pt-16 min-h-screen bg-white">
            {/* Top section - for future images/intro (currently invisible) */}
            <div className="py-12 px-6 max-w-6xl mx-auto">
                {/* Space reserved for future content */}
            </div>

            {/* Center-aligned paper document section */}
            <div className="py-10 px-6 flex justify-center">
                <div
                    className="w-full max-w-5xl px-12 py-16 md:px-20 md:py-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.07'/%3E%3C/svg%3E")`,
                        backgroundColor: "#fdfdfb",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                >
                    {/* Title Section with elegant spacing */}
                    <div className="mb-26">
                        <h1
                            className="text-4xl md:text-4xl font-light mb-2 text-neutral-800 tracking-tight"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Surfaces
                        </h1>
                        <div className="w-36 h-px bg-neutral-800 mb-12"></div>
                    </div>

                    {/* Body Text with elegant typography */}
                    <div>
                        <div
                            className="space-y-7 text-neutral-600 leading-relaxed text-base md:text-lg"
                            style={{ fontFamily: "Courier New, monospace" }}
                        >
                            <p>
                                We are all obliged to engage with our reality - but the nature of
                                that reality is increasingly defined in detachment from us - it is
                                reported to us outside of our faculties and experiences. our
                                navigation of that reality - our activities of every kind, are
                                mediated by the same data systems and digital tools…
                            </p>

                            <p className="indent-[1em]">
                                Tech at once enables and connects but it is equally a detaching
                                force that negates our faculties, denudes our lives of immaterial
                                notions. We are conflicted about its desirability or indeed
                                capability. the general embrace of tech is not reflected in art.
                                Traditional modes of art are increasingly technophobic.
                            </p>

                            <p className="indent-[1em]">
                                When we approach genre painting - that is work that explore
                                &apos;human centric reality&apos;, it has become a ritual act - self
                                referential field increasingly irrelevant to its actors and
                                audiences. The choice of painting demands the direct use of an
                                individual faculties: that is the result will be a reflection of
                                their conciousness, there sense perception, their active
                                capabilities.
                            </p>

                            <p className="indent-[1em]">
                                This mode is believed to make present psychological and metaphysical
                                implications in a painting that go beyond the content - a painting
                                is hallowed object between artefact and relic. The content is a
                                coherent act where gesture, materiality, scale composition etc
                                discribe something from the creator themselves - a perception
                                characterised by their nature, their presence in reality.
                            </p>

                            <p className="indent-[1em]">
                                But how can this be contemporarily relevant or conceptually valid
                                when it is a negation of the creators technological nature?
                            </p>

                            <p className="indent-[1em]">
                                The choice to use primitive traditional means denies the role,
                                presence and implications of tech in contempary humanity -
                                cognitive, perceptual, active. And the traditional critical
                                qualities of the treatment of content (dramatisation,
                                characterisation, personification) as relative to the authors nature
                                is impossible when detached from their technological condition…
                            </p>

                            <p className="indent-[1em]">
                                We have not painted landscapes - these are not inhabitable spaces
                                anyone has ever been - do we accept them as place or as their
                                manifest reality as data expression as interface, format
                                resolution,(the manner in which they are present in our reality) -
                                hence portrait format, between data map and image.
                            </p>

                            <p className="indent-[1em]">
                                Production is in the manner that reflects the integration of data
                                system and digital tools in our lives - their nature the role of
                                these means in contempary thought, perception, action.
                            </p>

                            <p className="indent-[1em]">
                                These works explored these themes of detachment and connection, the
                                conflict between the tacit organic & immeasurable and the
                                disinterested, data driven and precise nature of computational media
                                and means. They try and show the present reality of contemporary
                                people between the traditional and its concerns and the
                                technological and its values an implications.
                            </p>

                            <p className="indent-[1em]">
                                How do we regard these works - landscape?
                            </p>

                            <p className="indent-[1em]">
                                In using technological mens are we allowing the moral force of the
                                content contained - acknowledging these as place and and landscape,
                                the changing face of humanity, or are these works a subversion of
                                the moral force of painting.
                            </p>
                        </div>

                        {/* Signature */}
                        <div className="mt-16 pt-22 border-t border-neutral-200">
                            <p
                                className=" text-base md:text-lg italic pb-2 font-light text-neutral-800"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                - Kendall White 2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom section - for future images/info (currently invisible) */}
            <div className="py-12 px-6 max-w-6xl mx-auto">
                {/* Space reserved for future content */}
            </div>
        </div>
    );
}
