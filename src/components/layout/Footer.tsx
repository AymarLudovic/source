import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Animation inverse parallaxe sur le footer
      gsap.fromTo(footerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=100", // Commence quand le haut du footer est à 100px du bas du viewport
            toggleActions: "play none none reverse", // Joue à l'entrée, inverse à la sortie
            markers: false // true for debugging
          }
        }
      );

      // Animation d'éléments internes au footer (exemple)
      gsap.from(footerRef.current.querySelectorAll('.footer-link, .footer-text'), {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none reverse",
          markers: false
        }
      });

    }, footerRef); // Scope for GSAP context

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <footer ref={footerRef} className="relative z-10 bg-dark-gray p-8 text-off-white text-center border-t border-light-gray overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm footer-text mb-4 md:mb-0">&copy; {new Date().getFullYear()} Quantum Taskflow. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="footer-link text-off-white hover:text-neon-cyan transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="footer-link text-off-white hover:text-neon-cyan transition-colors duration-300">Terms of Service</a>
          <a href="#" className="footer-link text-off-white hover:text-neon-cyan transition-colors duration-300">Contact Us</a>
        </div>
      </div>
      {/* Éléments de design abstraits pour l'ambiance */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute w-20 h-20 bg-neon-cyan rounded-full mix-blend-screen -left-10 -top-10 blur-3xl animate-pulse-neon"></div>
        <div className="absolute w-32 h-32 bg-neon-magenta rounded-full mix-blend-screen -right-10 -bottom-10 blur-3xl animate-pulse-neon delay-500"></div>
      </div>
    </footer>
  );
};

export default Footer;