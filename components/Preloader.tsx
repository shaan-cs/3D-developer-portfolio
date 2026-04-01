// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import gsap from "gsap";

// /* ── Font injection ── */
// const FONT_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;600&display=swap');
// `;

// interface PreloaderProps {
//   onComplete?: () => void;
//   name?: string;
//   tagline?: string;
//   minDuration?: number;
// }

// /* ✅ (UNCHANGED - kept as it is, not removed) */
// const LETTERS_NAME    = "SHAHNAWAZ".split("");
// const LETTERS_TAGLINE = "PORTFOLIO".split("");

// export default function Preloader({
//   onComplete,
//   name    = "SHAHNAWAZ",
//   tagline = "PORTFOLIO",
//   minDuration = 3200,
// }: PreloaderProps) {

//   const wrapRef        = useRef<HTMLDivElement>(null);
//   const curtainTopRef  = useRef<HTMLDivElement>(null);
//   const curtainBotRef  = useRef<HTMLDivElement>(null);
//   const counterRef     = useRef<HTMLSpanElement>(null);
//   const lineRef        = useRef<HTMLDivElement>(null);
//   const lineInnerRef   = useRef<HTMLDivElement>(null);
//   const dotRef         = useRef<HTMLDivElement>(null);
//   const bracketRefs    = useRef<HTMLDivElement[]>([]);
//   const nameLetterRefs = useRef<HTMLSpanElement[]>([]);
//   const tagLetterRefs  = useRef<HTMLSpanElement[]>([]);
//   const scanRef        = useRef<HTMLDivElement>(null);
//   const logoMarkRef    = useRef<HTMLDivElement>(null);

//   const [done, setDone] = useState(false);

//   /* ✅ SAFE: timeout cleanup */
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const addBracket = (el: HTMLDivElement | null, i: number) => {
//     if (el) bracketRefs.current[i] = el;
//   };

//   const runExit = useCallback(() => {
//     const tl = gsap.timeline({
//       onComplete: () => {
//         setDone(true);
//         onComplete?.();
//       },
//     });

//     tl
//       .to([counterRef.current, lineRef.current, dotRef.current, logoMarkRef.current,
//            nameLetterRefs.current, tagLetterRefs.current, scanRef.current,
//            bracketRefs.current], {
//         opacity: 0, duration: 0.35, stagger: 0.02, ease: "power2.in",
//       })
//       .to(curtainTopRef.current, {
//         yPercent: -100,
//         duration: 0.9,
//         ease: "expo.inOut",
//       }, "-=0.05")
//       .to(curtainBotRef.current, {
//         yPercent: 100,
//         duration: 0.9,
//         ease: "expo.inOut",
//       }, "<");
//   }, [onComplete]);

//   useEffect(() => {
//     /* ✅ Scroll lock (safe) */
//     document.documentElement.style.overflow = "hidden";

//     const tl   = gsap.timeline();
//     const obj  = { count: 0 };
//     const start = performance.now();

//     /* ── Initial states ── */
//     gsap.set(bracketRefs.current,    { opacity: 0 });
//     gsap.set(nameLetterRefs.current, { opacity: 0, y: 40, rotationX: -80 });
//     gsap.set(tagLetterRefs.current,  { opacity: 0, y: 20 });
//     gsap.set(scanRef.current,        { opacity: 0 });
//     gsap.set(lineInnerRef.current,   { scaleX: 0, transformOrigin: "left center" });
//     gsap.set(dotRef.current,         { opacity: 0, scale: 0 });
//     gsap.set(logoMarkRef.current,    { opacity: 0, scale: 0.6 });

//     tl
//       .to(bracketRefs.current, {
//         opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out",
//       }, 0.1)

//       .to(scanRef.current, {
//         opacity: 1, duration: 0.6, ease: "power2.out",
//       }, 0.2)

//       .to(logoMarkRef.current, {
//         opacity: 1, scale: 1, duration: 0.7, ease: "back.out(2)",
//       }, 0.35)

//       .to(nameLetterRefs.current, {
//         opacity: 1, y: 0, rotationX: 0,
//         duration: 0.9, stagger: 0.055, ease: "power4.out",
//       }, 0.5)

//       .to(tagLetterRefs.current, {
//         opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: "power3.out",
//       }, 0.85)

//       .to(dotRef.current, {
//         opacity: 1, scale: 1, duration: 0.4, ease: "back.out(3)",
//       }, 0.9)

//       .to(obj, {
//         count: 100,
//         duration: 1.8,
//         ease: "power2.inOut",
//         onUpdate: () => {
//           if (counterRef.current)
//             counterRef.current.textContent = String(Math.round(obj.count)).padStart(3, "0");
//         },
//       }, 0.8)

//       .to(lineInnerRef.current, {
//         scaleX: 1, duration: 1.8, ease: "power2.inOut",
//       }, 0.8)

//       .call(() => {
//         const elapsed = performance.now() - start;
//         const delay   = Math.max(0, minDuration - elapsed);

//         /* ✅ SAFE timeout */
//         timeoutRef.current = setTimeout(runExit, delay);
//       });

//     return () => {
//       tl.kill();
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);

//       /* ✅ restore scroll safely */
//       document.documentElement.style.overflow = "";
//     };
//   }, [minDuration, runExit]);

//   useEffect(() => {
//     if (done) document.documentElement.style.overflow = "";
//   }, [done]);

//   if (done) return null;

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: FONT_CSS + PRELOADER_CSS }} />

//       <div ref={wrapRef} className="preloader-root">

//         <div ref={curtainTopRef} className="curtain curtain-top" />
//         <div ref={curtainBotRef} className="curtain curtain-bot" />

//         <div ref={scanRef} className="scan-grid" />
//         <div className="grain" />

//         {[
//           { cls: "bracket bracket-tl", idx: 0 },
//           { cls: "bracket bracket-tr", idx: 1 },
//           { cls: "bracket bracket-bl", idx: 2 },
//           { cls: "bracket bracket-br", idx: 3 },
//         ].map(({ cls, idx }) => (
//           <div key={idx} className={cls} ref={(el) => addBracket(el as HTMLDivElement, idx)}>
//             <span className="b-h" /><span className="b-v" />
//           </div>
//         ))}

//         <div className="center-stage">

//           <div ref={logoMarkRef} className="logo-mark">
//             <span className="logo-ring" />
//             <span className="logo-dot-inner" />
//           </div>

//           <div className="name-wrap" style={{ perspective: "600px" }}>
//             {name.split("").map((ch, i) => (
//               <span key={i} ref={(el) => { if (el) nameLetterRefs.current[i] = el; }} className="name-letter">
//                 {ch}
//               </span>
//             ))}
//           </div>

//           <div className="tag-wrap">
//             {tagline.split("").map((ch, i) => (
//               <span key={i} ref={(el) => { if (el) tagLetterRefs.current[i] = el; }} className="tag-letter">
//                 {ch}
//               </span>
//             ))}
//           </div>

//           <div className="progress-row">
//             <div ref={dotRef} className="prog-dot" />
//             <div ref={lineRef} className="prog-line">
//               <div ref={lineInnerRef} className="prog-fill" />
//             </div>
//             <span ref={counterRef} className="counter">000</span>
//             <span className="counter-sym">%</span>
//           </div>

//         </div>

//       </div>
//     </>
//   );
// }

// /* ✅ ONLY ADDITION (no change in existing design) */
// const PRELOADER_CSS = `
// .preloader-root {
//   visibility: visible !important;
//   opacity: 1 !important;
// }
// `;