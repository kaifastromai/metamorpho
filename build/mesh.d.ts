import { Face } from "./face";
import { vec3, vec2 } from "gl-matrix";
declare class Mesh {
    private faces;
    name: String;
    raw_verts: Array<number>;
    raw_normals: Array<number>;
    raw_textures: Array<number>;
    constructor(name: String);
    /**
     * Create a mesh from an array of vec3's
     * @param verts the array of vec3 vertices to create mesh from. Assumes they are nonindexed and properly ordered each successive three vec3's represents a single face)
     */
    VertsFromVec3Array(verts: Array<vec3>): void;
    /**
     * Auto-compute mesh normals
     */
    ComputeNormals(): void;
    /**
     * Set all the normals of the face
     * @param normals the normals vector to add from
     */
    NormalsFromVec3Array(normals: Array<vec3>): void;
    /**
     * Add texture coordinates to the mesh
     * @param texture_coordinates the texture coordinate array. Assumes a non-index array of vec2 ordered in the same as the vector array
     */
    TexturesFromVec2Array(texture_coordinates: Array<vec2>): void;
    private UpdateRawVerts;
    AppendFaces(...faces: Face[]): void;
    GetFaces(): Face[];
}
export { Mesh };
