// src/app/layout.tsx
import "./globals.css";
import { Inter, Courier_Prime } from "next/font/google";
import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });
const courierPrime = Courier_Prime({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-courier",
});

export const metadata: Metadata = {
    title: {
        default: "Hendrey Kendall White — Contemporary Painting",
        template: "%s | Hendrey Kendall White",
    },
    description:
        "The collaborative painting practice of Thomas Hendrey and Alex Kendall White. The Surfaces series turns transmitted data into hand-worked oil pastel paintings.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${courierPrime.variable} bg-neutral-50`}>
                <Navigation />
                <main className="min-h-screen">{children}</main>
                <Analytics />:
            </body>
        </html>
    );
}
