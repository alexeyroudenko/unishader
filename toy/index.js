var glslify = require('glslify')
var toy     = require('gl-toy')

var start  = Date.now()
var shader = glslify('../glsl/sample01.frag', {
  transform: ['glslify-hex']
})

const m  = require('mouse-position')
var mouse = m()

toy(shader, function(gl, sh) {
	sh.uniforms.u_mouse = [mouse[0], mouse[1]]
	sh.uniforms.u_resolution = [gl.drawingBufferWidth, gl.drawingBufferHeight]
	sh.uniforms.u_time = (Date.now() - start) / 1000
})
