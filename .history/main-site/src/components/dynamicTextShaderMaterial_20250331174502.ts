// DynamicTextShaderMaterial.ts
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// Define your uniforms in plain JS object
const uniforms = {
  uDepthTexture: null as THREE.Texture | null,
};

// Define your vertex and fragment shaders
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
 varying vec2 vUv;

uniform float uTime; // new uniform

void main() {
    // Simulate depth based on UV and time
   vec2 center = vec2(0.5, 0.5);
float dist = distance(vUv, center);
float simulatedDepth = 1.0 - dist + 0.1 * sin(uTime); 
    float contrastEffect = smoothstep(0.2, 0.9, simulatedDepth);
    vec3 adjustedColor = mix(vec3(0.0), vec3(1.0), contrastEffect);
    gl_FragColor = vec4(adjustedColor, 1.0);
}
`;

// Omit generics — let shaderMaterial infer the final type
const DynamicTextShaderMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader);

// Make this material available as a JSX element
extend({ DynamicTextShaderMaterial });

export default DynamicTextShaderMaterial;
