"use client";

// import { useRef } from "react";
import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { IconType } from "react-icons";

import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiJavascript,
  SiResend,
  SiCss,
  SiHtml5,
  SiPython,
  SiMysql,
  SiDotnet,
  SiGoogle,
  SiFirebase,
} from "react-icons/si";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const techIcons: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  MongoDB: SiMongodb,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
  Express: SiExpress,
  JavaScript: SiJavascript,
  "Resend API": SiResend,
  CSS: SiCss,
  HTML5: SiHtml5,
  Python: SiPython,
  SQL: SiMysql,
  ".Net": SiDotnet,
  EJS: SiJavascript,
  "Gemini API": SiGoogle,
  Firebase: SiFirebase,
};

const gitlink = "https://github.com/shaan-cs"

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Ilzifa Solution- Interior Design Platform",
    description:
      "Ilzifa Solution is a high-performance business website built with Next.js and React, delivering fast, SEO-optimized, and scalable digital experiences. It features secure communication systems with real-time email integration and is deployed on a robust CI/CD pipeline for reliability and performance.",
    image: "/projects/project1.png",
    tech: ["Next.js", "JavaScript", "Resend API", "Tailwind", "CSS"],
    github: gitlink,
    demo: "http://ilzifa.com/",
  },
  {
    id: 2,
    title: "sHs Green Store - E-commerce Platform",
    description:
      "Developed a modern and responsive website using pure HTML, CSS, and JavaScript, featuring a clean UI with smooth gradient backgrounds and visually appealing card layouts. Focused on user experience, performance, and intuitive design for seamless interaction.",
    image: "/projects/project2.png",
    tech: ["HTML5", "CSS", "JavaScript",],
    github: gitlink,
    demo: "https://shsstore.netlify.app/",
  },
  {
    id: 3,
    title: "QR Code Generator Application",
    description:
      "Built a desktop-based QR Code Generator application using .NET Framework and C#. It allows users to generate and download QR codes instantly with a clean and user-friendly interface. Focused on performance, simplicity, and efficient functionality.",
    image: "/projects/project3.png",
    tech: [".Net", "C#"],
    github: gitlink,
    demo: "https://github.com/shaan-cs/CSharp-QR-Code-Generator",
  },
  {
    id: 4,
    title: "NetGuard-IDS/IPS System",
    description:
      "Implemented an Intrusion Detection and Prevention System (IDS/IPS) that monitors network activity in real-time to detect port scanning and brute-force attacks. The system automatically blocks suspicious IP addresses and sends instant email alerts for enhanced security and quick response.",
    image: "/projects/project4.png",
    tech: ["Python", "SQL"],
    github: gitlink,
    demo: "https://github.com/shaan-cs/ids_project",

  },
  {
    id: 5,
    title: "WonderLust - Property Listing (Airbnb Style)",
    description:
      "Built a full-stack CRUD-based web app using Node.js, Express, EJS, and MongoDB for dynamic listing management with a clean and responsive interface.",
    image: "/projects/project5.png",
    tech: ["Express", "EJS", "Node.js", "MongoDB"],
    github: gitlink,
    demo: "",
  },
  {
    id: 6,
    title: "Ai - Mock Interview Platform",
    description:
      "AI-Powered Real-Time Mock Interview Platform is a Next.js and Firebase-based web app that uses Vapi and Google Gemini APIs to simulate real interviews with voice interaction and intelligent feedback.",
    image: "/projects/project6.png",
    tech: ["Next.js", "Gemini API", "Firebase", "Tailwind"],
    github: gitlink,
    demo: "",
  },
];

/* ✅ FIXED CARD COMPONENT */
const ProjectCard = ({ project, index, isInView }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 70, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 70, damping: 30 });

  const rotateX = useTransform(smoothY, [-20, 20], [8, -8]);
  const rotateY = useTransform(smoothX, [-20, 20], [-8, 8]);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    x.set((e.clientX - rect.left - centerX) / 8);
    y.set((e.clientY - rect.top - centerY) / 8);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group"
    >
      {/* rotating border */}
      {/* 🔥 HERO STYLE ROTATING SHINE BORDER */}

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={{
          x: smoothX,
          y: smoothY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl border overflow-hidden 
h-[65vh] md:h-[85vh] flex flex-col bg-black"
      >

        {/* IMAGE */}
        <div className="relative h-[40%] w-full overflow-hidden ">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-white text-xl font-semibold mb-3">
              {project.title}
            </h3>

            <p className="text-white/70 text-sm leading-relaxed mb-4">
              {project.description}
            </p>
          </div>

          {/* TECH */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((tech: string) => {
              const Icon = techIcons[tech as keyof typeof techIcons] || null;

              return (
                <div
                  key={tech}
                  className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full text-xs text-white hover:bg-white/20 transition-all duration-300"
                >
                  {Icon && <Icon size={14} className="text-white/80" />}
                  <span>{tech}</span>
                </div>
              );
            })}
          </div>

          {/* BUTTONS */}

          <div className="flex  justify-between items-center gap-3 mt-auto">

            {project.id === 5 || project.id === 6 ? (
              <div className="w-full text-center">
                <button
                  className="
          w-full
          px-4 py-2
          rounded-lg
          text-sm
          font-medium
          text-white
          bg-gradient-to-r from-gray-600 to-gray-800
          opacity-80
          cursor-not-allowed
        "
                >
                  Coming Soon
                </button>
              </div>
            ) : (
              <>
                <a
                  href={project.github}
                  target="_blank"
                  className="relative group flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-lg border border-white/10 overflow-hidden pointer-events-none">
                    <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#22d3ee_50%,transparent_60%,transparent_100%)] animate-[spin_4s_linear_infinite] opacity-100"></div>
                    <div className="absolute inset-[1.5px] bg-black rounded-lg group-hover:bg-zinc-900 transition-colors"></div>
                  </div>

                  <span className="relative z-10 flex items-center gap-2">
                    <FiGithub /> GitHub
                  </span>
                </a>

                <a
                  href={project.demo}
                  target="_blank"
                  className="relative group flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-lg border border-white/10 overflow-hidden pointer-events-none">
                    <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#22d3ee_50%,transparent_60%,transparent_100%)] animate-[spin_4s_linear_infinite] opacity-100"></div>
                    <div className="absolute inset-[1.5px] bg-black rounded-lg group-hover:bg-zinc-900 transition-colors"></div>
                  </div>

                  <span className="relative z-10 flex items-center gap-2">
                    <FiExternalLink /> Live
                  </span>
                </a>
              </>
            )}
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {

    // ✅ LENIS SYNC (ADDED ONLY THIS PART)
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    if (!headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { x: -120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.6,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 50%",
          invalidateOnRefresh: true,
        }
      }
    );

    cardsRef.current.forEach((card, index) => {

      if (!card) return;

      let fromVars: any;

      if (index === 0) fromVars = { x: -120, opacity: 0 };
      else if (index === 1) fromVars = { x: 120, opacity: 0 };
      else fromVars = { y: 120, opacity: 0 };

      gsap.fromTo(
        card,
        fromVars,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
          delay: index * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            invalidateOnRefresh: true,
          }
        }
      );

    });

    return () => {
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
      }
    };

  }, []);

  return (
    <section id="projects" ref={ref} className="relative py-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 ">

        {/* Heading  */}

        <div ref={headingRef} className="mb-16 md:mb-24 flex flex-col items-start">
          <h2 className="text-white font-black text-[clamp(30px,4vw,50px)] leading-none tracking-tighter uppercase">
            My <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent  pr-4">Projects</span>
          </h2>
          <div className="w-20 h-[2px] bg-cyan-500/50 mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 px-3 lg:px-16 gap-20 ">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <ProjectCard
                project={project}
                index={index}
                isInView={isInView}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
