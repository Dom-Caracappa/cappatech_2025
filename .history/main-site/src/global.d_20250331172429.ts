// global.d.ts
import type * as express from "express";
import type { ReactThreeFiber } from "@react-three/fiber";
import * as THREE from "three";

// --------------------------------------------------------
// 1. Extend Express to include custom request body fields
// --------------------------------------------------------
declare global {
    namespace Express {
        interface Request {
            body: {
                name: string;
                email: string;
                message: string;
            };
        }
    }
}

// --------------------------------------------------------
// 2. Astro/Vite Environment Variables
// --------------------------------------------------------
interface ImportMetaEnv {
    readonly PUBLIC_API_URL: string;
    // add other env variables here if needed
}

// --------------------------------------------------------
// 3. Custom R3F Shader Material Intrinsic
// --------------------------------------------------------
declare global {
    namespace JSX {
        interface IntrinsicElements {
            dynamicTextShaderMaterial: ReactThreeFiber.Object3DNode<
                THREE.ShaderMaterial,
                typeof THREE.ShaderMaterial
            >;
        }
    }
}
