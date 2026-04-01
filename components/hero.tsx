"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   STYLES & ANIMATIONS (Exact same - No Loss)
───────────────────────────────────────────── */
const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap');
  .font-hero { font-family: 'Orbitron', sans-serif; font-weight: 900; letter-spacing: -0.01em; }
  .font-sub { font-family: 'Rajdhani', sans-serif; font-weight: 600; letter-spacing: 0.28em; }
  @keyframes scanline { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  .shimmer-text {
    background: linear-gradient(105deg, #ffffff 0%, #ffffff 40%, rgba(34,211,238,0.9) 50%, #ffffff 60%, #ffffff 100%);
    background-size: 200% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    animation: scanline 6s linear infinite;
  }
  .text-glow-theme {
    display: inline-block; background: linear-gradient(135deg, #22d3ee 0%, #7dd3fc 40%, #ffffff 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    // filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.6)); font-weight: 900;
  }
  .text-glow-cyan {
    background: linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #38bdf8 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    // filter: drop-shadow(0 0 20px rgba(34,211,238,0.5));
  }
  .cursor-blink { animation: opacity 0.9s step-end infinite; }
  @keyframes conicSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .conic-spin { animation: conicSpin 4s linear infinite; }
`;

const words = [
  { text: "IDEAS", imgPath: "/images/ideas.svg" },
  { text: "DESIGNS", imgPath: "/images/designs.svg" },
  { text: "CODE", imgPath: "/images/code.svg" },
  { text: "SECURE", imgPath: "/images/secure.svg" },
  { text: "CONCEPTS", imgPath: "/images/concepts.svg" },
];

const roles = ["Full Stack Developer", "Penetration Tester", "Cybersecurity Analyst"];

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const heroRef = useRef(null);
  const magneticBtnRef = useRef(null);
  const containerRef = useRef(null);

  // --- Magnetic Logic (Same) ---
  const handleMagnetic = (e: any) => {
    if (window.innerWidth < 1024) return;
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, { x: (e.clientX - rect.left - rect.width / 2) * 0.35, y: (e.clientY - rect.top - rect.height / 2) * 0.35, duration: 0.4, ease: "power2.out" });
  };
  const resetMagnetic = (e: any) => gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });

  // --- Word Switcher & Typing Logic (No Changes - All Intact) ---
  useEffect(() => {
    const id = setInterval(() => setCurrentWordIndex(p => (p + 1) % words.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const role = roles[currentRoleIndex];
    let timeout: any;
    if (!isDeleting) {
      if (displayText.length < role.length) { timeout = setTimeout(() => setDisplayText(role.slice(0, displayText.length + 1)), 70); }
      else { timeout = setTimeout(() => setIsDeleting(true), 2000); }
    } else {
      if (displayText.length > 0) { timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40); }
      else { setIsDeleting(false); setCurrentRoleIndex(p => (p + 1) % roles.length); }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  // =============================================
  // 🚀 FIXED INFINITE LANDING LOGIC
  // =============================================
  useGSAP(() => {
    // 1. Create the Landing Timeline
    const landingTl = gsap.timeline({ paused: true });

    landingTl
      .fromTo(".glow-blob", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 2, stagger: 0.3, ease: "power4.out" })
      .fromTo(".line-left", { x: -150, opacity: 0, filter: "blur(15px)" }, { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" }, "-=1.7")
      .fromTo(".line-right", { x: 150, opacity: 0, filter: "blur(15px)" }, { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" }, "-=1.3")
      .fromTo(".line-bottom", { y: 60, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "expo.out" }, "-=1.1")
      .fromTo(".line-center", { scale: 0.7, opacity: 0, filter: "blur(20px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "elastic.out(1, 0.8)" }, "-=0.9");

    // 2. Setup ScrollTrigger to manage visibility and re-trigger
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top 85%",
      end: "bottom 15%",
      onEnter: () => {
        // Initial load par 2s ka wait, baki time turant
        const isFirstLoad = !window.sessionStorage.getItem("hero_animated");
        if (isFirstLoad) {
          gsap.delayedCall(2.0, () => {
            landingTl.restart();
            window.sessionStorage.setItem("hero_animated", "true");
          });
        } else {
          landingTl.restart();
        }
      },
      onEnterBack: () => landingTl.restart(), // Wapas upar aane par phir se land hoga
      onLeave: () => gsap.set([".line-left", ".line-right", ".line-bottom", ".line-center", ".glow-blob"], { opacity: 0 }), // Gayab on scroll away
      onLeaveBack: () => gsap.set([".line-left", ".line-right", ".line-bottom", ".line-center", ".glow-blob"], { opacity: 0 }),
    });

    // Parallax Depth (Lenis Sync)
    gsap.to(containerRef.current, {
      y: 60,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: heroRef });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONT_IMPORT }} />
      <section
        id="hero"
        ref={heroRef}
        className="relative w-full min-h-screen flex items-center justify-center pt-16 md:pt-44 pb-16 overflow-hidden px-6 md:px-0 "
      >
        {/* Background Blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob absolute top-[-5%] left-[-5%] w-[45%] h-[45%] rounded-full bg-cyan-500/10 blur-[130px] opacity-0" />
          <div className="glow-blob absolute bottom-[-5%] right-[-5%] w-[45%] h-[45%] rounded-full bg-blue-600/10 blur-[130px] opacity-0" />
        </div>

        <div ref={containerRef} className="container mx-auto lg:px-20 relative z-10">
          <div className="flex flex-col items-start justify-center">

            <div className="w-full flex flex-col gap-y-5 md:gap-y-6">
              <h1 className="line-left opacity-0 font-hero text-[clamp(28px,5.5vw,85px)] uppercase flex flex-wrap items-center gap-x-3 md:gap-x-7 leading-[1.4] md:leading-[1.1]">
                <span className="shimmer-text shrink-0">Shaping</span>
                <span className="relative inline-flex items-center h-[1.1em] min-w-[160px] md:min-w-[400px]">
                  {words.map((word, i) => (

                    // icons 
                    <span key={i} className="absolute left-0 flex items-center gap-2 md:gap-6 transition-all duration-700"
                      style={{ opacity: i === currentWordIndex ? 1 : 0, transform: i === currentWordIndex ? "translateY(0)" : "translateY(25px)", visibility: i === currentWordIndex ? "visible" : "hidden" }}>
                      <img src={word.imgPath} alt="" className="w-[1em] h-[1em] object-contain rounded-full bg-white p-1.5 border border-cyan-400" />
                      <span className="text-glow-theme">{word.text}</span>
                    </span>
                  ))}
                </span>
              </h1>
              <h1 className="line-right opacity-0 font-hero shimmer-text text-[clamp(28px,5.5vw,85px)] leading-[1.4] md:leading-[1.1] uppercase">Into Real Projects</h1>
              <h1 className="line-bottom opacity-0 font-hero text-[clamp(28px,5.5vw,85px)] leading-[1.4] md:leading-[1.1] uppercase flex flex-wrap items-center">
                <span className="shimmer-text mr-3 md:mr-5">That Deliver </span>
                <span className="text-glow-cyan">Results</span>
              </h1>
            </div>

            {/* typing roles  */}

            <div className="line-center opacity-0 mt-10 md:mt-20 flex items-center ">
              <div className="h-[1px] bg-gradient-to-r from-cyan-500/60 to-transparent w-12 md:w-20" />
              <p className="font-sub text-sm md:text-xl lg:text-2xl text-white/70 uppercase tracking-widest">
                {displayText}<span className="ml-1 text-cyan-400 font-bold cursor-blink">|</span>
              </p>
            </div>
            {/*  button  */}
            
            <div ref={magneticBtnRef} onMouseMove={handleMagnetic} onMouseLeave={resetMagnetic} className="line-bottom opacity-0 mt-12  relative group inline-block">
              <a href="/cv/Shahnawaz_cv.pdf" download>
                <button className="relative px-10 py-5 rounded-full bg-black text-white font-hero text-[10px] md:text-[11px] uppercase tracking-[0.25em]">
                  <div className="absolute inset-0 rounded-full border border-white/10 overflow-hidden pointer-events-none">
                    <div className="conic-spin absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#22d3ee_50%,transparent_60%,transparent_100%)] opacity-30" />
                    <div className="absolute inset-[1.5px] bg-black rounded-full" />
                  </div>
                  <span className="relative z-10 flex items-center gap-3">Download CV <span className="group-hover:translate-x-2 transition-transform duration-300 text-cyan-400 font-bold">→</span></span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;