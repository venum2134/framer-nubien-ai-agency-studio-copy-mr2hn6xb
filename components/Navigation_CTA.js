// http-url:https://framerusercontent.com/modules/j7buNUyMZbPsKYZDQT4r/ohPpqvT0DjAdSgqFEafW/m_S0SazFM.js
import { jsx as _jsx6, jsxs as _jsxs2 } from "react/jsx-runtime";
import { addFonts as addFonts3, addPropertyControls as addPropertyControls5, ComponentViewportProvider as ComponentViewportProvider2, ControlType as ControlType6, cx as cx3, getFonts as getFonts2, getFontsFromSharedStyle as getFontsFromSharedStyle3, getLoadingLazyAtYPosition, getPropertyControls as getPropertyControls2, Image, RichText as RichText3, SmartComponentScopedContainer as SmartComponentScopedContainer2, useComponentViewport as useComponentViewport3, useLocaleInfo as useLocaleInfo3, useVariantState as useVariantState3, withCSS as withCSS3 } from "framer";
import { LayoutGroup as LayoutGroup3, motion as motion4, MotionConfigContext as MotionConfigContext3 } from "framer-motion";
import * as React6 from "react";
import { useRef as useRef5 } from "react";

// http-url:https://framerusercontent.com/modules/lrLFKsmJ1z5FXTa9Ej4k/QmxZAGZo0U04mjLegBGM/Rays_Prod.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addPropertyControls, ControlType } from "framer";
import React, { useRef, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
var RAY_Y_POSITION_1 = -0.4;
var RAY_Y_POSITION_2 = -0.5;
function Rays(props) {
  const { raysColor } = props;
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const frameIdRef = useRef();
  const darkMode = useDarkMode();
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef(props.animation);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  useEffect(() => {
    animationRef.current = props.animation;
  }, [props.animation]);
  const [randomColor1RGB, randomColor2RGB] = useMemo(() => {
    if (raysColor.mode === "random") {
      const h = Math.random() * 360;
      const s = 60 + Math.random() * 40;
      return [hslToRgb(h, s, 50), hslToRgb(h, s, 65)];
    } else {
      return [[1, 1, 1], [1, 1, 1]];
    }
  }, [raysColor]);
  const [color1RGB, color2RGB, raysOpacity] = useMemo(() => {
    if (raysColor.mode === "random") {
      return [randomColor1RGB, randomColor2RGB, 1];
    } else {
      let color1 = "";
      let color2 = "";
      switch (raysColor.mode) {
        case "single":
          color1 = raysColor.color;
          color2 = raysColor.color;
          break;
        case "multi":
          color1 = raysColor.color1;
          color2 = raysColor.color2;
          break;
      }
      const [r1, g1, b1, a1] = colorToRGBA(getColorValue(color1, containerRef));
      const [r2, g2, b2, a2] = colorToRGBA(getColorValue(color2, containerRef));
      return [[r1, g1, b1], [r2, g2, b2], Math.max(a1, a2)];
    }
  }, [raysColor, darkMode, containerRef]);
  useEffect(() => {
    setIsMounted(true);
    const container = containerRef.current;
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1e3);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true, premultipliedAlpha: true, alpha: true, antialias: true, precision: "highp", powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(1);
    container.appendChild(renderer.domElement);
    const geometry = new THREE.PlaneGeometry(1024, 1024);
    const material = new THREE.ShaderMaterial({ fragmentShader: FRAGMENT_SHADER, vertexShader: VERTEX_SHADER, uniforms: { u_colors: { value: [new THREE.Vector4(color1RGB[0], color1RGB[1], color1RGB[2], 1), new THREE.Vector4(color2RGB[0], color2RGB[1], color2RGB[2], 1)] }, u_intensity: { value: mapRange(props.intensity, 0, 100, 0, 0.5) }, u_rays: { value: mapRange(props.rays, 0, 100, 0, 0.3) }, u_reach: { value: mapRange(props.reach, 0, 100, 0, 0.5) }, u_time: { value: Math.random() * 1e4 }, u_mouse: { value: [0, 0] }, u_resolution: { value: [container.clientWidth, container.clientHeight] }, u_rayPos1: { value: [props.position / 100 * container.clientWidth, RAY_Y_POSITION_1 * container.clientHeight] }, u_rayPos2: { value: [(props.position / 100 + 0.02) * container.clientWidth, RAY_Y_POSITION_2 * container.clientHeight] } }, wireframe: false, wireframeLinewidth: 0, dithering: false, flatShading: true, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    meshRef.current = mesh;
    let lastTime = 0;
    const animate = (time) => {
      const animation = animationRef.current;
      if (!animation.animate) {
        lastTime = time;
      }
      const delta = time - lastTime;
      lastTime = time;
      if (mesh.material instanceof THREE.ShaderMaterial) {
        if (animation.animate) {
          mesh.material.uniforms.u_time.value += delta * animation.speed / 1e3 / 10;
        }
      }
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    frameIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [isMounted]);
  useEffect(() => {
    if (meshRef.current?.material instanceof THREE.ShaderMaterial) {
      const material = meshRef.current.material;
      const container = containerRef.current;
      if (!container) return;
      material.uniforms.u_colors.value = [new THREE.Vector4(color1RGB[0], color1RGB[1], color1RGB[2], 1), new THREE.Vector4(color2RGB[0], color2RGB[1], color2RGB[2], 1)];
      material.uniforms.u_intensity.value = mapRange(props.intensity, 0, 100, 0, 0.5);
      material.uniforms.u_rays.value = mapRange(props.rays, 0, 100, 0, 0.3);
      material.uniforms.u_reach.value = mapRange(props.reach, 0, 100, 0, 0.5);
      material.uniforms.u_rayPos1.value = [props.position / 100 * container.clientWidth, RAY_Y_POSITION_1 * container.clientHeight];
      material.uniforms.u_rayPos2.value = [(props.position / 100 + 0.02) * container.clientWidth, RAY_Y_POSITION_2 * container.clientHeight];
    }
  }, [props.intensity, props.rays, props.reach, props.position, color1RGB, color2RGB]);
  return /* @__PURE__ */ _jsx("div", { ref: containerRef, style: { borderRadius: props.radius, overflow: "hidden", backgroundColor: props.backgroundColor, ...props.style } });
}
Rays.displayName = "Light Rays";
addPropertyControls(Rays, { raysColor: { type: ControlType.Object, title: "Color", controls: { mode: { type: ControlType.Enum, defaultValue: "single", options: ["random", "single", "multi"], optionTitles: ["Random", "Single", "Multi"], displaySegmentedControl: true, segmentedControlDirection: "vertical" }, color: { type: ControlType.Color, defaultValue: "#FFF", hidden: (props) => props.mode !== "single" }, color1: { type: ControlType.Color, defaultValue: "#FFF", hidden: (props) => props.mode !== "multi" }, color2: { type: ControlType.Color, defaultValue: "#FFCB47", hidden: (props) => props.mode !== "multi" } } }, backgroundColor: { type: ControlType.Color, defaultValue: "#000", optional: true, title: "Background" }, animation: { type: ControlType.Object, icon: "effect", controls: { animate: { type: ControlType.Boolean, defaultValue: true }, speed: { type: ControlType.Number, defaultValue: 10, min: 1, max: 100, step: 1, hidden: (props) => !props.animate } } }, intensity: { type: ControlType.Number, defaultValue: 50, min: 0, max: 100, step: 1 }, rays: { type: ControlType.Number, defaultValue: 30, min: 0, max: 100, step: 1 }, reach: { type: ControlType.Number, defaultValue: 40, min: 0, max: 100, step: 1 }, position: { type: ControlType.Number, defaultValue: 80, min: 0, max: 100, step: 1, unit: "%" }, radius: { type: ControlType.BorderRadius, defaultValue: "0px", description: "More components at [Framer University](https://frameruni.link/cc)." } });
var CanvasErrorBoundary = class extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
};
function getColorValue(color, elementRef) {
  if (color.startsWith("var(")) {
    const { variableName, defaultValue } = extractCSSVariableInfo(color);
    const defaultReturnValue = defaultValue || "";
    if (variableName && typeof document !== "undefined") {
      const computedStyle = getComputedStyle(elementRef?.current || document.body);
      if (computedStyle) {
        const computedValue = computedStyle.getPropertyValue(variableName).trim();
        return computedValue || defaultReturnValue;
      }
      return defaultReturnValue;
    }
    return defaultReturnValue;
  } else {
    return color;
  }
}
function extractCSSVariableInfo(cssString) {
  const regex = /var\s*\(\s*(--[\w-]+)(?:\s*,\s*((?:"[^"]*"|'[^']*'|[^)]+)))?\s*\)/;
  const match = regex.exec(cssString);
  if (match) {
    const variableName = match[1];
    let defaultValue = match[2] || null;
    if (defaultValue) {
      defaultValue = defaultValue.replace(/^["']|["']$/g, "");
      defaultValue = defaultValue.trim();
    }
    return { variableName, defaultValue };
  }
  return { variableName: "", defaultValue: "" };
}
var colorToRGBA = (color) => {
  let r = 1;
  let g = 1;
  let b = 1;
  let a = 1;
  if (color && typeof color === "string") {
    if (color.startsWith("rgba(")) {
      const parts = color.slice(5, -1).split(",");
      r = parseInt(parts[0]) / 255;
      g = parseInt(parts[1]) / 255;
      b = parseInt(parts[2]) / 255;
      a = parseFloat(parts[3]);
    } else if (color.startsWith("rgb(")) {
      const parts = color.slice(4, -1).split(",");
      r = parseInt(parts[0]) / 255;
      g = parseInt(parts[1]) / 255;
      b = parseInt(parts[2]) / 255;
    } else if (color.startsWith("#")) {
      const hex = color.slice(1);
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16) / 255;
        g = parseInt(hex[1] + hex[1], 16) / 255;
        b = parseInt(hex[2] + hex[2], 16) / 255;
      } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16) / 255;
        g = parseInt(hex.slice(2, 4), 16) / 255;
        b = parseInt(hex.slice(4, 6), 16) / 255;
      } else if (hex.length === 8) {
        r = parseInt(hex.slice(0, 2), 16) / 255;
        g = parseInt(hex.slice(2, 4), 16) / 255;
        b = parseInt(hex.slice(4, 6), 16) / 255;
        a = parseInt(hex.slice(6, 8), 16) / 255;
      }
    }
  }
  return [r, g, b, a];
};
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsDarkMode(e.matches);
        }, 80);
      });
    };
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);
  return isDarkMode;
}
function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  return [r + m, g + m, b + m];
}
function mapRange(value, fromLow, fromHigh, toLow, toHigh) {
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}
var VERTEX_SHADER = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
var FRAGMENT_SHADER = `
// Uniforms

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec4 u_colors[2];
uniform float u_intensity;
uniform float u_rays;
uniform float u_reach;
uniform vec2 u_rayPos1;
uniform vec2 u_rayPos2;

#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif

#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif

#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT
float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
#endif

#ifndef FNC_QUINTIC
#define FNC_QUINTIC 

float quintic(const in float v) { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec2  quintic(const in vec2 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec3  quintic(const in vec3 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec4  quintic(const in vec4 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }

#endif

#ifndef FNC_PNOISE
#define FNC_PNOISE

float pnoise(in vec2 P, in vec2 rep) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, rep.xyxy); 
    Pi = mod289(Pi);        
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;

    vec4 i = permute(permute(ix) + iy);

    vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
    vec4 gy = abs(gx) - 0.5 ;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;

    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);

    vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;

    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));

    vec2 fade_xy = quintic(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

float pnoise(in vec3 P, in vec3 rep) {
    vec3 Pi0 = mod(floor(P), rep); 
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); 
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); 
    vec3 Pf1 = Pf0 - vec3(1.0); 
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = quintic(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
}

float pnoise(in vec4 P, in vec4 rep) {
    vec4 Pi0 = mod(floor(P), rep); 
    vec4 Pi1 = mod(Pi0 + 1.0, rep); 
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec4 Pf0 = fract(P); 
    vec4 Pf1 = Pf0 - 1.0; 
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = vec4(Pi0.zzzz);
    vec4 iz1 = vec4(Pi1.zzzz);
    vec4 iw0 = vec4(Pi0.wwww);
    vec4 iw1 = vec4(Pi1.wwww);

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 ixy00 = permute(ixy0 + iw0);
    vec4 ixy01 = permute(ixy0 + iw1);
    vec4 ixy10 = permute(ixy1 + iw0);
    vec4 ixy11 = permute(ixy1 + iw1);

    vec4 gx00 = ixy00 * (1.0 / 7.0);
    vec4 gy00 = floor(gx00) * (1.0 / 7.0);
    vec4 gz00 = floor(gy00) * (1.0 / 6.0);
    gx00 = fract(gx00) - 0.5;
    gy00 = fract(gy00) - 0.5;
    gz00 = fract(gz00) - 0.5;
    vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
    vec4 sw00 = step(gw00, vec4(0.0));
    gx00 -= sw00 * (step(0.0, gx00) - 0.5);
    gy00 -= sw00 * (step(0.0, gy00) - 0.5);

    vec4 gx01 = ixy01 * (1.0 / 7.0);
    vec4 gy01 = floor(gx01) * (1.0 / 7.0);
    vec4 gz01 = floor(gy01) * (1.0 / 6.0);
    gx01 = fract(gx01) - 0.5;
    gy01 = fract(gy01) - 0.5;
    gz01 = fract(gz01) - 0.5;
    vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
    vec4 sw01 = step(gw01, vec4(0.0));
    gx01 -= sw01 * (step(0.0, gx01) - 0.5);
    gy01 -= sw01 * (step(0.0, gy01) - 0.5);

    vec4 gx10 = ixy10 * (1.0 / 7.0);
    vec4 gy10 = floor(gx10) * (1.0 / 7.0);
    vec4 gz10 = floor(gy10) * (1.0 / 6.0);
    gx10 = fract(gx10) - 0.5;
    gy10 = fract(gy10) - 0.5;
    gz10 = fract(gz10) - 0.5;
    vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
    vec4 sw10 = step(gw10, vec4(0.0));
    gx10 -= sw10 * (step(0.0, gx10) - 0.5);
    gy10 -= sw10 * (step(0.0, gy10) - 0.5);

    vec4 gx11 = ixy11 * (1.0 / 7.0);
    vec4 gy11 = floor(gx11) * (1.0 / 7.0);
    vec4 gz11 = floor(gy11) * (1.0 / 6.0);
    gx11 = fract(gx11) - 0.5;
    gy11 = fract(gy11) - 0.5;
    gz11 = fract(gz11) - 0.5;
    vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
    vec4 sw11 = step(gw11, vec4(0.0));
    gx11 -= sw11 * (step(0.0, gx11) - 0.5);
    gy11 -= sw11 * (step(0.0, gy11) - 0.5);

    vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
    vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
    vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
    vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
    vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
    vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
    vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
    vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
    vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
    vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
    vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
    vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
    vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
    vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
    vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
    vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

    vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
    g0000 *= norm00.x;
    g0100 *= norm00.y;
    g1000 *= norm00.z;
    g1100 *= norm00.w;

    vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
    g0001 *= norm01.x;
    g0101 *= norm01.y;
    g1001 *= norm01.z;
    g1101 *= norm01.w;

    vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
    g0010 *= norm10.x;
    g0110 *= norm10.y;
    g1010 *= norm10.z;
    g1110 *= norm10.w;

    vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
    g0011 *= norm11.x;
    g0111 *= norm11.y;
    g1011 *= norm11.z;
    g1111 *= norm11.w;

    float n0000 = dot(g0000, Pf0);
    float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
    float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
    float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
    float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
    float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
    float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
    float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
    float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
    float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
    float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
    float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
    float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
    float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
    float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
    float n1111 = dot(g1111, Pf1);

    vec4 fade_xyzw = quintic(Pf0);
    vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
    vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
    vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
    vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
    float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
    return 2.2 * n_xyzw;
}
#endif

#ifndef SRGB_EPSILON 
#define SRGB_EPSILON 0.00000001
#endif

#ifndef FNC_SRGB2RGB
#define FNC_SRGB2RGB

float srgb2rgb(float channel) {
    return (channel < 0.04045) ? channel * 0.0773993808 : pow((channel + 0.055) * 0.947867298578199, 2.4);
}

vec3 srgb2rgb(vec3 srgb) {
    return vec3(srgb2rgb(srgb.r + SRGB_EPSILON), 
                srgb2rgb(srgb.g + SRGB_EPSILON),
                srgb2rgb(srgb.b + SRGB_EPSILON));
}

vec4 srgb2rgb(vec4 srgb) {
    return vec4(srgb2rgb(srgb.rgb), srgb.a);
}

#endif

#if !defined(FNC_SATURATE) && !defined(saturate)
#define FNC_SATURATE
#define saturate(x) clamp(x, 0.0, 1.0)
#endif

#ifndef SRGB_EPSILON 
#define SRGB_EPSILON 0.00000001
#endif

#ifndef FNC_RGB2SRGB
#define FNC_RGB2SRGB

float rgb2srgb(float channel) {
    return (channel < 0.0031308) ? channel * 12.92 : 1.055 * pow(channel, 0.4166666666666667) - 0.055;
}

vec3 rgb2srgb(vec3 rgb) {
    return saturate(vec3(rgb2srgb(rgb.r - SRGB_EPSILON), rgb2srgb(rgb.g - SRGB_EPSILON), rgb2srgb(rgb.b - SRGB_EPSILON)));
}

vec4 rgb2srgb(vec4 rgb) {
    return vec4(rgb2srgb(rgb.rgb), rgb.a);
}

#endif

#ifndef FNC_MIXOKLAB
#define FNC_MIXOKLAB
vec3 mixOklab( vec3 colA, vec3 colB, float h ) {

    #ifdef MIXOKLAB_COLORSPACE_SRGB
    colA = srgb2rgb(colA);
    colB = srgb2rgb(colB);
    #endif

    const mat3 kCONEtoLMS = mat3(                
         0.4121656120,  0.2118591070,  0.0883097947,
         0.5362752080,  0.6807189584,  0.2818474174,
         0.0514575653,  0.1074065790,  0.6302613616);
    const mat3 kLMStoCONE = mat3(
         4.0767245293, -1.2681437731, -0.0041119885,
        -3.3072168827,  2.6093323231, -0.7034763098,
         0.2307590544, -0.3411344290,  1.7068625689);

    vec3 lmsA = pow( kCONEtoLMS * colA, vec3(1.0/3.0) );
    vec3 lmsB = pow( kCONEtoLMS * colB, vec3(1.0/3.0) );
    
    vec3 lms = mix( lmsA, lmsB, h );

    vec3 rgb = kLMStoCONE*(lms*lms*lms);

    #ifdef MIXOKLAB_COLORSPACE_SRGB
    return rgb2srgb(rgb);
    #else
    return rgb;
    #endif
}

vec4 mixOklab( vec4 colA, vec4 colB, float h ) {
    return vec4( mixOklab(colA.rgb, colB.rgb, h), mix(colA.a, colB.a, h) );
}
#endif


float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed)
{
    vec2 sourceToCoord = coord - raySource;
    float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
    
    // Calculate the diagonal length
    float diagonal = length(u_resolution);

    return clamp(
        (.45 + 0.15 * sin(cosAngle * seedA + u_time * speed)) +
        (0.3 + 0.2 * cos(-cosAngle * seedB + u_time * speed)),
        u_reach, 1.0) *
        clamp((diagonal - length(sourceToCoord)) / diagonal, u_reach, 1.0);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.y = 1.0 - uv.y;
    vec2 coord = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
    float speed = u_rays * 10.0;
    
    // Set the parameters of the sun rays
    vec2 rayPos1 = u_rayPos1;
    vec2 rayRefDir1 = normalize(vec2(1.0, -0.116));
    float raySeedA1 = 36.2214*speed;
    float raySeedB1 = 21.11349*speed;
    float raySpeed1 = 1.5*speed;
    
    vec2 rayPos2 = u_rayPos2;
    vec2 rayRefDir2 = normalize(vec2(1.0, 0.241));
    float raySeedA2 = 22.39910*speed;
    float raySeedB2 = 18.0234*speed;
    float raySpeed2 = 1.1*speed;
    
    // Calculate ray strengths
    float strength1 = rayStrength(rayPos1, rayRefDir1, coord, raySeedA1, raySeedB1, raySpeed1);
    float strength2 = rayStrength(rayPos2, rayRefDir2, coord, raySeedA2, raySeedB2, raySpeed2);
    
    // Calculate brightness attenuation
    float brightness = 1.0*u_reach - (coord.y / u_resolution.y);
    float attenuation = clamp(brightness + (0.5 + u_intensity), 0.0, 1.0);
    
    // Calculate alpha values while preserving color
    float alpha1 = strength1 * attenuation * u_colors[0].a;
    float alpha2 = strength2 * attenuation * u_colors[1].a;
    
    // Pre-multiply the colors with their alpha values
    vec3 premultColor1 = u_colors[0].rgb * alpha1;
    vec3 premultColor2 = u_colors[1].rgb * alpha2;
    
    // Blend the pre-multiplied colors
    vec3 blendedColor = premultColor1 + premultColor2;
    float blendedAlpha = alpha1 + alpha2 * (1.0 - alpha1);
    
    // Un-premultiply the final color
    vec3 finalRGB = blendedColor / max(blendedAlpha, 0.0001);
    
    gl_FragColor = vec4(finalRGB * blendedAlpha, blendedAlpha);
}
`;

// http-url:https://framerusercontent.com/modules/5HinDbt6GytvLDdPKAwt/JSaoxQhNDMwjBe2Tp8Vz/QhK6qqT5U.js
import { fontStore } from "framer";
fontStore.loadFonts(["GF;DM Sans-regular", "GF;DM Sans-700", "GF;DM Sans-700italic", "GF;DM Sans-italic"]);
var fonts = [{ explicitInter: true, fonts: [{ family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhS2f3ZGMZpg.woff2", weight: "400" }, { family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthS2f3ZGMZpg.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm32RmYJpso5.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDW32RmYJpso5.woff2", weight: "400" }] }];
var css = ['.framer-CjDlz .framer-styles-preset-x0s9r5:not(.rich-text-wrapper), .framer-CjDlz .framer-styles-preset-x0s9r5.rich-text-wrapper p { --framer-font-family: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 16px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 400; --framer-font-weight-bold: 700; --framer-font-weight-bold-italic: 700; --framer-font-weight-italic: 400; --framer-letter-spacing: -0.2px; --framer-line-height: 26px; --framer-paragraph-spacing: 16px; --framer-text-alignment: start; --framer-text-color: var(--token-8f8054d9-8a09-4e7e-b957-8a76557c5e75, rgba(255, 255, 255, 0.6)); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }'];
var className = "framer-CjDlz";

// http-url:https://framerusercontent.com/modules/UAvRJRY77r1FmQaUYgkv/cWl8AIdaNkyoc5oPp17J/QuTNz53Yy.js
import { fontStore as fontStore2 } from "framer";
fontStore2.loadFonts(["GF;DM Sans-regular", "GF;DM Sans-700", "GF;DM Sans-700italic", "GF;DM Sans-italic"]);
var fonts2 = [{ explicitInter: true, fonts: [{ family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhS2f3ZGMZpg.woff2", weight: "400" }, { family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthS2f3ZGMZpg.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm32RmYJpso5.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDW32RmYJpso5.woff2", weight: "400" }] }];
var css2 = ['.framer-ODGEa .framer-styles-preset-190xti5:not(.rich-text-wrapper), .framer-ODGEa .framer-styles-preset-190xti5.rich-text-wrapper h2 { --framer-font-family: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 54px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 400; --framer-font-weight-bold: 700; --framer-font-weight-bold-italic: 700; --framer-font-weight-italic: 400; --framer-letter-spacing: -1.9px; --framer-line-height: 50px; --framer-paragraph-spacing: 0px; --framer-text-alignment: start; --framer-text-color: var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }', '@media (max-width: 1199px) and (min-width: 810px) { .framer-ODGEa .framer-styles-preset-190xti5:not(.rich-text-wrapper), .framer-ODGEa .framer-styles-preset-190xti5.rich-text-wrapper h2 { --framer-font-family: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 54px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 400; --framer-font-weight-bold: 700; --framer-font-weight-bold-italic: 700; --framer-font-weight-italic: 400; --framer-letter-spacing: -1.9px; --framer-line-height: 50px; --framer-paragraph-spacing: 0px; --framer-text-alignment: start; --framer-text-color: var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; } }', '@media (max-width: 809px) and (min-width: 0px) { .framer-ODGEa .framer-styles-preset-190xti5:not(.rich-text-wrapper), .framer-ODGEa .framer-styles-preset-190xti5.rich-text-wrapper h2 { --framer-font-family: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 35px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 400; --framer-font-weight-bold: 700; --framer-font-weight-bold-italic: 700; --framer-font-weight-italic: 400; --framer-letter-spacing: -2px; --framer-line-height: 32px; --framer-paragraph-spacing: 0px; --framer-text-alignment: start; --framer-text-color: var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; } }'];
var className2 = "framer-ODGEa";

// http-url:https://framerusercontent.com/modules/6ZRZnqMFHT2XL3O43reN/ZtzbEgDXAacPoHXks73U/GNvaONxX6.js
import { jsx as _jsx2 } from "react/jsx-runtime";
import { addFonts, addPropertyControls as addPropertyControls2, ControlType as ControlType2, cx, getFontsFromSharedStyle, Link, RichText, useActiveVariantCallback, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "framer";
import { LayoutGroup, motion, MotionConfigContext } from "framer-motion";
import * as React2 from "react";
import { useRef as useRef2 } from "react";

// http-url:https://framerusercontent.com/modules/1nbUGgbws2vWsNnPufSy/UTJoCeu5ph7PorGXSV8g/VqRaec8fA.js
import { fontStore as fontStore3 } from "framer";
fontStore3.loadFonts(["GF;DM Sans-500", "GF;DM Sans-700", "GF;DM Sans-700italic", "GF;DM Sans-500italic"]);
var fonts3 = [{ explicitInter: true, fonts: [{ family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhS2f3ZGMZpg.woff2", weight: "500" }, { family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthS2f3ZGMZpg.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm32RmYJpso5.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-7DW32RmYJpso5.woff2", weight: "500" }] }];
var css3 = ['.framer-u628B .framer-styles-preset-2mfvz6:not(.rich-text-wrapper), .framer-u628B .framer-styles-preset-2mfvz6.rich-text-wrapper p { --framer-font-family: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 16px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 500; --framer-font-weight-bold: 700; --framer-font-weight-bold-italic: 700; --framer-font-weight-italic: 500; --framer-letter-spacing: -0.5px; --framer-line-height: 26px; --framer-paragraph-spacing: 0px; --framer-text-alignment: start; --framer-text-color: var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }'];
var className3 = "framer-u628B";

// http-url:https://framerusercontent.com/modules/6ZRZnqMFHT2XL3O43reN/ZtzbEgDXAacPoHXks73U/GNvaONxX6.js
var enabledGestures = { GXXGb1Hah: { hover: true }, vf6JWDf13: { hover: true }, xQAMtyuwR: { hover: true } };
var cycleOrder = ["vf6JWDf13", "GXXGb1Hah", "xQAMtyuwR"];
var serializationHash = "framer-Il1td";
var variantClassNames = { GXXGb1Hah: "framer-v-304yr8", vf6JWDf13: "framer-v-1nvacmp", xQAMtyuwR: "framer-v-1iyno3s" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { damping: 60, delay: 0, mass: 1, stiffness: 200, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React2.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React2.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx2(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React2.Fragment);
var humanReadableVariantMap = { Grey: "xQAMtyuwR", Purple: "vf6JWDf13", White: "GXXGb1Hah" };
var getProps = ({ border, click, height, id, link, newTab, smoothScroll, title, width, ...props }) => {
  return { ...props, AL_NU982V: newTab ?? props.AL_NU982V, dlVBgpKLv: title ?? props.dlVBgpKLv ?? "Get In Touch", GT109pdEG: link ?? props.GT109pdEG, ovJ6T1ZPP: click ?? props.ovJ6T1ZPP, SD1BGlGhK: smoothScroll ?? props.SD1BGlGhK, variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "vf6JWDf13", YVFZiszrG: border ?? props.YVFZiszrG ?? { borderColor: 'var(--token-a58752c8-168c-47db-857e-906f22f33790, rgba(255, 255, 255, 0.15)) /* {"name":"White 15%"} */', borderStyle: "solid", borderWidth: 3 } };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = /* @__PURE__ */ React2.forwardRef(function(props, ref) {
  const fallbackRef = useRef2(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React2.useId();
  const { activeLocale, setLocale } = useLocaleInfo();
  const componentViewport = useComponentViewport();
  const { style, className: className6, layoutId, variant, dlVBgpKLv, YVFZiszrG, GT109pdEG, AL_NU982V, SD1BGlGhK, ovJ6T1ZPP, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ cycleOrder, defaultVariant: "vf6JWDf13", enabledGestures, ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const { activeVariantCallback, delay } = useActiveVariantCallback(baseVariant);
  const onTap1eptkp0 = activeVariantCallback(async (...args) => {
    setGestureState({ isPressed: false });
    if (ovJ6T1ZPP) {
      const res = await ovJ6T1ZPP(...args);
      if (res === false) return false;
    }
  });
  const sharedStyleClassNames = [className3];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx2(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx2(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx2(Transition, { value: transition1, children: /* @__PURE__ */ _jsx2(Link, { href: GT109pdEG, motionChild: true, nodeId: "vf6JWDf13", openInNewTab: AL_NU982V, scopeId: "GNvaONxX6", smoothScroll: SD1BGlGhK, children: /* @__PURE__ */ _jsx2(motion.a, { ...restProps, ...gestureHandlers, className: `${cx(scopingClassNames, "framer-1nvacmp", className6, classNames)} framer-dd37wi`, "data-border": true, "data-framer-name": "Purple", "data-highlight": true, "data-reset": "button", layoutDependency, layoutId: "vf6JWDf13", onTap: onTap1eptkp0, ref: refBinding, style: { "--border-bottom-width": (YVFZiszrG.borderBottomWidth ?? YVFZiszrG.borderWidth) + "px", "--border-color": YVFZiszrG.borderColor, "--border-left-width": (YVFZiszrG.borderLeftWidth ?? YVFZiszrG.borderWidth) + "px", "--border-right-width": (YVFZiszrG.borderRightWidth ?? YVFZiszrG.borderWidth) + "px", "--border-style": YVFZiszrG.borderStyle, "--border-top-width": (YVFZiszrG.borderTopWidth ?? YVFZiszrG.borderWidth) + "px", background: 'linear-gradient(180deg, var(--token-f951c3a8-aa43-4825-aa75-915aa92c20d1, rgb(79, 26, 214)) /* {"name":"Purple"} */ 0%, rgb(128, 89, 227) 100%)', backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, boxShadow: "0px 0px 0px 0px rgba(79, 26, 214, 0.3)", opacity: 1, ...style }, variants: { "GXXGb1Hah-hover": { opacity: 0.6 }, "vf6JWDf13-hover": { backgroundColor: "rgba(0, 0, 0, 0)", boxShadow: "0px 0px 0px 5px rgba(79, 26, 214, 0.3)" }, "xQAMtyuwR-hover": { opacity: 0.6 }, GXXGb1Hah: { "--border-bottom-width": "0px", "--border-left-width": "0px", "--border-right-width": "0px", "--border-top-width": "0px", background: "linear-gradient(180deg, var(--token-b94732ec-0911-4c64-b592-4d592b668e2d, rgb(239, 238, 236)) 0%, var(--token-b94732ec-0911-4c64-b592-4d592b668e2d, rgb(239, 238, 236)) 100%)", backgroundColor: "var(--token-b94732ec-0911-4c64-b592-4d592b668e2d, rgb(239, 238, 236))", boxShadow: "none" }, xQAMtyuwR: { "--border-bottom-width": "0px", "--border-left-width": "0px", "--border-right-width": "0px", "--border-top-width": "0px", background: "linear-gradient(180deg, var(--token-a58752c8-168c-47db-857e-906f22f33790, rgba(255, 255, 255, 0.15)) 0%, var(--token-a58752c8-168c-47db-857e-906f22f33790, rgba(255, 255, 255, 0.15)) 100%)", backgroundColor: "var(--token-a58752c8-168c-47db-857e-906f22f33790, rgba(255, 255, 255, 0.15))", boxShadow: "none" } }, ...addPropertyOverrides({ "GXXGb1Hah-hover": { "data-framer-name": void 0 }, "vf6JWDf13-hover": { "data-framer-name": void 0 }, "xQAMtyuwR-hover": { "data-framer-name": void 0 }, GXXGb1Hah: { "data-framer-name": "White" }, xQAMtyuwR: { "data-framer-name": "Grey" } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx2(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx2(React2.Fragment, { children: /* @__PURE__ */ _jsx2(motion.p, { className: "framer-styles-preset-2mfvz6", "data-styles-preset": "VqRaec8fA", style: { "--framer-text-color": "var(--extracted-r6o4lv, var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, rgb(255, 255, 255)))" }, children: "Get In Touch" }) }), className: "framer-16xb1fn", "data-framer-name": "Text", fonts: ["Inter"], layoutDependency, layoutId: "gCwS649Ft", style: { "--extracted-r6o4lv": "var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, rgb(255, 255, 255))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: dlVBgpKLv, variants: { "vf6JWDf13-hover": { "--extracted-r6o4lv": "rgb(196, 196, 196)" }, GXXGb1Hah: { "--extracted-r6o4lv": "var(--token-561b3d91-c258-4609-94c9-3cc008fdd628, rgb(19, 19, 19))" } }, verticalAlignment: "top", withExternalLayout: true, ...addPropertyOverrides({ "vf6JWDf13-hover": { children: /* @__PURE__ */ _jsx2(React2.Fragment, { children: /* @__PURE__ */ _jsx2(motion.p, { className: "framer-styles-preset-2mfvz6", "data-styles-preset": "VqRaec8fA", style: { "--framer-text-color": "var(--extracted-r6o4lv, rgb(196, 196, 196))" }, children: "Get In Touch" }) }) }, GXXGb1Hah: { children: /* @__PURE__ */ _jsx2(React2.Fragment, { children: /* @__PURE__ */ _jsx2(motion.p, { className: "framer-styles-preset-2mfvz6", "data-styles-preset": "VqRaec8fA", style: { "--framer-text-color": "var(--extracted-r6o4lv, var(--token-561b3d91-c258-4609-94c9-3cc008fdd628, rgb(19, 19, 19)))" }, children: "Get In Touch" }) }) } }, baseVariant, gestureVariant) }) }) }) }) }) });
});
var css4 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-Il1td.framer-dd37wi, .framer-Il1td .framer-dd37wi { display: block; }", ".framer-Il1td.framer-1nvacmp { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 10px 18px 10px 18px; position: relative; text-decoration: none; width: min-content; will-change: var(--framer-will-change-override, transform); }", ".framer-Il1td .framer-16xb1fn { flex: none; height: auto; position: relative; white-space: pre; width: auto; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-Il1td.framer-1nvacmp { gap: 0px; } .framer-Il1td.framer-1nvacmp > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-Il1td.framer-1nvacmp > :first-child { margin-left: 0px; } .framer-Il1td.framer-1nvacmp > :last-child { margin-right: 0px; } }", ...css3, '.framer-Il1td[data-border="true"]::after, .framer-Il1td [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }'];
var FramerGNvaONxX6 = withCSS(Component, css4, "framer-Il1td");
var GNvaONxX6_default = FramerGNvaONxX6;
FramerGNvaONxX6.displayName = "Button/Primary Button";
FramerGNvaONxX6.defaultProps = { height: 46, width: 124.5 };
addPropertyControls2(FramerGNvaONxX6, { variant: { options: ["vf6JWDf13", "GXXGb1Hah", "xQAMtyuwR"], optionTitles: ["Purple", "White", "Grey"], title: "Variant", type: ControlType2.Enum }, dlVBgpKLv: { defaultValue: "Get In Touch", displayTextArea: true, title: "Title", type: ControlType2.String }, YVFZiszrG: { defaultValue: { borderColor: 'var(--token-a58752c8-168c-47db-857e-906f22f33790, rgba(255, 255, 255, 0.15)) /* {"name":"White 15%"} */', borderStyle: "solid", borderWidth: 3 }, title: "Border", type: ControlType2.Border }, GT109pdEG: { title: "Link", type: ControlType2.Link }, AL_NU982V: { defaultValue: false, title: "New Tab", type: ControlType2.Boolean }, SD1BGlGhK: { defaultValue: false, title: "Smooth Scroll", type: ControlType2.Boolean }, ovJ6T1ZPP: { title: "Click", type: ControlType2.EventHandler } });
addFonts(FramerGNvaONxX6, [{ explicitInter: true, fonts: [{ family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F", url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116", url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+1F00-1FFF", url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0370-03FF", url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF", url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD", url: "https://framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB", url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2", weight: "400" }] }, ...getFontsFromSharedStyle(fonts3)], { supportsExplicitInterCodegen: true });

// http-url:https://framerusercontent.com/modules/kSLgkd6smOggFMlyzk5P/iiWS67P285LEzvDxiUgD/IHYC0Q7Lw.js
import { jsx as _jsx5, jsxs as _jsxs } from "react/jsx-runtime";
import { addFonts as addFonts2, addPropertyControls as addPropertyControls4, ComponentViewportProvider, ControlType as ControlType5, cx as cx2, getFonts, getFontsFromSharedStyle as getFontsFromSharedStyle2, getPropertyControls, RichText as RichText2, SmartComponentScopedContainer, useComponentViewport as useComponentViewport2, useLocaleInfo as useLocaleInfo2, useVariantState as useVariantState2, withCSS as withCSS2, withFX } from "framer";
import { LayoutGroup as LayoutGroup2, motion as motion3, MotionConfigContext as MotionConfigContext2 } from "framer-motion";
import * as React5 from "react";
import { useRef as useRef4 } from "react";

// http-url:https://framerusercontent.com/modules/tYScH7LTqUtz5KUaUAYP/p8dptk4UIND8hbFWz9V7/Phosphor.js
import { jsx as _jsx4 } from "react/jsx-runtime";
import * as React4 from "react";
import { useState as useState2, useEffect as useEffect2, useRef as useRef3 } from "react";
import { addPropertyControls as addPropertyControls3, ControlType as ControlType4, RenderTarget } from "framer";
import { motion as motion2 } from "framer-motion";

// http-url:https://framerusercontent.com/modules/DyldKav0OOAWR3bCAlhK/8c3l9FzyOlGpbPncYhfc/nullstate.js
import { jsx as _jsx3 } from "react/jsx-runtime";
import * as React3 from "react";
var containerStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
var emptyStateStyle = {
  ...containerStyles,
  borderRadius: 6,
  background: "rgba(149, 149, 149, 0.1)",
  border: "1px dashed rgba(149, 149, 149, 0.15)",
  color: "#a5a5a5",
  flexDirection: "column"
};
var NullState = /* @__PURE__ */ React3.forwardRef((_, ref) => {
  return /* @__PURE__ */ _jsx3("div", {
    style: emptyStateStyle,
    ref
  });
});

// http-url:https://framerusercontent.com/modules/Qc8yuHkQmGO0kFiSWbkX/rVmMAFttOHuuiwSg6KjZ/House.js
var Component2;
var IconInner;
var Icon = (React7) => {
  if (!Component2) {
    Component2 = /* @__PURE__ */ new Map([
      [
        "bold",
        /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement("path", { d: "M222.14,105.85l-80-80a20,20,0,0,0-28.28,0l-80,80A19.86,19.86,0,0,0,28,120v96a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V164h24v52a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V120A19.86,19.86,0,0,0,222.14,105.85ZM204,204H164V152a12,12,0,0,0-12-12H104a12,12,0,0,0-12,12v52H52V121.65l76-76,76,76Z" }))
      ],
      [
        "duotone",
        /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement(
          "path",
          {
            d: "M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z",
            opacity: "0.2"
          }
        ), /* @__PURE__ */ React7.createElement("path", { d: "M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z" }))
      ],
      [
        "fill",
        /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement("path", { d: "M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z" }))
      ],
      [
        "light",
        /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement("path", { d: "M217.9,110.1l-80-80a14,14,0,0,0-19.8,0l-80,80A13.92,13.92,0,0,0,34,120v96a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V158h36v58a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V120A13.92,13.92,0,0,0,217.9,110.1ZM210,210H158V152a6,6,0,0,0-6-6H104a6,6,0,0,0-6,6v58H46V120a2,2,0,0,1,.58-1.42l80-80a2,2,0,0,1,2.84,0l80,80A2,2,0,0,1,210,120Z" }))
      ],
      [
        "regular",
        /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement("path", { d: "M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z" }))
      ],
      [
        "thin",
        /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement("path", { d: "M216.49,111.51l-80-80a12,12,0,0,0-17,0l-80,80A12,12,0,0,0,36,120v96a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V156h40v60a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V120A12,12,0,0,0,216.49,111.51ZM212,212H156V152a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4v60H44V120a4,4,0,0,1,1.17-2.83l80-80a4,4,0,0,1,5.66,0l80,80A4,4,0,0,1,212,120Z" }))
      ]
    ]);
    IconInner = React7.forwardRef((props, ref) => /* @__PURE__ */ React7.createElement("g", { ref, ...props }, Component2.get(props.weight)));
  }
  return IconInner;
};
var House_default = Icon;

// http-url:https://framerusercontent.com/modules/Ma20hU0GGRxLxZphbywl/OSpwWF91FHPVFyQJjMHt/utils.js
import { useMemo as useMemo3 } from "react";
import { ControlType as ControlType3 } from "framer";
var defaultEvents = { onClick: { type: ControlType3.EventHandler }, onMouseDown: { type: ControlType3.EventHandler }, onMouseUp: { type: ControlType3.EventHandler }, onMouseEnter: { type: ControlType3.EventHandler }, onMouseLeave: { type: ControlType3.EventHandler } };
var findByArray = (arr, search) => arr.find((a) => a.toLowerCase().includes(search));
function useIconSelection(iconKeys2, selectByList, iconSearch = "", iconSelection, lowercaseIconKeyPairs2) {
  const iconSearchResult = useMemo3(() => {
    if (iconSearch == null || (iconSearch === null || iconSearch === void 0 ? void 0 : iconSearch.length) === 0) return null;
    const iconSearchTerm = iconSearch.toLowerCase().replace(/-|\s/g, "");
    var _iconSearchTerm;
    const searchResult = (_iconSearchTerm = lowercaseIconKeyPairs2[iconSearchTerm]) !== null && _iconSearchTerm !== void 0 ? _iconSearchTerm : findByArray(iconKeys2, iconSearchTerm);
    return searchResult;
  }, [iconSelection, iconSearch]);
  const name = selectByList ? iconSelection : iconSearchResult;
  return name;
}

// http-url:https://framerusercontent.com/modules/tYScH7LTqUtz5KUaUAYP/p8dptk4UIND8hbFWz9V7/Phosphor.js
var iconKeys = ["Acorn", "AddressBook", "AddressBookTabs", "AirTrafficControl", "Airplane", "AirplaneInFlight", "AirplaneLanding", "AirplaneTakeoff", "AirplaneTaxiing", "AirplaneTilt", "Airplay", "Alarm", "Alien", "AlignBottom", "AlignBottomSimple", "AlignCenterVertical", "AlignLeft", "AlignLeftSimple", "AlignRight", "AlignRightSimple", "AlignTop", "AlignTopSimple", "AmazonLogo", "Ambulance", "Anchor", "AnchorSimple", "AndroidLogo", "Angle", "AngularLogo", "Aperture", "AppStoreLogo", "AppWindow", "AppleLogo", "ApplePodcastsLogo", "ApproximateEquals", "Archive", "ArchiveBox", "ArchiveTray", "Armchair", "ArrowArcLeft", "ArrowArcRight", "ArrowBendDownLeft", "ArrowBendDownRight", "ArrowBendLeftDown", "ArrowBendLeftUp", "ArrowBendRightDown", "ArrowBendRightUp", "ArrowBendUpLeft", "ArrowBendUpRight", "ArrowCircleDown", "ArrowCircleDownLeft", "ArrowCircleDownRight", "ArrowCircleLeft", "ArrowCircleRight", "ArrowCircleUp", "ArrowCircleUpLeft", "ArrowCircleUpRight", "ArrowClockwise", "ArrowDown", "ArrowDownLeft", "ArrowDownRight", "ArrowElbowDownLeft", "ArrowElbowDownRight", "ArrowElbowLeft", "ArrowElbowLeftDown", "ArrowElbowLeftUp", "ArrowElbowRight", "ArrowElbowRightDown", "ArrowElbowRightUp", "ArrowElbowUpLeft", "ArrowElbowUpRight", "ArrowFatDown", "ArrowFatLeft", "ArrowFatLineDown", "ArrowFatLineLeft", "ArrowFatLineRight", "ArrowFatLineUp", "ArrowFatLinesDown", "ArrowFatLinesLeft", "ArrowFatLinesRight", "ArrowFatLinesUp", "ArrowFatRight", "ArrowFatUp", "ArrowLeft", "ArrowLineDown", "ArrowLineDownLeft", "ArrowLineDownRight", "ArrowLineLeft", "ArrowLineRight", "ArrowLineUp", "ArrowLineUpLeft", "ArrowLineUpRight", "ArrowRight", "ArrowSquareDown", "ArrowSquareDownLeft", "ArrowSquareDownRight", "ArrowSquareIn", "ArrowSquareLeft", "ArrowSquareOut", "ArrowSquareRight", "ArrowSquareUp", "ArrowSquareUpLeft", "ArrowSquareUpRight", "ArrowUDownLeft", "ArrowUDownRight", "ArrowULeftDown", "ArrowULeftUp", "ArrowURightDown", "ArrowURightUp", "ArrowUUpLeft", "ArrowUUpRight", "ArrowUp", "ArrowUpLeft", "ArrowUpRight", "ArrowsClockwise", "ArrowsDownUp", "ArrowsHorizontal", "ArrowsIn", "ArrowsInCardinal", "ArrowsInLineVertical", "ArrowsInSimple", "ArrowsLeftRight", "ArrowsMerge", "ArrowsOut", "ArrowsOutCardinal", "ArrowsOutSimple", "ArrowsSplit", "ArrowsVertical", "Article", "ArticleMedium", "ArticleNyTimes", "Asclepius", "Asterisk", "AsteriskSimple", "At", "Atom", "Avocado", "Axe", "Baby", "BabyCarriage", "Backpack", "Backspace", "Bag", "BagSimple", "Balloon", "Bandaids", "Bank", "Barbell", "Barcode", "Barn", "Barricade", "Baseball", "BaseballCap", "BaseballHelmet", "Basket", "Basketball", "Bathtub", "BatteryCharging", "BatteryEmpty", "BatteryFull", "BatteryHigh", "BatteryLow", "BatteryMedium", "BatteryPlus", "BatteryPlusVertical", "BatteryVerticalEmpty", "BatteryVerticalFull", "BatteryVerticalHigh", "BatteryVerticalLow", "BatteryWarning", "BeachBall", "Beanie", "Bed", "BeerBottle", "BeerStein", "BehanceLogo", "Bell", "BellRinging", "BellSimple", "BellSimpleRinging", "BellSimpleSlash", "BellSimpleZ", "BellSlash", "BellZ", "Belt", "BezierCurve", "Bicycle", "Binary", "Binoculars", "Biohazard", "Bird", "Blueprint", "Bluetooth", "BluetoothConnected", "BluetoothSlash", "BluetoothX", "Boat", "Bomb", "Bone", "Book", "BookBookmark", "BookOpen", "BookOpenText", "BookOpenUser", "BookUser", "Bookmark", "BookmarkSimple", "Bookmarks", "BookmarksSimple", "Books", "Boot", "Boules", "BoundingBox", "BowlFood", "BowlSteam", "BowlingBall", "BoxArrowDown", "BoxArrowUp", "BoxingGlove", "BracketsAngle", "BracketsCurly", "BracketsRound", "BracketsSquare", "Brain", "Brandy", "Bread", "Bridge", "Briefcase", "BriefcaseMetal", "Broadcast", "Broom", "Browser", "Browsers", "Bug", "BugBeetle", "BugDroid", "Building", "BuildingApartment", "BuildingOffice", "Buildings", "Bulldozer", "Bus", "Butterfly", "CableCar", "Cactus", "Cake", "Calculator", "Calendar", "CalendarBlank", "CalendarCheck", "CalendarDot", "CalendarDots", "CalendarHeart", "CalendarMinus", "CalendarPlus", "CalendarSlash", "CalendarStar", "CalendarX", "CallBell", "Camera", "CameraPlus", "CameraRotate", "CameraSlash", "Campfire", "Car", "CarBattery", "CarProfile", "CarSimple", "Cardholder", "Cards", "CardsThree", "CaretCircleDoubleUp", "CaretCircleDown", "CaretCircleLeft", "CaretCircleRight", "CaretCircleUp", "CaretCircleUpDown", "CaretDoubleDown", "CaretDoubleLeft", "CaretDoubleRight", "CaretDoubleUp", "CaretDown", "CaretLeft", "CaretLineDown", "CaretLineLeft", "CaretLineRight", "CaretLineUp", "CaretRight", "CaretUp", "CaretUpDown", "Carrot", "CashRegister", "CassetteTape", "CastleTurret", "Cat", "CellSignalFull", "CellSignalHigh", "CellSignalLow", "CellSignalMedium", "CellSignalNone", "CellSignalSlash", "CellSignalX", "CellTower", "Certificate", "Chair", "Chalkboard", "ChalkboardSimple", "ChalkboardTeacher", "Champagne", "ChargingStation", "ChartBar", "ChartBarHorizontal", "ChartDonut", "ChartLine", "ChartLineDown", "ChartLineUp", "ChartPie", "ChartPieSlice", "ChartPolar", "ChartScatter", "Chat", "ChatCentered", "ChatCenteredDots", "ChatCenteredSlash", "ChatCenteredText", "ChatCircle", "ChatCircleDots", "ChatCircleSlash", "ChatCircleText", "ChatDots", "ChatSlash", "ChatTeardrop", "ChatTeardropDots", "ChatTeardropSlash", "ChatTeardropText", "ChatText", "Chats", "ChatsCircle", "ChatsTeardrop", "Check", "CheckCircle", "CheckFat", "CheckSquare", "CheckSquareOffset", "Checkerboard", "Checks", "Cheers", "Cheese", "ChefHat", "Cherries", "Church", "Cigarette", "CigaretteSlash", "Circle", "CircleDashed", "CircleHalf", "CircleHalfTilt", "CircleNotch", "CirclesFour", "CirclesThree", "CirclesThreePlus", "Circuitry", "City", "Clipboard", "ClipboardText", "Clock", "ClockAfternoon", "ClockClockwise", "ClockCountdown", "ClockUser", "ClosedCaptioning", "Cloud", "CloudArrowDown", "CloudArrowUp", "CloudCheck", "CloudFog", "CloudLightning", "CloudMoon", "CloudRain", "CloudSlash", "CloudSnow", "CloudSun", "CloudWarning", "CloudX", "Clover", "Club", "CoatHanger", "CodaLogo", "Code", "CodeBlock", "CodeSimple", "CodepenLogo", "CodesandboxLogo", "Coffee", "CoffeeBean", "Coin", "CoinVertical", "Coins", "Columns", "ColumnsPlusLeft", "ColumnsPlusRight", "Command", "Compass", "CompassRose", "CompassTool", "ComputerTower", "Confetti", "ContactlessPayment", "Control", "Cookie", "CookingPot", "Copy", "CopySimple", "Copyleft", "Copyright", "CornersIn", "CornersOut", "Couch", "CourtBasketball", "Cow", "CowboyHat", "Cpu", "Crane", "CraneTower", "CreditCard", "Cricket", "Crop", "Cross", "Crosshair", "CrosshairSimple", "Crown", "CrownCross", "CrownSimple", "Cube", "CubeFocus", "CubeTransparent", "CurrencyBtc", "CurrencyCircleDollar", "CurrencyCny", "CurrencyDollar", "CurrencyDollarSimple", "CurrencyEth", "CurrencyEur", "CurrencyGbp", "CurrencyInr", "CurrencyJpy", "CurrencyKrw", "CurrencyKzt", "CurrencyNgn", "CurrencyRub", "Cursor", "CursorClick", "CursorText", "Cylinder", "Database", "Desk", "Desktop", "DesktopTower", "Detective", "DevToLogo", "DeviceMobile", "DeviceMobileCamera", "DeviceMobileSlash", "DeviceMobileSpeaker", "DeviceRotate", "DeviceTablet", "DeviceTabletCamera", "DeviceTabletSpeaker", "Devices", "Diamond", "DiamondsFour", "DiceFive", "DiceFour", "DiceOne", "DiceSix", "DiceThree", "DiceTwo", "Disc", "DiscoBall", "DiscordLogo", "Divide", "Dna", "Dog", "Door", "DoorOpen", "Dot", "DotOutline", "DotsNine", "DotsSix", "DotsSixVertical", "DotsThree", "DotsThreeCircle", "DotsThreeOutline", "DotsThreeVertical", "Download", "DownloadSimple", "Dress", "Dresser", "DribbbleLogo", "Drone", "Drop", "DropHalf", "DropHalfBottom", "DropSimple", "DropSlash", "DropboxLogo", "Ear", "EarSlash", "Egg", "EggCrack", "Eject", "EjectSimple", "Elevator", "Empty", "Engine", "Envelope", "EnvelopeOpen", "EnvelopeSimple", "EnvelopeSimpleOpen", "Equalizer", "Equals", "Eraser", "EscalatorDown", "EscalatorUp", "Exam", "ExclamationMark", "Exclude", "ExcludeSquare", "Export", "Eye", "EyeClosed", "EyeSlash", "Eyedropper", "EyedropperSample", "Eyeglasses", "Eyes", "FaceMask", "FacebookLogo", "Factory", "Faders", "FadersHorizontal", "FalloutShelter", "Fan", "Farm", "FastForward", "FastForwardCircle", "Feather", "FediverseLogo", "FigmaLogo", "File", "FileArchive", "FileArrowDown", "FileArrowUp", "FileAudio", "FileC", "FileCloud", "FileCode", "FileCpp", "FileCss", "FileCsv", "FileDashed", "FileDoc", "FileHtml", "FileImage", "FileIni", "FileJpg", "FileJs", "FileJsx", "FileLock", "FileMagnifyingGlass", "FileMd", "FileMinus", "FilePdf", "FilePlus", "FilePng", "FilePpt", "FilePy", "FileRs", "FileSql", "FileSvg", "FileText", "FileTs", "FileTsx", "FileTxt", "FileVideo", "FileVue", "FileX", "FileXls", "FileZip", "Files", "FilmReel", "FilmScript", "FilmSlate", "FilmStrip", "Fingerprint", "FingerprintSimple", "FinnTheHuman", "Fire", "FireExtinguisher", "FireSimple", "FireTruck", "FirstAid", "FirstAidKit", "Fish", "FishSimple", "Flag", "FlagBanner", "FlagBannerFold", "FlagCheckered", "FlagPennant", "Flame", "Flashlight", "Flask", "FlipHorizontal", "FlipVertical", "FloppyDisk", "FloppyDiskBack", "FlowArrow", "Flower", "FlowerLotus", "FlowerTulip", "FlyingSaucer", "Folder", "FolderDashed", "FolderLock", "FolderMinus", "FolderNotch", "FolderNotchMinus", "FolderNotchOpen", "FolderNotchPlus", "FolderOpen", "FolderPlus", "FolderSimple", "FolderSimpleDashed", "FolderSimpleLock", "FolderSimpleMinus", "FolderSimplePlus", "FolderSimpleStar", "FolderSimpleUser", "FolderStar", "FolderUser", "Folders", "Football", "FootballHelmet", "Footprints", "ForkKnife", "FourK", "FrameCorners", "FramerLogo", "Function", "Funnel", "FunnelSimple", "FunnelSimpleX", "FunnelX", "GameController", "Garage", "GasCan", "GasPump", "Gauge", "Gavel", "Gear", "GearFine", "GearSix", "GenderFemale", "GenderIntersex", "GenderMale", "GenderNeuter", "GenderNonbinary", "GenderTransgender", "Ghost", "Gif", "Gift", "GitBranch", "GitCommit", "GitDiff", "GitFork", "GitMerge", "GitPullRequest", "GithubLogo", "GitlabLogo", "GitlabLogoSimple", "Globe", "GlobeHemisphereEast", "GlobeHemisphereWest", "GlobeSimple", "GlobeSimpleX", "GlobeStand", "GlobeX", "Goggles", "Golf", "GoodreadsLogo", "GoogleCardboardLogo", "GoogleChromeLogo", "GoogleDriveLogo", "GoogleLogo", "GooglePhotosLogo", "GooglePlayLogo", "GooglePodcastsLogo", "Gps", "GpsFix", "GpsSlash", "Gradient", "GraduationCap", "Grains", "GrainsSlash", "Graph", "GraphicsCard", "GreaterThan", "GreaterThanOrEqual", "GridFour", "GridNine", "Guitar", "HairDryer", "Hamburger", "Hammer", "Hand", "HandArrowDown", "HandArrowUp", "HandCoins", "HandDeposit", "HandEye", "HandFist", "HandGrabbing", "HandHeart", "HandPalm", "HandPeace", "HandPointing", "HandSoap", "HandSwipeLeft", "HandSwipeRight", "HandTap", "HandWaving", "HandWithdraw", "Handbag", "HandbagSimple", "HandsClapping", "HandsPraying", "Handshake", "HardDrive", "HardDrives", "HardHat", "Hash", "HashStraight", "HeadCircuit", "Headlights", "Headphones", "Headset", "Heart", "HeartBreak", "HeartHalf", "HeartStraight", "HeartStraightBreak", "Heartbeat", "Hexagon", "HighDefinition", "HighHeel", "Highlighter", "HighlighterCircle", "Hockey", "Hoodie", "Horse", "Hospital", "Hourglass", "HourglassHigh", "HourglassLow", "HourglassMedium", "HourglassSimple", "HourglassSimpleHigh", "HourglassSimpleLow", "House", "HouseLine", "HouseSimple", "Hurricane", "IceCream", "IdentificationBadge", "IdentificationCard", "Image", "ImageBroken", "ImageSquare", "Images", "ImagesSquare", "Infinity", "Info", "InstagramLogo", "Intersect", "IntersectSquare", "IntersectThree", "Intersection", "Invoice", "Island", "Jar", "JarLabel", "Jeep", "Joystick", "Kanban", "Key", "KeyReturn", "Keyboard", "Keyhole", "Knife", "Ladder", "LadderSimple", "Lamp", "LampPendant", "Laptop", "Lasso", "LastfmLogo", "Layout", "Leaf", "Lectern", "Lego", "LegoSmiley", "LessThan", "LessThanOrEqual", "LetterCircleH", "LetterCircleP", "LetterCircleV", "Lifebuoy", "Lightbulb", "LightbulbFilament", "Lighthouse", "Lightning", "LightningA", "LightningSlash", "LineSegment", "LineSegments", "LineVertical", "Link", "LinkBreak", "LinkSimple", "LinkSimpleBreak", "LinkSimpleHorizontal", "LinkedinLogo", "LinktreeLogo", "LinuxLogo", "List", "ListBullets", "ListChecks", "ListDashes", "ListHeart", "ListMagnifyingGlass", "ListNumbers", "ListPlus", "ListStar", "Lock", "LockKey", "LockKeyOpen", "LockLaminated", "LockLaminatedOpen", "LockOpen", "LockSimple", "LockSimpleOpen", "Lockers", "Log", "MagicWand", "Magnet", "MagnetStraight", "MagnifyingGlass", "MagnifyingGlassMinus", "MagnifyingGlassPlus", "Mailbox", "MapPin", "MapPinArea", "MapPinLine", "MapPinPlus", "MapPinSimple", "MapPinSimpleArea", "MapPinSimpleLine", "MapTrifold", "MarkdownLogo", "MarkerCircle", "Martini", "MaskHappy", "MaskSad", "MastodonLogo", "MathOperations", "MatrixLogo", "Medal", "MedalMilitary", "MediumLogo", "Megaphone", "MegaphoneSimple", "MemberOf", "Memory", "MessengerLogo", "MetaLogo", "Meteor", "Metronome", "Microphone", "MicrophoneSlash", "MicrophoneStage", "Microscope", "MicrosoftExcelLogo", "MicrosoftOutlookLogo", "MicrosoftTeamsLogo", "MicrosoftWordLogo", "Minus", "MinusCircle", "MinusSquare", "Money", "MoneyWavy", "Monitor", "MonitorArrowUp", "MonitorPlay", "Moon", "MoonStars", "Moped", "MopedFront", "Mosque", "Motorcycle", "Mountains", "Mouse", "MouseLeftClick", "MouseMiddleClick", "MouseRightClick", "MouseScroll", "MouseSimple", "MusicNote", "MusicNoteSimple", "MusicNotes", "MusicNotesMinus", "MusicNotesPlus", "MusicNotesSimple", "NavigationArrow", "Needle", "Network", "NetworkSlash", "NetworkX", "Newspaper", "NewspaperClipping", "NotEquals", "NotMemberOf", "NotSubsetOf", "NotSupersetOf", "Notches", "Note", "NoteBlank", "NotePencil", "Notebook", "Notepad", "Notification", "NotionLogo", "NuclearPlant", "NumberCircleEight", "NumberCircleFive", "NumberCircleFour", "NumberCircleNine", "NumberCircleOne", "NumberCircleSeven", "NumberCircleSix", "NumberCircleThree", "NumberCircleTwo", "NumberCircleZero", "NumberEight", "NumberFive", "NumberFour", "NumberNine", "NumberOne", "NumberSeven", "NumberSix", "NumberSquareEight", "NumberSquareFive", "NumberSquareFour", "NumberSquareNine", "NumberSquareOne", "NumberSquareSeven", "NumberSquareSix", "NumberSquareThree", "NumberSquareTwo", "NumberSquareZero", "NumberThree", "NumberTwo", "NumberZero", "Numpad", "Nut", "NyTimesLogo", "Octagon", "OfficeChair", "Onigiri", "OpenAiLogo", "Option", "Orange", "OrangeSlice", "Oven", "Package", "PaintBrush", "PaintBrushBroad", "PaintBrushHousehold", "PaintBucket", "PaintRoller", "Palette", "Panorama", "Pants", "PaperPlane", "PaperPlaneRight", "PaperPlaneTilt", "Paperclip", "PaperclipHorizontal", "Parachute", "Paragraph", "Parallelogram", "Park", "Password", "Path", "PatreonLogo", "Pause", "PauseCircle", "PawPrint", "PaypalLogo", "Peace", "Pen", "PenNib", "PenNibStraight", "Pencil", "PencilCircle", "PencilLine", "PencilRuler", "PencilSimple", "PencilSimpleLine", "PencilSimpleSlash", "PencilSlash", "Pentagon", "Pentagram", "Pepper", "Percent", "Person", "PersonArmsSpread", "PersonSimple", "PersonSimpleBike", "PersonSimpleCircle", "PersonSimpleHike", "PersonSimpleRun", "PersonSimpleSki", "PersonSimpleSwim", "PersonSimpleTaiChi", "PersonSimpleThrow", "PersonSimpleWalk", "Perspective", "Phone", "PhoneCall", "PhoneDisconnect", "PhoneIncoming", "PhoneList", "PhoneOutgoing", "PhonePause", "PhonePlus", "PhoneSlash", "PhoneTransfer", "PhoneX", "PhosphorLogo", "Pi", "PianoKeys", "PicnicTable", "PictureInPicture", "PiggyBank", "Pill", "PingPong", "PintGlass", "PinterestLogo", "Pinwheel", "Pipe", "PipeWrench", "PixLogo", "Pizza", "Placeholder", "Planet", "Plant", "Play", "PlayCircle", "PlayPause", "Playlist", "Plug", "PlugCharging", "Plugs", "PlugsConnected", "Plus", "PlusCircle", "PlusMinus", "PlusSquare", "PokerChip", "PoliceCar", "Polygon", "Popcorn", "Popsicle", "PottedPlant", "Power", "Prescription", "Presentation", "PresentationChart", "Printer", "Prohibit", "ProhibitInset", "ProjectorScreen", "ProjectorScreenChart", "Pulse", "PushPin", "PushPinSimple", "PushPinSimpleSlash", "PushPinSlash", "PuzzlePiece", "QrCode", "Question", "QuestionMark", "Queue", "Quotes", "Rabbit", "Racquet", "Radical", "Radio", "RadioButton", "Radioactive", "Rainbow", "RainbowCloud", "Ranking", "ReadCvLogo", "Receipt", "ReceiptX", "Record", "Rectangle", "RectangleDashed", "Recycle", "RedditLogo", "Repeat", "RepeatOnce", "ReplitLogo", "Resize", "Rewind", "RewindCircle", "RoadHorizon", "Robot", "Rocket", "RocketLaunch", "Rows", "RowsPlusBottom", "RowsPlusTop", "Rss", "RssSimple", "Rug", "Ruler", "Sailboat", "Scales", "Scan", "ScanSmiley", "Scissors", "Scooter", "Screencast", "Screwdriver", "Scribble", "ScribbleLoop", "Scroll", "Seal", "SealCheck", "SealPercent", "SealQuestion", "SealWarning", "Seat", "Seatbelt", "SecurityCamera", "Selection", "SelectionAll", "SelectionBackground", "SelectionForeground", "SelectionInverse", "SelectionPlus", "SelectionSlash", "Shapes", "Share", "ShareFat", "ShareNetwork", "Shield", "ShieldCheck", "ShieldCheckered", "ShieldChevron", "ShieldPlus", "ShieldSlash", "ShieldStar", "ShieldWarning", "ShippingContainer", "ShirtFolded", "ShootingStar", "ShoppingBag", "ShoppingBagOpen", "ShoppingCart", "ShoppingCartSimple", "Shovel", "Shower", "Shrimp", "Shuffle", "ShuffleAngular", "ShuffleSimple", "Sidebar", "SidebarSimple", "Sigma", "SignIn", "SignOut", "Signature", "Signpost", "SimCard", "Siren", "SketchLogo", "SkipBack", "SkipBackCircle", "SkipForward", "SkipForwardCircle", "Skull", "SkypeLogo", "SlackLogo", "Sliders", "SlidersHorizontal", "Slideshow", "Smiley", "SmileyAngry", "SmileyBlank", "SmileyMeh", "SmileyMelting", "SmileyNervous", "SmileySad", "SmileySticker", "SmileyWink", "SmileyXEyes", "SnapchatLogo", "Sneaker", "SneakerMove", "Snowflake", "SoccerBall", "Sock", "SolarPanel", "SolarRoof", "SortAscending", "SortDescending", "SoundcloudLogo", "Spade", "Sparkle", "SpeakerHifi", "SpeakerHigh", "SpeakerLow", "SpeakerNone", "SpeakerSimpleHigh", "SpeakerSimpleLow", "SpeakerSimpleNone", "SpeakerSimpleSlash", "SpeakerSimpleX", "SpeakerSlash", "SpeakerX", "Speedometer", "Sphere", "Spinner", "SpinnerBall", "SpinnerGap", "Spiral", "SplitHorizontal", "SplitVertical", "SpotifyLogo", "SprayBottle", "Square", "SquareHalf", "SquareHalfBottom", "SquareLogo", "SquareSplitVertical", "SquaresFour", "Stack", "StackMinus", "StackOverflowLogo", "StackPlus", "StackSimple", "Stairs", "Stamp", "StandardDefinition", "Star", "StarAndCrescent", "StarFour", "StarHalf", "StarOfDavid", "SteamLogo", "SteeringWheel", "Steps", "Stethoscope", "Sticker", "Stool", "Stop", "StopCircle", "Storefront", "Strategy", "StripeLogo", "Student", "SubsetOf", "SubsetProperOf", "Subtitles", "SubtitlesSlash", "Subtract", "SubtractSquare", "Subway", "Suitcase", "SuitcaseRolling", "SuitcaseSimple", "Sun", "SunDim", "SunHorizon", "Sunglasses", "SupersetOf", "SupersetProperOf", "Swap", "Swatches", "SwimmingPool", "Sword", "Synagogue", "Syringe", "TShirt", "Table", "Tabs", "Tag", "TagChevron", "TagSimple", "Target", "Taxi", "TeaBag", "TelegramLogo", "Television", "TelevisionSimple", "TennisBall", "Tent", "Terminal", "TerminalWindow", "TestTube", "TextAUnderline", "TextAa", "TextAlignCenter", "TextAlignJustify", "TextAlignLeft", "TextAlignRight", "TextB", "TextColumns", "TextH", "TextHFive", "TextHFour", "TextHOne", "TextHSix", "TextHThree", "TextHTwo", "TextIndent", "TextItalic", "TextOutdent", "TextStrikethrough", "TextSubscript", "TextSuperscript", "TextT", "TextTSlash", "TextUnderline", "Textbox", "Thermometer", "ThermometerCold", "ThermometerHot", "ThermometerSimple", "ThreadsLogo", "ThreeD", "ThumbsDown", "ThumbsUp", "Ticket", "TidalLogo", "TiktokLogo", "Tilde", "Timer", "TipJar", "Tipi", "Tire", "ToggleLeft", "ToggleRight", "Toilet", "ToiletPaper", "Toolbox", "Tooth", "Tornado", "Tote", "ToteSimple", "Towel", "Tractor", "Trademark", "TrademarkRegistered", "TrafficCone", "TrafficSign", "TrafficSignal", "Train", "TrainRegional", "TrainSimple", "Tram", "Translate", "Trash", "TrashSimple", "Tray", "TrayArrowDown", "TrayArrowUp", "TreasureChest", "Tree", "TreeEvergreen", "TreePalm", "TreeStructure", "TreeView", "TrendDown", "TrendUp", "Triangle", "TriangleDashed", "Trolley", "TrolleySuitcase", "Trophy", "Truck", "TruckTrailer", "TumblrLogo", "TwitchLogo", "TwitterLogo", "Umbrella", "UmbrellaSimple", "Union", "Unite", "UniteSquare", "Upload", "UploadSimple", "Usb", "User", "UserCheck", "UserCircle", "UserCircleCheck", "UserCircleDashed", "UserCircleGear", "UserCircleMinus", "UserCirclePlus", "UserFocus", "UserGear", "UserList", "UserMinus", "UserPlus", "UserRectangle", "UserSound", "UserSquare", "UserSwitch", "Users", "UsersFour", "UsersThree", "Van", "Vault", "VectorThree", "VectorTwo", "Vibrate", "Video", "VideoCamera", "VideoCameraSlash", "VideoConference", "Vignette", "VinylRecord", "VirtualReality", "Virus", "Visor", "Voicemail", "Volleyball", "Wall", "Wallet", "Warehouse", "Warning", "WarningCircle", "WarningDiamond", "WarningOctagon", "WashingMachine", "Watch", "WaveSawtooth", "WaveSine", "WaveSquare", "WaveTriangle", "Waveform", "WaveformSlash", "Waves", "Webcam", "WebcamSlash", "WebhooksLogo", "WechatLogo", "WhatsappLogo", "Wheelchair", "WheelchairMotion", "WifiHigh", "WifiLow", "WifiMedium", "WifiNone", "WifiSlash", "WifiX", "Wind", "Windmill", "WindowsLogo", "Wine", "Wrench", "X", "XCircle", "XLogo", "XSquare", "Yarn", "YinYang", "YoutubeLogo"];
var moduleBaseUrl = "https://framer.com/m/phosphor-icons/";
var weightOptions = ["thin", "light", "regular", "bold", "fill", "duotone"];
var lowercaseIconKeyPairs = iconKeys.reduce((res, key) => {
  res[key.toLowerCase()] = key;
  return res;
}, {});
function Icon2(props) {
  const { color, selectByList, iconSearch, iconSelection, onClick, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave, weight, mirrored } = props;
  const isMounted = useRef3(false);
  const iconKey = useIconSelection(iconKeys, selectByList, iconSearch, iconSelection, lowercaseIconKeyPairs);
  const [SelectedIcon, setSelectedIcon] = useState2(iconKey === "Home" ? House_default(React4) : null);
  async function importModule() {
    try {
      const version = "0.0.57";
      const iconModuleUrl = `${moduleBaseUrl}${iconKey}.js@${version}`;
      const module = await import(
        /* webpackIgnore: true */
        iconModuleUrl
      );
      if (isMounted.current) setSelectedIcon(module.default(React4));
    } catch (err) {
      if (isMounted.current) setSelectedIcon(null);
    }
  }
  useEffect2(() => {
    isMounted.current = true;
    importModule();
    return () => {
      isMounted.current = false;
    };
  }, [iconKey]);
  const isOnCanvas = RenderTarget.current() === RenderTarget.canvas;
  const emptyState = isOnCanvas ? /* @__PURE__ */ _jsx4(NullState, {}) : null;
  return /* @__PURE__ */ _jsx4(motion2.div, { style: { display: "contents" }, onClick, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, children: SelectedIcon ? /* @__PURE__ */ _jsx4("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256", style: { userSelect: "none", width: "100%", height: "100%", display: "inline-block", fill: color, color, flexShrink: 0, transform: mirrored ? "scale(-1, 1)" : void 0 }, focusable: "false", color, children: /* @__PURE__ */ _jsx4(SelectedIcon, { color, weight }) }) : emptyState });
}
Icon2.displayName = "Phosphor";
Icon2.defaultProps = { width: 24, height: 24, iconSelection: "House", iconSearch: "House", color: "#66F", selectByList: true, weight: "regular", mirrored: false };
addPropertyControls3(Icon2, { selectByList: { type: ControlType4.Boolean, title: "Select", enabledTitle: "List", disabledTitle: "Search", defaultValue: Icon2.defaultProps.selectByList }, iconSelection: { type: ControlType4.Enum, options: iconKeys, defaultValue: Icon2.defaultProps.iconSelection, title: "Name", hidden: ({ selectByList }) => !selectByList, description: "Find every icon name on the [Phosphor site](https://phosphoricons.com/)" }, iconSearch: { type: ControlType4.String, title: "Name", placeholder: "Menu, Wifi, Box\u2026", hidden: ({ selectByList }) => selectByList }, color: { type: ControlType4.Color, title: "Color", defaultValue: Icon2.defaultProps.color }, weight: { type: ControlType4.Enum, title: "Weight", optionTitles: weightOptions.map((piece) => piece.charAt(0).toUpperCase() + piece.slice(1)), options: weightOptions, defaultValue: Icon2.defaultProps.weight }, mirrored: { type: ControlType4.Boolean, enabledTitle: "Yes", disabledTitle: "No", defaultValue: Icon2.defaultProps.mirrored }, ...defaultEvents });

// http-url:https://framerusercontent.com/modules/bTqvufx0gRY8qEVPqNG5/R8utAOIoAdyJHW6OOWlO/qScbNYtt3.js
import { fontStore as fontStore4 } from "framer";
fontStore4.loadFonts(["GF;DM Sans-regular", "GF;DM Sans-700", "GF;DM Sans-700italic", "GF;DM Sans-italic"]);
var fonts4 = [{ explicitInter: true, fonts: [{ family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhS2f3ZGMZpg.woff2", weight: "400" }, { family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthS2f3ZGMZpg.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm32RmYJpso5.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDW32RmYJpso5.woff2", weight: "400" }] }];
var css5 = ['.framer-ykD7l .framer-styles-preset-m6m3zm:not(.rich-text-wrapper), .framer-ykD7l .framer-styles-preset-m6m3zm.rich-text-wrapper p { --framer-font-family: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 16px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 400; --framer-font-weight-bold: 700; --framer-font-weight-bold-italic: 700; --framer-font-weight-italic: 400; --framer-letter-spacing: -0.5px; --framer-line-height: 26px; --framer-paragraph-spacing: 0px; --framer-text-alignment: start; --framer-text-color: var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }'];
var className4 = "framer-ykD7l";

// http-url:https://framerusercontent.com/modules/ArhHVj2Ne5v5i78dEeVS/Ebf6cZ2ScyHi8gLkKfWg/sQbLphIaJ.js
import { fontStore as fontStore5 } from "framer";
fontStore5.loadFonts(["GF;DM Sans-700", "GF;DM Sans-900", "GF;DM Sans-900italic", "GF;DM Sans-700italic"]);
var fonts5 = [{ explicitInter: true, fonts: [{ family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthS2f3ZGMZpg.woff2", weight: "700" }, { family: "DM Sans", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAC5thS2f3ZGMZpg.woff2", weight: "900" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8gCm32RmYJpso5.woff2", weight: "900" }, { family: "DM Sans", source: "google", style: "italic", url: "https://fonts.gstatic.com/s/dmsans/v15/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm32RmYJpso5.woff2", weight: "700" }] }];
var css6 = ['.framer-Z5paO .framer-styles-preset-1mywhy3:not(.rich-text-wrapper), .framer-Z5paO .framer-styles-preset-1mywhy3.rich-text-wrapper p { --framer-font-family: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-family-bold: "DM Sans", sans-serif; --framer-font-family-bold-italic: "DM Sans", sans-serif; --framer-font-family-italic: "DM Sans", "DM Sans Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 12px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 700; --framer-font-weight-bold: 900; --framer-font-weight-bold-italic: 900; --framer-font-weight-italic: 700; --framer-letter-spacing: -0.5px; --framer-line-height: 10px; --framer-paragraph-spacing: 0px; --framer-text-alignment: start; --framer-text-color: var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }'];
var className5 = "framer-Z5paO";

// http-url:https://framerusercontent.com/modules/kSLgkd6smOggFMlyzk5P/iiWS67P285LEzvDxiUgD/IHYC0Q7Lw.js
var PhosphorFonts = getFonts(Icon2);
var MotionDivWithFX = withFX(motion3.div);
var PhosphorControls = getPropertyControls(Icon2);
var cycleOrder2 = ["AksRoqhcS", "axDSKQZXP", "gNstPdAkh", "KsCSAInQk", "WXhecYaG5"];
var serializationHash2 = "framer-JAedJ";
var variantClassNames2 = { AksRoqhcS: "framer-v-9xh6r2", axDSKQZXP: "framer-v-1neujbl", gNstPdAkh: "framer-v-1j9m4ta", KsCSAInQk: "framer-v-17087j1", WXhecYaG5: "framer-v-1az82xx" };
function addPropertyOverrides2(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition12 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var Transition2 = ({ value, children }) => {
  const config = React5.useContext(MotionConfigContext2);
  const transition = value ?? config.transition;
  const contextValue = React5.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx5(MotionConfigContext2.Provider, { value: contextValue, children });
};
var Variants2 = motion3.create(React5.Fragment);
var humanReadableVariantMap2 = { "Dotted Highlight Tag": "axDSKQZXP", "Grey Linear Tag": "gNstPdAkh", "Highlight Tag": "AksRoqhcS", "Purple Tag": "KsCSAInQk", Dark: "WXhecYaG5" };
var getProps2 = ({ backgroundBlur, height, highlight, icon, id, title, width, ...props }) => {
  return { ...props, aZ7GvMqIl: icon ?? props.aZ7GvMqIl ?? "Acorn", KS7KLFqN8: title ?? props.KS7KLFqN8 ?? "About Landin", rQKAY6456: highlight ?? props.rQKAY6456 ?? "NEW", variant: humanReadableVariantMap2[props.variant] ?? props.variant ?? "AksRoqhcS", xAPRy8bad: backgroundBlur ?? props.xAPRy8bad };
};
var createLayoutDependency2 = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component3 = /* @__PURE__ */ React5.forwardRef(function(props, ref) {
  const fallbackRef = useRef4(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React5.useId();
  const { activeLocale, setLocale } = useLocaleInfo2();
  const componentViewport = useComponentViewport2();
  const { style, className: className6, layoutId, variant, aZ7GvMqIl, rQKAY6456, KS7KLFqN8, xAPRy8bad, ...restProps } = getProps2(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState2({ cycleOrder: cycleOrder2, defaultVariant: "AksRoqhcS", ref: refBinding, variant, variantClassNames: variantClassNames2 });
  const layoutDependency = createLayoutDependency2(props, variants);
  const sharedStyleClassNames = [className5, className4];
  const scopingClassNames = cx2(serializationHash2, ...sharedStyleClassNames);
  const isDisplayed = () => {
    if (["axDSKQZXP", "gNstPdAkh", "KsCSAInQk", "WXhecYaG5"].includes(baseVariant)) return false;
    return true;
  };
  const isDisplayed1 = () => {
    if (baseVariant === "axDSKQZXP") return true;
    return false;
  };
  const isDisplayed2 = () => {
    if (baseVariant === "WXhecYaG5") return true;
    return false;
  };
  return /* @__PURE__ */ _jsx5(LayoutGroup2, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx5(Variants2, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx5(Transition2, { value: transition12, children: /* @__PURE__ */ _jsxs(motion3.div, { ...restProps, ...gestureHandlers, className: cx2(scopingClassNames, "framer-9xh6r2", className6, classNames), "data-border": true, "data-framer-name": "Highlight Tag", layoutDependency, layoutId: "AksRoqhcS", ref: refBinding, style: { "--border-bottom-width": "1px", "--border-color": "var(--token-30ee69d1-cae6-4a5c-9af2-db5c94a12e77, rgba(255, 255, 255, 0.05))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backdropFilter: `blur(${xAPRy8bad}px)`, background: 'linear-gradient(180deg, var(--token-082d630a-c036-4f77-8c8d-5d7b4650e064, rgba(255, 255, 255, 0.08)) /* {"name":"White 8%"} */ -100%, var(--token-30ee69d1-cae6-4a5c-9af2-db5c94a12e77, rgba(255, 255, 255, 0.05)) /* {"name":"White 5%"} */ 100%)', backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: 40, borderBottomRightRadius: 40, borderTopLeftRadius: 40, borderTopRightRadius: 40, ...style }, variants: { axDSKQZXP: { background: 'linear-gradient(0.07383128568086761deg, var(--token-64bf095d-9ad7-4fc0-9f3c-f96ec87f9b9b, rgba(0, 85, 255, 0.08)) /* {"name":"Blue 8%"} */ 0%, var(--token-b6113dae-1252-48c9-8fac-f8a781d683c0, rgba(153, 153, 153, 0.1)) /* {"name":"Dark Grey 10%"} */ 100%)' }, gNstPdAkh: { background: 'linear-gradient(-7.642439925348299e-8deg, var(--token-30ee69d1-cae6-4a5c-9af2-db5c94a12e77, rgba(255, 255, 255, 0.05)) /* {"name":"White 5%"} */ 0%, var(--token-b456af2e-fd88-41ae-8686-ad7692875dfd, rgba(97, 97, 97, 0.09)) /* {"name":"Transparent Grey"} */ 100%)' }, KsCSAInQk: { background: 'linear-gradient(0.07383128568086761deg, var(--token-ad10564e-4158-40a7-94e1-51af1b841a47, rgba(0, 85, 255, 0.2)) /* {"name":"Blue 20%"} */ 0%, var(--token-b6113dae-1252-48c9-8fac-f8a781d683c0, rgba(153, 153, 153, 0.1)) /* {"name":"Dark Grey 10%"} */ 100%)' }, WXhecYaG5: { background: "linear-gradient(180deg, var(--token-91acd6b3-0466-4512-bfe0-548e2faebf76, rgba(0, 0, 0, 0.3)) 0%, var(--token-91acd6b3-0466-4512-bfe0-548e2faebf76, rgba(0, 0, 0, 0.3)) 100%)", backgroundColor: "var(--token-91acd6b3-0466-4512-bfe0-548e2faebf76, rgba(0, 0, 0, 0.3))" } }, ...addPropertyOverrides2({ axDSKQZXP: { "data-framer-name": "Dotted Highlight Tag" }, gNstPdAkh: { "data-framer-name": "Grey Linear Tag" }, KsCSAInQk: { "data-framer-name": "Purple Tag" }, WXhecYaG5: { "data-framer-name": "Dark" } }, baseVariant, gestureVariant), children: [/* @__PURE__ */ _jsx5(motion3.div, { className: "framer-zg4psl", "data-framer-name": "Gradient Overlay", layoutDependency, layoutId: "qwNeQyBdz", style: { background: "conic-gradient(from 0deg at 50% 50%, rgba(255, 255, 255, 0.15) 0deg, rgba(255, 255, 255, 0) 72deg, rgba(79, 26, 214, 0.2) 171.8918918918919deg, rgba(255, 255, 255, 0) 270deg, rgba(255, 255, 255, 0.15) 360deg)", opacity: 0.2 } }), isDisplayed() && /* @__PURE__ */ _jsx5(motion3.div, { className: "framer-12lke1p", "data-border": true, "data-framer-name": "Highlighter", layoutDependency, layoutId: "V5TlajtKS", style: { "--border-bottom-width": "2px", "--border-color": "var(--token-a58752c8-168c-47db-857e-906f22f33790, rgba(255, 255, 255, 0.15))", "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px", background: 'linear-gradient(180deg, var(--token-f951c3a8-aa43-4825-aa75-915aa92c20d1, rgb(79, 26, 214)) /* {"name":"Purple"} */ 0%, rgb(128, 89, 227) 100%)', borderBottomLeftRadius: 26, borderBottomRightRadius: 26, borderTopLeftRadius: 26, borderTopRightRadius: 26 }, children: /* @__PURE__ */ _jsx5(RichText2, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx5(React5.Fragment, { children: /* @__PURE__ */ _jsx5(motion3.p, { className: "framer-styles-preset-1mywhy3", "data-styles-preset": "sQbLphIaJ", children: "NEW" }) }), className: "framer-ualbtz", "data-framer-name": "Text", fonts: ["Inter"], layoutDependency, layoutId: "E925uELmf", style: { "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: rQKAY6456, verticalAlignment: "top", withExternalLayout: true }) }), /* @__PURE__ */ _jsx5(RichText2, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx5(React5.Fragment, { children: /* @__PURE__ */ _jsx5(motion3.p, { className: "framer-styles-preset-m6m3zm", "data-styles-preset": "qScbNYtt3", style: { "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))" }, children: /* @__PURE__ */ _jsx5(motion3.span, { "data-text-fill": "true", style: { backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgba(153, 153, 153, 0) 350%)" }, children: "About Landin" }) }) }), className: "framer-1pw8fxn", "data-framer-name": "Title", fonts: ["Inter"], layoutDependency, layoutId: "W4kfTr1gT", style: { "--extracted-r6o4lv": "rgb(255, 255, 255)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: KS7KLFqN8, variants: { gNstPdAkh: { "--extracted-r6o4lv": "var(--token-8f8054d9-8a09-4e7e-b957-8a76557c5e75, rgba(255, 255, 255, 0.6))" } }, verticalAlignment: "top", withExternalLayout: true, ...addPropertyOverrides2({ gNstPdAkh: { children: /* @__PURE__ */ _jsx5(React5.Fragment, { children: /* @__PURE__ */ _jsx5(motion3.p, { className: "framer-styles-preset-m6m3zm", "data-styles-preset": "qScbNYtt3", style: { "--framer-text-color": "var(--extracted-r6o4lv, var(--token-8f8054d9-8a09-4e7e-b957-8a76557c5e75, rgba(255, 255, 255, 0.6)))" }, children: /* @__PURE__ */ _jsx5(motion3.span, { "data-text-fill": "true", style: { backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgba(153, 153, 153, 0) 350%)" }, children: "About Landin" }) }) }) } }, baseVariant, gestureVariant) }), isDisplayed1() && /* @__PURE__ */ _jsx5(motion3.div, { className: "framer-5n0mfo", "data-border": true, "data-framer-name": "Icon", layoutDependency, layoutId: "x_AWTo2fK", style: { "--border-bottom-width": "2px", "--border-color": "var(--token-a58752c8-168c-47db-857e-906f22f33790, rgba(255, 255, 255, 0.15))", "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px", background: 'linear-gradient(180deg, var(--token-f951c3a8-aa43-4825-aa75-915aa92c20d1, rgb(79, 26, 214)) /* {"name":"Purple"} */ 0%, rgb(128, 89, 227) 100%)', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30 }, children: /* @__PURE__ */ _jsx5(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx5(SmartComponentScopedContainer, { className: "framer-1i1ck70-container", isAuthoredByUser: true, isModuleExternal: true, layoutDependency, layoutId: "PJodwANK0-container", nodeId: "PJodwANK0", rendersWithMotion: true, scopeId: "IHYC0Q7Lw", children: /* @__PURE__ */ _jsx5(Icon2, { color: "var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, rgb(255, 255, 255))", height: "100%", iconSearch: "House", iconSelection: aZ7GvMqIl, id: "PJodwANK0", layoutId: "PJodwANK0", mirrored: false, selectByList: true, style: { height: "100%", width: "100%" }, weight: "duotone", width: "100%" }) }) }) }), isDisplayed1() && /* @__PURE__ */ _jsx5(MotionDivWithFX, { __framer__spring: { bounce: 0.2, damping: 60, delay: 0, duration: 0.3, durationBasedSpring: false, ease: [0.44, 0, 0.56, 1], mass: 1, stiffness: 300, type: "spring" }, __framer__styleTransformEffectEnabled: true, __framer__transformTargets: [{ target: { opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 0.3, skewX: 0, skewY: 0, x: 0, y: 0 } }, { target: { opacity: 1, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 0 } }], __framer__transformTrigger: "onInView", __perspectiveFX: false, __smartComponentFX: true, __targetOpacity: 1, className: "framer-1ahrcnp", "data-framer-name": "Blue Line", layoutDependency, layoutId: "u9huyaQK_", style: { background: 'linear-gradient(90.00000000000155deg, rgba(79, 26, 214, 0) 0%, var(--token-f951c3a8-aa43-4825-aa75-915aa92c20d1, rgb(79, 26, 214)) /* {"name":"Blue"} */ 50%, rgba(0, 85, 255, 0) 100%)' } }), isDisplayed2() && /* @__PURE__ */ _jsx5(motion3.div, { className: "framer-1ovphbv", "data-framer-name": "Shadow", layoutDependency, layoutId: "rgcJEQNal", style: { background: "radial-gradient(50% 50% at 50% 50%, rgba(79, 26, 214, 0.15) 0%, rgb(15, 9, 18) 100%)", boxShadow: "inset 0px 10px 10px -1px rgba(79, 26, 214, 0.1)" } })] }) }) }) });
});
var css7 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-JAedJ.framer-nyuva8, .framer-JAedJ .framer-nyuva8 { display: block; }", ".framer-JAedJ.framer-9xh6r2 { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 12px; height: min-content; justify-content: center; overflow: hidden; padding: 6px 16px 6px 6px; position: relative; width: min-content; will-change: var(--framer-will-change-override, transform); }", ".framer-JAedJ .framer-zg4psl { flex: none; height: 100%; left: 0px; overflow: visible; position: absolute; right: 0px; top: calc(50.00000000000002% - 100% / 2); }", ".framer-JAedJ .framer-12lke1p { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; padding: 9px 10px 9px 10px; position: relative; width: min-content; }", ".framer-JAedJ .framer-ualbtz, .framer-JAedJ .framer-1pw8fxn { flex: none; height: auto; position: relative; white-space: pre; width: auto; z-index: 1; }", ".framer-JAedJ .framer-5n0mfo { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; padding: 8px; position: relative; width: min-content; }", ".framer-JAedJ .framer-1i1ck70-container { flex: none; height: 13px; position: relative; width: 13px; }", ".framer-JAedJ .framer-1ahrcnp { flex: none; height: 1px; left: calc(50.3937007874016% - 60px / 2); position: absolute; top: 0px; width: 60px; z-index: 1; }", ".framer-JAedJ .framer-1ovphbv { flex: none; height: 100%; left: calc(50.00000000000002% - 100% / 2); overflow: visible; position: absolute; top: calc(50.00000000000002% - 100% / 2); width: 100%; z-index: 0; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-JAedJ.framer-9xh6r2, .framer-JAedJ .framer-12lke1p, .framer-JAedJ .framer-5n0mfo { gap: 0px; } .framer-JAedJ.framer-9xh6r2 > * { margin: 0px; margin-left: calc(12px / 2); margin-right: calc(12px / 2); } .framer-JAedJ.framer-9xh6r2 > :first-child, .framer-JAedJ .framer-12lke1p > :first-child, .framer-JAedJ .framer-5n0mfo > :first-child { margin-left: 0px; } .framer-JAedJ.framer-9xh6r2 > :last-child, .framer-JAedJ .framer-12lke1p > :last-child, .framer-JAedJ .framer-5n0mfo > :last-child { margin-right: 0px; } .framer-JAedJ .framer-12lke1p > *, .framer-JAedJ .framer-5n0mfo > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } }", ".framer-JAedJ.framer-v-1neujbl.framer-9xh6r2 { gap: 10px; }", ".framer-JAedJ.framer-v-1neujbl .framer-zg4psl, .framer-JAedJ.framer-v-1j9m4ta .framer-zg4psl, .framer-JAedJ.framer-v-17087j1 .framer-zg4psl, .framer-JAedJ.framer-v-1az82xx .framer-zg4psl { order: 4; }", ".framer-JAedJ.framer-v-1neujbl .framer-1pw8fxn, .framer-JAedJ.framer-v-1j9m4ta .framer-1pw8fxn, .framer-JAedJ.framer-v-17087j1 .framer-1pw8fxn, .framer-JAedJ.framer-v-1az82xx .framer-1pw8fxn { order: 2; }", ".framer-JAedJ.framer-v-1neujbl .framer-5n0mfo { order: 1; }", ".framer-JAedJ.framer-v-1neujbl .framer-1ahrcnp { left: calc(50.3937007874016% - 62% / 2); order: 3; width: 62%; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-JAedJ.framer-v-1neujbl.framer-9xh6r2 { gap: 0px; } .framer-JAedJ.framer-v-1neujbl.framer-9xh6r2 > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-JAedJ.framer-v-1neujbl.framer-9xh6r2 > :first-child { margin-left: 0px; } .framer-JAedJ.framer-v-1neujbl.framer-9xh6r2 > :last-child { margin-right: 0px; } }", ".framer-JAedJ.framer-v-1j9m4ta.framer-9xh6r2, .framer-JAedJ.framer-v-17087j1.framer-9xh6r2, .framer-JAedJ.framer-v-1az82xx.framer-9xh6r2 { gap: 10px; padding: 6px 16px 6px 16px; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-JAedJ.framer-v-1j9m4ta.framer-9xh6r2 { gap: 0px; } .framer-JAedJ.framer-v-1j9m4ta.framer-9xh6r2 > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-JAedJ.framer-v-1j9m4ta.framer-9xh6r2 > :first-child { margin-left: 0px; } .framer-JAedJ.framer-v-1j9m4ta.framer-9xh6r2 > :last-child { margin-right: 0px; } }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-JAedJ.framer-v-17087j1.framer-9xh6r2 { gap: 0px; } .framer-JAedJ.framer-v-17087j1.framer-9xh6r2 > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-JAedJ.framer-v-17087j1.framer-9xh6r2 > :first-child { margin-left: 0px; } .framer-JAedJ.framer-v-17087j1.framer-9xh6r2 > :last-child { margin-right: 0px; } }", ".framer-JAedJ.framer-v-1az82xx .framer-1ovphbv { order: 5; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-JAedJ.framer-v-1az82xx.framer-9xh6r2 { gap: 0px; } .framer-JAedJ.framer-v-1az82xx.framer-9xh6r2 > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-JAedJ.framer-v-1az82xx.framer-9xh6r2 > :first-child { margin-left: 0px; } .framer-JAedJ.framer-v-1az82xx.framer-9xh6r2 > :last-child { margin-right: 0px; } }", ...css6, ...css5, '.framer-JAedJ[data-border="true"]::after, .framer-JAedJ [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }'];
var FramerIHYC0Q7Lw = withCSS2(Component3, css7, "framer-JAedJ");
var IHYC0Q7Lw_default = FramerIHYC0Q7Lw;
FramerIHYC0Q7Lw.displayName = "Tag/Primary Tag";
FramerIHYC0Q7Lw.defaultProps = { height: 40, width: 173.5 };
addPropertyControls4(FramerIHYC0Q7Lw, { variant: { options: ["AksRoqhcS", "axDSKQZXP", "gNstPdAkh", "KsCSAInQk", "WXhecYaG5"], optionTitles: ["Highlight Tag", "Dotted Highlight Tag", "Grey Linear Tag", "Purple Tag", "Dark"], title: "Variant", type: ControlType5.Enum }, aZ7GvMqIl: PhosphorControls?.["iconSelection"] && { ...PhosphorControls["iconSelection"], defaultValue: "Acorn", description: void 0, hidden: void 0, title: "Icon" }, rQKAY6456: { defaultValue: "NEW", description: "If the tag contains a mini tag, enter this text. Use All Uppercase.", displayTextArea: false, placeholder: "", title: "Highlight", type: ControlType5.String }, KS7KLFqN8: { defaultValue: "About Landin", displayTextArea: true, title: "Title", type: ControlType5.String }, xAPRy8bad: { defaultValue: 0, title: "Background Blur", type: ControlType5.Number } });
addFonts2(FramerIHYC0Q7Lw, [{ explicitInter: true, fonts: [{ family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F", url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116", url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+1F00-1FFF", url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0370-03FF", url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF", url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD", url: "https://framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB", url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2", weight: "400" }] }, ...PhosphorFonts, ...getFontsFromSharedStyle2(fonts5), ...getFontsFromSharedStyle2(fonts4)], { supportsExplicitInterCodegen: true });

// http-url:https://framerusercontent.com/modules/j7buNUyMZbPsKYZDQT4r/ohPpqvT0DjAdSgqFEafW/m_S0SazFM.js
var LightRaysFonts = getFonts2(Rays);
var TagPrimaryTagFonts = getFonts2(IHYC0Q7Lw_default);
var ButtonPrimaryButtonFonts = getFonts2(GNvaONxX6_default);
var TagPrimaryTagControls = getPropertyControls2(IHYC0Q7Lw_default);
var serializationHash3 = "framer-ViTpn";
var variantClassNames3 = { lFqTDQUAs: "framer-v-1lltzzi" };
var numberToPixelString = (value) => {
  if (typeof value !== "number") return value;
  if (!Number.isFinite(value)) return void 0;
  return Math.max(0, value) + "px";
};
var transition13 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var Transition3 = ({ value, children }) => {
  const config = React6.useContext(MotionConfigContext3);
  const transition = value ?? config.transition;
  const contextValue = React6.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx6(MotionConfigContext3.Provider, { value: contextValue, children });
};
var Variants3 = motion4.create(React6.Fragment);
var getProps3 = ({ bodyText, height, icon, id, link, padding, tag, title1, title2, width, ...props }) => {
  return { ...props, c6uK1dg38: icon ?? props.c6uK1dg38 ?? "Acorn", cwo7DCFXO: bodyText ?? props.cwo7DCFXO ?? "Harnessing the power of artificial intelligence to revolutionize  industries and enhance human experiences.", lTXT0qucV: padding ?? props.lTXT0qucV ?? "50px", mAv2pC_4U: tag ?? props.mAv2pC_4U ?? "Features", QVKlogXTW: title1 ?? props.QVKlogXTW ?? "Our Method is Simple and", T8OTVIL45: title2 ?? props.T8OTVIL45 ?? "Transparent at Every Step.", wVGTfqneN: link ?? props.wVGTfqneN };
};
var createLayoutDependency3 = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component4 = /* @__PURE__ */ React6.forwardRef(function(props, ref) {
  const fallbackRef = useRef5(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React6.useId();
  const { activeLocale, setLocale } = useLocaleInfo3();
  const componentViewport = useComponentViewport3();
  const { style, className: className6, layoutId, variant, c6uK1dg38, mAv2pC_4U, QVKlogXTW, T8OTVIL45, cwo7DCFXO, lTXT0qucV, wVGTfqneN, ...restProps } = getProps3(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState3({ defaultVariant: "lFqTDQUAs", ref: refBinding, variant, variantClassNames: variantClassNames3 });
  const layoutDependency = createLayoutDependency3(props, variants);
  const sharedStyleClassNames = [className2, className];
  const scopingClassNames = cx3(serializationHash3, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx6(LayoutGroup3, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx6(Variants3, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx6(Transition3, { value: transition13, children: /* @__PURE__ */ _jsxs2(motion4.div, { ...restProps, ...gestureHandlers, className: cx3(scopingClassNames, "framer-1lltzzi", className6, classNames), "data-border": true, "data-framer-name": "Primary", layoutDependency, layoutId: "lFqTDQUAs", ref: refBinding, style: { "--1v1vucn": numberToPixelString(lTXT0qucV), "--border-bottom-width": "1px", "--border-color": "var(--token-a9883d9b-c1bd-4bd9-be15-284cd72e1b1f, rgba(255, 255, 255, 0.07))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backdropFilter: "blur(0px)", backgroundColor: "var(--token-8e9f7de0-9fd7-44d3-bc3e-2dea20c4e4bd, rgb(0, 0, 0))", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, WebkitBackdropFilter: "blur(0px)", ...style }, children: [/* @__PURE__ */ _jsx6(Image, { as: "figure", background: { alt: "", fit: "fill", loading: getLoadingLazyAtYPosition((componentViewport?.y || 0) + 0), pixelHeight: 3425, pixelWidth: 5071, sizes: componentViewport?.width || "100vw", src: "https://framerusercontent.com/images/1xOqMa4sAAwBCrdkiSJfIXups.png", srcSet: "https://framerusercontent.com/images/1xOqMa4sAAwBCrdkiSJfIXups.png?scale-down-to=512 512w,https://framerusercontent.com/images/1xOqMa4sAAwBCrdkiSJfIXups.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/1xOqMa4sAAwBCrdkiSJfIXups.png?scale-down-to=2048 2048w,https://framerusercontent.com/images/1xOqMa4sAAwBCrdkiSJfIXups.png?scale-down-to=4096 4096w,https://framerusercontent.com/images/1xOqMa4sAAwBCrdkiSJfIXups.png 5071w" }, className: "framer-fgxqhm", "data-framer-name": "Abstract Dots", layoutDependency, layoutId: "FHZ86Gf7d" }), /* @__PURE__ */ _jsx6(ComponentViewportProvider2, { children: /* @__PURE__ */ _jsx6(SmartComponentScopedContainer2, { className: "framer-vu8s90-container", isAuthoredByUser: true, isModuleExternal: true, layoutDependency, layoutId: "eAnRRToZK-container", nodeId: "eAnRRToZK", rendersWithMotion: true, scopeId: "m_S0SazFM", style: { opacity: 0.8 }, children: /* @__PURE__ */ _jsx6(Rays, { animation: { animate: true, speed: 10 }, height: "100%", id: "eAnRRToZK", intensity: 20, layoutId: "eAnRRToZK", position: 50, radius: "0px", rays: 30, raysColor: { color: "var(--token-f951c3a8-aa43-4825-aa75-915aa92c20d1, rgb(79, 26, 214))", color1: "rgb(255, 255, 255)", color2: "rgb(255, 203, 71)", mode: "single" }, reach: 30, style: { height: "100%", width: "100%" }, width: "100%" }) }) }), /* @__PURE__ */ _jsxs2(motion4.div, { className: "framer-1pcl7ce", "data-framer-name": "Content", layoutDependency, layoutId: "zshF23nVC", children: [/* @__PURE__ */ _jsxs2(motion4.div, { className: "framer-1dx6x84", "data-framer-name": "Top", layoutDependency, layoutId: "MvnZDt7dB", children: [/* @__PURE__ */ _jsx6(ComponentViewportProvider2, { height: 40, children: /* @__PURE__ */ _jsx6(SmartComponentScopedContainer2, { className: "framer-xdturt-container", layoutDependency, layoutId: "ey8JREzAv-container", nodeId: "ey8JREzAv", rendersWithMotion: true, scopeId: "m_S0SazFM", children: /* @__PURE__ */ _jsx6(IHYC0Q7Lw_default, { aZ7GvMqIl: c6uK1dg38, height: "100%", id: "ey8JREzAv", KS7KLFqN8: mAv2pC_4U, layoutId: "ey8JREzAv", rQKAY6456: "NEW", variant: "axDSKQZXP", width: "100%", xAPRy8bad: 5 }) }) }), /* @__PURE__ */ _jsxs2(motion4.div, { className: "framer-alj09w", "data-framer-name": "Title", layoutDependency, layoutId: "oyTU6I7wJ", children: [/* @__PURE__ */ _jsx6(RichText3, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx6(React6.Fragment, { children: /* @__PURE__ */ _jsx6(motion4.h2, { className: "framer-styles-preset-190xti5", "data-styles-preset": "QuTNz53Yy", style: { "--framer-text-alignment": "center" }, children: "Our Method is Simple and" }) }), className: "framer-emji9l", "data-framer-name": "Text 1", fonts: ["Inter"], layoutDependency, layoutId: "rFacuY85f", style: { "--framer-paragraph-spacing": "0px" }, text: QVKlogXTW, verticalAlignment: "top", withExternalLayout: true }), /* @__PURE__ */ _jsx6(RichText3, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx6(React6.Fragment, { children: /* @__PURE__ */ _jsx6(motion4.h2, { className: "framer-styles-preset-190xti5", "data-styles-preset": "QuTNz53Yy", style: { "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-8f8054d9-8a09-4e7e-b957-8a76557c5e75, rgba(255, 255, 255, 0.6)))" }, children: "Transparent at Every Step." }) }), className: "framer-5b0vsd", "data-framer-name": "Text 2", fonts: ["Inter"], layoutDependency, layoutId: "Ne1LQo5l8", style: { "--extracted-1of0zx5": "var(--token-8f8054d9-8a09-4e7e-b957-8a76557c5e75, rgba(255, 255, 255, 0.6))", "--framer-paragraph-spacing": "0px" }, text: T8OTVIL45, verticalAlignment: "top", withExternalLayout: true })] })] }), /* @__PURE__ */ _jsx6(motion4.div, { className: "framer-1uaf3uz", "data-framer-name": "Middle", layoutDependency, layoutId: "QXKaAn0rq", children: /* @__PURE__ */ _jsx6(RichText3, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx6(React6.Fragment, { children: /* @__PURE__ */ _jsx6(motion4.p, { className: "framer-styles-preset-x0s9r5", "data-styles-preset": "QhK6qqT5U", style: { "--framer-text-alignment": "center" }, children: "Harnessing the power of artificial intelligence to revolutionize  industries and enhance human experiences." }) }), className: "framer-12v084n", "data-framer-name": "Body Text", fonts: ["Inter"], layoutDependency, layoutId: "hY1lRNNNT", style: { "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: cwo7DCFXO, verticalAlignment: "top", withExternalLayout: true }) }), /* @__PURE__ */ _jsx6(motion4.div, { className: "framer-4ual7r", "data-framer-name": "Bottom", layoutDependency, layoutId: "jA7lIAm0W", children: /* @__PURE__ */ _jsx6(ComponentViewportProvider2, { height: 46, children: /* @__PURE__ */ _jsx6(SmartComponentScopedContainer2, { className: "framer-9p0uya-container", layoutDependency, layoutId: "pQt7NhT45-container", nodeId: "pQt7NhT45", rendersWithMotion: true, scopeId: "m_S0SazFM", children: /* @__PURE__ */ _jsx6(GNvaONxX6_default, { AL_NU982V: false, dlVBgpKLv: "Book an Appointment", GT109pdEG: wVGTfqneN, height: "100%", id: "pQt7NhT45", layoutId: "pQt7NhT45", SD1BGlGhK: false, variant: "vf6JWDf13", width: "100%", YVFZiszrG: { borderColor: 'var(--token-a58752c8-168c-47db-857e-906f22f33790, rgba(255, 255, 255, 0.15)) /* {"name":"White 15%"} */', borderStyle: "solid", borderWidth: 3 } }) }) }) })] })] }) }) }) });
});
var css8 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-ViTpn.framer-17rv3f0, .framer-ViTpn .framer-17rv3f0 { display: block; }", ".framer-ViTpn.framer-1lltzzi { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: var(--1v1vucn); position: relative; width: 730px; will-change: var(--framer-will-change-override, transform); }", ".framer-ViTpn .framer-fgxqhm { flex: none; height: 46%; left: calc(50.00000000000002% - 100% / 2); position: absolute; top: 0px; width: 100%; }", ".framer-ViTpn .framer-vu8s90-container { flex: none; height: 400px; left: calc(50.00000000000002% - 100% / 2); position: absolute; top: 0px; width: 100%; }", ".framer-ViTpn .framer-1pcl7ce { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: center; max-width: 680px; overflow: visible; padding: 0px; position: relative; width: 1px; z-index: 2; }", ".framer-ViTpn .framer-1dx6x84 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 30px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; }", ".framer-ViTpn .framer-xdturt-container, .framer-ViTpn .framer-9p0uya-container { flex: none; height: auto; position: relative; width: auto; }", ".framer-ViTpn .framer-alj09w { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }", ".framer-ViTpn .framer-emji9l, .framer-ViTpn .framer-5b0vsd { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }", ".framer-ViTpn .framer-1uaf3uz { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; max-width: 520px; overflow: hidden; padding: 0px; position: relative; width: 100%; }", ".framer-ViTpn .framer-12v084n { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; z-index: 1; }", ".framer-ViTpn .framer-4ual7r { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 50px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-ViTpn.framer-1lltzzi, .framer-ViTpn .framer-1pcl7ce, .framer-ViTpn .framer-1dx6x84, .framer-ViTpn .framer-alj09w, .framer-ViTpn .framer-1uaf3uz, .framer-ViTpn .framer-4ual7r { gap: 0px; } .framer-ViTpn.framer-1lltzzi > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-ViTpn.framer-1lltzzi > :first-child { margin-left: 0px; } .framer-ViTpn.framer-1lltzzi > :last-child { margin-right: 0px; } .framer-ViTpn .framer-1pcl7ce > *, .framer-ViTpn .framer-1dx6x84 > * { margin: 0px; margin-bottom: calc(30px / 2); margin-top: calc(30px / 2); } .framer-ViTpn .framer-1pcl7ce > :first-child, .framer-ViTpn .framer-1dx6x84 > :first-child, .framer-ViTpn .framer-alj09w > :first-child, .framer-ViTpn .framer-1uaf3uz > :first-child, .framer-ViTpn .framer-4ual7r > :first-child { margin-top: 0px; } .framer-ViTpn .framer-1pcl7ce > :last-child, .framer-ViTpn .framer-1dx6x84 > :last-child, .framer-ViTpn .framer-alj09w > :last-child, .framer-ViTpn .framer-1uaf3uz > :last-child, .framer-ViTpn .framer-4ual7r > :last-child { margin-bottom: 0px; } .framer-ViTpn .framer-alj09w > *, .framer-ViTpn .framer-1uaf3uz > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-ViTpn .framer-4ual7r > * { margin: 0px; margin-bottom: calc(50px / 2); margin-top: calc(50px / 2); } }", ...css2, ...css, '.framer-ViTpn[data-border="true"]::after, .framer-ViTpn [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }'];
var Framerm_S0SazFM = withCSS3(Component4, css8, "framer-ViTpn");
var m_S0SazFM_default = Framerm_S0SazFM;
Framerm_S0SazFM.displayName = "Navigation/CTA";
Framerm_S0SazFM.defaultProps = { height: 439, width: 730 };
addPropertyControls5(Framerm_S0SazFM, { c6uK1dg38: TagPrimaryTagControls?.["aZ7GvMqIl"] && { ...TagPrimaryTagControls["aZ7GvMqIl"], defaultValue: "Acorn", description: void 0, hidden: void 0, title: "Icon" }, mAv2pC_4U: { defaultValue: "Features", displayTextArea: false, title: "Tag", type: ControlType6.String }, QVKlogXTW: { defaultValue: "Our Method is Simple and", displayTextArea: true, title: "Title 1", type: ControlType6.String }, T8OTVIL45: { defaultValue: "Transparent at Every Step.", displayTextArea: true, title: "Title 2", type: ControlType6.String }, cwo7DCFXO: { defaultValue: "Harnessing the power of artificial intelligence to revolutionize  industries and enhance human experiences.", displayTextArea: true, title: "Body Text", type: ControlType6.String }, lTXT0qucV: { defaultValue: "50px", title: "Padding", type: ControlType6.Padding }, wVGTfqneN: { title: "Link", type: ControlType6.Link } });
addFonts3(Framerm_S0SazFM, [{ explicitInter: true, fonts: [{ family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F", url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116", url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+1F00-1FFF", url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0370-03FF", url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF", url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD", url: "https://framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB", url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2", weight: "400" }] }, ...LightRaysFonts, ...TagPrimaryTagFonts, ...ButtonPrimaryButtonFonts, ...getFontsFromSharedStyle3(fonts2), ...getFontsFromSharedStyle3(fonts)], { supportsExplicitInterCodegen: true });
export {
  m_S0SazFM_default as default
};
