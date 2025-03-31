"use client";

import { extend } from "@react-three/fiber";
import { useEffect, useRef, useState, memo, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

extend({ OrbitControls, Mesh: THREE.Mesh, BoxGeometry: THREE.BoxGeometry, MeshStandardMaterial: THREE.MeshStandardMaterial });

// 1. Animated Cube Component (Floating, Rotating)
const Cube = memo(({ isDragging }: { isDragging: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const time = useRef(0);

    useFrame((state) => {
        if (meshRef.current && !isDragging) {
            time.current += state.clock.getDelta();
            meshRef.current.position.set(
                Math.cos(time.current * 0.5) * 0.2, // Subtle X sway
                Math.sin(time.current * 0.8) * 0.3, // Floating Y motion
                0 // Keep Z at 0
            );
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return useMemo(
        () => (
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <boxGeometry args={[3, 3, 3]} />
                <meshStandardMaterial color="black" />
            </mesh>
        ),
        []
    );
});

// 2. Hero3D Component
export default function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Maintain a 4:3 aspect ratio
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                containerRef.current.style.height = `${containerRef.current.offsetWidth * 0.75}px`;
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative mx-auto w-full max-w-4xl bg-white/30 
                 backdrop-blur-md border border-white/40 shadow-black shadow-2xl 
                 rounded-lg py-16 md:py-24 mt-32 flex flex-col items-center justify-center"
        >
            {/* 3D Canvas */}
            <div className="relative w-[250px] h-[250px]">
                <Canvas
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

            {/* Hero Text (Dynamically shaded) */}
            <div className="absolute text-center mix-blend-difference text-white mt-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Are You in the Black Box Business?
                </h2>
                <p className="mt-4 text-lg max-w-md mx-auto leading-relaxed">
                    Turn hidden work into lasting knowledge. Capture expertise. Build a system that scales.
                </p>
            </div>
        </section>
    );
}
