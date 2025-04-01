import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// Define uniforms structure
type Uniforms = {
    uDepthTexture: THREE.Texture | null;
};

// Optional: define varyings if you want to type `vUv` or similar, else just use `{}`
type Varyings = {};

// Create the shader material
const DynamicTextShaderMaterial = shaderMaterial<Uniforms, Varyings>(
    {
        uDepthTexture: null,
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    varying vec2 vUv;
    uniform sampler2D uDepthTexture;
    void main() {
      vec4 depthSample = texture2D(uDepthTexture, vUv);
      float depth = depthSample.r;
      float contrastEffect = smoothstep(0.3, 0.9, depth);
      vec3 adjustedColor = mix(vec3(0.2), vec3(1.0), contrastEffect);
      gl_FragColor = vec4(adjustedColor, 1.0);
    }
  `
);

// Register it as a JSX element
extend({ DynamicTextShaderMaterial });

export default DynamicTextShaderMaterial;
