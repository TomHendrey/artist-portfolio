"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Contact() {
    const [artworkTitle, setArtworkTitle] = useState<string | null>(null);
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setArtworkTitle(params.get("artwork"));
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    // Pre-fill form if coming from artwork page
    useEffect(() => {
        if (artworkTitle) {
            setFormData((prev) => ({
                ...prev,
                subject: `Inquiry about "${artworkTitle}"`,
                message: `I'm interested in learning more about "${artworkTitle}". Please provide pricing information and additional details.\n\n`,
            }));
        }
    }, [artworkTitle]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("sending");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setFormStatus("idle"), 5000);
            } else {
                setFormStatus("error");
                setTimeout(() => setFormStatus("idle"), 5000);
            }
        } catch (error) {
            console.error("Error:", error);
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Mobile: Image at top */}
            <div className="lg:hidden w-full pt-16">
                <Image
                    src="https://res.cloudinary.com/dutoeewfl/image/upload/v1769381512/contact-mobile-16.jpg"
                    alt="Artwork detail"
                    width={1600}
                    height={700}
                    className="w-full h-auto object-cover"
                    priority
                />
            </div>

            {/* Desktop: Two column layout */}
            <div className="lg:flex lg:h-screen">
                {/* Desktop: Image on left */}
                <div className="hidden lg:block lg:w-2/5 relative">
                    <Image
                        src="https://res.cloudinary.com/dutoeewfl/image/upload/v1769381514/contact-desktop-1.jpg"
                        alt="Artwork detail"
                        width={1000}
                        height={1400}
                        className="absolute inset-0 w-full h-full object-cover object-right"
                        priority
                    />
                </div>

                {/* Form content */}

                <div className="lg:w-3/5 py-12 px-6 lg:py-0 md:pl-12 lg:pl-12 lg:pr-12 xl:pl-32 xl:pr-20 pt-12 lg:pt-16 md:flex md:items-center md:justify-center lg:flex lg:items-center lg:justify-start">
                    <div className="max-w-xl mx-auto lg:mx-0 w-full">
                        {/* Left-aligned heading */}
                        <div className="mb-6 pb-6">
                            <h1 className="text-3xl md:text-3xl font-light text-black mb-3">
                                Get In Touch
                            </h1>
                            <p
                                className="text-sm md:text-sm text-neutral-600 mt-2 tracking-tight"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                Please get in contact via the email below, or leave a message
                            </p>
                        </div>

                        {/* Contact Information - inline layout */}
                        <div className="space-y-5 mb-8">
                            {/* Email - inline */}
                            <div>
                                <div className="text-xs uppercase tracking-wider text-neutral-400 mr-4">
                                    Email
                                </div>
                                <a
                                    href="mailto:studio@hendreykendallwhite.com"
                                    className="text-sm md:text-sm text-neutral-800 hover:text-neutral-600 transition-colors"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    studio@hendreykendallwhite.com
                                </a>
                            </div>

                            {/* Instagram - inline */}
                            <div>
                                <div className="text-xs uppercase tracking-wider text-neutral-400 mr-4">
                                    Instagram
                                </div>
                                <a
                                    href="https://instagram.com/hendreykendallwhite"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm md:text-sm text-neutral-800 hover:text-neutral-600 transition-colors"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    @hendreykendallwhite
                                </a>
                            </div>

                            {/* Location - inline */}
                            <div>
                                <div className="text-xs uppercase tracking-wider text-neutral-400 mr-4">
                                    Location
                                </div>
                                <div
                                    className="text-neutral-800 text-sm md:text-sm,"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    London, SW15,
                                </div>
                                <div
                                    className="text-sm text-neutral-400 "
                                    style={{ fontFamily: "Courier New, monospace" }}
                                >
                                    Available by appointment
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-1">
                                {/* Name */}
                                <div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Name"
                                        className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-800 focus:outline-none transition-colors duration-200 bg-transparent text-sm"
                                        style={{ fontFamily: "Courier New, monospace" }}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Email"
                                        className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-800 focus:outline-none transition-colors duration-200 bg-transparent text-sm"
                                        style={{ fontFamily: "Courier New, monospace" }}
                                    />
                                </div>

                                {/* Subject */}
                                <div className="pb-2">
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="Subject"
                                        className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-800 focus:outline-none transition-colors duration-200 bg-transparent text-sm"
                                        style={{ fontFamily: "Courier New, monospace" }}
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="Message"
                                        className="w-full px-0 py-2 border-0 border-b border-neutral-300 focus:border-neutral-800 focus:outline-none transition-colors duration-200 resize-none bg-transparent text-sm"
                                        style={{ fontFamily: "Courier New, monospace" }}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={formStatus === "sending"}
                                        className="px-8 py-3 bg-neutral-800 text-white hover:bg-neutral-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{ fontFamily: "Courier New, monospace" }}
                                    >
                                        {formStatus === "sending"
                                            ? "Sending..."
                                            : formStatus === "success"
                                              ? "Message Sent!"
                                              : formStatus === "error"
                                                ? "Error - Try Again"
                                                : "Send Message"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
