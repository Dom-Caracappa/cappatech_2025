import { useEffect, useRef, useState, memo, useMemo } from "react";
// Import your custom shader material
import DynamicTextShaderMaterial from "./DynamicTextShaderMaterial";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Cube at (0,0,0)
const Cube = memo(({ isDragging }: { isDragging: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const time = useRef(0);

    useFrame((state) => {
        if (meshRef.current && !isDragging) {
            time.current += state.clock.getDelta();
            // Slight float + rotation
            meshRef.current.position.set(
                Math.cos(time.current * 0.5) * 0.2,
                Math.sin(time.current * 0.8) * 0.3,
                0 // keep Z at 0 for better centering
            );
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
        }
    });

    // Apply your custom shader
    // If you want to pass a texture, do <dynamicTextShaderMaterial uDepthTexture={someTexture} />
    return useMemo(
        () => (
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <boxGeometry args={[3, 3, 3]} />
                <dynamicTextShaderMaterial />
            </mesh>
        ),
        []
    );
});

export default function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Keep 4:3 aspect ratio for the container
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                containerRef.current.style.height = `${containerRef.current.offsetWidth * 0.75
                    }px`;
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section
            ref={containerRef}
            className="mx-auto mb-16 w-full max-w-4xl bg-white/30 backdrop-blur-md
        border border-white/40 shadow-black shadow-2xl rounded-lg
        py-16 md:py-24 mt-32 flex flex-col items-center justify-center"
        >
            {/* Canvas in normal flow */}
            <div className="w-full h-full">
                <Canvas
                    className="w-full h-full"
                    gl={{ antialias: true, precision: "highp" }}
                    onPointerDown={() => setIsDragging(true)}
                    onPointerUp={() => setIsDragging(false)}
                    onPointerOut={() => setIsDragging(false)}
                >
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <Cube isDragging={isDragging} />
                    <OrbitControls enableZoom={false} />
                </Canvas>
            </div>

            {/* Hero text overlay */}
            <div className="absolute text-center mix-blend-difference mt-6">
                <h2 className="text-3xl font-semibold text-gray-950 invert">
                    Are You in the Black Box Business?
                </h2>
                <p className="mt-4 text-gray-900
