import { loadFileAsync } from "./utils";
import { GL } from "./scene";
import { Mesh } from "./mesh";
import { mat4 } from "gl-matrix";
/**
 * Basic default, unlit material
 */
class Material {
    shader: Shader;
    mesh: Mesh;
    u_p: mat4;
    u_m_v: mat4;
    triangle_vao: WebGLVertexArrayObject;
    lines_vao: WebGLVertexArrayObject
    triangles_bffr: WebGLBuffer;
    lines_bffr: WebGLBuffer;
    lines_verts: Array<number>;
    normals_bffr: WebGLBuffer;
    display_normals_bffr: WebGLBuffer;
    texture: HTMLImageElement;
    NORMAL_ATTRIB_INDEX: number;
    VERTEX_ATTRIB_INDEX: number;
    TEXTURE_ATTRIB_INDEX: number;



    constructor() {
        this.shader = new Shader();
        this.triangle_vao = GL.createVertexArray();
        this.triangles_bffr = GL.createBuffer();
        this.normals_bffr = GL.createBuffer();
        this.lines_vao = GL.createVertexArray();
        this.lines_bffr = GL.createBuffer();
        Shader.reloadTriple(this.triangle_vao, this.triangles_bffr, this.mesh.raw_verts, GL.STATIC_DRAW, this.VERTEX_ATTRIB_INDEX);

    }
    async Create() {
        await this.shader.createShader('./shaders/shdr_default.vert', './shaders/shdr_default.frag');
        //Model world
        this.shader.uniforms.u_m_v = GL.getUniformLocation(this.shader.program, "u_m_v");
        this.shader.uniforms.u_p = GL.getUniformLocation(this.shader.program, "u_p");
    }
    UpdateUniforms() {
        GL.uniformMatrix4fv(this.shader.uniforms.u_m_v, false, this.u_m_v);
        GL.uniformMatrix4fv(this.shader.uniforms.u_p, false, this.u_p);
    }

    BufferMeshData() {

    }


}
/**
 * Shader object
 */
class Shader {
    program: WebGLProgram;
    uniforms?: { [k: string]: WebGLUniformLocation; };
    attribs: Array<number>;
    vertexText: string;
    fragmentText: string;
    constructor() {
        this.program = null;
        this.uniforms = {};
        this.attribs = [];
    }

    private async initializeShaderText(vertext_url: string, fragment_url: string) {
        try {
            this.vertexText = await loadFileAsync(vertext_url);
            this.fragmentText = await loadFileAsync(fragment_url);
        } catch (err) {
            console.error(err.message);
        }
    }
    private createProgram() {
        this.program = GL.createProgram();
        //create GL shader itself
        var vertShader = GL.createShader(GL.VERTEX_SHADER);
        GL.shaderSource(vertShader, this.vertexText);
        GL.compileShader(vertShader);
        //Debug if we succeded
        var success = GL.getShaderParameter(vertShader, GL.COMPILE_STATUS);
        if (!success)
            console.error(GL.getShaderInfoLog(vertShader));
        var fragShader = GL.createShader(GL.FRAGMENT_SHADER);
        GL.shaderSource(fragShader, this.fragmentText);
        GL.compileShader(fragShader);
        success = GL.getShaderParameter(fragShader, GL.COMPILE_STATUS);
        if (!success)
            console.error(GL.getShaderInfoLog(vertShader));
        GL.attachShader(this.program, vertShader);
        GL.attachShader(this.program, fragShader);
        GL.linkProgram(this.program);
        var success = GL.getProgramParameter(this.program, GL.LINK_STATUS);
        if (!success) {
            throw "Could not link program: " + GL.getProgramInfoLog(this.program);
        }
    }

    async createShader(vertext_url: string, fragment_url: string) {
        await this.initializeShaderText(vertext_url, fragment_url).then(() => {
            this.createProgram();
        });
    }

    public static reloadTriple(vao: WebGLVertexArrayObject, buffer: WebGLBuffer, vrts: Array<number>, draw_mode = GL.STATIC_DRAW, attribute_index = 0) {
        GL.bindVertexArray(vao);
        GL.bindBuffer(GL.ARRAY_BUFFER, buffer);
        GL.vertexAttribPointer(attribute_index, 3, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(attribute_index);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vrts), draw_mode);
    }
    public static reloadImage(vao: WebGLVertexArrayObject, texture_coord_buffer:
        WebGLBuffer, attribute_index = 0, texture_coords: Array<number>,
        draw_mode = GL.STATIC_DRAW, image: HTMLImageElement) {
        GL.bindVertexArray(vao);
        GL.bindBuffer(GL.ARRAY_BUFFER, texture_coord_buffer);
        GL.vertexAttribPointer(attribute_index, 2, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(attribute_index);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(texture_coords), draw_mode);

        let texture = GL.createTexture();
        GL.activeTexture(GL.TEXTURE0 + 0);
        GL.bindTexture(GL.TEXTURE_2D, texture);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
        let mipLevel = 0;
        let internalFormat = GL.RGBA;
        let srcFormat = GL.RGBA;
        let srcType = GL.UNSIGNED_BYTE;
        GL.texImage2D(GL.TEXTURE_2D, mipLevel, internalFormat, srcFormat, srcType, image);
    }
    public static unbind() {
        GL.bindVertexArray(null);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
    }
    /**
     * Set this as the current program used by GL
     */
    use() {
        GL.useProgram(this.program);
    }
}

class FlatShading extends Material {



}