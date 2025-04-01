import { useState } from "react";
import "../styles/global.css";
import Navbar from "./NavBar.tsx";
import Hero3D from "./Hero.tsx";
import Method from "./Method.tsx";
import Services from "./Services.tsx";
import Pricing from "./Pricing.tsx";
import ContactSection from "./ContactSection.tsx";
import Footer from "./Footer.astro";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [planTitle, setPlanTitle] = useState("Standard Plan");

    const openModal = (title: string) => {
        setPlanTitle(title);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Navbar />
            <Hero3D />
            <Method />
            <Services />
            <Pricing
                isOpen={isOpen}
                onClose={closeModal}
                planTitle={planTitle}
            // Optional: Uncomment this if you want Pricing to open the modal
            // onPlanSelect={openModal}
            />
            <ContactSection />
        </>
    );
};

export default Home;
