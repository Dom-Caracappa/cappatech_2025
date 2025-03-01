// Load Three.js from CDN
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js';

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Loaded, initializing Three.js...");

    // Find glass background and container
    const container = document.getElementById("three-container");
    const glassBackground = document.querySelector(".glass-background"); // Add this class to your div

    if (!container || !glassBackground) {
        console.error("ERROR: Required elements not found!");
        return;
    }

    // Setup Three.js
    const scene = new THREE.Scene();
    window.scene = scene;  // Allows debugging in the browser console

    console.log("Scene initialized:", scene);

    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });


    // Ensure the renderer fits in the glass box
    function updateSize() {
        const width = glassBackground.clientWidth;
        const height = glassBackground.clientHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    updateSize(); // Call once at initialization
    container.appendChild(renderer.domElement);

    // Create Cube
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.MeshStandardMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.7
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    console.log("Cube added:", cube);

    // Center the cube
    camera.position.set(0, 0, 7);
    cube.position.set(0, -0.5, 0);

    // Lighting for glow effect
    const light = new THREE.PointLight(0xffcc00, 1, 100);
    light.position.set(0, 0, 5);
    scene.add(light);

    console.log("Light added:", light);

    // Resize listener
    window.addEventListener("resize", () => {
        console.log("Resize detected");
        updateSize();
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate(); // Start the animation loop

    console.log("Animation started");
});
