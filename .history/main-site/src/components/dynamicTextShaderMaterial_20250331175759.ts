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
			vec2 centeredUv = vUv - 0.5;
			float dist = length(centeredUv);
			float intensity = smoothstep(0.45, 0.0, dist);
			vec3 color = mix(vec3(0.05), vec3(1.0), intensity);
			gl_FragColor = vec4(color, 1.0);
		}
	`
);

extend({ DynamicTextShaderMaterial });

export default DynamicTextShaderMaterial;
