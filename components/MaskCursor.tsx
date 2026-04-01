"use client";

import { useEffect, useRef } from "react";

/* ─── Lerp helper ─── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function MaskCursor() {
  /* Element refs */
  const dotRef   = useRef<HTMLDivElement>(null);
  const maskRef  = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  /* Mutable state */
  const mouse    = useRef({ x: -300, y: -300 });
  const smooth   = useRef({ x: -300, y: -300 });
  const raf      = useRef<number>(0);
  const mounted  = useRef(false);
  const scale    = useRef({ mask: 1, dot: 1 });
  const targetScale = useRef({ mask: 1, dot: 1 });
  const opacity  = useRef({ mask: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    mounted.current = true;
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (opacity.current.mask === 0) {
        smooth.current = { x: e.clientX, y: e.clientY };
        opacity.current.mask = 1;
        [dotRef, maskRef, glowRef, ringRef].forEach((r) => {
          if (r.current) r.current.style.opacity = "1";
        });
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;

      /* ── HIDE ON INPUTS / FORMS ── */
      if (t.closest("input, textarea, select, form, label, .no-cursor")) {
        [dotRef, maskRef, glowRef, ringRef].forEach((r) => {
          if (r.current) r.current.style.opacity = "0";
        });
        return;
      } else {
        // Show again if not on input
        [dotRef, maskRef, glowRef, ringRef].forEach((r) => {
          if (r.current) r.current.style.opacity = "1";
        });
      }

      /* Hover States */
      if (t.closest("a, button, [data-cursor='pointer']")) {
        targetScale.current.mask = 2.5; // Scale up more because base size is small
        targetScale.current.dot  = 0;
        if (maskRef.current) {
          maskRef.current.style.borderColor = "rgba(34,211,238,0.7)";
        }
        return;
      }

      if (t.closest("h1, h2, h3, p, span, [data-cursor='text']")) {
        targetScale.current.mask = 2.0;
        targetScale.current.dot  = 1;
        return;
      }

      /* Reset */
      targetScale.current.mask = 1;
      targetScale.current.dot  = 1;
      if (maskRef.current) {
        maskRef.current.style.borderColor = "rgba(34,211,238,0.15)";
      }
    };

    const onClick = () => {
      targetScale.current.mask = 0.7;
      setTimeout(() => { targetScale.current.mask = 1; }, 180);
    };

    /* ════ CONFIG ════ */
    const MASK_SIZE  = 40; // <--- normal size kam kar diya (pehle 120 tha)
    const LERPF_FAST = 0.14;
    const LERPF_GLOW = 0.09;
    const LERPF_SCAL = 0.10;

    const glow = { ...smooth.current };

    const loop = () => {
      if (!mounted.current) return;

      const { x: mx, y: my } = mouse.current;

      smooth.current.x = lerp(smooth.current.x, mx, LERPF_FAST);
      smooth.current.y = lerp(smooth.current.y, my, LERPF_FAST);
      glow.x = lerp(glow.x, mx, LERPF_GLOW);
      glow.y = lerp(glow.y, my, LERPF_GLOW);

      scale.current.mask = lerp(scale.current.mask, targetScale.current.mask, LERPF_SCAL);
      scale.current.dot  = lerp(scale.current.dot,  targetScale.current.dot,  LERPF_SCAL);

      const { x: sx, y: sy } = smooth.current;
      const half = (MASK_SIZE * scale.current.mask) / 2;

      if (dotRef.current) {
        const ds = scale.current.dot;
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px) scale(${ds})`;
      }

      if (maskRef.current) {
        const ms = scale.current.mask;
        maskRef.current.style.transform = `translate(${sx - half}px, ${sy - half}px) scale(1)`;
        maskRef.current.style.width  = `${MASK_SIZE * ms}px`;
        maskRef.current.style.height = `${MASK_SIZE * ms}px`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.x - 90}px, ${glow.y - 90}px)`;
      }

      if (ringRef.current) {
        const rs = scale.current.mask * 1.15;
        const rh = (MASK_SIZE * rs) / 2;
        ringRef.current.style.transform = `translate(${sx - rh}px, ${sy - rh}px)`;
        ringRef.current.style.width  = `${MASK_SIZE * rs}px`;
        ringRef.current.style.height = `${MASK_SIZE * rs}px`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove",  onMove,   { passive: true });
    window.addEventListener("mouseover",  onOver,   { passive: true });
    window.addEventListener("click",      onClick,  { passive: true });
    raf.current = requestAnimationFrame(loop);

    return () => {
      mounted.current = false;
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onOver);
      window.removeEventListener("click",      onClick);
      cancelAnimationFrame(raf.current);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        style={{
          position: "fixed", top: 0, left: 0, width: "180px", height: "180px",
          borderRadius: "50%", pointerEvents: "none", zIndex: 9995, opacity: 0,
          background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.04) 50%, transparent 75%)",
          filter: "blur(8px)", willChange: "transform", transition: "opacity 0.4s ease",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0, width: "50px", height: "50px",
          borderRadius: "50%", border: "1px solid rgba(34,211,238,0.35)",
          pointerEvents: "none", zIndex: 9996, opacity: 0,
          willChange: "transform, width, height", transition: "opacity 0.4s ease, border-color 0.3s ease",
        }}
      />
      <div
        ref={maskRef}
        style={{
          position: "fixed", top: 0, left: 0, width: "40px", height: "40px",
          borderRadius: "50%", background: "white", mixBlendMode: "difference",
          border: "1.5px solid rgba(34,211,238,0.15)", pointerEvents: "none",
          zIndex: 9997, opacity: 0, willChange: "transform, width, height",
          transition: "opacity 0.4s ease, width 0.25s cubic-bezier(0.23,1,0.32,1), height 0.25s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0, width: "8px", height: "8px",
          borderRadius: "50%", background: "#22d3ee", pointerEvents: "none",
          zIndex: 9999, opacity: 0, willChange: "transform",
          boxShadow: "0 0 8px rgba(34,211,238,0.9), 0 0 20px rgba(34,211,238,0.4)",
          transition: "opacity 0.4s ease, transform 0.15s ease",
        }}
      />
    </>
  );
}