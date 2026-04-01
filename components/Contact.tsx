"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
    { name: "GitHub", icon: FiGithub, href: "https://github.com/shaan-cs", color: "#ffffff" },
    { name: "LinkedIn", icon: FiLinkedin, href: "https://www.linkedin.com/in/shaan-cs/", color: "#0077B5" },
    { name: "Email", icon: FiMail, href: "mailto:mohdshahnawaz.tech@gmail.com", color: "#22d3ee" },
];

export function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", role: "", message: "" });
    const [errors, setErrors] = useState<any>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const containerRef = useRef(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const leftContentRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    // Split Text Helper
    const SplitText = ({ text, className }: { text: string; className: string }) => (
        <span className={`${className} block`}>
            {text.split(" ").map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em] whitespace-nowrap">
                    {word}
                </span>
            ))}
        </span>
    );

    // Magnetic Logic
    const handleMagnetic = (e: any) => {
        if (window.innerWidth < 1024) return;
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
    };

    const resetMagnetic = (e: any) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    // 🚀 STAGGERED ONE-BY-ONE LANDING FIX
    useGSAP(() => {
        ScrollTrigger.refresh();

        // 💎 Pre-set inputs to 0 opacity so they don't flash on load
        gsap.set(".form-input-box", { 
            opacity: 0, 
            x: (i) => (i % 2 === 0 ? -150 : 150), // Alternating sides
            filter: "blur(10px)" 
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 65%", 
                invalidateOnRefresh: true,
            },
        });

        tl.from(headingRef.current, {
            x: -100,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out"
        });

        const lines = [".contact-line-1", ".contact-line-2"];

        lines.forEach((line, index) => {
            tl.from(`${line} .word`, {
                opacity: 0,
                x: 30,
                filter: "blur(5px)",
                stagger: 0.05,
                duration: 0.8,
                ease: "power2.out",
            }, index === 0 ? "-=1" : ">-0.3");
        });

        tl.from(".social-bubble", {
            opacity: 0,
            scale: 0.5,
            y: (i) => (i % 2 === 0 ? -80 : 80),
            stagger: 0.1,
            duration: 1.5,
            ease: "back.out(1.7)",
        }, "-=0.8");

        // 💎 ONE-BY-ONE ANIMATION (STAGGERED)
        tl.to(".form-input-box", {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            stagger: 0.15, // Wahi original stagger
            duration: 1.2,
            ease: "power4.out",
        }, "-=1.5");

    }, { scope: containerRef });

    const handleChange = (e: any) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const validate = () => {
        let newErrors: any = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Valid email required";
        if (!formData.role.trim()) newErrors.role = "Profile is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";
        return newErrors;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                setLoading(true);
                const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (data.success) {
                    setSubmitted(true);
                    setFormData({ name: "", email: "", role: "", message: "" });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative py-24 md:py-32 overflow-hidden bg-transparent"
        >
            <div className="container mx-auto px-6 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT SIDE */}
                    <div ref={leftContentRef} className="flex flex-col space-y-12">
                        <div ref={headingRef} className="flex flex-col items-start">
                            <h2 className="text-white italic text-[clamp(30px,4vw,50px)] tracking-tighter uppercase ">
                                Let&apos;s Work{" "}
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent pr-4">
                                    Together
                                </span>
                            </h2>

                            <div className="w-20 h-[2px] bg-cyan-500/50 mt-4" />

                            <p className="mt-8 text-white/50 text-sm md:text-base max-w-md leading-relaxed uppercase tracking-[0.25em] font-bold">
                                <SplitText
                                    className="contact-line-1"
                                    text="Have a project in mind? Let’s architect something"
                                />
                                <span className="block h-1" />
                                <span className="contact-line-2 block">
                                    {"impactful".split(" ").map((w, i) => (
                                        <span key={i} className="word inline-block text-cyan-400 italic mr-[0.3em]">{w}</span>
                                    ))}
                                    {"and secure.".split(" ").map((w, i) => (
                                        <span key={i} className="word inline-block mr-[0.3em]">{w}</span>
                                    ))}
                                </span>
                            </p>
                        </div>

                        {/* SOCIAL ICONS */}
                        <div className="hidden lg:flex gap-8">
                            {socialLinks.map((link, index) => (
                                <div key={link.name} className="social-bubble group">
                                    <motion.a
                                        href={link.href}
                                        target="_blank"
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                                        className="relative w-16 h-16 flex items-center justify-center rounded-full"
                                    >
                                        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                                            <div className="absolute inset-[-150%] animate-[spin_4s_linear_infinite]"
                                                style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, ${link.color} 50%, transparent 60%, transparent 100%)` }} />
                                        </div>
                                        <div className="absolute inset-[1.5px] bg-black rounded-full z-10 border border-white/5 group-hover:bg-zinc-900 transition-colors" />
                                        <link.icon className="relative z-20 w-6 h-6 text-white/70 group-hover:text-cyan-400 transition-colors duration-300" />
                                    </motion.a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FORM */}
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">
                        {[
                            { name: "name", placeholder: "Your Name", type: "input" },
                            { name: "email", placeholder: "Your Email", type: "input" },
                            { name: "role", placeholder: "Job Profile / Subject", type: "input" },
                            { name: "message", placeholder: "Tell me about your project...", type: "textarea" }
                        ].map((field) => (
                            <div key={field.name} className="form-input-box relative group">
                                {field.type === "input" ? (
                                    <input
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={(formData as any)[field.name]}
                                        onChange={handleChange}
                                        className="w-full p-5 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-white/20 placeholder:text-[10px] placeholder:tracking-widest placeholder:uppercase"
                                    />
                                ) : (
                                    <textarea
                                        name={field.name}
                                        rows={4}
                                        placeholder={field.placeholder}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full p-5 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all resize-none placeholder:text-white/20 placeholder:text-[10px] placeholder:tracking-widest placeholder:uppercase"
                                    />
                                )}
                                {errors[field.name] && (
                                    <p className="text-red-400 text-[10px] mt-2 uppercase tracking-widest pl-2">
                                        {errors[field.name]}
                                    </p>
                                )}
                            </div>
                        ))}

                        {/* BUTTON */}
                        <div className="flex justify-start">
                            <button
                                ref={btnRef}
                                onMouseMove={handleMagnetic}
                                onMouseLeave={resetMagnetic}
                                type="submit"
                                disabled={loading}
                                className="relative group/btn w-[50%] md:w-40 h-14 rounded-xl overflow-hidden active:scale-90 transition-transform"
                            >
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute inset-[-150%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#22d3ee_50%,transparent_60%,transparent_100%)] blur-[0.5px]" />
                                </div>
                                <div className="absolute inset-[1.5px] bg-black rounded-[11px] group-hover/btn:bg-zinc-950 transition-colors z-1" />
                                <span className="relative z-10 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white group-hover/btn:text-cyan-400 transition-colors duration-300">
                                    {loading ? "Transmitting..." : <>Send Message <FiSend className="text-cyan-400" /></>}
                                </span>
                            </button>
                        </div>

                        {submitted && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-cyan-400 text-center font-bold text-xs uppercase tracking-widest p-4 bg-cyan-400/5 rounded-xl border border-cyan-400/20"
                            >
                                Signal Received! I&apos;ll get back to you soon.
                            </motion.p>
                        )}

                        {/* MOBILE SOCIAL */}
                        <div className="flex lg:hidden justify-center gap-6 pt-10">
                            {socialLinks.map((link, index) => (
                                <div key={link.name} className="social-bubble group">
                                    <motion.a
                                        href={link.href}
                                        target="_blank"
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                                        className="relative w-16 h-16 flex items-center justify-center rounded-full"
                                    >
                                        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                                            <div className="absolute inset-[-150%] animate-[spin_4s_linear_infinite]"
                                                style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, ${link.color} 50%, transparent 60%, transparent 100%)` }} />
                                        </div>
                                        <div className="absolute inset-[1.5px] bg-black rounded-full z-10 border border-white/5 group-hover:bg-zinc-900 transition-colors" />
                                        <link.icon className="relative z-20 w-6 h-6 text-white/70 group-hover:text-cyan-400 transition-colors duration-300" />
                                    </motion.a>
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}