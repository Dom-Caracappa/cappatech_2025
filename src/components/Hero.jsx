import { useEffect } from "react";

const Hero = () => {
    useEffect(() => {
        console.log("Appending three-init.js... ✅");

        const script = document.createElement("script");
        script.src = "/js/three-init.js"; // ✅ Load from /public
        script.type = "module";
        script.async = true;

        script.onload = () => console.log("three-init.js loaded! ✅");
        script.onerror = () => console.error("Failed to load three-init.js ❌");

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <section className="relative flex w-full max-w-[1400px] mx-auto px-4 flex-col items-center justify-center pt-24 md:pt-32">
            <div className="glass-background relative flex flex-col items-center justify-center w-[95%] max-w-4xl bg-white/30 backdrop-blur-md border border-white/40 rounded-lg min-h-[500px] shadow-black shadow-2xl p-6 mt-4">
                {/* 🎥 WebGL Canvas for Three.js */}
                <div id="three-container" className="relative w-full h-[500px] flex items-center justify-center"></div>

                {/* Text Content */}
                <div className="relative z-10 text-center md:text-left px-4 mt-6">
                    <p className="text-3xl sm:text-4xl font-semibold text-gray-950">
                        Are You in the Black Box Business?
                    </p>
                    <p className="max-w-md mt-8 mb-6 text-gray-900 leading-relaxed">
                        Turn hidden work into lasting knowledge. Capture expertise. Build a system that scales.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
