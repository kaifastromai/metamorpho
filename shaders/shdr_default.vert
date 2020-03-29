#version 300 es
precision mediump float;
layout(location=0) in vec4 a_pos;

//World view matrix
uniform mat4 u_m_v;
//World projection matrix
uniform mat4 u_p;

void main(void){
    gl_Position=u_p*u_m_v*a_pos;
}