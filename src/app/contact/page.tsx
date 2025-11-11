"use client";

import { useState, useEffect } from "react";
import { Mail, Instagram, MapPin } from "lucide-react";

export default function Contact() {
    const [artworkTitle, setArtworkTitle] = useState<string | null>(null);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log("Form submitted:", formData);
        // You could use EmailJS, Formspree, or your own backend

        // Example with EmailJS:
        // emailjs.send('service_id', 'template_id', formData, 'public_key')
        //   .then(() => {
        //     alert('Message sent successfully!');
        //     setFormData({ name: "", email: "", subject: "", message: "" });
        //   })
        //   .catch((error) => {
        //     console.error('Error:', error);
        //     alert('Failed to send message. Please try again.');
        //   });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="pt-16 min-h-screen bg-white">
            <div className="py-20 px-4 max-w-6xl mx-auto">
                <div className="text-left mb-16">
                    <h1 className="text-4xl md:text-5xl font-light mb-6 text-neutral-800">
                        Get in Touch
                    </h1>
                    <p
                        className="text-lg text-neutral-600 max-w-2xl"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        {artworkTitle
                            ? `Interested in "${artworkTitle}"? Send us a message below.`
                            : "Interested in this work? Have a question or want to discuss a commission? We would love to hear from you."}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-light mb-10 text-neutral-800">
                                Contact Information
                            </h2>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4">
                                    <Mail className="text-neutral-400" size={20} />
                                    <div>
                                        <p className="text-neutral-800">Email</p>
                                        <a
                                            href="mailto:studio@hkw.com"
                                            className="text-neutral-600 hover:text-neutral-800 transition-colors"
                                            style={{ fontFamily: "Courier New, monospace" }}
                                        >
                                            studio@hendreykendallwhite.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Instagram className="text-neutral-400" size={20} />
                                    <div>
                                        <p className="text-neutral-800">Instagram</p>
                                        <a
                                            href="https://instagram.com/hendreykendallwhite"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-neutral-600 hover:text-neutral-800 transition-colors"
                                            style={{ fontFamily: "Courier New, monospace" }}
                                        >
                                            @hendreykendallwhite
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <MapPin className="text-neutral-400" size={20} />
                                    <div>
                                        <p className="text-neutral-800">Location</p>
                                        <p
                                            className="text-neutral-600"
                                            style={{ fontFamily: "Courier New, monospace" }}
                                        >
                                            London, SW15
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-light mb-4 text-neutral-800">
                                Studio Visits
                            </h3>
                            <p
                                className="text-neutral-600 leading-relaxed"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                Studio visits are available by appointment. Please reach out if you
                                would like to see works in person or discuss potential
                                collaborations.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-light mb-4 text-neutral-800">
                                Commissions
                            </h3>
                            <p
                                className="text-neutral-600 leading-relaxed"
                                style={{ fontFamily: "Courier New, monospace" }}
                            >
                                Commission work available. Please include details about your
                                project, timeline, and budget in your message.
                            </p>
                        </div>

                        {/* {artworkTitle && ( */}
                        {/*     <div className="bg-neutral-50 p-6"> */}
                        {/*         <h3 className="text-xl font-light mb-4 text-neutral-800"> */}
                        {/*             Artwork Inquiry */}
                        {/*         </h3> */}
                        {/*         <p */}
                        {/*             className="text-neutral-600 leading-relaxed" */}
                        {/*             style={{ fontFamily: "Courier New, monospace" }} */}
                        {/*         > */}
                        {/*             You&apos;re inquiring about: <strong>"{artworkTitle}"</strong> */}
                        {/*         </p> */}
                        {/*         <p */}
                        {/*             className="text-neutral-600 leading-relaxed mt-2" */}
                        {/*             style={{ fontFamily: "Courier New, monospace" }} */}
                        {/*         > */}
                        {/*             We'll provide pricing, availability, and additional images upon */}
                        {/*             request. */}
                        {/*         </p> */}
                        {/*     </div> */}
                        {/* )} */}
                    </div>

                    {/* Contact Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-neutral-700 mb-2"
                                >
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-500 focus:outline-none transition-colors duration-200"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-neutral-700 mb-2"
                                >
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-500 focus:outline-none transition-colors duration-200"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-neutral-700 mb-2"
                                >
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-500 focus:outline-none transition-colors duration-200"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-neutral-700 mb-2"
                                >
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-500 focus:outline-none transition-colors duration-200 resize-none"
                                    placeholder={
                                        artworkTitle
                                            ? "Please include any specific questions about the artwork, pricing inquiries, or if you'd like to schedule a studio visit..."
                                            : "Your message..."
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-neutral-800 text-white py-3 px-6 hover:bg-neutral-700 transition-colors duration-200 font-medium"
                            >
                                Send Message
                            </button>
                        </form>

                        <p className="text-xs text-neutral-500 mt-4">
                            * Required fields. We typically respond within 24 hours during business
                            days.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
