import { vec3 } from "gl-matrix";
interface IShader {
    vrtx: string;
    frag: string;
}
/**
 * Convert from degrees  to radians
 * @param angle_in_degrees Angle to convert
 */
declare function radiansToDegrees(angle_in_degrees: number): number;
/**
 * Convert from radians to degrees
 * @param angle_in_radians Angle to convert
 */
declare function degreesToRadians(angle_in_radians: number): number;
/**
 * Asynchronously load file resource from server.
 * @param path path to load from/
 */
declare function loadFileAsync(path: string): Promise<string>;
/**
 *
 * @param frag_url the location of the fragment shader text
 * @param vrtx_url the location of the vertex shader text
 */
declare function loadShader(frag_url: string, vrtx_url: string): Promise<IShader>;
/**
 * Converts a canvas to the client width
 * @param canvas the canvas to resize
 */
declare function resize_canvas(canvas: HTMLCanvasElement): void;
/**
 * Asynchronously loads a JSON resource and returns the JSON as a javascript object
 * @param path the path to the JSON file
 */
declare function loadJSON(path: string): Promise<any>;
/**
 * Create a non-indexed line array from a vertex index array
 * @param tris_indicies the vertex index array describe a triangle
 */
declare function linesFromTrisIndicies(tris_indicies: Array<number>): Array<number>;
/**
 * Create a gl-matrix vec3 from a 3 element array. Throws an error if the array is not 3 elements long
 * @param ar the array to convert into a vec3
 */
declare function vec3FromArray(ar: Array<number>): vec3;
export { radiansToDegrees, vec3FromArray, linesFromTrisIndicies, loadJSON, resize_canvas, loadShader, loadFileAsync, degreesToRadians };
