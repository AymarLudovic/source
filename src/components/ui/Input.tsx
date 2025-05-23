import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Ajoutez des props spécifiques si nécessaire
}

const Input: React.FC<InputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const ctx = gsap.context(() => {
      // Animation au focus
      gsap.to(inputRef.current, {
        borderColor: '#00FFFF', // Neon cyan border on focus
        boxShadow: '0 0 20px rgba(0,255,255,0.4), inset 0 0 5px rgba(0,255,255,0.2)',
        scale: 1.01,
        duration: 0.3,
        ease: 'power2.out',
        paused: true,
      }).revert(); // Ensure it reverts

      inputRef.current.addEventListener('focus', () => {
        gsap.to(inputRef.current, {
          borderColor: '#00FFFF',
          boxShadow: '0 0 20px rgba(0,255,255,0.4), inset 0 0 5px rgba(0,255,255,0.2)',
          scale: 1.01,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      inputRef.current.addEventListener('blur', () => {
        gsap.to(inputRef.current, {
          borderColor: '#333333', // Revert to light-gray
          boxShadow: '5px 5px 10px rgba(0,0,0,0.5), -5px -5px 10px rgba(50,50,50,0.1)', // Revert to subtle-neumorphic
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    }, inputRef); // Scope for GSAP context

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <input
      ref={inputRef}
      className="input-primary"
      {...props}
      style={{ willChange: 'border-color, box-shadow, transform' }}
    />
  );
};

export default Input;