import { vec3, vec2 } from "gl-matrix";

class Face {
    /**@param verts */
    public verts: Array<vec3>;
    public textures: Array<vec2>;
    public normals: Array<vec3>;
    public face_id: number;
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
    constructor({ v1 = null, v2 = null, v3 = null,
        t1 = null, t2 = null,
        n1 = null, n2 = null, n3 = null }: {
            v1?: vec3; v2?: vec3; v3?: vec3;
            t1?: vec2; t2?: vec2; t3?: vec2;
            n1?: vec3; n2?: vec3; n3?: vec3;

        } = {}) {
        this.verts = [];
        this.normals = [];
        this.textures = [];
        if (v1 == null || v2 == null || v3 == null) {

        }
        else {
            this.verts.push(v1, v2, v3);
        }
        //push pack textures
        if (t1 == null || t2 == null) {

        }
        else {
            this.textures.push(t1, t2);
        }
        if (n1 == null || n2 == null || n3 == null) {

        }
        else {
            this.normals.push(n1, n2, n3);
        }

    }
    /**
     * Create a face given 3 gl-matrix vec3s;
     * @param v1 the first vector of the face
     * @param v2 the second vector of the face
     * @param v3 the third vector of the face
     */
    public vertsfromVec3(v1: vec3, v2: vec3, v3: vec3) {
        this.verts = [v1, v2, v3];
    }
    public normalsfromVec3(n1: vec3, n2: vec3, n3: vec3) {
        this.normals = [n1, n2, n3];
    }
    public texturefromVec2(t1: vec2, t2: vec2, t3: vec2) {
        this.textures = [t1, t2, t3];
    }

}
export { Face };