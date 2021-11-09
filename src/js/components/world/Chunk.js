import { Mesh, MeshNormalMaterial, Group, MeshPhongMaterial, MeshToonMaterial } from "../../lib/build/three.module.js";
import { SimplexNoise } from "../../lib/examples/jsm/math/SimplexNoise.js"

import { Cube } from "../blocks/Cube.js"
import { face_offsets } from "../blocks/cube_consts.js";

import { scene } from "../setting.js";
import Blocks from "../blocks/Blocks.js";

/**
 * creates chunk object, which is elementary container that stores block information
 */
class Chunk {
    /**
     * @constructor
     * @param {*} pos 
     */
    constructor(pos){
        this.chunkPos = pos
        this.corPos = { x: pos.x*16, z: pos.z*16 }

        this.width = 16
        this.height = 256
        this.blocks = new Uint8Array(this.width * this.width * this.height)
        this.group = new Group()
        scene.add(this.group)

        let simplexNoise = new SimplexNoise({random: ()=> .43 })
        let y=0
        for (let xi=0; xi<16; xi++){
            for (let zi=0; zi<16; zi++){
                let x = xi+pos.x*16,
                    z = zi+pos.z*16,
                    y = simplexNoise.noise(x/16,z/16)
                y+=1; y/=2; y*=16;
                y = Math.round(y)
                //console.log(y)

                for (let yi=y; yi>-1; yi--){
                    console.log(x%16,yi,z%16)
                    this.setBlock(x%16,yi,z%16, "stone")
                }
            }
        }
    }

    /**
     * function gives an index of given block coordinates
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {number|null} 
     *  returns index of block at given coordinates or null if it's "out of chunk"
     *  meaning that its out of specified width or height
     */
    getIndex(x, y, z){
        return (this.inChunk(x,y,z)) ? z+x*this.width+y*this.height : null
    }

    /**
     * function gives a coordinates of given index 
     * @param {number} idx 
     * @returns returns an array of coordinates of given index block
     */
    getLocalPosition(idx){
        let x, y, z
        z = idx
        idx = idx >> 4
        z -= idx << 4

        x = idx
        idx = idx >> 4
        x -= idx << 4

        y = idx
        idx = idx >> 8
        y -= idx << 8
        
        return [x, y, z]
    }

    /**
     * function checks if given coordinates are in a chunk (<0,15> for x,z and <0,255> for y)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns {boolean}
     */
    inChunk(x,y,z){
        let b = true
        //console.log(x,y,z)
        b = b & ( x>=0 && x<this.width )
        b = b & ( y>=0 && y<this.height)
        b = b & ( z>=0 && z<this.width )

        return b
    }

    /**
     * This function returns an array with numbers for Cube constructor. It checks every
     * block around the given one and if it not air (0) it gives and index of that face 
     * @param {*} x 
     * @param {*} y 
     * @param {*} z 
     * @returns {Array<number>} returns an Array with face indexes
     */
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

    /**
     * Creates an block in this.blocks and this.group. It automaticly updates blocks around
     * to not create block faces inside blocks
     * @param {*} x 
     * @param {*} y 
     * @param {*} z 
     * @param {*} block_name 
     */
    setBlock(x, y, z, block_name){
        if (!this.inChunk(x,y,z)) return
        let index = this.getIndex(x, y, z),
            ox, oy, oz

        //console.log([x,y,z])
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

    /**
     * Creates mesh and adds it to this.group, nothing more
     * @param {*} x 
     * @param {*} y 
     * @param {*} z 
     * @param {*} block_name 
     */
    createMesh(x, y, z, block_name){
        let index = this.getIndex(x,y,z)

        let option = { 
            map: Blocks[block_name].texture,
            color: 0x999999 
        }

        let material = new MeshToonMaterial(option),
            mesh = new Mesh(new Cube(this.getFaces(x,y,z)), material)

        mesh.position.set(x+this.corPos.x,y,z+this.corPos.z)
        mesh.name = `${index}`
        this.group.add(mesh)
    }

    /**
     * updates mesh which is already deployed on scene
     * @param {*} x 
     * @param {*} y 
     * @param {*} z 
     */
    updateMesh(x, y, z){
        let index = this.getIndex(x,y,z)
        let mesh = this.group.getObjectByName(`${index}`)

        mesh.geometry = new Cube(this.getFaces(x,y,z))
        mesh.updateMatrix()
    }
}

export default Chunk 