let scene, camera, renderer, model, pivot;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 300);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.canvas-container').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0077ff, 2);
    directionalLight.position.set(5, 10, 7.5).normalize();
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x0077ff, 2, 100);
    pointLight.position.set(0, 50, 50);
    scene.add(pointLight);

    const loader = new THREE.OBJLoader();
    loader.load('./chain.obj', function (obj) {
        model = obj;

        const material = new THREE.MeshStandardMaterial({
            color: 0x4169e1,
            metalness: 1,
            roughness: 0.3,
            transparent: true,
            wireframe: true,
        });

        model.traverse(function (child) {
            if (child.isMesh) {
                child.material = material;
            }
        });

        model.rotation.x = Math.PI / 3;
        model.rotation.z = Math.PI / 4;
        model.rotation.y = Math.PI / 4;

        model.position.set(410, 400, 0);
        model.scale.set(25, 25, 25);

        pivot = new THREE.Object3D();
        pivot.add(model);
        scene.add(pivot);
    }, undefined, function (error) {
        console.error(error);
    });

    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    if (pivot) {
        pivot.rotation.y += -0.01;
    }
    renderer.render(scene, camera);
}

init();

// GSAP animations for UI components
window.addEventListener('load', () => {
    gsap.from("header", {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: "power2.out"
    });

    gsap.from(".hero-content h2", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power2.out",
        delay: 0.5
    });

    gsap.from(".hero-content p", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power2.out",
        delay: 0.7
    });

    gsap.from(".buttons ul", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power2.out",
        delay: 0.9,
        stagger: 0.2
    });

    gsap.from(".scroll-indicator", {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: "power2.out",
        delay: 1
    });
});

// Fade out scroll indicator on scroll
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    gsap.to(scrollIndicator, {
        duration: 0.5,
        opacity: window.scrollY > 100 ? 0 : 1,
        ease: "power2.out"
    });
});
