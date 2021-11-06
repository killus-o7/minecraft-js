import * as THREE from "../../lib/build/three.module.js"
let load_txt = (name) => {
    let texture = loader.load(`./src/texture/${name}.png`)
    texture.magFilter = THREE.NearestFilter
    return texture
}

const loader = new THREE.TextureLoader();
const Blocks = {
    stone: { 
        id: 1,
        texture: load_txt("stone")
    },

    dirt: { 
        id: 2,
        texture: load_txt("dirt")
    },

    grass_block: { 
        id: 3,
        texture: load_txt("grass_block")
    },

    wood: { 
        id: 1,
        texture: load_txt("stone")
    },
}

export default Blocks 