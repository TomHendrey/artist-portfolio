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
        main: string; // Main image filename (without extension)
        details?: string[]; // Additional detail shots
    };
    category?: string;
    available?: boolean;
}

// Updated artwork data - using Cloudinary image names
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
            main: "surface1-main-1", // Cloudinary filename without extension
            details: ["surface1-detail-1", "surface1-detail-2"], // Optional detail shots
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
            main: "surface2-main",
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
            main: "surface3-main",
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
            main: "surface4-main",
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
            main: "surface5-main",
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
            main: "surface6-main",
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
            main: "surface7-main",
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
            main: "surface8-main",
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
            "An abstract response to Venusian topography, referencing radar mapping data to shape the composition’s forms.",
        images: {
            main: "surface9-main",
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
            main: "surface10-main",
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
            main: "surface11-main",
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
            main: "surface12-main",
            details: ["surface12-detail-1", "Surface12-detail-2"],
        },
        category: "surfaces",
        available: true,
    },
];

// Helper function to get artwork by slug
export const getArtworkBySlug = (slug: string): Artwork | undefined => {
    return artworks.find((artwork) => artwork.slug === slug);
};
