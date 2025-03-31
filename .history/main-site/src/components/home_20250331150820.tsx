import { useState } from "react";

import Hero3D from "./Hero.tsx";
import Method from "./Method";
import Services from "./Services";
import Pricing from "./Pricing";
import ContactSection from "./ContactSection";

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
