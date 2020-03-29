declare var GL: WebGL2RenderingContext;
declare class Scene {
    gl: WebGL2RenderingContext;
    /**
     * Create new scene with {gl} as rendering context
     * @param gl WebGl rendering context
     */
    constructor(gl: WebGL2RenderingContext);
}
export { Scene, GL };
