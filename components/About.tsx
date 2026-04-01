

"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaReact, FaNodeJs, FaDocker, FaHtml5, FaCss3Alt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5+", label: "Production Projects" },
  { value: "2+", label: "Certifications" },
  { value: "100%", label: "Commitment" },
];

export default function About() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  // =========================
  // MAGNETIC EFFECT (Keep Existing)
  // =========================
  const handleMagnetic = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
  };

  // =========================
  // LENIS + SCROLLTRIGGER SYNC (SAFE)
  // =========================
  useGSAP(() => {

    // ✅ Sync Lenis scroll with ScrollTrigger
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        invalidateOnRefresh: true,
      }
    });

    gsap.set(headingRef.current, { opacity: 0, y: 50 });
    gsap.set(".reveal-para", { opacity: 0, rotateX: -45, y: 40, transformOrigin: "top center" });
    gsap.set(".reveal-card", { opacity: 0, y: 30, scale: 0.9 });
    gsap.set(rightContentRef.current, { opacity: 0, scale: 0.7, rotateY: 25, x: 100 });

    tl.to(headingRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" })
      .to(".reveal-para", { opacity: 1, rotateX: 0, y: 0, stagger: 0.4, duration: 2, ease: "expo.out" }, "-=1")
      .to(".reveal-card", { opacity: 1, y: 0, scale: 1, stagger: 0.2, duration: 1.5, ease: "back.out(1.4)" }, "-=1.5")
      .to(rightContentRef.current, { opacity: 1, scale: 1, rotateY: 0, x: 0, duration: 2.5, ease: "expo.out" }, "-=2.2");

    // ✅ Cleanup (important for performance)
    return () => {
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
      }
    };

  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full py-20 md:py-40 overflow-hidden "
      style={{ perspective: "1500px" }}
    >
      <div className="container mx-auto px-6 lg:px-20">

        <div ref={headingRef} className="mb-12 md:mb-16 flex flex-col items-start">
          <h2 className="text-white font-black  text-[clamp(30px,4vw,50px)] leading-none tracking-tighter uppercase">
            About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent pr-4">Me</span>
          </h2>
          <div className="w-20 h-[2px] bg-cyan-500/50 mt-4" />
        </div>

        {/* divided */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] items-center gap-0">

          <div ref={leftContentRef} className="space-y-10 lg:pr-10">
            <div className="space-y-8">
              <p className="reveal-para text-base md:text-lg lg:text-xl text-white/70 leading-relaxed font-medium">
                I'm a passionate <span className="text-white font-semibold underline decoration-cyan-500/30 underline-offset-8">Full Stack Developer</span> currently pursuing my BCA,
                with a focus on building real-world, impactful projects. I enjoy turning ideas into interactive
                web applications using <span className="text-cyan-400">React, Next.js, and the MERN stack.</span>
              </p>

              <p className="reveal-para text-base md:text-lg lg:text-xl text-white/70 leading-relaxed border-l-2 border-cyan-500/20 pl-6">
                Alongside development, I dive deep into <span className="text-cyan-500 italic">Cybersecurity and Networking. </span>
                With certifications in areas like SQL Injection and IoT,
                I’m constantly exploring how systems work behind the scenes.
              </p>

              <p className="reveal-para text-base md:text-lg lg:text-xl text-white/70 leading-relaxed">
                Currently, I'm sharpening my skills through hands-on projects, placement
                training, and continuous learning. I’m always pushing myself to grow and stay ahead in tech.
              </p>
            </div>
            {/*  card  */}

            <div className="flex flex-row justify-start items-center gap-3 md:gap-6 pt-6 w-full">
              {stats.map((stat, i) => (
                <div key={i} onMouseMove={handleMagnetic} onMouseLeave={resetMagnetic} className="reveal-card relative group flex-1 max-w-[160px]">
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-white/10 overflow-hidden pointer-events-none">
                    <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#22d3ee_50%,transparent_60%,transparent_100%)] animate-[spin_4s_linear_infinite]"></div>
                    <div className="absolute inset-[1.5px] bg-black rounded-[11px] md:rounded-[15px] group-hover:bg-zinc-950 transition-colors"></div>
                  </div>
                  <div className="relative h-full px-2 py-6 md:px-6 md:py-10 flex flex-col items-center justify-center text-center z-10">
                    <h3 className="text-2xl md:text-4xl font-black text-white mb-1 leading-none">{stat.value}</h3>
                    <p className="text-[7px] md:text-[10px] font-bold text-white/50 uppercase tracking-tighter leading-tight">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* circle rotation  */}
          <div ref={rightContentRef} className="relative flex items-center justify-center w-full py-10 lg:py-0">
            <div
              className="relative w-full aspect-square flex items-center justify-center"
              style={{ "--size": "clamp(300px, 40vw, 440px)" } as any}
            >
              <div
                className="absolute rounded-full border border-cyan-400 animate-[spin_40s_linear_infinite]"
                style={{ width: "var(--size)", height: "var(--size)" }}
              >
                {[<FaReact />, <FaNodeJs />, <FaDocker />, <FaHtml5 />, <FaCss3Alt />].map((icon, idx) => (
                  <div
                    key={idx}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ transform: `rotate(${idx * 72}deg) translate(calc(var(--size) / 2)) rotate(-${idx * 72}deg)` }}
                  >
                    <div className="p-3 bg-black/80 backdrop-blur-md border border-cyan-500/20 rounded-full text-cyan-400 text-xl shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                      {icon}
                    </div>
                  </div>
                ))}
              </div>

              {/*  image logo  */}
              <div
                className="relative rounded-full border border-white/50 overflow-hidden z-10 "
                style={{ width: "calc(var(--size) * 0.75)", height: "calc(var(--size) * 0.75)" }}
              >
                <Image src="/Portfolio.png" alt="Shaan" fill className="object-cover" priority />
              </div>

              <div className="absolute inset-0 rounded-full pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
