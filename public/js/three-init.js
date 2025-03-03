// Load Three.js from CDN

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Loaded, initializing Three.js...");

    // Find container
    const container = document.getElementById("three-container");
    if (!container) {
        console.error("ERROR: #three-container not found!");
        return;
    }

    // Setup Three.js scene
    const scene = new THREE.Scene();

    // Setup aspect ratio and frustum size
    const aspectRatio = container.clientWidth / container.clientHeight;
    const frustumSize = 5; // Controls how much of the scene is visible

    // **Use an Orthographic Camera for isometric view**
    const camera = new THREE.OrthographicCamera(
        -frustumSize * aspectRatio, // Left
        frustumSize * aspectRatio,  // Right
        frustumSize,                // Top
        -frustumSize,               // Bottom
        0.1,                        // Near
        100                         // Far
    );

    // Position camera for isometric effect
    camera.position.set(5, 5, 5);  // Move up and back
    camera.lookAt(0, 0, 0);       // Look at scene center

    // Create WebGL renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    // Gives renderer a bg color (for debug)
    // const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    // renderer.setClearColor(0xfffffff, 1);

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Gleam the Cube
    const geometry = new THREE.BoxGeometry(3, 3, 3, 1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.8, // Slightly translucent cube
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Wireframe edges
    // const edges = new THREE.EdgesGeometry(geometry);
    // const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x657485, linewidth: 1 }); // White edges
    // const wireframe = new THREE.LineSegments(edges, edgesMaterial);
    // cube.add(wireframe); 

    const edges = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0xF37F16,  // Color
        linewidth: 2,      // Make edges more visible
        transparent: true, // Enable transparency
        opacity: 1         // Start fully visible
    });
    const wireframe = new THREE.LineSegments(edges, edgesMaterial);
    cube.add(wireframe); // Attach edges to the cube


    console.log("Scene Objects:", scene.children);


    // Add lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Resize listener
    function updateSize() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        renderer.setSize(width, height);

        // Update orthographic camera bounds
        camera.left = -frustumSize * (width / height);
        camera.right = frustumSize * (width / height);
        camera.top = frustumSize;
        camera.bottom = -frustumSize;

        camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", updateSize);
    updateSize(); // Ensure correct size on load

    let time = 0;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        // cube.rotation.x += 0.01;

        // Pulse effect using sine wave
        edgesMaterial.opacity = 0.5 + Math.sin(time) * 1.8;

        cube.rotation.y += .01;
        renderer.render(scene, camera);
    }

    animate();
});
