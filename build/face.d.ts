import { vec3, vec2 } from "gl-matrix";
declare class Face {
    /**@param verts */
    verts: Array<vec3>;
    textures: Array<vec2>;
    normals: Array<vec3>;
    face_id: number;
    /**
     * The constructor for a face. Each set (e.g. t1-t3) of indicies must be specified for the values to be applied (you can't only specify 2 vertices, for instances.).
     * @constructor
     * @param {vec3} v1 first vertex position
     * @param {vec3} v2 ...
     * @param {vec3} v3 ...
     * @param {vec2} t1 first texture coord
     * @param {vec2} t2 ...
     * @param {vec2} t3 ...
     * @param {vec3} n1  first normal direction for the first vertex
     * @param {vec3} n2 ...
     * @param {vec3} n3 ...
     */
    constructor({ v1, v2, v3, t1, t2, n1, n2, n3 }?: {
        v1?: vec3;
        v2?: vec3;
        v3?: vec3;
        t1?: vec2;
        t2?: vec2;
        t3?: vec2;
        n1?: vec3;
        n2?: vec3;
        n3?: vec3;
    });
    /**
     * Create a face given 3 gl-matrix vec3s;
     * @param v1 the first vector of the face
     * @param v2 the second vector of the face
     * @param v3 the third vector of the face
     */
    vertsfromVec3(v1: vec3, v2: vec3, v3: vec3): void;
    normalsfromVec3(n1: vec3, n2: vec3, n3: vec3): void;
    texturefromVec2(t1: vec2, t2: vec2, t3: vec2): void;
}
export { Face };
