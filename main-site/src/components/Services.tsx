import { useState } from "react";

// 1. Service interface & data
interface Service {
    title: string;
    icon: {
        default: string;
        hover: string;
    };
    description: string;
    examples: string[];
}

const services: Service[] = [
    {
        title: "Digital Transformation",
        icon: {
            default: "/icons/services-icons/lightbulb-w.png",
            hover: "/icons/services-icons/lightbulb-o.png",
        },
        description: "We design and implement custom digital workflows...",
        examples: [
            "Process Optimization",
            "No-Code & Low-Code Solutions",
            "Workflow Automation",
            "Cloud Architecture",
        ],
    },
    {
        title: "Technical Documentation",
        icon: {
            default: "/icons/services-icons/gear-w.png",
            hover: "/icons/services-icons/gear-o.png",
        },
        description: "We specialize in creating structured, maintainable docs...",
        examples: [
            "Enterprise & Engineering Documentation",
            "Knowledge Base Development",
            "Information Architecture & Taxonomy Design",
            "Automated Documentation Pipelines",
        ],
    },
    {
        title: "Business Systems",
        icon: {
            default: "/icons/services-icons/rocket-w.png",
            hover: "/icons/services-icons/rocket-o.png",
        },
        description:
            "We help businesses implement and optimize digital business systems...",
        examples: [
            "Jira & Confluence Suite Implementation",
            "Custom BI Dashboards",
            "ERP & CRM Integrations",
            "Governance for Digital Workflows",
        ],
    },
    {
        title: "Strategy & Consulting",
        icon: {
            default: "/icons/services-icons/target-w.png",
            hover: "/icons/services-icons/target-o.png",
        },
        description:
            "We provide strategic guidance to help organizations adopt, scale...",
        examples: [
            "Tech Stack Evaluation & Migration Strategy",
            "Agile & Lean Project Management Consulting",
            "Cybersecurity & Risk Mitigation",
            "Digital Tool & Vendor Selection",
        ],
    },
];

// 2. Main Component
export default function ResponsiveServices() {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // The currently active service
    const activeService = services[activeIndex];

    // Handle select dropdown changes on mobile
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveIndex(parseInt(e.target.value, 10));
    };

    return (
        <section id="services" className="w-full max-w-screen-xl mb-16 mx-auto px-6 py-10 text-white bg-gray-900 border border-orange-500 rounded-md shadow-2xl shadow-black">
            <h2 className="text-center text-2xl font-bold mb-8 text-orange-500">
                Our Services
            </h2>

            {/* Tabs (Hidden on small screens, shown on md+ screens) */}
            <div className="hidden md:flex space-x-4 justify-center mb-6">
                {services.map((service, index) => {
                    const isActive = index === activeIndex;
                    const isHovered = hoveredIndex === index;

                    // Decide which icon to show
                    let iconSrc = service.icon.default;
                    if (isActive) {
                        // We'll still use the default icon path,
                        // but apply a CSS filter to make it white
                        iconSrc = service.icon.default;
                    } else if (isHovered) {
                        iconSrc = service.icon.hover;
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`flex items-center px-4 py-6 rounded-md transition-colors 
                ${isActive
                                    ? "bg-orange-500"
                                    : "bg-gray-700 hover:bg-gray-600"
                                }
              `}
                        >
                            <img
                                src={iconSrc}
                                alt={service.title}
                                // If active => apply filter to make the icon white
                                className={`w-5 h-5 object-contain mr-2 ${isActive
                                    ? "filter brightness-0 invert"
                                    : ""
                                    }`}
                            />
                            <span className="text-sm font-medium">{service.title}</span>
                        </button>
                    );
                })}
            </div>

            {/* Dropdown (Shown on small screens, hidden on md+ screens) */}
            <div className="md:hidden mb-6">
                <select
                    onChange={handleSelectChange}
                    value={activeIndex}
                    className="block w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-md"
                >
                    {services.map((service, index) => (
                        <option key={index} value={index}>
                            {service.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Active Service Content */}
            <div className="bg-gray-800 p-6 rounded-md">
                <h3 className="text-xl font-semibold text-orange-400 mb-2">
                    {activeService.title}
                </h3>
                <p className="text-base text-gray-300 mb-6">
                    {activeService.description}
                </p>
                <ul className="list-disc list-outside pl-5 text-gray-200 space-y-1">
                    {activeService.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
