import { useState } from "react";

const services = [
  {
    title: "Digital Transformation & Workflow Automation",
    icon: {
      default: "/icons/services-icons/lightbulb-w.png",
      hover: "/icons/services-icons/lightbulb-o.png",
    },
    subtitleParts: [
      { text: "Intelligently ", italic: true },
      { text: "streamline your org...", italic: false },
    ],
    description:
      "We design and implement custom digital workflows that reduce inefficiencies, standardize processes, and enable seamless collaboration across departments. From automated approvals to integrated knowledge systems, we ensure your operations are future-proof.",
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
    subtitleParts: [{ text: "Bring order to chaos...", italic: false }],
    description:
      "We specialize in creating structured, maintainable, and scalable documentation that empowers teams to work efficiently. Whether it’s engineering documentation, SOPs, API guides, or knowledge bases, we ensure your information is always accessible, up-to-date, and actionable.",
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
    subtitleParts: [
      {
        text: "Your org will grow, be in control...",
        italic: false,
      },
    ],
    description:
      "We help businesses implement and optimize digital business systems for project management, data visualization, and team collaboration. From Jira workflows to Power BI dashboards, we ensure you have the right tools to drive efficiency and accountability.",
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
    subtitleParts: [{ text: "Buy once, cry once...", italic: false }],
    description:
      "We provide strategic guidance to help organizations adopt, scale, and optimize their technical operations. Whether you're modernizing legacy systems, evaluating tools, or implementing new methodologies, we ensure your digital strategy drives results.",
    examples: [
      "Digital Tool & Vendor Selection",
      "Tech Stack Evaluation & Migration Strategy",
      "Agile & Lean Project Management Consulting",
      "Cybersecurity & Risk Mitigation for Digital Operations",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="mx-auto w-full mt-16 mb-16 max-w-[1400px] border-orange-500 border shadow-black shadow-2xl px-4 py-8 text-left bg-gray-900 rounded-lg "
    >
      <h2 className="text-left ml-6 px-6 text-2xl font-bold mt-2 mb-10 text-orange-500 leading-tight">
        Our Services
      </h2>

      <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className={`p-4 bg-gray-950/70 rounded-lg  transition-transform duration-300 group text-center md:text-left 
      ${isOpen ? "pb-10" : ""}`}
    >
      {/* Header: Icon + Title + Chevron */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Icon */}
        <div
          className="relative w-16 h-16 flex items-center justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={hovered ? service.icon.hover : service.icon.default}
            alt={`${service.title} icon`}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
          />
        </div>

        {/* Title */}
        <span className="text-lg md:text-xl font-semibold text-sky-50 flex-grow text-left ml-4">
          {service.title}
        </span>

        {/* Chevron Toggle */}
        <button
          className="p-2 rounded-full hover:bg-gray-800"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <ChevronIcon
            className={`w-8 h-8 text-white transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>

      {/* Expandable Content - Keeps Section from Overlapping */}
      <div
        className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
      >
        <p className="mt-3 text-left text-base/8 text-sky-50">{service.description}</p>
        <ul className="mt-6 text-left p-6 text-sky-100 list-disc list-outside">
          {service.examples.map((example, index) => (
            <li className="mt-0.8" key={index}>{example}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Chevron Icon Component
function ChevronIcon(props) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
