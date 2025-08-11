// src/data/artworks.ts
export interface Artwork {
    id: number;
    slug: string;
    title: string;
    year: string;
    medium: string;
    dimensions: string;
    description: string;
    images: {
        main: string; // Main image filename (with Cloudinary path)
        cropped: string; // Primary cropped version for artwork pages
        croppedAlts?: string[]; // Alternative crop options
        details?: string[]; // Additional detail shots
    };
    category?: string;
    available?: boolean;
}

// Updated artwork data - with all cropped versions
export const artworks: Artwork[] = [
    {
        id: 1,
        slug: "surface1",
        title: "Surface I",
        year: "2025",
        medium: "Oil pastel on wood",
        dimensions: "120 x 150 cm",
        description:
            "Study of the surface of Mars, exploring the relationship between digital data and physical texture. This piece examines how satellite imagery transforms our understanding of distant landscapes.",
        images: {
            main: "v1754426003/surface-1-main.jpg",
            cropped: "v1754566147/surface-1-cropped.jpg",
            croppedAlts: ["v1754566286/surface-1-cropped-b.jpg"],
            details: [],
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 2,
        slug: "surface2",
        title: "Surface II",
        year: "2025",
        medium: "Oil pastel on wood",
        dimensions: "120 x 150 cm",
        description:
            "Continuation of the Mars surface study series, focusing on the interplay between scientific observation and artistic interpretation.",
        images: {
            main: "v1754469887/surface-2-main.jpg",
            cropped: "v1754566277/surface-2-cropped.jpg",
            croppedAlts: ["v1754566145/surface-2-cropped-b.jpg"],
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 3,
        slug: "surface3",
        title: "Surface III",
        year: "2025",
        medium: "Oil pastel on wood",
        dimensions: "120 x 150 cm",
        description:
            "The third piece in the Mars surface exploration, delving deeper into the abstraction of planetary data.",
        images: {
            main: "v1754469896/surface-3-main.jpg",
            cropped: "v1754566299/surface-3-cropped.jpg",
            croppedAlts: ["v1754566269/surface-3-cropped-b.jpg"],
            details: [
                "v1754587352/surface-3-detail-1.jpg",
                "v1754587348/surface-3-detail-2.jpg",
                "v1754587360/surface-3-detail-3.jpg",
                "v1754587448/surface-3-detail-4.jpg",
                "v1754587451/surface-3-detail-5.jpg",
                "v1754587357/surface-3-detail-6.jpg",
            ],
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 4,
        slug: "surface4",
        title: "Surface IV",
        year: "2025",
        medium: "Mixed media on wood",
        dimensions: "120 x 150 cm",
        description:
            "Mixed media interpretation of Martian terrain, incorporating both digital and analog techniques.",
        images: {
            main: "v1754469920/surface-4-main.jpg",
            cropped: "v1754566323/surface-4-cropped.jpg",
            croppedAlts: ["v1754566293/surface-4-cropped-b.jpg"],
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 5,
        slug: "surface5",
        title: "Surface V",
        year: "2025",
        medium: "Mixed media on wood",
        dimensions: "120 x 150 cm",
        description:
            "Advanced exploration of surface textures using contemporary mixed media approaches.",
        images: {
            main: "v1754469940/surface-5-main.jpg",
            cropped: "v1754566328/surface-5-cropped.jpg",
            croppedAlts: [
                "v1754566290/surface-5-cropped-b.jpg",
                "v1754566310/surface-5-cropped-c.jpg",
            ],
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 6,
        slug: "surface6",
        title: "Surface VI",
        year: "2025",
        medium: "Mixed media on wood",
        dimensions: "120 x 150 cm",
        description:
            "Final piece in the current Mars surface series, synthesizing all previous explorations.",
        images: {
            main: "v1754469949/surface-6-main.jpg",
            cropped: "v1754566326/surface-6-cropped.jpg",
            croppedAlts: ["v1754566340/surface-6-cropped-b.jpg"],
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 7,
        slug: "surface7",
        title: "Surface VII",
        year: "2025",
        medium: "Acrylic and oil pastel on panel",
        dimensions: "120 x 150 cm",
        description:
            "Marks the beginning of a new series focused on Venusian landscapes, reinterpreting dense atmospheric data into vibrant surface expressions.",
        images: {
            main: "v1754469975/surface-7-main.jpg",
            cropped: "v1754566340/surface-7-cropped.jpg",
            croppedAlts: ["v1754566342/surface-7-cropped-b.jpg"],
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 8,
        slug: "surface8",
        title: "Surface VIII",
        year: "2025",
        medium: "Acrylic and oil pastel on panel",
        dimensions: "120 x 150 cm",
        description:
            "Captures the intense heat and pressure of Venus through layered textures and fiery hues, continuing the series' planetary theme.",
        images: {
            main: "v1754469961/surface-8-main.jpg",
            cropped: "v1754566148/surface-8-cropped.jpg",
            croppedAlts: ["v1754566271/surface-8-cropped-b.jpg"],
        },
        category: "surfaces",
        available: false,
    },
    {
        id: 9,
        slug: "surface9",
        title: "Surface IX",
        year: "2025",
        medium: "Acrylic and oil pastel on panel",
        dimensions: "120 x 150 cm",
        description:
            "An abstract response to Venusian topography, referencing radar mapping data to shape the composition's forms.",
        images: {
            main: "v1754469997/surface-9-main.jpg",
            cropped: "v1754566309/surface-9-cropped.jpg",
            croppedAlts: ["v1754566330/surface-9-cropped-b.jpg"],
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 10,
        slug: "surface10",
        title: "Surface X",
        year: "2025",
        medium: "Mixed media on wood",
        dimensions: "120 x 150 cm",
        description:
            "Bridges Martian and Venusian studies, contrasting the arid and volcanic energies of the two planetary bodies.",
        images: {
            main: "v1754469986/surface-10-main.jpg",
            cropped: "v1754566306/surface-10-cropped.jpg",
            croppedAlts: ["v1754566329/surface-10-cropped-b.jpg"],
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 11,
        slug: "surface11",
        title: "Surface XI",
        year: "2025",
        medium: "Oil pastel and digital transfer on wood",
        dimensions: "120 x 150 cm",
        description:
            "Combines analog texture with digital prints of planetary data to create a hybrid surface aesthetic.",
        images: {
            main: "v1754470008/surface-11-main.jpg",
            cropped: "v1754566332/surface-11-cropped.jpg",
            croppedAlts: ["v1754566285/surface-11-cropped-b.jpg"],
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 12,
        slug: "surface12",
        title: "Surface XII",
        year: "2025",
        medium: "Oil pastel and digital transfer on wood",
        dimensions: "120 x 150 cm",
        description:
            "Concludes the twelve-part surface series with a return to Mars, revisiting earlier themes with evolved techniques and a layered visual language.",
        images: {
            main: "v1754470021/surface-12-main.jpg",
            cropped: "v1754566308/surface-12-cropped.jpg",
            croppedAlts: ["v1754566303/surface-12-cropped-b.jpg"],
            details: ["surface12-detail-1", "surface12-detail-2"],
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 13,
        slug: "surface13",
        title: "Surface XIII",
        year: "2025",
        medium: "Oil pastel on wood",
        dimensions: "120 x 150 cm",
        description:
            "Study of the surface of Mars, exploring the relationship between digital data and physical texture. This piece examines how satellite imagery transforms our understanding of distant landscapes.",
        images: {
            main: "v1754946548/surface-13-main.jpg",
            cropped: "v1754946556/surface-13-cropped.jpg",
            croppedAlts: [""],
            details: [],
        },
        category: "surfaces",
        available: true,
    },
];

// Helper function to get artwork by slug
export const getArtworkBySlug = (slug: string): Artwork | undefined => {
    return artworks.find((artwork) => artwork.slug === slug);
};
