import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Preloader from './components/layout/Preloader';
import HeroSection from './components/sections/HeroSection';
import TaskManagementSection from './components/sections/TaskManagementSection';
import CustomCursor from './components/animations/CustomCursor';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate preloading for demonstration
    const timer = setTimeout(() => {
      setLoading(false);
      // Once loading is done, animate content in if needed
      gsap.to(appRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.5 // after preloader animation finishes
      });
    }, 2000); // Adjust loading time as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Global GSAP context for cleaner cleanup (optional but good practice)
    const ctx = gsap.context(() => {
      // Any global ScrollTrigger animations here, like snap scrolling for sections
      // If you want snap scrolling uncomment this:
      // ScrollTrigger.defaults({
      //   ease: "power1.inOut",
      //   duration: 0.8
      // });

      // const sections = gsap.utils.toArray<HTMLElement>('.section-snap');
      // sections.forEach((section, i) => {
      //   ScrollTrigger.create({
      //     trigger: section,
      //     start: 'top top',
      //     pin: true,
      //     pinSpacing: false,
      //     snap: 1, // Snap to the start of the section
      //     markers: false // Set to true for debugging
      //   });
      // });

    }, appRef); // <- Scope!

    return () => ctx.revert(); // <- Cleanup!
  }, []);

  return (
    <div ref={appRef} className="opacity-0 min-h-screen bg-deep-black text-off-white relative overflow-hidden">
      {loading && <Preloader />}
      <CustomCursor />
      <main className="relative z-10">
        <HeroSection />
        <TaskManagementSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;