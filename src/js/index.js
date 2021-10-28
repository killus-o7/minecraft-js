import * as THREE from "./lib/build/three.module.js";

import Blocks from "./components/blocks/block_name.js";
import Chunk from "./components/Chunk.js";

// Setting
import { scene, animate } from "./components/setting.js";

// Grid 
const size = 16;
const grid = new THREE.GridHelper( size, size );
grid.position.set(7.5, -1, 7.5)
scene.add( grid );

// Chunks (test)
let chunk = new Chunk()

for (let x=0; x<16; x++){
    for (let z=0; z<16; z++){
        chunk.setBlock(x,0,z, Blocks.stone)
    }
}

chunk.setBlock(0,1,0, Blocks.stone)
chunk.setBlock(0,1,1, Blocks.stone)
chunk.setBlock(1,1,0, Blocks.stone)
chunk.setBlock(1,1,1, Blocks.stone)
chunk.setBlock(0,2,1, Blocks.stone)
chunk.setBlock(2,1,3, Blocks.stone)
chunk.setBlock(3,1,3, Blocks.stone)

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0);
scene.add(directionalLight);

animate()