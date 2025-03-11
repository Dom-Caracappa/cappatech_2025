import { useState } from "react";

// ✅ Define MethodStep Type
interface MethodStep {
    id: string;
    title: string;
    description: string;
    icon: {
        default: string;
        hover: string;
    };
}

// ✅ Define method steps with Type Safety
const methodSteps: MethodStep[] = [
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

// ✅ Type the Main Component
export default function Method(): JSX.Element {
    return (
        <section className="w-full mb-16 max-w-screen-xl px-6 py-16 md:py-24 bg-gray-900 text-white rounded-md shadow-2xl shadow-black border border-orange-500">
            <div className="w-full max-w-5xl mx-auto">
                {/* Section Title */}
                <h2 className="text-2xl text-center font-bold text-orange-500 mb-8">
                    The CappaTech Method
                </h2>

                {/* Grid Layout */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {methodSteps.map((step: MethodStep) => (
                        <div
                            key={step.id}
                            className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-gray-800 transition-transform hover:scale-105 hover:bg-gray-700"
                        >
                            <IconToggle icon={step.icon} title={step.title} />
                            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ✅ Type the IconToggle Component
interface IconToggleProps {
    icon: { default: string; hover: string };
    title: string;
}

function IconToggle({ icon, title }: IconToggleProps): JSX.Element {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <div
            className="w-12 h-12 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            role="img"
            aria-label={`${title} icon`}
        >
            <img
                src={hovered ? icon.hover : icon.default}
                alt={title}
                className="w-full h-full transition-opacity duration-300 ease-in-out"
            />
        </div>
    );
}
