import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// ✅ Define the uniforms directly without `Props` type
type Uniforms = {
    uDepthTexture: THREE.Texture | null;
};

// ✅ Define the material without the need for the second type argument
const DynamicTextShaderMaterial = shaderMaterial<Uniforms>(
    {
        uDepthTexture: null,
    },
    // Vertex shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment shader
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

// ✅ Extend with the material
extend({ DynamicTextShaderMaterial });

export default DynamicTextShaderMaterial;
