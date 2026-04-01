"use client";

import { useEffect, useState } from "react";
import LuxuryFiberBackground from "@/components/CyberBackground";



import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import About from "@/components/About";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/Contact";

export default function Home() {

  useEffect(() => {
    // ✅ optional loader fade (no scroll blocking)
    const rootLoader = document.getElementById("root-loader");

    if (rootLoader) {
      setTimeout(() => {
        rootLoader.style.opacity = "0";

        setTimeout(() => {
          rootLoader.remove();
        }, 600);
      }, 400);
    }
  }, []);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">

      <LuxuryFiberBackground /> 
     
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />

    </main>
  );
}