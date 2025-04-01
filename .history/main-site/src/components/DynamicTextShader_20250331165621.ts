import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// Define the uniforms interface
type DynamicTextShaderUniforms = {
    uDepthTexture: THREE.Texture | null;
};

// Define the shader code
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uDepthTexture;
  void main() {
    vec4 depthSample = texture2D(uDepthTexture, vUv);
    float depth = depthSample.r;
    float contrastEffect = smoothstep(0.3, 0.9, depth);
    vec3 adjustedColor = mix(vec3(0.2), vec3(1.0), contrastEffect);
    gl_FragColor = vec4(adjustedColor, 1.0);
  }
`;

// Create shader material using shaderMaterial helper
const DynamicTextShaderMaterial = shaderMaterial<DynamicTextShaderUniforms>(
    { uDepthTexture: null }, // default uniform values
    vertexShader,
    fragmentShader
);

// Make the shader available as a JSX element
extend({ DynamicTextShaderMaterial });

export default DynamicTextShaderMaterial;
