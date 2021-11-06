import { Mesh, MeshNormalMaterial, Group, MeshPhongMaterial, MeshToonMaterial } from "../../lib/build/three.module.js";
import { Cube } from "../blocks/Cube.js";
import { World } from "./World.js";
import { face_offsets } from "../blocks/cube_consts.js";

import { scene } from "../setting.js";
import Blocks from "../blocks/Blocks.js";

class Chunk {
    constructor(){
        this.width = 16
        this.height = 16
        this.blocks = new Uint8Array(this.width * this.width * this.height)
        this.group = new Group()
        scene.add(this.group)
    }

    getIndex(x, y, z){
        return (this.inChunk(x,y,z)) ? z+y*this.height+x*this.width*this.width : null
    }

    getLocalPosition(idx){
        let x, y, z
        z = idx
        idx = idx >> 4
        z -= idx << 4

        y = idx
        idx = idx >> 4
        y -= idx << 4

        x = idx
        idx = idx >> 4
        x -= idx << 4
        console.log([x, y, z])
        return [x, y, z]
    }

    inChunk(x,y,z){
        let b = true
        console.log(x,y,z)
        b = b & ( x>=0 && x<this.width )
        b = b & ( y>=0 && y<this.height )
        b = b & ( z>=0 && z<this.width )

        return b
    }

    getFaces(x,y,z){
        let faces = [],
            ox, oy, oz

        for (let [i, v] of face_offsets.entries()){
            ox = x + v[0]
            oy = y + v[1]
            oz = z + v[2]

            let blockIndex = this.getIndex(ox, oy, oz)

            if (blockIndex){
                if (!this.blocks[blockIndex]) faces.push(i)

            } else if (!this.inChunk(ox, oy, oz)) faces.push(i)
            
        }
        
        return faces
    }

    setBlock(x, y, z, block_name){
        if (!this.inChunk(x,y,z)) return
        let index = this.getIndex(x, y, z),
            ox, oy, oz

        this.blocks[index] = Blocks[block_name].id
        this.createMesh(x,y,z, block_name)

        for (let offsets of face_offsets){
            ox = x + offsets[0]
            oy = y + offsets[1]
            oz = z + offsets[2]

            let blockIndex = this.getIndex(ox, oy, oz)
            if (blockIndex == null) continue
            if (this.blocks[blockIndex] == 0) continue

            this.updateMesh(ox,oy,oz)
        }
    }

    createMesh(x, y, z, block_name){
        let index = this.getIndex(x,y,z)

        let option = { map: Blocks[block_name].texture, color: 0x999999 }
        //option = { wireframe: true }

        let material = new MeshToonMaterial(option),
            mesh = new Mesh(new Cube(this.getFaces(x,y,z)), material)

        mesh.position.set(x,y,z)
        mesh.name = `${index}`
        this.group.add(mesh)
    }

    updateMesh(x, y, z){
        let index = this.getIndex(x,y,z)
        let mesh = this.group.getObjectByName(`${index}`)

        mesh.geometry = new Cube(this.getFaces(x,y,z))
        mesh.updateMatrix()
    }
}

export default Chunk 