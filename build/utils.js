import { vec3 } from "gl-matrix";
/**
 * Convert from degrees  to radians
 * @param angle_in_degrees Angle to convert
 */
function radiansToDegrees(angle_in_degrees) {
    return angle_in_degrees * (Math.PI / 180);
}
/**
 * Convert from radians to degrees
 * @param angle_in_radians Angle to convert
 */
function degreesToRadians(angle_in_radians) {
    return angle_in_radians / Math.PI * 180;
}
/**
 * Asynchronously load file resource from server.
 * @param path path to load from/
 */
async function loadFileAsync(path) {
    let res = await fetch(path);
    return await res.text();
}
/**
 *
 * @param frag_url the location of the fragment shader text
 * @param vrtx_url the location of the vertex shader text
 */
async function loadShader(frag_url, vrtx_url) {
    let shader;
    shader.vrtx = await loadFileAsync(vrtx_url);
    shader.frag = await loadFileAsync(frag_url);
    return shader;
}
/**
 * Converts a canvas to the client width
 * @param canvas the canvas to resize
 */
function resize_canvas(canvas) {
    var cssToRealPixels = 1;
    var displayWidth = Math.floor(canvas.clientWidth * cssToRealPixels);
    var displayHeight = Math.floor(canvas.clientHeight * cssToRealPixels);
    if (canvas.width != displayWidth ||
        canvas.height != displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
}
/**
 * Asynchronously loads a JSON resource and returns the JSON as a javascript object
 * @param path the path to the JSON file
 */
async function loadJSON(path) {
    let res = await loadFileAsync(path);
    return JSON.parse(res);
}
/**
 * Create a non-indexed line array from a vertex index array
 * @param tris_indicies the vertex index array describe a triangle
 */
function linesFromTrisIndicies(tris_indicies) {
    let ls_indicies = [];
    for (let i = 0; i < tris_indicies.length / 3; i++) {
        // i is a triangle index. index_vn are indexies of vertexes withing triangles.
        let index_v0 = tris_indicies[i * 3 + 0];
        let index_v1 = tris_indicies[i * 3 + 1];
        let index_v2 = tris_indicies[i * 3 + 2];
        // Make the line segments for drawing outlines.
        ls_indicies.push(index_v0);
        ls_indicies.push(index_v1);
        ls_indicies.push(index_v1);
        ls_indicies.push(index_v2);
        ls_indicies.push(index_v2);
        ls_indicies.push(index_v0);
    }
    return ls_indicies;
}
/**
 * Create a gl-matrix vec3 from a 3 element array. Throws an error if the array is not 3 elements long
 * @param ar the array to convert into a vec3
 */
function vec3FromArray(ar) {
    let out_vec;
    if (ar.length < 3 || ar.length > 3) {
        throw "The length of the array is incorrect";
    }
    else {
        out_vec = vec3.fromValues(ar[0], ar[1], ar[2]);
        return out_vec;
    }
}
export { radiansToDegrees, vec3FromArray, linesFromTrisIndicies, loadJSON, resize_canvas, loadShader, loadFileAsync, degreesToRadians };
//# sourceMappingURL=utils.js.map