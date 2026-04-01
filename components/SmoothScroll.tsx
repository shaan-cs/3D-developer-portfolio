"use client";

import { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    // 💎 ULTRA-SMOOTH LUXURY CONFIGURATION
    const lenis = new Lenis({
      lerp: 0.05, // 0.06 se bhi thoda aur smooth (heavy buttery feel)
      wheelMultiplier: 0.8, // Thoda slow initial start
      touchMultiplier: 1.5, 
      infinite: false,
      smoothWheel: true,
      syncTouch: true, 
    });

    lenisRef.current = lenis;

    // 🔥 CRITICAL FIX: Global window object par assign karein
    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
      
      // Dusre components ko batane ke liye ki lenis ready hai
      window.dispatchEvent(new Event("lenis-ready"));
    }

    // GSAP & LENIS SYNC
    lenis.on("scroll", ScrollTrigger.update);

    // Optimized RAF Loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    gsap.ticker.lagSmoothing(0);

    // Anchor Link Handling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        e.preventDefault();
        lenis.scrollTo(anchor.hash, {
          offset: 0,
          duration: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
      (window as any).lenis = null;
    };
  }, []);

  return <>{children}</>;
}