import { Mesh, MeshNormalMaterial, Group } from "../lib/build/three.module.js";
import { Cube } from "./blocks/Cube.js";
import { face_offsets } from "./blocks/cube_consts.js";

import { scene } from "./setting.js";

class Chunk {
    constructor(width = 4, height = 4){
        this.width = width
        this.height = height
        this.blocks = new Uint8Array(width << height)
        this.group = new Group()
    }

    getIndex(x, y, z){
        let r = [0, 3]
        return (this.inChunk(...r, [x,y,z])) ? z+y*4+x*16 : null
    }

    getPosition(idx){
        let x, y, z
        z = idx
        idx = idx >> 2
        z -= idx << 2

        y = idx
        idx = idx >> 2
        y -= idx << 2

        x = idx
        idx = idx >> 2 
        x -= idx << 2
        return [x, y, z]
    }

    inChunk(pos){
        let b = true
        for (let x of pos){
            b = b & ( x>=start && x<=end )
        } 
        return b
    }

    getFaces(x,y,z){
        let faces = [],
            ox, oy, oz

        for (let [i, v] of face_offsets.entries()){
            ox = x + v[0]
            oy = y + v[1]
            oz = z + v[2]
            //console.log(v, ox, oy, oz)

            let blockIndex = this.getIndex(ox, oy, oz)
            //console.log(blockIndex)

            //if (this.blocks[blockIndex] == 0) faces.push(i)
            //else if (this.outOfChunk(0, 3, [ox, oy, oz])) faces.push(i)
        }
        
        return faces
    }

    setBlock(x, y, z, id){
        let index = this.getIndex(x,y,z)
        this.blocks[index] = id
        this.createMesh(x,y,z, index)
    }

    createMesh(x, y, z, i){
        const material = new MeshNormalMaterial({ wireframe: true })
        let mesh = new Mesh(new Cube(this.getFaces(x,y,z)), material)
        mesh.position.set(x, y, z)
        mesh.name = toString(i)
        scene.add(mesh)
    }

    renderChunk() {
        scene.add(this.group)
    }
}

export default Chunk 