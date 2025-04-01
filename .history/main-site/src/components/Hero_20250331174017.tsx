import { useEffect, useRef, useState, memo, useMemo } from "react";
import "./dynamicTextShaderMaterial";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 🧱 Black base cube
const BaseCube = memo(({ isDragging }: { isDragging: boolean }) => {
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
            <meshStandardMaterial color="black" />
        </mesh>
    );
});

// ✨ Shader shell overlay (slightly larger)
const ShaderShell = () => {
    const shaderRef = useRef<THREE.Mesh>(null);

    // Dummy depth texture to make shader work
    const dummyTexture = useMemo(() => {
        const data = new Uint8Array([186, 176, 77, 255]);
        const texture = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);
        texture.needsUpdate = true;
        return texture;
    }, []);

    return (
        <mesh ref={shaderRef} position={[0, 0, 0]}>
            <boxGeometry args={[3.02, 3.02, 3.02]} />
            <dynamicTextShaderMaterial
                uDepthTexture={dummyTexture}
                transparent
            />
        </mesh>
    );
};

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
        <section
            ref={containerRef}
            className="relative mx-auto mb-16 w-full max-w-4xl bg-white/30 backdrop-blur-md 
                 border border-white/40 shadow-black shadow-2xl rounded-lg 
                 py-16 md:py-24 mt-32 flex flex-col items-center justify-center"
        >
            {/* Hero Text */}
            <div className="absolute top-6 left-0 right-0 z-10 text-center mix-blend-difference pointer-events-none">
                <h2 className="text-3xl font-semibold text-white">
                    Are You in the Black Box Business?
                </h2>
                <p className="mt-4 text-white/90 max-w-md leading-relaxed mx-auto">
                    Turn hidden work into lasting knowledge. Capture expertise.
                    Build a system that scales.
                </p>
            </div>

            {/* 3D Canvas */}
            <div className="w-full h-full z-0">
                <Canvas
                    className="w-full h-full"
                    gl={{ antialias: true, precision: "highp" }}
                    onPointerDown={() => setIsDragging(true)}
                    onPointerUp={() => setIsDragging(false)}
                    onPointerOut={() => setIsDragging(false)}
                >
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <BaseCube isDragging={isDragging} />
                    <ShaderShell />
                    <OrbitControls enableZoom={false} />
                </Canvas>
            </div>
        </section>
    );
}
