import { Face } from './face';
import { vec3 } from 'gl-matrix';
import { Mesh } from './mesh';
console.log("Hello world!");

let mesh = new Mesh("myMesh");
let face1 = new Face({
    v1: vec3.fromValues(0, 0, 0), v2: vec3.fromValues(0, 0, 1), v3: vec3.fromValues(0, 1, 1),
    n1: vec3.fromValues(1, 0, 0), n2: vec3.fromValues(1, 0, 0), n3: vec3.fromValues(0, 1, 1)
});
let face2 = new Face({
    v1: vec3.fromValues(0, 1, 1), v2: vec3.fromValues(0, 1, 0), v3: vec3.fromValues(0, 0, 0),
    n1: vec3.fromValues(1, 0, 0), n2: vec3.fromValues(1, 0, 0), n3: vec3.fromValues(0, 1, 1)
})
mesh.AppendFaces(face1, face2);
console.log(mesh.raw_normals);
export { vec3 };
