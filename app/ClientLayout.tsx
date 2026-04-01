// "use client";

// /**
//  * ─────────────────────────────────────────────────────────────
//  *  ClientLayout.tsx
//  *  Handles:
//  *    ◆ Preloader (mount → animate → unmount)
//  *    ◆ Prevent interaction until ready
//  *    ◆ Smooth reveal of main content
//  * ─────────────────────────────────────────────────────────────
//  */

// import { useState, useCallback } from "react";
// import Preloader from "@/components/Preloader";

// interface ClientLayoutProps {
//   children: React.ReactNode;
// }

// export default function ClientLayout({ children }: ClientLayoutProps) {
//   const [preloaderDone, setPreloaderDone] = useState(false);

//   const handlePreloaderComplete = useCallback(() => {
//     setPreloaderDone(true);
//   }, []);

//   return (
//     <>
//       {/* 🔥 Preloader (runs once, then unmounts) */}
//       {!preloaderDone && (
//         <Preloader
//           name="SHAHNAWAZ"
//           tagline="PORTFOLIO"
//           minDuration={3200}
//           onComplete={handlePreloaderComplete}
//         />
//       )}

//       {/* 🌐 Main Website Content */}
//       <div
//         style={{
//           opacity: preloaderDone ? 1 : 0,
//           pointerEvents: preloaderDone ? "auto" : "none", // ✅ prevents click bugs
//           transition: "opacity 0.6s ease 0.1s",
//           willChange: "opacity",
//         }}
//       >
//         {children}
//       </div>
//     </>
//   );
// }