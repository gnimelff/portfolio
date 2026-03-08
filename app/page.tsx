"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ExternalLink, ChevronDown } from 'lucide-react';

import sweatbet1 from '../public/sweatbet1.png';
import sweatbet2 from '../public/sweatbet2.png';
import hutfinder from '../public/hutfinder.png';
import frenchRidge from '../public/french-ridge-popup.png';
import bearing from '../public/bearing.png';
import escapeMain from '../public/escape-main.png';
import escapeModal from '../public/escape-modal.png';

export default function ZacharyFlemingPortfolio() {
  const [debug, setDebug] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const projects = [
    { id: "01", title: "SWEATBET", headline: "Fitness, wagered", copy: "Competitive social accountability for iOS. Motivation via high-stakes challenges.", type: "Smartphone", link: "https://apps.apple.com/us/app/sweatbet-fitness-challenges/id6758324997", images: ["/sweatbet1.png", "/sweatbet2.png"] },
    { id: "02", title: "HUT FINDER", headline: "Wilderness, unlocked", copy: "Real-time availability engine for NZ’s DOC huts. Live data harvesting.", type: "Browser", link: "https://dochutfinder.com", images: ["/hutfinder.png", "/french-ridge-popup.png"] },
    { id: "03", title: "BEARING", headline: "London, oriented", copy: "A minimalist station finder. Compass-driven proximity for the transit network.", type: "Smartphone", link: "https://bearingldn.vercel.app", images: ["/bearing.png"] },
    { id: "04", title: "ESCAPE LONDON", headline: "Capital, bypassed", copy: "Open-source getaway engine mapping the fastest rail exits from London.", type: "Browser", link: "https://github.com/gnimelff/escape-london-app", images: ["/escape-main.png", "/escape-modal.png"] }
  ];

  return (
    <div className={`bg-[#050505] text-white selection:bg-white selection:text-black font-sans min-h-screen relative overflow-x-hidden ${debug ? 'debug-mode' : ''}`}>
      
      {/* --- BG GRAIN & SCROLLBAR --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150" />
      <motion.div className="fixed top-0 right-0 w-[2px] bg-white z-[1000] origin-top" style={{ scaleY, height: '100vh' }} />

      {/* --- COLUMN RULE CURSOR --- */}
      <div className="pointer-events-none fixed z-[9999] hidden md:flex items-center mix-blend-difference" style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(0, -50%)' }}>
        <div className="w-[1px] h-12 bg-white" />
        <div className="ml-3 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={hoveredIndex !== null ? projects[hoveredIndex].title : 'coords'} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }} className="flex flex-col">
              <span className="font-mono text-[10px] text-white font-bold uppercase tracking-[0.2em] leading-none mb-1">
                {hoveredIndex !== null ? `[SLUG: ${projects[hoveredIndex].title}]` : `[X:${mousePos.x} Y:${mousePos.y}]`}
              </span>
              <span className="font-mono text-[7px] text-zinc-500 uppercase tracking-widest leading-none">{hoveredIndex !== null ? "REVEAL_BUILD" : "LAYOUT_RULE"}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- MASTHEAD: RESTRUCTURED 6/6 SPLIT --- */}
      <section className="px-8 md:px-12 border-b border-zinc-900 bg-[#050505] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* LEFT: NAME - 6 Columns */}
          <div className="md:col-span-6 pt-[6vh] pb-6 md:pt-[10vh] md:pb-[10vh]">
            <h1 className="text-[14vw] md:text-[10.5vw] font-serif leading-[0.8] tracking-tighter uppercase italic text-[#bc9e82]">
              ZACHARY<br/>FLEMING
            </h1>
          </div>
          
          {/* RIGHT: CREDENTIALS - 6 Columns */}
          <div className="md:col-span-6 flex flex-col md:items-end pt-8 md:pt-4 border-l border-zinc-900">
            
            {/* Social Links */}
            <div className="flex gap-12 w-full justify-end px-4">
              <SocialLink href="https://github.com/gnimelff" label="Github" />
              <SocialLink href="https://linkedin.com/in/zacfleming" label="LinkedIn" />
            </div>

            {/* Content Box - Half size of name text */}
            <div className="w-full text-left md:text-right space-y-10 pl-8 pr-4 pt-8 md:pt-24">
              <h2 className="font-mono text-[4vw] md:text-[2.3vw] tracking-tighter text-white uppercase font-black leading-[0.9] text-right">
                COMMUNICATIONS / JOURNALISM<br/>iOS & WEB DEVELOPMENT
              </h2>              
              <p className="text-zinc-400 font-serif italic text-lg md:text-xl leading-snug max-w-2xl ml-auto">
                Journalism in Bloomberg, CBS, Al Jazeera, ITV, Harpers Bazaar,<span className="hidden md:inline"><br/></span><span className="md:hidden"> </span>Channel 9 Australia, Radio New Zealand, and more
              </p>
              
              <div className="flex items-center justify-end gap-6 pb-12">
                <p className="font-mono text-lg md:text-xl text-zinc-500 uppercase tracking-widest italic">Software development</p>
                <ChevronDown size={32} className="animate-bounce text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE 1x4 INDEX --- */}
      <section className="px-px md:px-4">
        <div className="border-x border-zinc-900">
          {projects.map((p, idx) => (
            <div key={idx} onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)} className="group relative border-b border-zinc-900 overflow-hidden transition-colors duration-500 hover:bg-[#0a0a0f]">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[220px] md:min-h-[280px] px-8 md:px-12 relative z-10">
                <div className="md:col-span-1"><span className="font-mono text-[11px] text-zinc-800 italic">[{p.id}]</span></div>
                <div className="md:col-span-5">
                  <a href={p.link} target="_blank" className="group/link block">
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif italic leading-none transition-all duration-700 group-hover:translate-x-10 group-hover/link:text-zinc-400 whitespace-nowrap">{p.headline}</h3>
                  </a>
                </div>
                <div className="md:col-span-4 space-y-4">
                  <h4 className={`font-mono text-2xl md:text-4xl uppercase font-black tracking-tighter transition-all duration-500 ${p.title === "ESCAPE LONDON" ? 'text-white group-hover:text-white group-hover:[text-shadow:_-1.5px_-1.5px_0_#000,_1.5px_-1.5px_0_#000,_-1.5px_1.5px_0_#000,_1.5px_1.5px_0_#000]' : 'text-white'}`}>
                    {p.title}
                  </h4>
                  <p className={`text-base md:text-lg max-w-sm leading-relaxed transition-all duration-500 font-medium ${p.title === "ESCAPE LONDON" ? 'text-zinc-500 group-hover:text-white group-hover:[text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]' : 'text-zinc-500 group-hover:text-zinc-200'}`}>{p.copy}</p>
                </div>
                <div className="md:col-span-2 flex justify-end">
                   <a href={p.link} target="_blank" className="bg-white text-black p-5 rounded-full opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 shadow-2xl hover:scale-110 active:scale-95"><ExternalLink size={24} /></a>
                </div>
              </div>
              <motion.div style={{ willChange: "opacity, transform", transform: "translateZ(0)", WebkitTransform: "translateZ(0)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }} initial={false} animate={{ opacity: (hoveredIndex === idx || (hoveredIndex === null && idx === 0)) ? 1 : 0.0001, x: (hoveredIndex === idx || (hoveredIndex === null && idx === 0)) ? 0 : 120, pointerEvents: (hoveredIndex === idx || (hoveredIndex === null && idx === 0)) ? "auto" : "none" }} transition={{ duration: 0.2 }} className={`absolute inset-0 flex items-center justify-center pr-0 md:justify-end py-4 z-0 transition-all duration-300 ${p.title === "ESCAPE LONDON" ? "md:pr-0" : "md:pr-32"}`}><div className="opacity-20 md:opacity-100"><MockupSwitcher project={p} /></div></motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="p-12 md:p-16 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-end gap-16 bg-[#050505]">
        <h2 className="text-3xl md:text-[5vw] font-serif italic uppercase tracking-tighter leading-[0.8]">Let's build.</h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-end">
           <SocialLink href="https://github.com/gnimelff" label="Github" isFooter />
           <SocialLink href="https://linkedin.com/in/zacfleming" label="LinkedIn" isFooter />
        </div>
      </footer>

      {/* SYSTEM ARCHITECTURE TOGGLE */}
      <button onClick={() => setDebug(!debug)} className="fixed bottom-8 left-8 mix-blend-difference z-[1000] text-white font-mono text-[10px] uppercase border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all font-bold">
        {debug ? "CLOSE SYSTEM ARCHITECTURE" : "OPEN SYSTEM ARCHITECTURE"}
      </button>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400;1,9..144,700&family=Geist+Mono:wght@300;400;700;900&display=swap');
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
        .font-serif { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'Geist Mono', monospace; }
        .debug-mode * { outline: 1px solid rgba(255,255,255,0.06); }
        html { scroll-behavior: smooth; cursor: none; background: #050505; }
      `}</style>
    </div>
  );
}

function SocialLink({ href, label, isFooter = false }: { href: string; label: string; isFooter?: boolean }) {
  return (
    <a href={href} target="_blank" className={`font-mono ${isFooter ? 'text-2xl md:text-4xl' : 'text-lg md:text-2xl'} uppercase tracking-[0.2em] text-white font-black hover:text-zinc-500 transition-all flex items-center gap-4 group leading-none border-b-2 border-zinc-900 pb-2 hover:border-white`}>
      <span className="w-0 h-[3px] bg-white group-hover:w-12 transition-all duration-500" />
      {label}
    </a>
  );
}

function MockupSwitcher({ project }: any) {
  if (project.title === "SWEATBET") return <div style={{ transform: "translateZ(0)", WebkitTransform: "translateZ(0)" }} className="flex -space-x-20 scale-125 drop-shadow-[0_40px_100px_rgba(0,0,0,0.9)]"><img src={sweatbet1.src} alt="Stakes" className="w-56 rounded-[3rem] border-4 border-zinc-900 shadow-2xl rotate-[-6deg]" /><img src={sweatbet2.src} alt="Duel" className="w-56 rounded-[3rem] border-4 border-zinc-900 shadow-2xl mt-24 rotate-[6deg]" /></div>;
  if (project.title === "HUT FINDER") return <div style={{ transform: "translateZ(0)", WebkitTransform: "translateZ(0)" }} className="w-[600px] relative"><img src={hutfinder.src} alt="Map" className="w-full rounded-2xl shadow-2xl grayscale opacity-30" /><motion.div initial={{ x: 40, y: 40 }} animate={{ x: 0, y: 0 }} className="absolute -bottom-16 -right-16 w-80 shadow-2xl rounded-2xl border border-white/10 overflow-hidden"><img src={frenchRidge.src} alt="Logic" className="w-full" /></motion.div></div>;
  if (project.title === "BEARING") return <div style={{ transform: "translateZ(0)", WebkitTransform: "translateZ(0)" }} className="relative flex items-center justify-center scale-150"><div className="absolute inset-0 flex items-center justify-center">{[1, 2, 3].map(i => <div key={i} className="absolute border border-white/10 rounded-full" style={{ width: i*140, height: i*140 }} />)}</div><div className="relative w-52 rounded-[3.5rem] border-8 border-zinc-900 overflow-hidden shadow-2xl"><img src={bearing.src} alt="App" className="w-full" /></div></div>;
  if (project.title === "ESCAPE LONDON") return (
    <div style={{ transform: "translateZ(0)", WebkitTransform: "translateZ(0)" }} className="relative w-[600px] h-full flex items-center justify-center p-6 md:p-12 group">
      {/* MAIN BROWSER FRAME */}
      <motion.div 
        initial={{ rotateX: 5, rotateY: -5, opacity: 0.9 }}
        animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="relative w-full aspect-[16/10] bg-[#F8F9FA] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
      >
        {/* macOS Browser Chrome */}
        <div className="bg-white px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
          </div>
          <div className="bg-zinc-100 rounded-md px-12 py-1 text-[10px] font-mono text-zinc-400 tracking-tighter">
            escapelondon.app/dashboard
          </div>
          <div className="w-10" />
        </div>

        {/* The App Dashboard Screenshot */}
        <div className="w-full h-full grayscale-[0.4] group-hover:grayscale-0 opacity-[0.65] transition-all duration-500 flex">
          <img 
            src={escapeMain.src} 
            className="w-full h-auto object-cover object-top" 
            alt="Escape London Dashboard" 
          />
        </div>
      </motion.div>

      {/* THE "UNLOCK" MODAL (Detached & Floated) */}
      <motion.div 
        initial={{ y: 20, x: 25, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, x: 30, opacity: 1, scale: 1 }}
        whileHover={{ y: -10, x: 20, scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
        transition={{ delay: 0.2, duration: 0.4, ease: "circOut" }}
        className="absolute z-30 w-[72%] md:w-[54%] drop-shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
      >
        <div className="rounded-[2rem] border border-white/20 overflow-hidden shadow-inner bg-white/10 backdrop-blur-md flex items-center justify-center">
          <div className="w-full h-full scale-[1.11] overflow-hidden rounded-[2rem]">
            <img 
              src={escapeModal.src} 
              className="w-full h-auto object-cover" 
              alt="Unlock Feature Detail" 
            />
          </div>
        </div>
      </motion.div>

      {/* FLOATING TICKET TAG */}
      <motion.div
        animate={{ rotate: [-2, 2, -2], y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 z-40 bg-white text-black font-mono text-[9px] px-3 py-1 border border-black uppercase font-bold tracking-widest shadow-xl"
      >
        PLATFORM 12 // ON TIME
      </motion.div>

      {/* AMBIENT BLUE GLOW (Matches Logo/Sky) */}
      <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
  return null;
}

function getDirection(angle: number) { 
  const directions = ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE']; 
  return directions[Math.round(angle / 45) % 8]; 
}
