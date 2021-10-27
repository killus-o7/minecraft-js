import * as THREE from "../lib/build/three.module.js";
import { OrbitControls } from "../lib/examples/jsm/controls/OrbitControls.js";
import Stats from '../lib/examples/jsm/libs/stats.module.js';

//import { EffectComposer } from '../lib/examples/jsm/postprocessing/EffectComposer.js';
//import { OutlinePass } from '../lib/examples/jsm/postprocessing/OutlinePass.js';


// Perspective camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
	45, // field of view in degrees
	aspect, // aspect ratio
	1, // near plane
	100 // far plane
);
camera.position.set(10, 10, 10);

// Scene
const scene = new THREE.Scene();

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* // Effects
const composer = new EffectComposer( renderer );
composer.addPass( new OutlinePass())
*/

// Stats
const stats = new Stats();
document.body.appendChild( stats.dom );

// Orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 1.5, 0, 1.5 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	stats.update();
	renderer.render( scene, camera );
}

export { camera, scene, renderer, stats, controls, animate};