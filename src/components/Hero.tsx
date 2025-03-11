import { useEffect, useRef, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, SMAA, FXAA } from "@react-three/postprocessing";
import * as THREE from 'three';

// Optimize the Cube with Memoization
const Cube = memo(({ isDragging }: { isDragging: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const time = useRef(0);

    useFrame((state) => {
        if (meshRef.current && !isDragging) {
            time.current += state.clock.getDelta();
            meshRef.current.position.y = Math.sin(time.current * 0.8) * 0.3; // Floating effect
            meshRef.current.position.x = Math.cos(time.current * 0.5) * 0.2;
            meshRef.current.position.z = Math.sin(time.current * 0.6) * 0.2;

            // Subtle rotation
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 1]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="black" />
        </mesh>
    );
});

// Hero Section
export default function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                containerRef.current.style.height = `${containerRef.current.offsetWidth * 0.75}px`; // Maintains 4:3 ratio
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative mb-16 w-full max-w-4xl bg-white/30 backdrop-blur-md border border-white/40 shadow-black shadow-2xl rounded-lg py-16 md:py-24 mt-32 flex flex-col justify-center items-center"
        >
            {/* 3D Canvas */}
            <div className="absolute inset-0 p-6 w-full h-full">
                <Canvas
                    className="w-full h-full"
                    gl={{ antialias: true, precision: "highp" }}
                    onPointerDown={() => setIsDragging(true)}
                    onPointerUp={() => setIsDragging(false)}
                    onPointerOut={() => setIsDragging(false)} // Prevents stuck dragging
                >
                    <ambientLight intensity={1.2} /> {/* Lower intensity for performance */}
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <Cube isDragging={isDragging} />

                    <OrbitControls enableZoom={false} />

                    {/* Anti-Aliasing & PostProcessing */}
                    <EffectComposer>
                        <SMAA preset="ULTRA" edgeDetectionThreshold={0.1} />
                        <FXAA />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* Hero Text */}
            <div className="relative z-10 text-center mix-blend-difference">
                <h2 className="text-3xl font-semibold text-gray-950 invert">
                    Are You in the Black Box Business?
                </h2>
                <p className="mt-4 text-gray-900 max-w-md leading-relaxed invert">
                    Turn hidden work into lasting knowledge. Capture expertise. Build a system that scales.
                </p>
            </div>
        </section>
    );
}
