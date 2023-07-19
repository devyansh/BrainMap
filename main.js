import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let scene, camera, renderer, object, controls;
// Add the color slider
const colorSlider = document.getElementById('colorSlider');

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

	// Sphere

	const radius = 0.02;
	const widthSegments = 64;
	const heightSegments = 64;
	const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

	const sphereMaterial = new THREE.MeshBasicMaterial({ color:0x00ff00 }, { emissive: 0x000000 });

	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

	// Compute bounding box to place sphere at top of .obj model
    const bbox = new THREE.Box3().setFromObject(object);
    sphere.position.y = bbox.max.y;

	const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere2.position.x = bbox.max.x - 0.3;
	sphere2.position.y = bbox.max.y - 0.06;

	const sphere3 = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere3.position.x = bbox.max.x - 0.75;
	sphere3.position.y = bbox.max.y - 0.06;

	const sphere4 = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere4.position.x = bbox.max.x - 0.7;
	sphere4.position.y = bbox.max.y - 0.13;
	sphere4.position.z = bbox.max.z - 0.25;

	const sphere5 = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere5.position.x = bbox.max.x - 0.3;
	sphere5.position.y = bbox.max.y - 0.13;
	sphere5.position.z = bbox.max.z - 0.25;

	const sphere6 = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere6.position.x = bbox.max.x - 0.3;
	sphere6.position.y = bbox.max.y - 0.13;
	sphere6.position.z = bbox.max.z - 1.0;

	const sphere7 = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere7.position.x = bbox.max.x - 0.7;
	sphere7.position.y = bbox.max.y - 0.13;
	sphere7.position.z = bbox.max.z - 1.0;

	const sphere8 = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere8.position.x = bbox.max.x - 0.3;
	sphere8.position.y = bbox.max.y - 0.28;
	sphere8.position.z = bbox.max.z - 0.1;

	const sphere9 = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere9.position.x = bbox.max.x - 0.7;
	sphere9.position.y = bbox.max.y - 0.28;
	sphere9.position.z = bbox.max.z - 0.1;


	scene.add(sphere, sphere2, sphere3, sphere4, sphere5, sphere6, sphere7, sphere8, sphere9);
	
	colorSlider.addEventListener('input', function(){
		// Update sphere color
		const value = Number(colorSlider.value) / 255;
        sphere.material.color = new THREE.Color(value, 0, value - 20);
		sphere.material.emissiveIntensity = value+50;
        sphere.material.needsUpdate = true; // Tell Three.js to update the material

	});

    scene.add(object);
    

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
	controls.update(); // for damping
    // Adjust brightness
    //sphere.material.emissiveIntensity = brightness;

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