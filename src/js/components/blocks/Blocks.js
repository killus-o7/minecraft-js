import * as THREE from "../../lib/build/three.module.js"

let loader = new THREE.TextureLoader();
let create_material = (name) => {
    let texture = loader.load(`./src/texture/${name}.png`)
    texture.magFilter = THREE.NearestFilter

    let material = new THREE.MeshToonMaterial({ 
        map: texture,
        color: 0x666666
    })

    return material
}


const Blocks = {
    stone: { 
        id: 1,
        material: create_material("stone")
    },

    dirt: { 
        id: 2,
        material: create_material("dirt")
    },

    grass_block: { 
        id: 3,
        material: create_material("stone")
    },

    wood: { 
        id: 1,
        material: create_material("stone")
    },
}

export default Blocks 