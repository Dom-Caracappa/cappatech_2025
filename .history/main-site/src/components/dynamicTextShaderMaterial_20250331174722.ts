import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const DynamicTextShaderMaterial = shaderMaterial(
  {},
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
  void main() {
    float dist = distance(vUv, vec2(0.5));
    float shading = smoothstep(0.5, 0.1, dist);
    vec3 color = mix(vec3(0.0), vec3(1.0), shading); // black to white gradient
    gl_FragColor = vec4(color, 1.0);
  }
  `
);

extend({ DynamicTextShaderMaterial });
