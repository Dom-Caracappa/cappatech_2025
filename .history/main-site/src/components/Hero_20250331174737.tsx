import { useEffect, useRef, useState, memo, useMemo } from "react";
import "./dynamicTextShaderMaterial"; // Only import once to register
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Cube with floating animation
const Cube = memo(({ isDragging }: { isDragging: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const time = useRef(0);

    useFrame((state) => {
        if (meshRef.current && !isDragging) {
            time.current += state.clock.getDelta();
            meshRef.current.position.set(
                Math.cos(time.current * 0.5) * 0.2,
                Math.sin(time.current * 0.8) * 0.3,
                0
            );
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <boxGeometry args={[3, 3, 3]} />
            <dynamicTextShaderMaterial attach="material" />
        </mesh>
    );
});

export default function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

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
        <section className="relative mx-auto mb-16 w-full max-w-4xl bg-white/30 backdrop-blur-md border border-white/40 shadow-black shadow-2xl rounded-lg py-16 md:py-24 flex flex-col items-center justify-center">
            {/* Text ABOVE the canvas */}
            <div className="relative z-10 text-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-900">
                    Are You in the Black Box Business?
                </h2>
                <p className="mt-4 text-gray-700 max-w-md leading-relaxed mx-auto">
                    Turn hidden work into lasting knowledge. Capture expertise. Build a system that scales.
                </p>
            </div>

            {/* Canvas BELOW the text */}
            <div ref={containerRef} className="w-full h-full z-0">
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
        </section>
    );
}
