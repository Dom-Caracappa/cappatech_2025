// dynamicTextShaderMaterial.ts
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const DynamicTextShaderMaterial = shaderMaterial(
  {},
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    void main() {
      float dist = distance(vUv, vec2(0.5));
      float vignette = 1.0 - smoothstep(0.2, 0.7, dist);
      vec3 baseColor = vec3(0.0); // black base
      vec3 highlight = vec3(0.2); // subtle highlight
      vec3 finalColor = mix(baseColor, highlight, vignette);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ DynamicTextShaderMaterial });
