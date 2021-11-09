import * as THREE from "./lib/build/three.module.js";

import { world } from "./components/world/World.js"
import Blocks from "./components/blocks/Blocks.js";
import Chunk from "./components/world/Chunk.js";

// Setting
import { scene, animate } from "./components/setting.js";

// Grid 
const size = 16;
const grid = new THREE.GridHelper( size, size );
grid.position.set(7.5, -1, 7.5)
scene.add( grid );

// Chunks (test)
//let chunk = new Chunk({x: 0, z: 0})

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0);
scene.add(directionalLight);

animate()