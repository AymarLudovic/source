import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'; // Assurez-vous d'avoir MorphSVGPlugin si vous l'utilisez réellement

// Enregistrer MorphSVGPlugin si non déjà fait globalement
gsap.registerPlugin(MorphSVGPlugin);

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    gsap.set(iconRef.current, { visibility: 'hidden' }); // Hide icon initially

    const ctx = gsap.context(() => {
      // Hover animation for the button
      gsap.to(buttonRef.current, {
        scale: 1.05,
        boxShadow: '0 0 25px rgba(0,255,255,0.7)',
        color: '#00FFFF', // Text color change
        duration: 0.3,
        ease: 'power2.out',
        paused: true, // Paused until hover
        onReverseComplete: () => gsap.set(iconRef.current, { visibility: 'hidden' })
      }).revert(); // Ensure it reverts to initial state

      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          boxShadow: '0 0 25px rgba(0,255,255,0.7)',
          color: '#00FFFF',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.set(iconRef.current, { visibility: 'visible' });
        // Morph the plus to check (example, adjust paths as needed)
        gsap.to('#button-icon-shape', {
          duration: 0.3,
          morphSVG: '#button-icon-check', // Assurez-vous que ces IDs SVG existent
          ease: 'power2.out',
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          boxShadow: '0 0 15px rgba(0,255,255,0.5)',
          color: '#F0F0F0',
          duration: 0.3,
          ease: 'power2.out',
        });
        // Morph back to plus
        gsap.to('#button-icon-shape', {
          duration: 0.3,
          morphSVG: '#button-icon-plus',
          ease: 'power2.out',
          onComplete: () => gsap.set(iconRef.current, { visibility: 'hidden' })
        });
      });
    }, buttonRef); // Scope for GSAP context

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  // Exemple d'icônes SVG pour le morphing. Vous devrez définir ces chemins.
  const PlusIcon = () => (
    <path id="button-icon-plus" d="M12 5V19M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  );

  const CheckIcon = () => (
    <path id="button-icon-check" d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  );

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`btn-primary flex items-center justify-center space-x-2 ${className}`}
      style={{ willChange: 'transform, box-shadow, color' }}
    >
      <span>{children}</span>
      <svg
        ref={iconRef}
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        {/* Shape that will morph. Starts as plus, morphs to check */}
        <PlusIcon />
        <CheckIcon /> {/* This path is just for MorphSVG to target */}
        <path id="button-icon-shape" d="M12 5V19M5 12H19" /> {/* Default shape for morphing */}
      </svg>
    </button>
  );
};

export default Button;