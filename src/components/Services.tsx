import { useState } from "react";

// ✅ Define Service Type
interface Service {
    title: string;
    icon: {
        default: string;
        hover: string;
    };
    description: string;
    examples: string[];
}

// ✅ Define services with Type Safety
const services: Service[] = [
    {
        title: "Digital Transformation & Workflow Automation",
        icon: {
            default: "/icons/services-icons/lightbulb-w.png",
            hover: "/icons/services-icons/lightbulb-o.png",
        },
        description: "We design and implement custom digital workflows...",
        examples: [
            "Process Optimization",
            "No-Code & Low-Code Solutions",
            "Workflow Automation",
            "Cloud & API-First Digital Architecture",
        ],
    },
    {
        title: "Technical Documentation & Knowledge Management",
        icon: {
            default: "/icons/services-icons/gear-w.png",
            hover: "/icons/services-icons/gear-o.png",
        },
        description: "We specialize in creating structured, maintainable...",
        examples: [
            "Enterprise & Engineering Documentation",
            "Knowledge Base Development",
            "Information Architecture & Taxonomy Design",
            "Automated Documentation Pipelines",
        ],
    },
    {
        title: "Business Systems & Data-Driven Decision Making",
        icon: {
            default: "/icons/services-icons/rocket-w.png",
            hover: "/icons/services-icons/rocket-o.png",
        },
        description: "We help businesses implement and optimize digital business systems...",
        examples: [
            "Jira & Confluence Suite Implementation",
            "Custom Business Intelligence Dashboards",
            "Standardization & Governance for Digital Workflows",
            "ERP & CRM Integrations",
        ],
    },
    {
        title: "Technical Strategy & Consulting",
        icon: {
            default: "/icons/services-icons/target-w.png",
            hover: "/icons/services-icons/target-o.png",
        },
        description: "We provide strategic guidance to help organizations adopt, scale...",
        examples: [
            "Digital Tool & Vendor Selection",
            "Tech Stack Evaluation & Migration Strategy",
            "Agile & Lean Project Management Consulting",
            "Cybersecurity & Risk Mitigation for Digital Operations",
        ],
    },
];

// ✅ Type the ServiceCard Component
interface ServiceCardProps {
    service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <div className="p-6 mb-0 bg-gray-800 rounded-lg transition-transform hover:scale-105 hover:bg-gray-700">
            {/* Header: Icon + Title + Toggle Button */}
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center space-x-4">
                    {/* Icon */}
                    <div
                        className="w-10 h-10 flex items-center justify-center shrink-0"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <img
                            src={hovered ? service.icon.hover : service.icon.default}
                            alt={service.title}
                            className="w-10 h-10 object-contain transition-opacity duration-300"
                        />
                    </div>

                    {/* Title */}
                    <span className="text-lg font-semibold text-white leading-tight">{service.title}</span>
                </div>

                {/* Toggle Icon */}
                <button
                    className="p-2 rounded-full hover:bg-gray-700"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(!isOpen);
                    }}
                >
                    <ChevronIcon className={`w-6 h-6 text-white transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
            </div>

            {/* Expandable Content */}
            <div className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"}`}>
                <p className="mt-3 text-base text-gray-300">{service.description}</p>
                <ul className="mt-4 list-disc list-outside pl-5 text-gray-200">
                    {service.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// ✅ Type the ChevronIcon Component
const ChevronIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg {...props} fill="currentColor" viewBox="0 0 20 20">
            <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    );
};

// ✅ Type the Services Component
export default function Services(): JSX.Element {
    return (
        <section id="services" className="w-full mb-16 rounded-md max-w-screen-xl px-6 py-16 md:py-24 bg-gray-900 border border-orange-500 text-white shadow-2xl shadow-black">
            <h2 className="text-center text-2xl font-bold mb-6 text-orange-500">Our Services</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                {services.map((service: Service, index: number) => (
                    <ServiceCard key={index} service={service} />
                ))}
            </div>
        </section>
    );
}
