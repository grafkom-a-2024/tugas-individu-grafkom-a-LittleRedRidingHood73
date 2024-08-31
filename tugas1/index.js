"use strict";

function main() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.querySelector("#canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  // setup GLSL program
  var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-2d", "fragment-shader-2d"]);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');

  // look up uniform locations
  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

  // Create a buffer to put three 2d clip space points in
  var triangleVertexBufferObject = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = triangleVertexBufferObject)
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);

  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.enableVertexAttribArray(colorAttribLocation);
  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);

  // Tell the attribute how to get data out of triangleVertexBufferObject (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 5 * Float32Array.BYTES_PER_ELEMENT;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset);

      var size = 3;          // 2 components per iteration
      var type = gl.FLOAT;   // the data is 32bit floats
      var normalize = false; // don't normalize the data
      var stride = 5 * Float32Array.BYTES_PER_ELEMENT;        // 0 = move forward size * sizeof(type) each iteration to get the next position
      var offset = 2 * Float32Array.BYTES_PER_ELEMENT;        // start at the beginning of the buffer
      gl.vertexAttribPointer(
          colorAttribLocation, size, type, normalize, stride, offset);
    
  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  var randomA = randomInt(gl.canvas.width);
  var randomB = randomInt(gl.canvas.height);
  var randomC = randomInt(gl.canvas.width);

  setTriangle(
    gl, randomA, 0, 0, randomB, randomC, gl.canvas.height);

  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 3;
  gl.drawArrays(primitiveType, offset, count);

  setTriangle(
      gl, randomA, 0, 0, randomB, 0, 0);

  gl.drawArrays(primitiveType, offset, count);  

  setTriangle(
    gl, 0, randomB, randomC, gl.canvas.height, 0, gl.canvas.height);

  gl.drawArrays(primitiveType, offset, count);  

    randomB = randomInt(gl.canvas.height);

  setTriangle(
    gl, randomA, 0, gl.canvas.width, randomB, gl.canvas.width, 0);

  gl.drawArrays(primitiveType, offset, count);  

  setTriangle(
    gl, randomA, 0, gl.canvas.width, randomB, gl.canvas.width, gl.canvas.height);

  gl.drawArrays(primitiveType, offset, count);  

  setTriangle(
    gl, randomA, 0, gl.canvas.width, gl.canvas.height, randomC, gl.canvas.height);

  gl.drawArrays(primitiveType, offset, count);
}

// Returns a random integer from 0 to range - 1.
function randomInt(range) {
  return Math.floor(Math.random() * range);
}
    
// Fill the buffer with the values that define a rectangle.
function setTriangle(gl, x1, y1, x2, y2, x3, y3) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1, Math.random(), Math.random(), Math.random(),
     x2, y2, Math.random(),Math.random(), Math.random(),
     x3, y3, Math.random(), Math.random(), Math.random(),
  ]), gl.STATIC_DRAW);
}

main();