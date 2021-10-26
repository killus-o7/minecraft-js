import * as THREE from "./lib/build/three.module.js";

import Blocks from "./components/blocks/block_name.js";
import Chunk from "./components/Chunk.js";

// Setting
import { scene, animate } from "./components/setting.js";

// Texture loader
const loader = new THREE.TextureLoader();

// Meshes
const material = new THREE.MeshNormalMaterial({ wireframe: true })
let mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), material );
mesh.position.set(0, 0, 0)
mesh.name = 1
scene.add( mesh )

const size = 4;

const grid = new THREE.GridHelper( size, size );
grid.position.set(1.5, -1, 1.5)
scene.add( grid );

// Chunks (test)
let chunk = new Chunk(4, 4)
for (let x=0; x<4; x++){
    for (let z=0; z<4; z++){
        chunk.setBlock(x,0,z, Blocks.stone)
    }
}

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0);
scene.add(directionalLight);

animate()