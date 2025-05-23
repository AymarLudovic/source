import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleBackground from '../components/animations/ParticleBackground'; // Our simulated WebGL

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current || !subtitleRef.current) return;

    const ctx = gsap.context(() => {
      // Text reveal animation (letter by letter)
      const titleChars = titleRef.current.children;
      gsap.from(titleChars, {
        y: '100%',
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'power4.out',
        delay: 2.5, // After preloader
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 3,
      });

      // Parallax effect on the hero section background/elements
      gsap.to(heroRef.current, {
        backgroundPositionY: '20%', // Or any background element
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, heroRef); // Scope for GSAP context

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-br from-deep-black to-dark-gray"
    >
      <ParticleBackground /> {/* Simulated WebGL background */}
      <div className="relative z-10 px-4 md:px-8">
        <h1
          ref={titleRef}
          className="font-space font-extrabold text-off-white leading-none mb-6
                     text-hero-sm sm:text-hero-md md:text-hero-lg lg:text-hero-xl
                     overflow-hidden"
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="inline-block">Q</span>
          <span className="inline-block">u</span>
          <span className="inline-block">a</span>
          <span className="inline-block">n</span>
          <span className="inline-block">t</span>
          <span className="inline-block">u</span>
          <span className="inline-block">m</span>
          <span className="inline-block mx-4 md:mx-6">T</span>
          <span className="inline-block">a</span>
          <span className="inline-block">s</span>
          <span className="inline-block">k</span>
          <span className="inline-block">f</span>
          <span className="inline-block">l</span>
          <span className="inline-block">o</span>
          <span className="inline-block">w</span>
        </h1>
        <p
          ref={subtitleRef}
          className="font-poppins text-lg md:text-2xl text-light-gray opacity-0 transform translate-y-full
                     max-w-3xl mx-auto"
          style={{ willChange: 'transform, opacity' }}
        >
          Streamline your workflow with intelligent, intuitive task management.
          Experience efficiency redefined.
        </p>
      </div>
      {/* Diagonale ou forme abstraite pour briser le layout traditionnel */}
      <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-r from-deep-black to-transparent opacity-30 rotate-1 transform origin-bottom-left -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-1/3 h-2/5 bg-gradient-to-b from-deep-black to-transparent opacity-30 -rotate-3 transform origin-top-right translate-x-1/2"></div>
    </section>
  );
};

export default HeroSection;