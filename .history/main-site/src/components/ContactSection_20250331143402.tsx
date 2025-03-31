import React from "react";

const ContactSection: React.FC = () => {
    return (
        <section
            id="contact"
            className="w-full max-w-screen-xl px-6 py-16 md:py-24 bg-gray-900 text-black rounded-md shadow-2xl shadow-black flex justify-center items-center"
        >
            <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Heading */}
                <h2 className="text-3xl font-bold text-orange-500 text-center">Get in Touch</h2>
                <p className="text-gray-300 text-center mt-2">
                    Have questions or want to work together? Please email us directly.
                </p>

                {/* Contact Form (Disabled) */}
                <form onSubmit={(e) => e.preventDefault()} className="mt-6" aria-disabled="true">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-200 font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            disabled
                            placeholder="Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-700 text-gray-400 cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-200 font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            disabled
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-700 text-gray-400 cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-gray-200 font-semibold">
                            Subject
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            disabled
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md bg-gray-700 text-gray-400 cursor-not-allowed"
                        >
                            <option>General Inquiry</option>
                            <option>Service Request</option>
                            <option>Partnership</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-200 font-semibold">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            disabled
                            placeholder="Message"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-700 text-gray-400 cursor-not-allowed"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled
                        className="w-full bg-gray-500 text-white font-semibold py-2 rounded-md cursor-not-allowed"
                    >
                        Submit Disabled – Please Email Us
                    </button>
                </form>

                {/* Direct Email CTA */}
                <div className="text-center mt-6">
                    <p className="text-gray-300 font-medium">For now, please email us directly:</p>
                    <a
                        href="mailto:info@cappatech.net"
                        className="mt-2 inline-block text-orange-400 hover:text-orange-300 transition-colors text-lg font-semibold"
                    >
                        info@cappatech.net
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
