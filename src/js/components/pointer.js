import * as THREE from "../lib/build/three.module.js"
import { scene, camera } from "./setting.js"
let INTERSECTED
let raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2()

function mouseMove( event ){
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	blockHighLight();
}

function blockHighLight() {
	raycaster.setFromCamera( mouse, camera );
	let intersects = raycaster.intersectObjects( scene.children );

	if ( intersects.length > 0 ){
		if ( intersects[ 0 ].object != INTERSECTED ){
		    // restore previous intersection object (if it exists) to its original color
			if (INTERSECTED) 
				INTERSECTED.material.color.setHex( INTERSECTED.currentHex )
				
			INTERSECTED = intersects[0].object

			console.group("Look at: ")
				console.log(INTERSECTED)
			console.groupEnd()

			INTERSECTED.currentHex = INTERSECTED.material.color.getHex()
			INTERSECTED.material.color.setHex( 0xcccccc )
		}
	} else {
		if ( INTERSECTED ) 
			INTERSECTED.material.color.setHex( INTERSECTED.currentHex )

		INTERSECTED = null
	}
}

function mouseDown( event ){

}

export { mouseMove, mouseDown }