import { useState } from "react";

export default function ContactForm() {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(""); // "success" or "error"

    const handleSubmit = async (event) => {
        event.preventDefault(); // Stop page reload
        console.log("Form submission started...");  // Debugging log

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        console.log("Collected Form Data:", data);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                console.log("Server accepted form submission!");
                setMessage("Message sent successfully!");
                setStatus("success");

                form.reset(); // ✅ This should clear the form
                setTimeout(() => setMessage(""), 5000);
            } else {
                console.error("Server returned an error");
                throw new Error("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setMessage("Something went wrong. Please try again.");
            setStatus("error");

            // Auto-hide error message after 5 seconds
            setTimeout(() => setMessage(""), 5000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2">
            {/* ✅ Display Success/Error Message */}
            {message && (
                <p className={`text-center font-semibold mt-4 ${status === "success" ? "text-green-500" : "text-red-500"}`}>
                    {message}
                </p>
            )}

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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
                    rows="4"
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
    );
}
