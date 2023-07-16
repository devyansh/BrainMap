import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

let scene, camera, renderer, object;

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
	
    scene.add(object);

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
    if (object) {
        object.rotation.y += 0.01; // Rotates the object at each frame
    }
    renderer.render(scene, camera);
}

// Resize canvas on window resize
//window.addEventListener('resize', function(){
//    camera.aspect = window.innerWidth / window.innerHeight;
//    camera.updateProjectionMatrix();
//    renderer.setSize(window.innerWidth, window.innerHeight);
//}, false);

init();
animate();