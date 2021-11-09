import * as THREE from "../../lib/build/three.module.js";
import { vertices, faces } from "./cube_consts.js"

/**
 * @arg {array} faceIdx
 * array with face indexes:
 * 0 - front, 1 - right,
 * 2 - back, 3 - left,
 * 4 - top, 5 - bottom
 */
function Cube(faceIdx) {
    let positions = []
	let normals = []
	let uvs = []

    for (const vertex of vertices) {
        positions.push(...vertex.pos)
        normals.push(...vertex.norm)
        uvs.push(...vertex.uv)
    }

    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));

    let indexes = []
    
    for (let face of faceIdx){
        indexes.push(...faces[face]);
    } geometry.setIndex( indexes );
    
    return geometry
}

export { Cube };