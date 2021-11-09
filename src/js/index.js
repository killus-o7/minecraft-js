import * as THREE from "./lib/build/three.module.js";

import { world } from "./components/world/World.js"
import Blocks from "./components/blocks/Blocks.js";
import { scene, animate } from "./components/setting.js";

/*
accualy this file have no use if i move everything from it, 
only thing that will remains will be "import world from "..."" or setting which is already index v2
because it have all thing that original index had.
*/

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0);
scene.add(directionalLight);

animate()