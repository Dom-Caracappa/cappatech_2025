import { useState } from "react";

const methodSteps = [
    {
        id: "discovery",
        title: "Step 1: Discovery",
        description: "We analyze your business needs and identify key challenges to address.",
        icon: {
            default: "/icons/method-icons/discovery-w.svg",
            hover: "/icons/method-icons/discovery-o.svg",
        },
    },
    {
        id: "strategy",
        title: "Step 2: Strategy",
        description: "We craft a tailored plan to streamline operations and optimize workflow.",
        icon: {
            default: "/icons/method-icons/strategy-w.svg",
            hover: "/icons/method-icons/strategy-o.svg",
        },
    },
    {
        id: "implementation",
        title: "Step 3: Execution",
        description: "We implement solutions efficiently, ensuring smooth adoption and performance.",
        icon: {
            default: "/icons/method-icons/implementation-w.svg",
            hover: "/icons/method-icons/implementation-o.svg",
        },
    },
    {
        id: "optimization",
        title: "Step 4: Optimization",
        description: "We refine and improve solutions for long-term success and adaptability.",
        icon: {
            default: "/icons/method-icons/optimization-w.svg",
            hover: "/icons/method-icons/optimization-o.svg",
        },
    },
];

export default function Method() {
    return (
        <section className="mx-auto w-full mt-16 mb-16 max-w-[1400px] border-orange-500 border shadow-black shadow-2xl px-4 py-8 text-left bg-gray-900 rounded-lg">
            <div className="container max-w-6xl w-full px-6 mx-auto">
                <h2 className="text-left px-6 text-2xl font-bold mt-2 mb-10 text-orange-500 leading-tight">
                    The CappaTech Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {methodSteps.map((step) => (
                        <div key={step.id} className="method-card flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-700">
                            <IconToggle icon={step.icon} class="hover:" title={step.title} />
                            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                            <p className="text-gray-300 text-sm leading-normal max-w-xs">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function IconToggle({ icon, title }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative w-16 h-16"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img
                src={hovered ? icon.hover : icon.default}
                alt={title}
                className="absolute inset-0 w-full h-full transition-opacity duration-300"
            />
        </div>
    );
}
