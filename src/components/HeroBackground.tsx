import { useEffect, useRef } from 'react';

// ── Palette (primary-400 / primary-500) ───────────────────────────────────────
const LINE_R = 96  / 255;   // #60a5fa  primary-400
const LINE_G = 165 / 255;
const LINE_B = 250 / 255;
const LINE_ALPHA_MAX = 0.50;

const DOT_R  = 59  / 255;   // #3b82f6  primary-500
const DOT_G  = 130 / 255;
const DOT_B  = 246 / 255;
const DOT_A  = 0.85;

// ── Simulation constants ───────────────────────────────────────────────────────
const N      = 65;     // number of particles
const SPEED  = 0.35;   // CSS px / frame at 60 fps

// ── Shaders ───────────────────────────────────────────────────────────────────
// Shared vertex shader for both lines and points.
// Positions are in CSS-pixel space; u_res maps them to clip space.
const VS = `
  attribute vec2 a_pos;
  attribute vec4 a_col;
  varying   vec4 v_col;
  uniform   vec2 u_res;
  uniform   float u_ptSize;
  void main() {
    vec2 c = (a_pos / u_res) * 2.0 - 1.0;
    gl_Position  = vec4(c.x, -c.y, 0.0, 1.0);
    gl_PointSize = u_ptSize;
    v_col        = a_col;
  }
`;

// Lines: just pass the interpolated colour through.
const LINE_FS = `
  precision mediump float;
  varying vec4 v_col;
  void main() { gl_FragColor = v_col; }
`;

// Points: soft circular dot via gl_PointCoord.
const POINT_FS = `
  precision mediump float;
  varying vec4 v_col;
  void main() {
    float r = length(gl_PointCoord - vec2(0.5)) * 2.0;
    float a = 1.0 - smoothstep(0.4, 1.0, r);
    if (a < 0.01) discard;
    gl_FragColor = vec4(v_col.rgb, v_col.a * a);
  }
`;

// ── WebGL helpers ─────────────────────────────────────────────────────────────
function makeShader(gl: WebGLRenderingContext, type: number, src: string) {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('[HeroBg] shader:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
    }
    return s;
}

function makeProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
    const p = gl.createProgram()!;
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error('[HeroBg] program:', gl.getProgramInfoLog(p));
        gl.deleteProgram(p);
        return null;
    }
    return p;
}

// ── Component ─────────────────────────────────────────────────────────────────
const HeroBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl', {
            alpha: true,
            premultipliedAlpha: false,
            antialias: false,
        });
        if (!gl) return;

        // Compile
        const vs      = makeShader(gl, gl.VERTEX_SHADER,   VS);
        const lineFs  = makeShader(gl, gl.FRAGMENT_SHADER, LINE_FS);
        const pointFs = makeShader(gl, gl.FRAGMENT_SHADER, POINT_FS);
        if (!vs || !lineFs || !pointFs) return;

        const lineProg  = makeProgram(gl, vs, lineFs);
        const pointProg = makeProgram(gl, vs, pointFs);
        if (!lineProg || !pointProg) return;

        // Cache attribute / uniform locations
        const lLoc = {
            pos:    gl.getAttribLocation(lineProg,  'a_pos'),
            col:    gl.getAttribLocation(lineProg,  'a_col'),
            res:    gl.getUniformLocation(lineProg,  'u_res'),
            ptSize: gl.getUniformLocation(lineProg,  'u_ptSize'),
        };
        const pLoc = {
            pos:    gl.getAttribLocation(pointProg, 'a_pos'),
            col:    gl.getAttribLocation(pointProg, 'a_col'),
            res:    gl.getUniformLocation(pointProg, 'u_res'),
            ptSize: gl.getUniformLocation(pointProg, 'u_ptSize'),
        };

        const lineVBO  = gl.createBuffer()!;
        const pointVBO = gl.createBuffer()!;

        // Worst-case pre-allocated arrays
        // Each vertex: [x, y, r, g, b, a] = 6 floats
        const maxPairs = (N * (N - 1)) / 2;
        const lineArr  = new Float32Array(maxPairs * 2 * 6);
        const pointArr = new Float32Array(N * 6);

        // Canvas dimensions in CSS pixels (simulation space)
        let W = canvas.offsetWidth  || 800;
        let H = canvas.offsetHeight || 400;
        let connectDist = 150;
        let dpr = 1;

        // Spawn particles
        const px  = new Float32Array(N);
        const py  = new Float32Array(N);
        const pvx = new Float32Array(N);
        const pvy = new Float32Array(N);
        for (let i = 0; i < N; i++) {
            const a = Math.random() * Math.PI * 2;
            const s = SPEED * (0.4 + Math.random() * 0.8);
            px[i]  = Math.random() * W;
            py[i]  = Math.random() * H;
            pvx[i] = Math.cos(a) * s;
            pvy[i] = Math.sin(a) * s;
        }

        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Bind stride-24 layout for whichever program+buffer is active
        const STRIDE = 6 * 4; // 6 floats × 4 bytes
        const bindLayout = (posLoc: number, colLoc: number) => {
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, STRIDE, 0);
            gl.enableVertexAttribArray(colLoc);
            gl.vertexAttribPointer(colLoc, 4, gl.FLOAT, false, STRIDE, 8);
        };

        const resize = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            if (!w || !h) return;
            W = w; H = h;
            connectDist = Math.min(Math.max(W * 0.13, 100), 175);
            dpr = Math.min(window.devicePixelRatio ?? 1, 2);
            canvas.width  = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        resize();

        let raf: number;

        const draw = () => {
            // ── Update particles ──────────────────────────────────────────────
            for (let i = 0; i < N; i++) {
                px[i] += pvx[i];
                py[i] += pvy[i];
                if (px[i] < 0) { px[i] = 0; pvx[i] =  Math.abs(pvx[i]); }
                if (px[i] > W) { px[i] = W; pvx[i] = -Math.abs(pvx[i]); }
                if (py[i] < 0) { py[i] = 0; pvy[i] =  Math.abs(pvy[i]); }
                if (py[i] > H) { py[i] = H; pvy[i] = -Math.abs(pvy[i]); }
            }

            // ── Build line vertices ───────────────────────────────────────────
            let li = 0;
            const cd2 = connectDist * connectDist;
            for (let i = 0; i < N; i++) {
                for (let j = i + 1; j < N; j++) {
                    const dx = px[i] - px[j];
                    const dy = py[i] - py[j];
                    const d2 = dx * dx + dy * dy;
                    if (d2 >= cd2) continue;
                    const a = LINE_ALPHA_MAX * (1 - Math.sqrt(d2) / connectDist);
                    // start vertex
                    lineArr[li++] = px[i]; lineArr[li++] = py[i];
                    lineArr[li++] = LINE_R; lineArr[li++] = LINE_G; lineArr[li++] = LINE_B; lineArr[li++] = a;
                    // end vertex
                    lineArr[li++] = px[j]; lineArr[li++] = py[j];
                    lineArr[li++] = LINE_R; lineArr[li++] = LINE_G; lineArr[li++] = LINE_B; lineArr[li++] = a;
                }
            }

            // ── Build point vertices ──────────────────────────────────────────
            for (let i = 0; i < N; i++) {
                const o = i * 6;
                pointArr[o]   = px[i]; pointArr[o + 1] = py[i];
                pointArr[o+2] = DOT_R; pointArr[o+3] = DOT_G;
                pointArr[o+4] = DOT_B; pointArr[o+5] = DOT_A;
            }

            gl.clear(gl.COLOR_BUFFER_BIT);

            // ── Draw lines ────────────────────────────────────────────────────
            if (li > 0) {
                gl.useProgram(lineProg);
                gl.bindBuffer(gl.ARRAY_BUFFER, lineVBO);
                gl.bufferData(gl.ARRAY_BUFFER, lineArr.subarray(0, li), gl.DYNAMIC_DRAW);
                bindLayout(lLoc.pos, lLoc.col);
                gl.uniform2f(lLoc.res, W, H);
                gl.uniform1f(lLoc.ptSize, 1.0);
                gl.drawArrays(gl.LINES, 0, li / 6);
            }

            // ── Draw dots ─────────────────────────────────────────────────────
            gl.useProgram(pointProg);
            gl.bindBuffer(gl.ARRAY_BUFFER, pointVBO);
            gl.bufferData(gl.ARRAY_BUFFER, pointArr, gl.DYNAMIC_DRAW);
            bindLayout(pLoc.pos, pLoc.col);
            gl.uniform2f(pLoc.res, W, H);
            gl.uniform1f(pLoc.ptSize, 5.0 * dpr);  // 5 CSS px dot diameter
            gl.drawArrays(gl.POINTS, 0, N);

            raf = requestAnimationFrame(draw);
        };

        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            gl.deleteBuffer(lineVBO);
            gl.deleteBuffer(pointVBO);
            gl.deleteShader(vs);
            gl.deleteShader(lineFs);
            gl.deleteShader(pointFs);
            gl.deleteProgram(lineProg);
            gl.deleteProgram(pointProg);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'none', opacity: 0.45 }}
        />
    );
};

export default HeroBackground;
