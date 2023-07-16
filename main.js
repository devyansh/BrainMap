import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let scene, camera, renderer, object, controls;

async function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

	 // Lighting
	 const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
	 scene.add(ambientLight);
 
	 const pointLight = new THREE.PointLight(0xffffff, 1, 500); // White light
	 pointLight.position.set(10, 10, 10);
	 scene.add(pointLight);

    // Load the OBJ file
    const loader = new OBJLoader();
    object = await loader.loadAsync('/assets/Brain_Model.obj');

    object.rotation.y = 0;
	object.visible = true;

	// Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target = object.position;

	// Square
    const squareGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1, 1, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(1, -1, 0),
        new THREE.Vector3(-1, -1, 0)
    ]);

	const squareMaterial = new THREE.LineBasicMaterial({ color: 0x000f00 });
    const square = new THREE.LineLoop(squareGeometry, squareMaterial);
    scene.add(square);
	
    scene.add(object);

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
	controls.update(); // for damping
    renderer.render(scene, camera);
}

// Resize canvas on window resize
window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

init();
animate();