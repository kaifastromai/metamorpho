
var GL: WebGL2RenderingContext
class Scene {
    public gl: WebGL2RenderingContext;
    /**
     * Create new scene with {gl} as rendering context
     * @param gl WebGl rendering context
     */
    constructor(gl: WebGL2RenderingContext) {
        GL = gl;
        this.gl = GL;
    }
}
export { Scene, GL }