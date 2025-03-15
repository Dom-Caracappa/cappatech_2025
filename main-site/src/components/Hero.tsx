import { useEffect, useRef, useState, memo, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 1. Cube at (0,0,0)
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

    // Return a black cube
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

export default function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // 2. Keep the aspect ratio logic but no absolute
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                // For a 4:3 ratio
                containerRef.current.style.height = `${containerRef.current.offsetWidth * 0.75}px`;
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        // 3. Center the entire section horizontally
        <section
            ref={containerRef}
            className="mx-auto mb-16 w-full max-w-4xl bg-white/30 backdrop-blur-md 
                 border border-white/40 shadow-black shadow-2xl rounded-lg 
                 py-16 md:py-24 mt-32 flex flex-col items-center justify-center"
        >
            {/* 4. Canvas in normal flow, no absolute */}
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

            {/* 5. Hero Text in the same flow, below the canvas */}
            <div className="absolute text-center mix-blend-difference mt-6">
                <h2 className="text-3xl font-semibold text-gray-950 invert">
                    Are You in the Black Box Business?
                </h2>
                <p className="mt-4 text-gray-900 max-w-md leading-relaxed invert mx-auto">
                    Turn hidden work into lasting knowledge. Capture expertise.
                    Build a system that scales.
                </p>
            </div>
        </section>
    );
}
