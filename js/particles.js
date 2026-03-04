/* ============================================================
   PARTICLES.JS - Three.js 3D Particle System
   Interactive particle field with mouse attraction
   ============================================================ */

(function () {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // ==================== SCENE SETUP ====================
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ==================== PARTICLES ====================
    const particleCount = window.innerWidth < 768 ? 1500 : 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    // Color palette
    const colorPalette = [
        new THREE.Color(0x6c63ff), // Purple
        new THREE.Color(0xf72585), // Pink
        new THREE.Color(0x4cc9f0), // Cyan
        new THREE.Color(0x7209b7), // Deep purple
        new THREE.Color(0x3a0ca3), // Indigo
    ];

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Position - spread in a sphere
        const radius = 50 + Math.random() * 60;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi) - 30;

        // Colors
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        // Sizes
        sizes[i] = Math.random() * 2.5 + 0.5;

        // Velocities
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for better-looking particles
    const vertexShader = `
        attribute float size;
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float dist = length(mvPosition.xyz);
            vAlpha = clamp(1.0 - dist / 120.0, 0.1, 0.8);
            gl_PointSize = size * (80.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const fragmentShader = `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
            gl_FragColor = vec4(vColor, alpha);
        }
    `;

    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ==================== CONNECTING LINES ====================
    const lineCount = 200;
    const linePositions = new Float32Array(lineCount * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x6c63ff,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // ==================== CENTRAL GLOW ====================
    const glowGeometry = new THREE.SphereGeometry(8, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x6c63ff,
        transparent: true,
        opacity: 0.03,
        blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = -20;
    scene.add(glow);

    // ==================== MOUSE INTERACTION ====================
    const mouse = new THREE.Vector2(0, 0);
    const mouseTarget = new THREE.Vector3(0, 0, 30);

    document.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseTarget.x = mouse.x * 30;
        mouseTarget.y = mouse.y * 30;
    });

    // ==================== ANIMATION LOOP ====================
    const clock = new THREE.Clock();
    let frameCount = 0;

    function animate() {
        requestAnimationFrame(animate);
        frameCount++;

        const elapsedTime = clock.getElapsedTime();
        const posArr = geometry.attributes.position.array;

        // Animate particles
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Add velocity
            posArr[i3] += velocities[i3];
            posArr[i3 + 1] += velocities[i3 + 1];
            posArr[i3 + 2] += velocities[i3 + 2];

            // Gentle wave motion
            posArr[i3 + 1] += Math.sin(elapsedTime * 0.5 + posArr[i3] * 0.01) * 0.02;
            posArr[i3] += Math.cos(elapsedTime * 0.3 + posArr[i3 + 1] * 0.01) * 0.01;

            // Mouse attraction (only for nearby particles)
            const dx = mouseTarget.x - posArr[i3];
            const dy = mouseTarget.y - posArr[i3 + 1];
            const dz = mouseTarget.z - posArr[i3 + 2];
            const distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distToMouse < 40) {
                const force = (40 - distToMouse) / 40 * 0.003;
                posArr[i3] += dx * force;
                posArr[i3 + 1] += dy * force;
                posArr[i3 + 2] += dz * force;
            }

            // Boundary check - wrap around
            const limit = 80;
            if (Math.abs(posArr[i3]) > limit) posArr[i3] *= -0.9;
            if (Math.abs(posArr[i3 + 1]) > limit) posArr[i3 + 1] *= -0.9;
            if (posArr[i3 + 2] > 30 || posArr[i3 + 2] < -80) velocities[i3 + 2] *= -1;
        }

        geometry.attributes.position.needsUpdate = true;

        // Update connecting lines (every 3rd frame for performance)
        if (frameCount % 3 === 0) {
            let lineIndex = 0;
            const threshold = 15;

            for (let i = 0; i < Math.min(particleCount, 500) && lineIndex < lineCount; i++) {
                for (let j = i + 1; j < Math.min(particleCount, 500) && lineIndex < lineCount; j++) {
                    const i3 = i * 3;
                    const j3 = j * 3;

                    const dx = posArr[i3] - posArr[j3];
                    const dy = posArr[i3 + 1] - posArr[j3 + 1];
                    const dz = posArr[i3 + 2] - posArr[j3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < threshold) {
                        const li = lineIndex * 6;
                        linePositions[li] = posArr[i3];
                        linePositions[li + 1] = posArr[i3 + 1];
                        linePositions[li + 2] = posArr[i3 + 2];
                        linePositions[li + 3] = posArr[j3];
                        linePositions[li + 4] = posArr[j3 + 1];
                        linePositions[li + 5] = posArr[j3 + 2];
                        lineIndex++;
                    }
                }
            }

            // Clear remaining lines
            for (let i = lineIndex * 6; i < lineCount * 6; i++) {
                linePositions[i] = 0;
            }

            lineGeometry.attributes.position.needsUpdate = true;
        }

        // Rotate particle system slowly
        particles.rotation.y = elapsedTime * 0.05;
        particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

        // Rotate glow
        glow.rotation.y = elapsedTime * 0.1;
        glow.scale.setScalar(1 + Math.sin(elapsedTime) * 0.1);

        // Camera subtle movement
        camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
        camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, -20);

        renderer.render(scene, camera);
    }

    animate();

    // ==================== RESIZE HANDLER ====================
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // ==================== THEME CHANGE HANDLER ====================
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const theme = document.documentElement.getAttribute('data-theme');
                if (theme === 'light') {
                    material.opacity = 0.3;
                    lineMaterial.opacity = 0.03;
                    renderer.setClearColor(0x000000, 0);
                } else {
                    material.opacity = 1;
                    lineMaterial.opacity = 0.06;
                    renderer.setClearColor(0x000000, 0);
                }
            }
        });
    });

    observer.observe(document.documentElement, { attributes: true });

    // ==================== VISIBILITY HANDLER ====================
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clock.stop();
        } else {
            clock.start();
        }
    });
})();
