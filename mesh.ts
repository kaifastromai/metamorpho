import { Face } from "./face";
import { vec3, vec2 } from "gl-matrix";
class Mesh {
    private faces: Array<Face>;
    name: String;
    public raw_verts: Array<number>;
    public raw_normals: Array<number>;
    public raw_textures: Array<number>;

    constructor(name: String) {
        this.faces = [];
        this.raw_verts = [];
        this.raw_textures = [];
        this.raw_normals = [];
        this.name = name;


    }
    /**
     * Create a mesh from an array of vec3's
     * @param verts the array of vec3 vertices to create mesh from. Assumes they are nonindexed and properly ordered each successive three vec3's represents a single face)
     */
    VertsFromVec3Array(verts: Array<vec3>) {
        for (let i = 0; i < verts.length / 3; i++) {
            this.faces.push(new Face({ v1: verts[3 * i], v2: verts[3 * i + 1], v3: verts[3 * i + 2] }));
            this.raw_verts.push(...verts[3 * i], ...verts[3 * i + 1], ...verts[3 * i + 2]);


        }
    }
    /**
     * Auto-compute mesh normals
     */
    ComputeNormals() {



    }
    /**
     * Set all the normals of the face
     * @param normals the normals vector to add from
     */
    NormalsFromVec3Array(normals: Array<vec3>) {
        if (this.faces.length == 0) {
            console.error("There are no vertices initialized yet. You cannot add normals unless there are vertices");
            return;
        }
        else if (this.faces.length < 3 * normals.length || this.faces.length > 3 * normals.length) {
            console.error("There is a size missmatch between the faces and the provided nornmal array");
            return;
        }
        else {
            for (let i = 0; i < normals.length / 3; i++) {
                this.faces[i].normals.push(...normals.slice(3 * i, 3 * i + 3));
                this.raw_normals.push(...this.faces[i].normals[0], ...this.faces[i].normals[1], ...this.faces[i].normals[2]);
            }
        }

    }
    /**
     * Add texture coordinates to the mesh
     * @param texture_coordinates the texture coordinate array. Assumes a non-index array of vec2 ordered in the same as the vector array
     */
    TexturesFromVec2Array(texture_coordinates: Array<vec2>) {
        if (this.faces.length == 0) {
            console.error("There are no vertices initialized yet. You cannot add texture coordinates unless there are vertices");
            return;
        }
        else if (this.faces.length < 3 * texture_coordinates.length || this.faces.length > 3 * texture_coordinates.length) {
            console.error("There is a size missmatch between the faces and the provided nornmal array");
            return;
        }
        else {
            for (let i = 0; i < texture_coordinates.length / 3; i++) {
                this.faces[i].textures.push(...texture_coordinates.slice(3 * i, 3 * i + 3));
                this.raw_textures.push(...this.faces[i].textures[0], ...this.faces[i].textures[1], ...this.faces[i].textures[2]);
            }
        }

    }
    private UpdateRawVerts(faces_to_add: Face[]) {
        if (faces_to_add.length != 0) {
            faces_to_add.forEach(element => {
                element.verts.forEach(vert => { this.raw_verts.push(...vert) })
                element.textures.forEach(text => { this.raw_textures.push(...text) })
                element.normals.forEach(norms => { this.raw_normals.push(...norms) })
            });
        }
    }
    public AppendFaces(...faces: Face[]) {
        this.faces.push(...faces);
        this.UpdateRawVerts(faces);

    }
    public GetFaces() {
        return this.faces;
    }



}
export { Mesh };