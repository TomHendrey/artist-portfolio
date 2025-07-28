// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Your Name - Artist Portfolio",
    description: "Contemporary artist specializing in...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-neutral-50`}>
                <Navigation />
                <main className="min-h-screen">{children}</main>
            </body>
        </html>
    );
}
