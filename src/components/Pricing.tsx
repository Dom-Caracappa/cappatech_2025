import React, { useState } from "react";
import clsx from "clsx";

// ✅ Define PricingPlan Type
interface PricingPlan {
    title: string;
    price: string;
    details: string;
    note: string;
    features: string[];
    buttonText: string;
    buttonColor: string;
    border?: boolean; // Optional
}

// ✅ Define pricing plans with Type Safety
const pricingPlans: PricingPlan[] = [
    {
        title: "Starter Package",
        price: "$1,000",
        details: "Perfect for small businesses & quick consultations.",
        note: "(8-hour minimum at $125/hr)",
        features: ["Consultation & Planning", "Strategy Session", "Initial Implementation"],
        buttonText: "Get Started",
        buttonColor: "bg-orange-500 hover:bg-orange-600",
        border: true,
    },
    {
        title: "Standard Package",
        price: "$2,500",
        details: "Great for businesses ready to execute strategies.",
        note: "(20-hour block, discounted rate)",
        features: ["Full Strategy & Planning", "Implementation & Execution", "Ongoing Support"],
        buttonText: "Book Now",
        buttonColor: "bg-orange-500 hover:bg-orange-600",
        border: true,
    },
    {
        title: "Full Engagement",
        price: "Custom",
        details: "Custom solutions for businesses needing full support.",
        note: "(Tailored solutions, pricing based on scope)",
        features: ["Dedicated Support", "Custom Development", "Priority Access"],
        buttonText: "Contact for Quote",
        buttonColor: "bg-gray-700 hover:bg-gray-600",
    },
];

// ✅ Type the Modal Component
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    planTitle: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, planTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white hover:text-gray-400 text-xl"
                >
                    ✕
                </button>

                {/* Modal Content */}
                <h3 className="text-2xl font-semibold text-orange-400">{planTitle}</h3>
                <p className="mt-2 text-gray-300">
                    Interested in the <span className="font-bold">{planTitle}</span> plan?
                    Fill out your details, and we'll be in touch!
                </p>

                {/* Contact Form */}
                <form className="mt-4 space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

// ✅ Type the Pricing Component
export default function Pricing(): JSX.Element {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedPlan, setSelectedPlan] = useState<string>("");

    const openModal = (planTitle: string) => {
        setSelectedPlan(planTitle);
        setModalOpen(true);
    };

    return (
        <section className="w-full border mb-16 border-orange-500 rounded-md max-w-screen-xl px-6 py-6 md:py-6 bg-gray-900 text-white shadow-2xl shadow-black">
            {/* Pricing Cards */}
            <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {pricingPlans.map((plan: PricingPlan, index: number) => (
                    <div
                        key={index}
                        className={clsx(
                            "p-4 rounded-2xl transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:-translate-y-2",
                            "dark:bg-gray-800 bg-gray-100",
                            plan.border && "border border-orange-500"
                        )}
                    >
                        <h3 className="text-xl font-semibold text-orange-400">{plan.title}</h3>
                        <p className="mt-2 text-gray-300">{plan.details}</p>
                        <div className="mt-4 text-4xl font-bold text-white">{plan.price}</div>
                        <p className="text-sm text-gray-400">{plan.note}</p>

                        <ul className="mt-4 text-gray-300 space-y-2">
                            {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center">
                                    <span className="text-green-400 mr-2">✔</span> {feature}
                                </li>
                            ))}
                        </ul>

                        {/* Book Now Button */}
                        <button
                            onClick={() => openModal(plan.title)}
                            className={`mt-6 w-full text-white py-2 rounded-lg transition-colors ${plan.buttonColor}`}
                        >
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>

            {/* Render Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} planTitle={selectedPlan} />
        </section>
    );
}
