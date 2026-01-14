// src/data/artworks.ts - Updated with complete highRes for all surfaces
export interface Artwork {
    id: number;
    slug: string;
    title: string;
    year: string;
    medium: string;
    dimensions: string;
    description: string;
    maxZoom?: number;
    images: {
        main: string; // Main image filename (Cloudinary path)
        cropped?: string; // Optional cropped version
        croppedAlts?: string[]; // Optional alternative cropped versions

        // Detail images (three-tier system)
        details?: string[]; // HD versions (2400px) - for lightbox
        detailsMedium?: string[]; // Medium versions (1600px) - for main display
        detailsThumb?: string[]; // Thumbnails (400px) - for grid

        // Gallery view images (optional - different angles)
        gallery?: {
            front?: {
                hd?: string;
                medium?: string;
                thumb?: string;
            };
            main?: {
                hd?: string;
                medium?: string;
                thumb?: string;
            };
            left1?: {
                hd?: string;
                medium?: string;
                thumb?: string;
            };
            left2?: {
                hd?: string;
                medium?: string;
                thumb?: string;
            };
        };

        // Progressive loading for main composite (optional)
        highRes?: {
            base?: string; // 8MB Cloudinary version (fast loading)
            medium?: string; // ~18MB Blob version (background preload)
            ultra?: string; // ~46MB Blob version (on-demand ultra quality)
        };
    };
    category?: string;
    available?: boolean;
}

// Updated artwork data - with all highRes configured
export const artworks: Artwork[] = [
    {
        id: 1,
        slug: "surface-1",
        title: "Surface I",
        year: "2025",
        medium: "Oil pastel on wood",
        dimensions: "120 × 160 cm",
        description: "Study of the surface of Mars.",
        maxZoom: 8.0,

        images: {
            // Main composite image (4096px)
            main: "v1761586550/surface-1-main-8.jpg",

            // Cropped version
            cropped: "v1761586554/surface-1-cropped-9.jpg",

            // High-res progressive loading (Vercel blob storage)
            highRes: {
                base: "v1761586553/surface-1-cropped-9.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-1-cropped-20.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-1-cropped-74.jpg",
            },

            // Detail images - HD versions (2400px) - NOW INCLUDING GALLERY
            details: [
                // Gallery views first
                "v1764979198/surface-1-g-front-24.jpg",
                "v1764979405/surface-1-g-left-2-24.jpg",
                // Close-up details
                "v1765331078/surface-1-closeup-2-24.jpg",
                "v1765331076/surface-1-closeup-1-24.jpg",
                "v1765331082/surface-1-closeup-6-24.jpg",
                "v1765331088/surface-1-closeup-8-24.jpg",
                "v1765331089/surface-1-closeup-3-24.jpg",
                "v1765331045/surface-1-closeup-4-24.jpg",
                // "v1765331086/surface-1-closeup-5-24.jpg",

                "v1765331084/surface-1-closeup-10-24.jpg",
                // "v1765331072/surface-1-closeup-11-24.jpg",
                // "v1765331071/surface-1-closeup-12-24.jpg",
                // "v1765331064/surface-1-closeup-13-24.jpg",
                // "v1765331092/surface-1-closeup-14-24.jpg",
            ],

            // Detail images - Medium versions (1600px) - NOW INCLUDING GALLERY
            detailsMedium: [
                // Gallery views first
                "v1764979183/surface-1-g-front-16.jpg",
                "v1764979393/surface-1-g-left-2-16.jpg",
                // Close-up details
                "v1765331050/surface-1-closeup-2-16.jpg",
                "v1765331045/surface-1-closeup-1-16.jpg",
                "v1765331054/surface-1-closeup-6-16.jpg",
                "v1765331045/surface-1-closeup-8-16.jpg",
                "v1765331049/surface-1-closeup-3-16.jpg",
                "v1765331056/surface-1-closeup-4-16.jpg",
                // "v1765331048/surface-1-closeup-5-16.jpg",

                "v1765331055/surface-1-closeup-10-16.jpg",
                // "v1765331064/surface-1-closeup-11-16.jpg",
                // "v1765331071/surface-1-closeup-12-16.jpg",
                // "v1765331066/surface-1-closeup-13-16.jpg",
                // "v1765331072/surface-1-closeup-14-16.jpg",
            ],

            // Detail images - Thumbnails (400px) - NOW INCLUDING GALLERY
            detailsThumb: [
                // Gallery views first
                "v1764978504/surface-1-g-front-thumb.jpg",
                "v1764978483/surface-1-g-left-2-thumb.jpg",
                // Close-up details
                "v1765330904/surface-1-closeup-2-thumb-b.jpg",
                "v1765330905/surface-1-closeup-1-thumb-b.jpg",
                "v1765330904/surface-1-closeup-6-thumb-b.jpg",
                "v1765330905/surface-1-closeup-8-thumb-b.jpg",
                "v1765330906/surface-1-closeup-3-thumb-b.jpg",
                "v1765330905/surface-1-closeup-4-thumb-b.jpg",
                // "v1765330905/surface-1-closeup-5-thumb-b.jpg",

                "v1765330907/surface-1-closeup-10-thumb-b.jpg",
                // "v1765330907/surface-1-closeup-11-thumb-b.jpg",
                // "v1765330907/surface-1-closeup-12-thumb-b.jpg",
                // "v1765330906/surface-1-closeup-13-thumb-b.jpg",
                // "v1765330906/surface-1-closeup-14-thumb-b.jpg",
            ],
        },

        available: true,
    },
    {
        id: 2,
        slug: "surface-2",
        title: "Surface II",
        year: "2025",
        medium: "Oil pastel on wood",
        dimensions: "120 × 160 cm",
        description:
            "Continuation of the Mars surface study series, focusing on the interplay between scientific observation and artistic interpretation.",
        maxZoom: 8.0,
        images: {
            // Main composite image (4096px)
            main: "v1767658373/surface-2-main-6.jpg",
            // Cropped version
            cropped: "v1767658376/surface-2-cropped-8.jpg",
            // High-res progressive loading (Vercel blob storage)
            highRes: {
                base: "v1767658376/surface-2-cropped-8.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-2-cropped-17.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-2-cropped-64.jpg",
            },
            // Detail images - HD versions (2400px) - INCLUDING GALLERY
            details: [
                // Gallery views first
                "v1767658253/surface-2-g-front-2-24.jpg",

                "v1767658254/surface-2-g-left-2-24.jpg",
                // Close-up details

                "v1767658902/surface-2-closeup-2-24.jpg",

                "v1767658902/surface-2-closeup-3-24.jpg",

                "v1767658912/surface-2-closeup-7-24.jpg",

                "v1767658919/surface-2-closeup-6-24.jpg",

                "v1767658988/surface-2-closeup-10-24.jpg",

                "v1767658981/surface-2-closeup-11-24.jpg",

                "v1767658981/surface-2-closeup-5-24.jpg",

                // "v1767658988/surface-2-closeup-12-24.jpg",
                // "v1767658973/surface-2-closeup-13-24.jpg",
                // "v1767658982/surface-2-closeup-14-24.jpg",
                // "v1767658986/surface-2-closeup-8-24.jpg",
            ],
            // Detail images - Medium versions (1600px) - INCLUDING GALLERY
            detailsMedium: [
                // Gallery views first
                "v1767658245/surface-2-g-front-2-16.jpg",

                "v1767658244/surface-2-g-left-2-16.jpg",
                // Close-up details

                "v1767658868/surface-2-closeup-2-16.jpg",

                "v1767658871/surface-2-closeup-3-16.jpg",

                "v1767658875/surface-2-closeup-7-16.jpg",

                "v1767658893/surface-2-closeup-6-16.jpg",

                "v1767658884/surface-2-closeup-10-16.jpg",

                "v1767658876/surface-2-closeup-11-16.jpg",

                "v1767658873/surface-2-closeup-5-16.jpg",

                // "v1767658882/surface-2-closeup-12-16.jpg",
                // "v1767658887/surface-2-closeup-13-16.jpg",
                // "v1767658888/surface-2-closeup-14-16.jpg",
                // "v1767658891/surface-2-closeup-8-16.jpg",
            ],
            // Detail images - Thumbnails (400px) - INCLUDING GALLERY
            detailsThumb: [
                // Gallery views first
                "v1767657835/surface-2-g-front-2-thumb.jpg",

                "v1767657838/surface-2-g-left-2-thumb.jpg",
                // Close-up details

                "v1767657831/surface-2-closeup-2-thumb-b.jpg",

                "v1767657832/surface-2-closeup-3-thumb-b.jpg",

                "v1767657842/surface-2-closeup-7-thumb-b.jpg",

                "v1767657841/surface-2-closeup-6-thumb-b.jpg",

                "v1767657843/surface-2-closeup-10-thumb-b.jpg",

                "v1767657832/surface-2-closeup-11-thumb-b.jpg",

                "v1767657839/surface-2-closeup-5-thumb-b.jpg",

                // "v1767657832/surface-2-closeup-12-thumb-b.jpg",
                // "v1767657833/surface-2-closeup-13-thumb-b.jpg",
                // "v1767657834/surface-2-closeup-14-thumb-b.jpg",
                // "v1767657842/surface-2-closeup-8-thumb-b.jpg",
            ],
        },
        available: true,
    },
    {
        id: 3,
        slug: "surface3",
        title: "Surface III",
        year: "2025",
        medium: "Oil pastel on wood",
        dimensions: "120 x 160 cm",
        description:
            "The third piece in the Mars surface exploration, delving deeper into the abstraction of planetary data.",
        maxZoom: 8.0,
        images: {
            main: "v1761586589/surface-3-main-7.jpg",
            cropped: "v1761586593/surface-3-cropped-8.jpg",
            croppedAlts: [],
            details: [
                "v1761586589/surface-3-main-7.jpg",
                "v1762776066/surface-3-g-front-1.jpg",
                "v1762215285/surface-3-g-left-1.jpg",
                "v1762215281/surface-3-g-left-2.jpg",
            ],
            // detailsMedium: [
            //     // Add 1600px versions here
            //     "v1761586589/surface-3-main-7.jpg",
            //     "v1762776066/surface-3-g-front-1.jpg",
            //     "v1762215285/surface-3-g-left-1.jpg",
            //     "v1762215281/surface-3-g-left-2.jpg",
            // ],
            // detailsThumb: [
            //     // Add 400px thumbnail versions here
            //     "v1761586589/surface-3-main-7.jpg",
            //     "v1762776066/surface-3-g-front-1.jpg",
            //     "v1762215285/surface-3-g-left-1.jpg",
            //     "v1762215281/surface-3-g-left-2.jpg",
            // ],
            highRes: {
                base: "v1761586593/surface-3-cropped-8.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-3-cropped-18.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-3-cropped-69.jpg",
            },
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 4,
        slug: "surface4",
        title: "Surface IV",
        year: "2019",
        medium: "Mixed media on wood",
        dimensions: "48 x 70 cm",
        description:
            "Mixed media interpretation of Martian terrain, incorporating both digital and analog techniques.",
        maxZoom: 4.0,
        images: {
            main: "v1762205836/surface-4-main-7.jpg",
            cropped: "v1761674574/surface-4-cropped-9.jpg",
            croppedAlts: [],
            details: ["v1762861158/surface-4-g-front-1_qetuvy.jpg"],
            // detailsMedium: [
            //     // Add 1600px versions here
            //     "v1762861158/surface-4-g-front-1_qetuvy.jpg",
            // ],
            // detailsThumb: [
            //     // Add 400px thumbnail versions here
            //     "v1762861158/surface-4-g-front-1_qetuvy.jpg",
            // ],
            highRes: {
                base: "v1761586624/surface-4-cropped-9.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-4-cropped-18.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-4-cropped-21.jpg",
            },
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 5,
        slug: "surface5",
        title: "Surface V",
        year: "2020",
        medium: "Mixed media on wood",
        dimensions: "65 x 70 cm",
        description:
            "Advanced exploration of surface textures using contemporary mixed media approaches.",
        maxZoom: 4.0,
        images: {
            main: "v1761587672/surface-5-main-7.jpg",
            cropped: "v1761587680/surface-5-cropped-8.jpg",
            croppedAlts: [],
            details: ["v1762861163/surface-5-g-front-1_meluqg.jpg"],
            // detailsMedium: [
            //     // Add 1600px versions here
            //     "v1762861163/surface-5-g-front-1_meluqg.jpg",
            // ],
            // detailsThumb: [
            //     // Add 400px thumbnail versions here
            //     "v1762861163/surface-5-g-front-1_meluqg.jpg",
            // ],
            highRes: {
                base: "v1761587680/surface-5-cropped-8.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-5-cropped-9.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-5-cropped-17.jpg",
            },
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 6,
        slug: "surface6",
        title: "Surface VI",
        year: "2022",
        medium: "Mixed media on wood",
        dimensions: "70 x 95cm",
        description:
            "Final piece in the current Mars surface series, synthesizing all previous explorations.",
        maxZoom: 4.0,
        images: {
            main: "v1761608329/surface-6-main-7.jpg",
            cropped: "v1761612469/surface-6-cropped-9.jpg",
            croppedAlts: [],
            details: ["v1762861169/surface-6-g-front-1_b71hjn.jpg"],
            // detailsMedium: [
            //     // Add 1600px versions here
            //     "v1762861169/surface-6-g-front-1_b71hjn.jpg",
            // ],
            // detailsThumb: [
            //     // Add 400px thumbnail versions here
            //     "v1762861169/surface-6-g-front-1_b71hjn.jpg",
            // ],
            highRes: {
                base: "v1761608332/surface-6-cropped-9.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-6-cropped-19.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-6-cropped-30.jpg",
            },
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 7,
        slug: "surface7",
        title: "Surface VII",
        year: "2022",
        medium: "Acrylic and oil pastel on panel",
        dimensions: "70 x 95cm",
        description:
            "Marks the beginning of a new series focused on Venusian landscapes, reinterpreting dense atmospheric data into vibrant surface expressions.",
        maxZoom: 4.0,
        images: {
            main: "v1761674559/surface-7-main-7.jpg",
            cropped: "v1761674561/surface-7-cropped-9.jpg",
            croppedAlts: [],
            details: ["v1762861176/surface-7-g-front-1_w6t70x.jpg"],
            // detailsMedium: [
            //     // Add 1600px versions here
            //     "v1762861176/surface-7-g-front-1_w6t70x.jpg",
            // ],
            // detailsThumb: [
            //     // Add 400px thumbnail versions here
            //     "v1762861176/surface-7-g-front-1_w6t70x.jpg",
            // ],
            highRes: {
                base: "v1761608403/surface-7-cropped-9.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-7-cropped-19.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-7-cropped-32.jpg",
            },
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 8,
        slug: "surface8",
        title: "Surface VIII",
        year: "2024",
        medium: "Acrylic and oil pastel on panel",
        dimensions: "85 x 95 cm",
        description:
            "Captures the intense heat and pressure of Venus through layered textures and fiery hues, continuing the series' planetary theme.",
        maxZoom: 4.0,
        images: {
            main: "v1761660151/surface-8-main-7.jpg",
            cropped: "v1761657106/surface-8-cropped-8.jpg",
            croppedAlts: [],
            details: ["v1762861183/surface-8-g-front-1_u8ortw.jpg"],
            // detailsMedium: [
            //     // Add 1600px versions here
            //     "v1762861183/surface-8-g-front-1_u8ortw.jpg",
            // ],
            // detailsThumb: [
            //     // Add 400px thumbnail versions here
            //     "v1762861183/surface-8-g-front-1_u8ortw.jpg",
            // ],
            highRes: {
                base: "v1761609058/surface-8-cropped-8.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-8-cropped-19.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-8-cropped-60.jpg",
            },
        },
        category: "surfaces",
        available: false,
    },
    {
        id: 9,
        slug: "surface9",
        title: "Surface IX",
        year: "2023",
        medium: "Acrylic and oil pastel on panel",
        dimensions: "65 x 85cm",
        description:
            "An abstract response to Venusian topography, referencing radar mapping data to shape the composition's forms.",
        maxZoom: 4.0,
        images: {
            main: "v1761674545/surface-9-main-7.jpg",
            cropped: "v1761674549/surface-9-cropped-8.jpg",
            croppedAlts: [],
            details: ["v1762861188/surface-9-g-front-1_pptrvz.jpg"],
            // detailsMedium: [
            //     // Add 1600px versions here
            //     "v1762861188/surface-9-g-front-1_pptrvz.jpg",
            // ],
            // detailsThumb: [
            //     // Add 400px thumbnail versions here
            //     "v1762861188/surface-9-g-front-1_pptrvz.jpg",
            // ],
            highRes: {
                base: "v1761608539/surface-9-cropped-8.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-9-cropped-18.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-9-cropped-33.jpg",
            },
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 10,
        slug: "surface10",
        title: "Surface X",
        year: "2023",
        medium: "Mixed media on wood",
        dimensions: "65 x 85cm",
        description:
            "Bridges Martian and Venusian studies, contrasting the arid and volcanic energies of the two planetary bodies.",
        maxZoom: 4.0,
        images: {
            main: "v1761587833/surface-12-main-9.jpg",
            cropped: "v1761587835/surface-12-cropped-9.jpg",
            croppedAlts: [],
            details: ["v1762861216/surface-12-g-front-1_iu1q57.jpg"],
            // detailsMedium: [
            //     // Add 1600px versions here
            //     "v1762861216/surface-12-g-front-1_iu1q57.jpg",
            // ],
            // detailsThumb: [
            //     // Add 400px thumbnail versions here
            //     "v1762861216/surface-12-g-front-1_iu1q57.jpg",
            // ],
            highRes: {
                base: "v1761587835/surface-12-cropped-9.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-12-cropped-19.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-12-cropped-32.jpg",
            },
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 11,
        slug: "surface11",
        title: "Surface XI",
        year: "2023",
        medium: "Mixed media on wood",
        dimensions: "65 x 85cm",
        description:
            "Combines analog texture with digital prints of planetary data to create a hybrid surface aesthetic.",
        maxZoom: 4.0,
        images: {
            main: "v1761587814/surface-11-main-8.jpg",
            cropped: "v1761587817/surface-11-cropped-10.jpg",
            croppedAlts: [],
            details: ["v1762861209/surface-11-g-front-1_modilu.jpg"],
            // detailsMedium: [
            //     // Add 1600px versions here
            //     "v1762861209/surface-11-g-front-1_modilu.jpg",
            // ],
            // detailsThumb: [
            //     // Add 400px thumbnail versions here
            //     "v1762861209/surface-11-g-front-1_modilu.jpg",
            // ],
            highRes: {
                base: "v1761587817/surface-11-cropped-10.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-11-cropped-20.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-11-cropped-30.jpg",
            },
        },
        category: "surfaces",
        available: true,
    },
    {
        id: 12,
        slug: "surface12",
        title: "Surface XII",
        year: "2023",
        medium: "Mixed media on wood",
        dimensions: "65 x 85cm",
        description:
            "Concludes the twelve-part surface series with a return to Mars, revisiting earlier themes with evolved techniques and a layered visual language.",
        maxZoom: 4.0,
        images: {
            main: "v1761587791/surface-10-main-8.jpg",
            cropped: "v1761587790/surface-10-cropped-10.jpg",
            croppedAlts: [],
            details: ["v1762861201/surface-10-g-front-1_b81pyp.jpg"],
            // detailsMedium: [
            //     // Add 1600px versions here
            //     "v1762861201/surface-10-g-front-1_b81pyp.jpg",
            // ],
            // detailsThumb: [
            //     // Add 400px thumbnail versions here
            //     "v1762861201/surface-10-g-front-1_b81pyp.jpg",
            // ],
            highRes: {
                base: "v1761587790/surface-10-cropped-10.jpg",
                medium: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-10-cropped-20.jpg",
                ultra: "https://55gtw6fsesomiucf.public.blob.vercel-storage.com/composite/surface-10-cropped-32.jpg",
            },
        },
        category: "surfaces",
        available: true,
    },
];

// Helper function to get artwork by slug
export const getArtworkBySlug = (slug: string): Artwork | undefined => {
    return artworks.find((artwork) => artwork.slug === slug);
};
