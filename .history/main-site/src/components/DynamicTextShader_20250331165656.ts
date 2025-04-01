import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// Uniforms type
type Uniforms = {
    uDepthTexture: THREE.Texture | null;
};

// Varyings type (even if empty, must be included)
type Varyings = {
    vUv?: [number, number];
};

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader
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

// Correct usage with two type args: <Uniforms, Varyings>
const DynamicTextShaderMaterial = shaderMaterial<Uniforms, Varyings>(
    { uDepthTexture: null },
    vertexShader,
    fragmentShader
);

extend({ DynamicTextShaderMaterial });

export default DynamicTextShaderMaterial;
