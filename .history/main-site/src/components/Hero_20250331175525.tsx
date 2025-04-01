import { useEffect, useRef, useState, memo, useMemo } from "react";
import "./dynamicTextShaderMaterial"; // side-effect import to extend THREE
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Cube component with dynamic shader material
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
            <dynamicTextShaderMaterial />
        </mesh>
    );
});

export default function Hero3D() {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <section className="relative mt-32 mx-auto w-full max-w-4xl shadow-2xl mb-16">
            {/* TEXT OVERLAY */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4">
                <h2 className="text-3xl font-semibold text-white drop-shadow-lg">
                    Are You in the Black Box Business?
                </h2>
                <p className="mt-4 text-white max-w-md leading-relaxed drop-shadow-md">
                    Turn hidden work into lasting knowledge. Capture expertise. Build a system that scales.
                </p>
            </div>

            {/* CANVAS */}
            <div className="relative z-0 overflow-hidden rounded-lg bg-black aspect-video">
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
