precision mediump float;

uniform float u_time;
uniform vec2  u_resolution;

vec2 doModel(vec3 p);

#pragma glslify: raytrace = require('glsl-raytrace', map = doModel, steps = 90)
#pragma glslify: normal = require('glsl-sdf-normal', map = doModel)
#pragma glslify: orenn = require('glsl-diffuse-oren-nayar')
#pragma glslify: gauss = require('glsl-specular-gaussian')
#pragma glslify: camera = require('glsl-turntable-camera')
#pragma glslify: noise = require('glsl-noise/simplex/4d')

vec2 doModel(vec3 p) {
  float r  = 1.0 + noise(vec4(p, u_time * 1.2)) * .2;
  float d  = length(p) - r;
  float id = 0.0;

  return vec2(d, id);
}

vec3 lighting(vec3 pos, vec3 nor, vec3 ro, vec3 rd) {
  vec3 dir1 = normalize(vec3(0, 1, 0));
  vec3 col1 = vec3(3.0, 0.7, 0.4);
  vec3 dif1 = col1 * orenn(dir1, -rd, nor, 0.15, 1.0);
  vec3 spc1 = col1 * gauss(dir1, -rd, nor, 0.15);

  vec3 dir2 = normalize(vec3(0.4, -1, 0.4));
  vec3 col2 = vec3(0.4, 0.8, 0.9);
  vec3 dif2 = col2 * orenn(dir2, -rd, nor, 0.15, 1.0);
  vec3 spc2 = col2 * gauss(dir2, -rd, nor, 0.15);

  return dif1 + spc1 + dif2 + spc2;
}

void main() {
  vec3 color = vec3(0.0);
  vec3 ro, rd;

  float rotation = u_time;
  float height   = 2.5;
  float dist     = 4.0;
  camera(rotation, height, dist, u_resolution.xy, ro, rd);

  vec2 t = raytrace(ro, rd);
  if (t.x > -0.5) {
    vec3 pos = ro + rd * t.x;
    vec3 nor = normal(pos);

    color = lighting(pos, nor, ro, rd);
  }

  // gamma correction
  color = pow(color, vec3(0.5545));

  gl_FragColor.rgb = color;
  gl_FragColor.a   = 1.0;
}
