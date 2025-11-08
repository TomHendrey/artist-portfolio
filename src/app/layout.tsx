// src/app/layout.tsx
import "./globals.css";
import { Inter, Courier_Prime } from "next/font/google";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });
const courierPrime = Courier_Prime({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-courier",
});

export const metadata = {
    title: "Hendrey Kendall White | Contemporary Artist",
    description: "Contemporary artist specializing in digital painting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${courierPrime.variable} bg-neutral-50`}>
                <Navigation />
                <main className="min-h-screen">{children}</main>
            </body>
        </html>
    );
}
