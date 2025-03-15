import React, { useState } from "react";

const ContactSection: React.FC = () => {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"success" | "error" | "">("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submission started...");

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log("Collected Form Data:", data);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Server accepted form submission!");
                setMessage("Message sent successfully!");
                setStatus("success");
                event.currentTarget.reset(); // Clear form
                setTimeout(() => setMessage(""), 5000);
            } else {
                throw new Error("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setMessage("Something went wrong. Please try again.");
            setStatus("error");
            setTimeout(() => setMessage(""), 5000);
        }
    };

    return (
        <section id="contact" className="w-full max-w-screen-xl px-6 py-16 md:py-24 bg-gray-900 text-black rounded-md shadow-2xl shadow-black flex justify-center items-center">
            <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Heading */}
                <h2 className="text-3xl font-bold text-orange-500 text-center">Get in Touch</h2>
                <p className="text-gray-300 text-center mt-2">
                    Have questions or want to work together? Drop us a message!
                </p>

                {/* ✅ Success/Error Message */}
                {message && (
                    <p className={`text-center font-semibold mt-4 ${status === "success" ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-200 font-semibold">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-200 font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-gray-200 font-semibold">Subject</label>
                        <select
                            id="subject"
                            name="subject"
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        >
                            <option value="general">General Inquiry</option>
                            <option value="services">Service Request</option>
                            <option value="partnership">Partnership</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-200 font-semibold">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white font-semibold py-2 rounded-md hover:bg-orange-700 transition duration-200"
                    >
                        Send Message
                    </button>
                </form>

                {/* Additional Contact CTA */}
                <div className="text-center mt-6">
                    <p className="text-gray-400">Prefer direct email?</p>
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
