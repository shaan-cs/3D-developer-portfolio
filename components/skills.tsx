"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiGit,
  SiGreensock,
  SiGithub,
  SiFramer,
  SiMysql,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "Framer", icon: SiFramer, color: "#0055FF" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
];

export function Skills() {
  const containerRef = useRef(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);

  // =========================
  // ✅ CINEMATIC REVEAL
  // =========================
  useGSAP(() => {

    // 🔥 Ensure ScrollTrigger refresh (Lenis sync safe)
    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%",
      }
    });

    // 🔥 HEADING
    tl.from(headingRef.current, {
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
    });

    // ==========================================
    // 🔥 WORD BY WORD TEXT ANIMATION
    // ==========================================
    const lines = [".line-1", ".line-2", ".line-3"];

    lines.forEach((line, index) => {
      tl.from(`${line} .word`, {
        opacity: 0,
        x: 30,
        filter: "blur(5px)",
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.out",
      }, index === 0 ? "-=0.5" : ">-0.4");
    });

    // ==========================================
    // 🔥 SKILLS BOUNCE
    // ==========================================
    skillsRef.current.forEach((el, index) => {
      if (!el) return;

      const fromY = index % 2 === 0 ? -120 : 120;

      gsap.fromTo(
        el,
        {
          y: fromY,
          opacity: 0,
          scale: 0.7,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          delay: index * 0.08,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            // ✅ Lenis-friendly optimization
            invalidateOnRefresh: true,
          }
        }
      );
    });

  }, { scope: containerRef });

  type SplitTextProps = {
    text: string;
    className?: string;
  };

  const SplitText = ({ text, className }: SplitTextProps) => (
    <span className={`${className} block`}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="word inline-block mr-[0.3em] whitespace-nowrap"
        >
          {word}
        </span>
      ))}
    </span>
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-transparent"
    >
      <div className="container mx-auto px-6 lg:px-20">

        {/* --- HEADING --- */}
        <div ref={headingRef} className="mb-20 flex flex-col items-start">
          <h2 className="text-white font-black text-[clamp(30px,4vw,50px)] leading-none tracking-tighter uppercase">
            My <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent pr-4">Skills</span>
          </h2>

          <div className="mt-10 space-y-2">
            <p className="text-white/70 text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.25em] leading-relaxed max-w-3xl">

              <SplitText
                className="line-1"
                text="Technologies and tools I use to bring ideas to life."
              />

              <span className="block h-1" />

              <SplitText
                className="line-2"
                text="Crafting scalable, high-performance applications with modern frameworks and clean architecture."
              />

              <span className="block h-1" />

              <span className="line-3 block text-white/50 italic">
                {"Focused on delivering ".split(" ").map((w, i) => (
                  <span key={i} className="word inline-block mr-[0.3em] whitespace-nowrap">{w}</span>
                ))}

                <span className="word inline-block text-cyan-400 font-black not-italic mr-[0.3em]">SECURE,</span>
                <span className="word inline-block text-cyan-400 font-black not-italic mr-[0.3em]">OPTIMIZED,</span>

                {"and visually engaging digital experiences.".split(" ").map((w, i) => (
                  <span key={i} className="word inline-block mr-[0.3em] whitespace-nowrap">{w}</span>
                ))}
              </span>

            </p>
          </div>
        </div>

        {/* --- SKILLS GRID --- */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-10 md:gap-20">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => { if (el) skillsRef.current[index] = el; }}
              className="reveal-skill flex flex-col items-center group"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
                className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
              >
                {/* ROTATING BEAM */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-0">
                  <div
                    className="absolute inset-[-150%] animate-[spin_4s_linear_infinite]"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, ${skill.color} 50%, transparent 60%, transparent 100%)`
                    }}
                  />
                </div>

                {/* GLASS MASK */}
                <div className="absolute inset-[2px] bg-black rounded-full z-10 backdrop-blur-3xl transition-all duration-500 group-hover:bg-zinc-900 border border-white/5" />

                {/* ICON */}
                <div className="relative z-20 flex flex-col items-center justify-center p-2">
                  <skill.icon
                    className="text-2xl md:text-3xl transition-transform duration-500 group-hover:scale-110"
                    style={{ color: skill.color }}
                  />
                </div>

                {/* GLOW */}
                <div
                  className="absolute inset-0 rounded-full blur-[20px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: skill.color }}
                />
              </motion.div>

              <span className="mt-4 text-[9px] md:text-[11px] font-black text-white/40 uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors duration-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}