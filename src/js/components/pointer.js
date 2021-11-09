import * as THREE from "../lib/build/three.module.js"
import { scene, camera } from "./setting.js"
import { world } from "./world/World.js"

let INTERSECTED
let raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2()

function mouseMove( event ){
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function blockHighLight() {
	raycaster.setFromCamera( mouse, camera );
	let intersects = raycaster.intersectObjects( scene.children );

	if ( intersects.length > 0 ){
		if ( intersects[ 0 ] != INTERSECTED ){
		    // restore previous intersection object (if it exists) to its original color
			if (INTERSECTED) 
				INTERSECTED.object.material.color.setHex( INTERSECTED.currentHex )
				
			INTERSECTED = intersects[0]

			INTERSECTED.currentHex = INTERSECTED.object.material.color.getHex()
			INTERSECTED.object.material.color.setHex( 0xcccccc )
		}
	} else {
		if ( INTERSECTED ) 
			INTERSECTED.object.material.color.setHex( INTERSECTED.currentHex )

		INTERSECTED = null
	}
}

function mouseDown( event ){
	if (INTERSECTED){
		let x = INTERSECTED.object.position.x,
			y = INTERSECTED.object.position.y,
			z = INTERSECTED.object.position.z

		let off_x = INTERSECTED.face.normal.x, 
			off_y = INTERSECTED.face.normal.y,
			off_z = INTERSECTED.face.normal.z

		//chunk.setBlock(x+off_x, y+off_y, z+off_z, "dirt")
	}
}

export { mouseMove, mouseDown, blockHighLight }