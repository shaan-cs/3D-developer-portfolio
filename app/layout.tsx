import type { Metadata, Viewport } from 'next'
import { Inter } from "next/font/google";
import { Sora, Aladin } from 'next/font/google'
import SmoothScroll from "@/components/SmoothScroll";
import MaskCursor from "@/components/MaskCursor";
import { Analytics } from '@vercel/analytics/next'
// import FloatingParticles from '@/components/FloatingParticles'



import './global.css'
import './style.css'

const inter = Inter({ subsets: ["latin"] });

const sora = Sora({
  subsets: ["latin"],
  variable: '--font-sora',
  display: 'swap',
})

const aladin = Aladin({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-aladin",
  display: 'swap',
})




/* ✅ SEO OPTIMIZATION */
export const metadata: Metadata = {
  title: {
    default: "Shahnawaz | Portfolio",
    template: "%s | Shahnawaz",
  },
  description:
    "Shahnawaz is a Full Stack Developer specializing in MERN stack, modern UI/UX, and cybersecurity. Explore premium projects, animations, and interactive web experiences.",

  keywords: [
    "Shahnawaz developer",
    "Full Stack Developer Portfolio",
    "MERN Stack Developer India",
    "Frontend Developer Portfolio",
    "Cybersecurity student",
    "React Developer Portfolio",
    "Next.js portfolio",
    "Web Developer India",
  ],

  authors: [{ name: "Shahnawaz" }],
  creator: "Shahnawaz",

  openGraph: {
    title: "Shahnawaz | Portfolio",
    description:
      "Explore modern web projects, 3D animations, and full stack development work by Shahnawaz.",
    url: "https://your-domain.com",
    siteName: "Shahnawaz Portfolio",
    images: [
      {
        url: "/og-image.png", // 👉 add later
        width: 1200,
        height: 630,
        alt: "Shahnawaz Portfolio",
      },
    ],
    type: "website",
  },

  icons: {
    icon: "/favicon.ico", // 👉 logo lagana
  },
}


//new updations

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* ⚡ Instant loader styling (no flicker) */}
        <style>{`
          #root-loader {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at center, #050505 0%, #000 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  opacity: 1;
  transition: opacity 0.8s ease-in-out;

  /* ✨ NEW: subtle depth */
  backdrop-filter: blur(4px);
}

.loader-orb {
  position: relative;
  width: 110px;
  height: 110px;
}

/* 🔵 RING (SLOW + PREMIUM) */
.orb-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(0, 242, 255, 0.15);
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    transparent 40%,
    #00f2ff 50%,
    transparent 60%,
    transparent 100%
  );

  /* 🔥 UPDATED (slower + smoother) */
  animation: rotate 3.5s linear infinite;

  /* ✨ NEW: softer glow */
  filter: blur(1px);
  opacity: 0.9;
}

/* 🔵 CORE (BREATHING EFFECT IMPROVED) */
.orb-core {
  position: absolute;
  inset: 20%;
  border-radius: 50%;
  background: radial-gradient(circle, #00f2ff 0%, transparent 70%);
  box-shadow:
    0 0 25px rgba(0,242,255,0.5),
    0 0 60px rgba(0,242,255,0.25);

  /* 🔥 UPDATED (slower pulse) */
  animation: pulse 2.5s ease-in-out infinite;

  /* ✨ NEW: glass feel */
  backdrop-filter: blur(6px);
}

/* TEXT */
.loader-main {
  font-size: 13px;
  letter-spacing: 0.4em;
  color: rgba(255,255,255,0.8);

  /* 🔥 UPDATED */
  animation: fadeText 3.5s ease-in-out infinite;
}

.loader-sub {
  margin-top: 6px;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: rgba(0, 242, 255, 0.5);
}

/* 🔥 PROGRESS */
.loader-progress {
  width: 180px;
  height: 2px;
  background: rgba(255,255,255,0.05);
  overflow: hidden;
  position: relative;
  margin-top: 20px;
}

.loader-progress-bar {
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #00f2ff, transparent);

  /* 🔥 UPDATED */
  animation: progressMove 3.5s ease-in-out infinite;
}

/* ================= ANIMATIONS ================= */

@keyframes rotate {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { transform: scale(0.92); opacity: 0.6; }
  50% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(0.92); opacity: 0.6; }
}

@keyframes fadeText {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

@keyframes progressMove {
  0% { transform: translateX(-120%); }
  50% { transform: translateX(120%); }
  100% { transform: translateX(-120%); }
}
        `}</style>
      </head>

      <body
        className={`${sora.variable} ${aladin.variable} font-sans text-white bg-black`}
      >
        {/* 🔥 PREMIUM ROOT LOADER */}
        <div id="root-loader">
          {/* Orb Animation */}
          <div className="loader-orb">
            <div className="orb-ring"></div>
            <div className="orb-core"></div>
          </div>

          {/* System Text */}
          <div className="text-center mt-10">
            <p className="loader-main">INITIALIZING SYSTEM</p>
            <p className="loader-sub">Boot sequence in progress...</p>
          </div>

          {/* Progress */}
          <div className="loader-progress">
            <div className="loader-progress-bar"></div>
          </div>
        </div>

        {/* ⚡ MAIN APP */}
        <SmoothScroll>
          <MaskCursor />

          <main className="relative z-10">{children}</main>
        </SmoothScroll>

        <Analytics />
      </body>
    </html>
  );
}