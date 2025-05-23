import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2 } // Apparaît après le preloader
      );
    }
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-transparent">
      <div className="text-off-white font-space text-2xl font-bold">
        Quantum Taskflow
      </div>
      <nav>
        {/* Navigation conceptuelle - pourrait être un menu radial ou expérimental */}
        <ul className="flex space-x-8">
          <li><a href="#" className="text-off-white hover:text-neon-cyan transition-colors duration-300">Home</a></li>
          <li><a href="#" className="text-off-white hover:text-neon-cyan transition-colors duration-300">Features</a></li>
          <li><a href="#" className="text-off-white hover:text-neon-cyan transition-colors duration-300">Pricing</a></li>
          <li><a href="#" className="text-off-white hover:text-neon-cyan transition-colors duration-300">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;