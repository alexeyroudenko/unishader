
//
// Author: Arthew0
// http://arthew0.online
// Title: Sample01

precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform vec3 u_parametric; // external variable

#define USE_PARAM false

// ----------------------------------------------------------------------------

float level(vec2 st, vec3 parametric) {
	return sin(st.x + parametric.x * 5.0);
}

void main() {
	float aspect = u_resolution.x / u_resolution.y;
	vec2 fragCoord = gl_FragCoord.xy;
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
	st.x *= aspect;
	st = vec2(.5 * aspect, 0.5) - st;
	vec2 mt = u_mouse.xy;
	mt = u_mouse.xy / u_resolution.xy;

	// ----------------------------------

	vec3 parametric = vec3(0.0);
	parametric.x = mt.x;
	parametric.y = mt.y;
	parametric.z = mt.x;

	if (USE_PARAM) {
		parametric = u_parametric;
	}

	float height = level(st, parametric);
	vec3 color = vec3(height);
	gl_FragColor = vec4(color, 1.0);
}
