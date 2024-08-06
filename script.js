let scene, camera, renderer, model, pivot;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(100, 100, 300); // Adjust the camera position to ensure the model is in view

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting setup
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

        // Apply material to each child mesh
        const material = new THREE.MeshStandardMaterial({
            color: 0x0077ff,
            emissive: 0x0077ff,
            metalness: 0.7,
            roughness: 0.3
        });
        model.traverse(function (child) {
            if (child.isMesh) {
                child.material = material;
            }
        });

        // Center the model and rotate to be vertical along the x-axis
        model.rotation.z = Math.PI / 2;
        model.position.set(0, 0, 0); // Center the model

        // Increase the scale of the model to make it larger
        model.scale.set(5.5, 5.5, 5.5);

        // Create a pivot and add the model to it
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
        pivot.rotation.z += 0.01;
    }
    renderer.render(scene, camera);
}

init();
