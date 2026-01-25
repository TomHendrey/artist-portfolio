"use client";

import { useState, useEffect } from "react";

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
        <div className="pt-16 min-h-screen bg-white">
            <div className="py-12 px-4 max-w-5xl mx-auto">
                {/* Left-aligned heading */}
                <div className="max-w-2xl mx-auto mb-10 pb-2">
                    <h1 className="text-4xl md:text-4xl font-light text-black mb-4">
                        Get In Touch
                    </h1>
                    <p
                        className="text-base text-neutral-600 mt-3"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        Please get in contact with us via the email below, or leave a message
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Contact Information - stacked vertically */}
                    <div className="space-y-5 mb-8">
                        {/* Email */}
                        <div>
                            <div className="text-xs uppercase tracking-wider text-neutral-800 mb-2">
                                Email
                            </div>
                            <a
                                href="mailto:studio@hendreykendallwhite.com"
                                className="text-neutral-800 hover:text-neutral-600 transition-colors"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                studio@hendreykendallwhite.com
                            </a>
                        </div>

                        {/* Instagram */}
                        <div>
                            <div className="text-xs uppercase tracking-wider text-neutral-800 mb-2">
                                Instagram
                            </div>
                            <a
                                href="https://instagram.com/hendreykendallwhite"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-800 hover:text-neutral-600 transition-colors"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                @hendreykendallwhite
                            </a>
                        </div>

                        {/* Location */}
                        <div>
                            <div className="text-xs uppercase tracking-wider text-neutral-800 mb-2">
                                Location
                            </div>
                            <p
                                className="text-neutral-800"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                London, SW15
                            </p>
                            <p
                                className="text-sm text-neutral-500 mt-1"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                Available by appointment
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-2">
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
                                    className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-800 focus:outline-none transition-colors duration-200 bg-transparent"
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
                                    className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-800 focus:outline-none transition-colors duration-200 bg-transparent"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                />
                            </div>

                            {/* Subject */}
                            <div className="pb-3">
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Subject"
                                    className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-800 focus:outline-none transition-colors duration-200 bg-transparent"
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
                                    className="w-full px-0 py-3 border-0 border-b border-neutral-300 focus:border-neutral-800 focus:outline-none transition-colors duration-200 resize-none bg-transparent"
                                    style={{ fontFamily: "Courier New, monospace" }}
                                />
                            </div>

                            {/* Submit Button - matches homepage style */}
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
    );
}
