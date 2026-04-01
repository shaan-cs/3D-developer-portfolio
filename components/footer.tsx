"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUp, FiTerminal, FiShield, FiGlobe, FiTarget, FiCodesandbox } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef(null);
  const [time, setTime] = useState("");
  
  // Interactive States
  const [showConsole, setShowConsole] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLog, setTerminalLog] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Reset Console when hidden
  useEffect(() => {
    if (!showConsole) {
      setTerminalInput("");
      setTerminalLog([]);
      setIsProcessing(false);
    }
  }, [showConsole]);

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 🛠️ Logic: Only start processing on ENTER key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && terminalInput.trim() !== "" && !isProcessing) {
      setIsProcessing(true);
      setTerminalLog(["INITIALIZING_SECURE_PROTOCOL...", "FETCHING_ENCRYPTION_KEYS..."]);

      setTimeout(() => {
        setTerminalLog(prev => [
          ...prev, 
          "PACKAGES_UPDATED_SUCCESSFULLY", 
          "ACCESS_GRANTED: ROOT_USER", 
          "---------------------------------",
          "FINAL_STATUS: COMPLETED", // Completed Message
          "WELCOME TO THE SHAAN PORTFOLIO" // Updated Welcome Message
        ]);
        setTerminalInput(""); // Clear input after enter
      }, 1500);
    }
  };

  useGSAP(() => {
    ScrollTrigger.refresh();
    gsap.from(".footer-reveal", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
        invalidateOnRefresh: true,
      },
    });
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#000] pt-12 pb-12 border-t border-white/[0.03] text-white/60"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-cyan-700/20 to-transparent rounded-full blur-[100px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-8 lg:px-24 relative z-10 grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-x-10 gap-y-16 items-start">

        {/* LEFT SECTION */}
        <div className="footer-reveal flex flex-col gap-5 md:col-start-1">
          <div className="group">
            <h1 className="md:text-4xl font-black italic tracking-tighter uppercase flex items-center gap-1 group-hover:scale-[1.03] transition-transform duration-500">
              <span className="text-white">SHAAN</span>
              <span className="bg-gradient-to-br from-cyan-400 to-blue-600 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-500">.</span>
            </h1>
            <p className="text-[11px] uppercase tracking-[0.5em] font-medium text-white/30 mt-5 group-hover:text-cyan-400/60 transition-colors duration-500">
              Architechting Next-Gen <span className="text-white/40 italic font-bold">Secure Frameworks</span>
            </p>
          </div>

          <div className="flex gap-10 border-t border-white/[0.03] pt-5">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-cyan-500/50">
                <FiShield className="text-sm" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Defense Vector</h4>
              </div>
              <p className="text-xs leading-relaxed text-white/60">Building invisible shields where data, systems, and trust remain uncompromised.</p>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-cyan-500/50">
                <FiCodesandbox className="text-sm" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Innovation Core</h4>
              </div>
              <p className="text-xs leading-relaxed text-white/60">Innovating at the core, securing every layer of the system.</p>
            </div>
          </div>
        </div>

        {/* CENTER SECTION */}
        <div className="footer-reveal flex flex-col items-center gap-12 md:col-start-2">
          <div className="flex flex-col items-center gap-5 px-1 py-6 md:p-5 rounded-3xl border border-cyan-500/5 bg-gradient-to-b from-white/[0.09] to-transparent shadow-[inset_0_0_25px_0_rgba(6,182,212,0.03)] backdrop-blur-md">
            <div className="flex items-center gap-4 px-8 py-2.5 rounded-full border border-cyan-500/10 bg-cyan-950/20 shadow-[-5px_0_20px_0_rgba(34,211,238,0.15)]">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-70"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_10px_1px_#22d3ee]"></span>
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-cyan-400/90 hover:text-cyan-200 transition-colors">
                System Online
              </span>
            </div>
            <p className="text-[10px] font-mono text-white/50 tracking-widest uppercase flex items-center gap-2">
              <FiGlobe className="text-cyan-600" />
              {time} IST <span className="text-white/10">|</span> Based in New Delhi, India
            </p>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold px-5 text-center leading-loose">
              Accepting high-impact opportunities
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-reveal flex flex-col items-center md:items-end gap-12 md:col-start-3">
          <div className="flex flex-col gap-6 w-full md:w-80">
            
            {/* Command Console */}
            <div className="relative">
                <div 
                  onClick={() => { setShowConsole(!showConsole); setShowQuote(false); }}
                  className="flex items-center gap-4 group cursor-pointer p-5 rounded-2xl border border-cyan-500/40 bg-white/[0.09] transition-all hover:bg-cyan-500/[0.03] hover:border-cyan-500/20"
                >
                  <FiTerminal className={`transition-all duration-300 ${showConsole ? 'text-cyan-400 scale-110' : 'text-cyan-500/30'}`} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 group-hover:text-white/80">Command Console</span>
                </div>

                <AnimatePresence>
                  {showConsole && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="mt-2 p-4 bg-black border border-cyan-500/20 rounded-xl overflow-hidden font-mono text-[10px] shadow-2xl z-20"
                    >
                      <div className="space-y-1 text-cyan-500/60 mb-3">
                        {terminalLog.map((log, i) => <div key={i} className="animate-pulse">_ {log}</div>)}
                      </div>
                      <div className="flex items-center gap-2 text-cyan-400">
                        <span className="shrink-0 text-white/40">shaan@blacknet:~$</span>
                        <input 
                          autoFocus 
                          value={terminalInput} 
                          onChange={(e) => setTerminalInput(e.target.value)} 
                          onKeyDown={handleKeyDown}
                          onBlur={() => !terminalInput && setShowConsole(false)} 
                          className="bg-transparent border-none outline-none w-full text-white" 
                          placeholder="Type & press Enter..." 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

            {/* Target Scope */}
            <div className="relative">
                <div 
                  onClick={() => { setShowQuote(!showQuote); setShowConsole(false); }}
                  className="flex items-center gap-4 group cursor-pointer p-5 rounded-2xl border border-cyan-500/40 bg-white/[0.09] transition-all hover:bg-cyan-500/[0.03] hover:border-cyan-500/20"
                >
                  <FiTarget className={`transition-all duration-300 ${showQuote ? 'text-cyan-400 scale-110' : 'text-cyan-500/30'}`} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 group-hover:text-white/80">Target Scope</span>
                </div>

                <AnimatePresence>
                  {showQuote && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                      onMouseLeave={() => setShowQuote(false)}
                      className="mt-2 p-6 bg-gradient-to-r from-cyan-950/10 to-transparent border-l-2 border-cyan-500/30 rounded-r-xl"
                    >
                      <p className="text-xs italic text-cyan-200/70 font-serif leading-relaxed">
                        "Security is not a product, but a process. In the world of code, the only true defense is continuous innovation."
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.15, y: -8 }}
            whileTap={{ scale: 0.9 }}
            className="relative group w-16 h-16 flex items-center justify-center rounded-full border-2 border-dashed border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-700 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
          >
            <div className="absolute inset-[3px] rounded-full overflow-hidden pointer-events-none group-hover:opacity-60 transition-opacity duration-700">
              <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#22d3ee_50%,transparent_65%,transparent_100%)] animate-[spin_5s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] opacity-60" />
            </div>
            <div className="absolute inset-[4px] bg-[#0A0B0E] rounded-full z-10" />
            <FiArrowUp className="relative z-20 w-8 h-8 text-white/50 group-hover:text-cyan-400 group-hover:rotate-[-45deg] transition-all duration-700 ease-out" />
          </motion.button>
        </div>

        {/* BOTTOM BAR */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-[auto,auto] gap-8 justify-between items-center border-t border-white/[0.3] pt-5">
          <p className="footer-reveal text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold cursor-default">
            © 2026 <span className="text-white/40">Mohd Shahnawaz</span> <span className="mx-3 text-white/5">/</span> All Vectors Immutable
          </p>
          <div className="footer-reveal text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold flex gap-10">
            <a href="#" className="hover:text-cyan-300 transition-all duration-500">Privacy Protocol</a>
            <a href="#" className="hover:text-cyan-300 transition-all duration-500">Security Parameters</a>
          </div>
        </div>
      </div>
    </footer>
  );
}