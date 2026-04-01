"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const GRID_SIZE = 40;
const GRID_DIVISIONS = 40;
const STEP = GRID_SIZE / GRID_DIVISIONS;

const phy = {
  y: 7.0,
  vy: 0.0,
  impact: 0.0,
};

/* ═══════════════════════════════════════════════════════════
    NEURAL SPHERE (unchanged)
═══════════════════════════════════════════════════════════ */
function NeuralSphere() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const halo1Ref = useRef<THREE.Mesh>(null!);
  const halo2Ref = useRef<THREE.Mesh>(null!);

  useFrame((_, dt) => {
    phy.vy += 0.004;
    phy.y -= phy.vy;

    if (phy.y <= 0.65) {
      phy.y = 0.65;
      const v = Math.abs(phy.vy);
      phy.vy = -(v < 0.12 ? 0.26 : v * 0.80);
      phy.impact = 1.0;
    }

    phy.impact = Math.max(0, phy.impact - dt * 1.8);

    const y = phy.y;
    if (coreRef.current) {
      coreRef.current.position.y = y;
      coreRef.current.rotation.y += 0.018;
      coreRef.current.rotation.z += 0.009;
    }

    const t = Date.now() * 0.0025;
    const p1 = 1 + Math.sin(t) * 0.13;
    const p2 = 1 + Math.sin(t + Math.PI) * 0.10;

    if (halo1Ref.current) {
      halo1Ref.current.position.y = y;
      halo1Ref.current.scale.setScalar(p1);
    }
    if (halo2Ref.current) {
      halo2Ref.current.position.y = y;
      halo2Ref.current.scale.setScalar(p2);
    }
  });

  return (
    <group>
      <mesh ref={halo1Ref} position={[0, 7, 0]}>
        <sphereGeometry args={[2.2, 12, 12]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.042} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <mesh ref={halo2Ref} position={[0, 7, 0]}>
        <sphereGeometry args={[1.3, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.085} depthWrite={false} />
      </mesh>
      <mesh ref={coreRef} position={[0, 7, 0]}>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial color="#bae6fd" emissive="#0ea5e9" emissiveIntensity={2.8} metalness={0.8} roughness={0.0} wireframe />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
    DEFORMABLE GRID (unchanged)
═══════════════════════════════════════════════════════════ */
function DeformableGrid() {
  const linesRef = useRef<THREE.LineSegments>(null!);

  const geo = useMemo(() => {
    const D = GRID_DIVISIONS;
    const N = (D + 1) * (D + 1);
    const pos = new Float32Array(N * 3);
    const indices: number[] = [];

    for (let r = 0; r <= D; r++) {
      for (let c = 0; c <= D; c++) {
        const k = (r * (D + 1) + c) * 3;
        pos[k] = -GRID_SIZE / 2 + c * STEP;
        pos[k + 1] = 0;
        pos[k + 2] = -GRID_SIZE / 2 + r * STEP;
        const v = r * (D + 1) + c;
        if (c < D) indices.push(v, v + 1);
        if (r < D) indices.push(v, v + D + 1);
      }
    }

    const g = new THREE.BufferGeometry();
    const attr = new THREE.BufferAttribute(pos, 3);
    attr.setUsage(THREE.DynamicDrawUsage);
    g.setAttribute("position", attr);
    g.setIndex(indices);
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    linesRef.current.position.z = (t * 1.4) % STEP;
    const pa = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const D = GRID_DIVISIONS;
    const str = phy.impact;

    for (let r = 0; r <= D; r++) {
      for (let c = 0; c <= D; c++) {
        const v = r * (D + 1) + c;
        const x = -GRID_SIZE / 2 + c * STEP;
        const z = -GRID_SIZE / 2 + r * STEP;
        const dist = Math.sqrt(x * x + z * z);
        pa.setY(v, str > 0.005 ? -str * Math.exp(-dist * 0.15) * 2.6 : 0);
      }
    }
    pa.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} geometry={geo}>
      <lineBasicMaterial color="#0ea5e9" transparent opacity={0.78} />
    </lineSegments>
  );
}

/* ═══════════════════════════════════════════════════════════
    GRID FILL 3D (unchanged)
═══════════════════════════════════════════════════════════ */
function GridFill3D() {
  const tex = useMemo(() => {
    const S = 1024;
    const cv = document.createElement("canvas");
    cv.width = S; cv.height = S;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, S, S);

    const D = GRID_DIVISIONS;
    const cW = S / D; const cH = S / D; const BV = 2.5;

    for (let r = 0; r < D; r++) {
      for (let c = 0; c < D; c++) {
        const ox = c * cW; const oy = r * cH;
        const nx = (c - D / 2 + 0.5) / (D / 2);
        const ny = (r - D / 2 + 0.5) / (D / 2);
        const d = Math.min(1, Math.sqrt(nx * nx + ny * ny));
        const base = 1 - d * 0.85;
        const variation = 0.55 + Math.abs(Math.sin(r * 6.1 + c * 3.9)) * 0.45;
        const intensity = base * variation;

        const grd = ctx.createLinearGradient(ox, oy, ox + cW, oy + cH);
        grd.addColorStop(0, `rgba(56,189,248,${+(0.04 + intensity * 0.26).toFixed(3)})`);
        grd.addColorStop(0.4, `rgba(14,165,233,${+(0.02 + intensity * 0.14).toFixed(3)})`);
        grd.addColorStop(1, `rgba(2,132,199, ${+(0.01 + intensity * 0.07).toFixed(3)})`);
        ctx.fillStyle = grd;
        ctx.fillRect(ox + BV, oy + BV, cW - BV * 2, cH - BV * 2);

        const hi = +(0.06 + intensity * 0.38).toFixed(3);
        ctx.fillStyle = `rgba(186,230,253,${hi})`;
        ctx.fillRect(ox, oy, cW, BV);
        ctx.fillRect(ox, oy, BV, cH);

        const sh = +(0.06 + intensity * 0.16).toFixed(3);
        ctx.fillStyle = `rgba(7,89,133,${sh})`;
        ctx.fillRect(ox, oy + cH - BV, cW, BV);
        ctx.fillRect(ox + cW - BV, oy, BV, cH);
      }
    }
    const glow = ctx.createRadialGradient(S / 2, S / 2, 10, S / 2, S / 2, S * 0.52);
    glow.addColorStop(0, "rgba(224,242,254,0.30)");
    glow.addColorStop(0.2, "rgba(56,189,248,0.16)");
    glow.addColorStop(0.55, "rgba(14,165,233,0.08)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, S, S);

    return new THREE.CanvasTexture(cv);
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]}>
      <planeGeometry args={[GRID_SIZE, GRID_SIZE]} />
      <meshBasicMaterial map={tex} transparent opacity={0.95} depthWrite={false} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════
    TECH ICON SPRITES — replaces RisingParticles
    ─────────────────────────────────────────────────────────
    Strategy:
      • One canvas texture per unique tech name  (GPU reuse)
      • 96 sprite instances placed on random grid cells
      • Same phase-based rising loop as original particles
      • SpriteMaterial → always faces camera, no DOM, GPU-only
      • AdditiveBlending + depthWrite:false → same as original
      • Lenis safe: zero interaction with scroll / DOM
═══════════════════════════════════════════════════════════ */

/* ── Tech names list ── */
const TECH_NAMES = [
  "HTML5", "CSS3", "JavaScript", "TypeScript",
  "React", "Next.js", "Node.js", "Express",
  "C", "C++", "Java", "C#", ".NET",
  "Python", "MongoDB", "PostgreSQL",
  "Tailwind", "GSAP", "Three.js",
  "Docker", "Git", "GitHub", "Vercel",
  "AWS", "Linux",
  "Figma", "MS Office",
  "ChatGPT", "Gemini AI", "Claude AI",
];

/* Total visible sprites — keep low for perf */
const SPRITE_COUNT = 96;

/* Rising speed — lower = more elegant */
const RISE_SPEED = 0.55;

/* Max height before teleporting back to y=0 */
const MAX_HEIGHT = 5;

/* ── Build a canvas texture for one tech name ── */
function buildTechTexture(name: string): THREE.CanvasTexture {
  /* Canvas proportional to text length */
  const W = Math.max(140, name.length * 13 + 32);
  const H = 42;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d")!;

  /* Pill background */
  const r = H / 2;
  ctx.beginPath();
  ctx.moveTo(r, 0); ctx.lineTo(W - r, 0);
  ctx.arcTo(W, 0, W, H, r);
  ctx.lineTo(W, H - r);
  ctx.arcTo(W, H, W - r, H, r);
  ctx.lineTo(r, H);
  ctx.arcTo(0, H, 0, H - r, r);
  ctx.lineTo(0, r);
  ctx.arcTo(0, 0, r, 0, r);
  ctx.closePath();

  /* Subtle fill */
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "rgba(14,165,233,0.18)");
  grad.addColorStop(1, "rgba(2,132,199,0.08)");
  ctx.fillStyle = grad;
  ctx.fill();

  /* Border */
  ctx.strokeStyle = "rgba(55, 161, 207, 0.7)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  /* Text */
  ctx.fillStyle = "#c5e0efff";
  ctx.font = `600 ${H * 0.48}px "Courier New", monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(34,211,238,0.85)";
  ctx.shadowBlur = 6;
  ctx.fillText(name, W / 2, H / 2);

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

function RisingParticles() {
  const groupRef = useRef<THREE.Group>(null!);

  /* ── Build textures + sprites in useMemo ── */
  const { sprites, phases, baseX, baseZ } = useMemo(() => {
    const D = GRID_DIVISIONS;

    /* One texture per unique tech name — shared across sprite instances */
    const texMap = new Map<string, THREE.CanvasTexture>();
    TECH_NAMES.forEach((n) => texMap.set(n, buildTechTexture(n)));

    const spriteArr: THREE.Sprite[] = [];
    const phaseArr  = new Float32Array(SPRITE_COUNT);
    const bx        = new Float32Array(SPRITE_COUNT);
    const bz        = new Float32Array(SPRITE_COUNT);

    for (let i = 0; i < SPRITE_COUNT; i++) {
      const name    = TECH_NAMES[i % TECH_NAMES.length];
      const tex     = texMap.get(name)!;

      /* Width proportional to text length so pills look natural */
      const spriteW = Math.max(1.4, name.length * 0.13 + 0.3);
      const spriteH = 0.42;

      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0,                          // starts invisible; rAF drives it
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(spriteW, spriteH, 1);

      /* Random grid cell — same spread pattern as original */
      const col = Math.floor(Math.random() * D);
      const row = Math.floor(Math.random() * D);
      const x   = -GRID_SIZE / 2 + (col + 0.5) * STEP;
      const z   = -GRID_SIZE / 2 + (row + 0.5) * STEP;
      sprite.position.set(x, 0, z);

      phaseArr[i] = Math.random() * MAX_HEIGHT;
      bx[i] = x;
      bz[i] = z;
      spriteArr.push(sprite);
    }

    return { sprites: spriteArr, phases: phaseArr, baseX: bx, baseZ: bz };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Attach sprites to group imperatively ── */
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    sprites.forEach((s) => g.add(s));

    return () => {
      sprites.forEach((s) => {
        g.remove(s);
        const mat = s.material as THREE.SpriteMaterial;
        mat.map?.dispose();
        mat.dispose();
      });
    };
  }, [sprites]);

  /* ── rAF loop — same logic as original RisingParticles ── */
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    for (let i = 0; i < SPRITE_COUNT; i++) {
      const sprite = sprites[i];
      if (!sprite) continue;

      /* Phase-offset rising — wraps at MAX_HEIGHT like original */
      const y    = (t * RISE_SPEED + phases[i]) % MAX_HEIGHT;

      /* Fade out toward top — identical math to original */
      const fade = Math.pow(1 - y / MAX_HEIGHT, 1.4) * 0.88;

      sprite.position.x = baseX[i];
      sprite.position.z = baseZ[i];
      sprite.position.y = y;

      (sprite.material as THREE.SpriteMaterial).opacity = fade;
    }
  });

  return <group ref={groupRef} />;
}

/* ═══════════════════════════════════════════════════════════
    ROOT COMPONENT (unchanged — Lenis optimized)
═══════════════════════════════════════════════════════════ */
export default function PremiumBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#000000]">
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 3.5, 20], fov: 75 }}
        eventPrefix="client"
      >
        <NeuralSphere />
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 8, 0]} color="#0ea5e9" intensity={4} distance={22} decay={2} />
        <GridFill3D />
        <DeformableGrid />
        <RisingParticles />
      </Canvas>
    </div>
  );
}