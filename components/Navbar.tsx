"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger for the hide/show logic
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { name: "Home", id: "hero" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
]

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  // =========================
  // LUXURY ENTRANCE & SCROLL HIDE
  // =========================
  useGSAP(() => {
    // 1. Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    gsap.set(".nav-anim", { 
      opacity: 0, 
      y: 40, 
      rotationX: -90, 
      transformOrigin: "50% 0%",
      filter: "blur(10px)" 
    });

    tl.to(headerRef.current, { opacity: 1, duration: 0.5 })
      .to(logoRef.current, { opacity: 1, y: 0, rotationX: 0, filter: "blur(0px)", duration: 1.5 }, "-=0.2")
      .to(".nav-anim", { opacity: 1, y: 0, rotationX: 0, filter: "blur(0px)", stagger: 0.1, duration: 1.2 }, "-=1.2");

    // 2. Smart Hide on Scroll (Lenis Compatible)
    const showAnim = gsap.from(headerRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.4,
      ease: "power2.out"
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      }
    });
  }, { scope: headerRef });

  // =========================
  // MAGNETIC EFFECT
  // =========================
  const handleMagnetic = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: "power2.out" });
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
  };

  // =========================
  // ✅ ENHANCED LENIS SCROLL
  // =========================
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const lenis = (window as any).lenis;

    if (lenis && element) {
      lenis.scrollTo(element, {
        offset: -80,
        duration: 1.5, // Thoda slow aur cinematic scroll
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Matches global easing
      });
    } else {
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 md:py-8 px-5 md:px-10  opacity-0"
      style={{ perspective: "1000px" }}
    >
      <div className="w-full max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-2">
        
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* LOGO */}
          <div
            ref={logoRef}
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            onClick={() => scrollToSection('hero')}
            className="nav-anim cursor-pointer group select-none flex-shrink-0"
          >
            <h1 className="text-xl md:text-3xl font-extrabold tracking-tight italic leading-none">
              <span className="text-white">S H A H N</span>
              <span className="text-white/10">-</span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent pr-6">A W A Z
              </span>
            </h1>
          </div>

          {/* HIRE ME: Mobile */}
          <div className="md:hidden nav-anim">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 
                         text-white font-bold text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              Hire Me!
            </button>
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-4 w-full md:w-auto">
          {navLinks.map((link) => (
            <div key={link.id} className="nav-anim relative">
              <button
                onMouseMove={handleMagnetic}
                onMouseLeave={resetMagnetic}
                onClick={() => scrollToSection(link.id)}
                className="relative px-4 md:px-6 py-2.5 md:py-2 rounded-full text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.15em]
                           text-white/80 hover:text-cyan-400 transition-colors duration-300"
              >
                <div className="absolute inset-0 rounded-full border border-white/10 overflow-hidden pointer-events-none">
                  <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#22d3ee_50%,transparent_60%,transparent_100%)] 
                                  animate-[spin_4s_linear_infinite] opacity-30"></div>
                  <div className="absolute inset-[1px] bg-black/80 rounded-full"></div>
                </div>
                <span className="relative z-10">{link.name}</span>
              </button>
            </div>
          ))}

          {/* HIRE ME: Desktop */}
          <div className="hidden md:block nav-anim ml-2">
            <button
              onMouseMove={handleMagnetic}
              onMouseLeave={resetMagnetic}
              onClick={() => scrollToSection('contact')}
              className="px-8 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 
                         text-white font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)]
                         hover:from-white hover:to-white hover:text-black transition-all duration-500 active:scale-90"
            >
              Hire Me!
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}