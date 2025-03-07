import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js";

console.log("🔎 three-init.js loaded. Checking THREE import:", THREE);

window.scene = null;
window.camera = null;
window.renderer = null;
window.cube = null;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded, searching for #three-container...");
    const container = document.getElementById("three-container");
    if (!container) {
        console.error("❌ #three-container not found. Aborting...");
        return;
    }
    console.log("✅ Container found, proceeding with minimal init...");

    try {
        console.log("1) Creating scene...");
        window.scene = new THREE.Scene();
        console.log("2) Scene created:", window.scene);

        const aspectRatio = container.clientWidth / container.clientHeight || 1;
        const frustumSize = 5;

        console.log("3) Creating camera...");
        window.camera = new THREE.OrthographicCamera(
            -frustumSize * aspectRatio,
            frustumSize * aspectRatio,
            frustumSize,
            -frustumSize,
            0.1,
            100
        );
        console.log("4) Camera created:", window.camera);
        window.camera.position.set(5, 4.5, 5);
        window.camera.lookAt(0, 1, 0);

        console.log("5) Creating renderer...");
        window.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        console.log("6) Renderer object created:", window.renderer);
        window.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(window.renderer.domElement);
        console.log("7) Renderer appended to container.");

        console.log("8) Creating cube geometry...");
        const geometry = new THREE.BoxGeometry(4, 4, 4);
        const material = new THREE.MeshStandardMaterial({ color: 0x000000, transparent: true, opacity: 0.8 });
        window.cube = new THREE.Mesh(geometry, material);
        console.log("9) Cube created:", window.cube);
        window.scene.add(window.cube);

        console.log("🔟 Adding lighting...");
        window.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 5, 5).normalize();
        window.scene.add(dirLight);

        console.log("11) Setting up animation loop...");
        function animate() {
            requestAnimationFrame(animate);
            window.cube.rotation.y += 0.01;
            window.renderer.render(window.scene, window.camera);
        }
        animate();
        console.log("✅ Minimal init done. Scenes, camera, renderer should be on `window` now.");

    } catch (err) {
        console.error("❌ An error occurred in minimal init:", err);
    }

    console.log("✅ All lines ran—If you see me, the script 100% executed!");
});
