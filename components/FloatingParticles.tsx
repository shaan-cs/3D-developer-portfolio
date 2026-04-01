"use client";

import { useEffect, useRef, useState } from "react";

const PARTICLE_COUNT = 45; // 👈 reduced density

export default function FloatingParticles() {
  const [particles, setParticles] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // create particles
  useEffect(() => {
    setParticles(Array.from({ length: PARTICLE_COUNT }, (_, i) => i));
  }, []);

  // 🎯 smooth mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const particles = document.querySelectorAll(".particle");

      particles.forEach((particle: any) => {
        const rect = particle.getBoundingClientRect();

        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 140) {
          const angle = Math.atan2(dy, dx);
          const force = (140 - distance) / 140;

          // 👇 smoother movement
          const moveX = Math.cos(angle) * force * 18;
          const moveY = Math.sin(angle) * force * 18;

          particle.style.transition = "transform 0.25s ease-out";

          particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
        } else {
          particle.style.transform = "";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="particles-container">
      {particles.map((p) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;

        return (
          <span
            key={p}
            className="particle"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              animationDuration: `${12 + Math.random() * 10}s`, // 👈 slower & smooth
              animationDelay: `${Math.random() * 6}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        );
      })}
    </div>
  );
}