let scene, camera, renderer, model, pivot;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 300); // Adjust the camera position to ensure the model is in view

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.canvas-container').appendChild(renderer.domElement);

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
            color: 4169e1,
            // emissive: 000000,
            metalness: 1,
            roughness: 0.3,
            transparent: true,
            // opacity: 0.5,
            wireframe: true,


        });
        model.traverse(function (child) {
            if (child.isMesh) {
                child.material = material;
            }
        });

        // Center the model and rotate to be vertical along the x-axis
        // model.rotation.x = Math.PI / 4;
        // model.rotation.z = Math.PI / 3;
        // model.rotation.y = Math.PI / 4;

        model.rotation.x = Math.PI / 3;  // Rotate 45 degrees around x-axis
        model.rotation.z = Math.PI / 4;  // Rotate 45 degrees around z-axis
        model.rotation.y = Math.PI / 4;  // Slight rotation around y-axis for better view

        model.position.set(410, 400, 0); // Adjust the position to top left
        model.scale.set(25, 25, 25);
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
        pivot.rotation.y += -0.01;
        // // pivot.rotation.x += -0.01;
        // pivot.rotation.z += -0.01;
    }
    renderer.render(scene, camera);
}

init();
