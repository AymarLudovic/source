import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Ce composant simule un arrière-plan WebGL avec des particules simples
// en utilisant des éléments div et des animations CSS/GSAP.
// Pour un WebGL réel, vous utiliseriez Three.js ou une bibliothèque similaire.

const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const numParticles = 30;
    const particles: HTMLDivElement[] = [];

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = `absolute rounded-full opacity-0 ${i % 2 === 0 ? 'bg-neon-cyan' : 'bg-neon-magenta'}`;
      containerRef.current.appendChild(particle);
      particles.push(particle);

      // Random initial positions and sizes
      const size = gsap.utils.random(5, 15, 1);
      gsap.set(particle, {
        width: size,
        height: size,
        x: gsap.utils.random(0, window.innerWidth),
        y: gsap.utils.random(0, window.innerHeight),
        opacity: gsap.utils.random(0.1, 0.4),
      });

      // Animate particles
      gsap.to(particle, {
        x: 'random(-200, 200)', // Move slightly left/right
        y: 'random(-200, 200)', // Move slightly up/down
        scale: 'random(0.5, 1.5)',
        opacity: 'random(0.1, 0.6)',
        duration: gsap.utils.random(4, 10),
        repeat: -1, // Infinite loop
        yoyo: true, // Reverse animation
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 5),
      });

      // Animate subtle glow/pulse
      gsap.to(particle, {
        boxShadow: `0 0 ${gsap.utils.random(5, 20)}px ${gsap.utils.random(0.2, 0.6)}px ${i % 2 === 0 ? '#00FFFF' : '#FF00FF'}`,
        duration: gsap.utils.random(2, 5),
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: gsap.utils.random(0, 3),
      });
    }

    return () => {
      // Cleanup particles and animations
      particles.forEach(p => p.remove());
      gsap.killTweensOf(particles);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={{ background: 'linear-gradient(45deg, rgba(0,0,0,0.1), rgba(20,20,20,0.1))' }}
    >
      {/* Overlay for subtle grain/texture */}
      <div className="absolute inset-0 z-10 opacity-5 mix-blend-overlay"
           style={{
             backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAHdJREFUaEPtmYEBAAAA+v+/j6i4/Q+C+wEBBAQGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAJ7870AAAAAElFTkSuQmCC")',
             backgroundSize: '2px 2px'
           }}>
      </div>
    </div>
  );
};

export default ParticleBackground;