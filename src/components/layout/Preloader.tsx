import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Preloader: React.FC = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderRef.current || !logoRef.current || !textRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(logoRef.current, { rotation: 360, duration: 1.5, repeat: -1, ease: 'none', transformOrigin: 'center center' }) // Infinite spin
      .to(logoRef.current, { scale: 0.8, duration: 0.8, yoyo: true, repeat: -1, ease: 'power1.inOut' }, "<") // Pulse effect
      .fromTo(textRef.current.children,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.5 }, 0.5 // Staggered text reveal
      )
      .to(preloaderRef.current, {
        opacity: 0,
        y: -100,
        duration: 1,
        ease: 'power3.in',
        delay: 1.5, // Keep preloader visible for a bit
        onComplete: () => {
          preloaderRef.current!.style.display = 'none';
          document.body.style.overflow = ''; // Restore scroll
        }
      });

    // Prevent scrolling during preloading
    document.body.style.overflow = 'hidden';

    return () => {
      tl.kill();
      document.body.style.overflow = ''; // Ensure scroll is re-enabled on unmount
    };
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[999] bg-deep-black flex flex-col items-center justify-center text-off-white"
    >
      <svg
        ref={logoRef}
        className="w-24 h-24 mb-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#gradient-preloader)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="gradient-preloader" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="100%" stopColor="#FF00FF" />
          </linearGradient>
        </defs>
        {/* Placeholder SVG for a "quantum" or "flow" concept */}
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 1 0 20zm0-2a12 12 0 0 0 0 24" />
        <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M12 2v20M2 12h20" />
      </svg>
      <div ref={textRef} className="font-space text-4xl sm:text-5xl md:text-6xl font-bold overflow-hidden">
        <div className="inline-block">Q</div>
        <div className="inline-block">u</div>
        <div className="inline-block">a</div>
        <div className="inline-block">n</div>
        <div className="inline-block">t</div>
        <div className="inline-block">u</div>
        <div className="inline-block">m</div>
        <div className="inline-block ml-4">T</div>
        <div className="inline-block">a</div>
        <div className="inline-block">s</div>
        <div className="inline-block">k</div>
        <div className="inline-block">f</div>
        <div className="inline-block">l</div>
        <div className="inline-block">o</div>
        <div className="inline-block">w</div>
      </div>
    </div>
  );
};

export default Preloader;