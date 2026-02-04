"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Hide navigation on artwork detail pages (e.g., /portfolio/surface-i)
    // But show it on the portfolio grid page (/portfolio)
    const isArtworkPage = pathname?.startsWith("/portfolio/") && pathname !== "/portfolio";

    // Don't render anything if we're on an artwork detail page
    if (isArtworkPage) {
        return null;
    }

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/portfolio", label: "Works" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/92 backdrop-blur-sm border-b border-neutral-200">
            <div className="w-full px-4 md:px-8">
                <div className="flex items-center justify-between h-10 md:h-16 w-full">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-sm md:text-base lg:text-base font-light text-neutral-800 "
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        Hendrey - Kendall White
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-neutral-600 hover:text-neutral-800 transition-colors duration-200 font-light"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-neutral-500 hover:text-neutral-800"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-neutral-200">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{ fontFamily: "Courier New, monospace" }}
                                className="block py-2 text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
