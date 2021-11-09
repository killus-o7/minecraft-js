import Chunk from "./Chunk.js";

class World {
    constructor(size = 2){
        console.log(size);
        this.chunks = new Array(size).fill(Array(size).fill(null));
        

        let chunk;
        for (let x=0; x<size; x++){
            for (let z=0; z<size; z++){
                console.log(x,z)
                chunk = new Chunk({x: x, z: z});
                this.chunks[x][z] = chunk;
            }
        }
        console.log(this.chunks);
    }

}

let world = new World();
export { world };