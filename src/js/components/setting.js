import * as THREE from "../lib/build/three.module.js";
import { FirstPersonControls } from "../lib/examples/jsm/controls/FirstPersonControls.js";
import { OrbitControls } from "../lib/examples/jsm/controls/OrbitControls.js";
import Stats from '../lib/examples/jsm/libs/stats.module.js';

//import { EffectComposer } from '../lib/examples/jsm/postprocessing/EffectComposer.js';
//import { OutlinePass } from '../lib/examples/jsm/postprocessing/OutlinePass.js';

// Texture loader
const loader = new THREE.TextureLoader();
let stone = loader.load("./src/texture/stone.png")
stone.magFilter = THREE.NearestFilter

// Clock
const clock = new THREE.Clock();

// some globals
let INTERSECTED

// Perspective camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
	45, // field of view in degrees
	aspect, // aspect ratio
	1, // near plane
	100 // far plane
);
camera.position.set(16, 16, 16);

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

// First person controls
const fp_controls = new FirstPersonControls( camera, renderer.domElement );
fp_controls.movementSpeed = 10;
fp_controls.domElement = renderer.domElement;
fp_controls.lookSpeed = 0.1;

// Orbit controls
const o_controls =  new OrbitControls( camera, renderer.domElement );
o_controls.target.set(7.5, 0, 7.5)
o_controls.enableDamping = true

// Raycaster
const raycaster = new THREE.Raycaster(),
	  mouse = new THREE.Vector2();

document.addEventListener( 'pointermove', onPointerMove );
function onPointerMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

// Window resize
window.addEventListener( 'resize', onWindowResize );

function animate() {
	requestAnimationFrame( animate )

	render()
	stats.update()
}

function render() {
	const delta = clock.getDelta();

	raycaster.setFromCamera( mouse, camera );
	let intersects = raycaster.intersectObjects( scene.children );

	if ( intersects.length > 0 )
	{
		// if the closest object intersected is not the currently stored intersection object
		if ( intersects[ 0 ].object != INTERSECTED ) 
		{
		    // restore previous intersection object (if it exists) to its original color
			if ( INTERSECTED ) 
				INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
			// store reference to closest object as current intersection object
			INTERSECTED = intersects[ 0 ].object;
			// store color of closest object (for later restoration)
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
			// set a new color for closest object
			INTERSECTED.material.color.setHex( 0xffff00 );
		}
	} 
	else // there are no intersections
	{
		// restore previous intersection object (if it exists) to its original color
		if ( INTERSECTED ) 
			INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
		// remove previous intersection object reference
		//     by setting current intersection object to "nothing"
		INTERSECTED = null;
	}

	o_controls.update( delta );
	renderer.render( scene, camera )
}

function onWindowResize() {

	let SCREEN_HEIGHT = window.innerHeight;
	let SCREEN_WIDTH = window.innerWidth;

	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();

	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
}

export { camera, scene, renderer, stats, animate, loader, stone };