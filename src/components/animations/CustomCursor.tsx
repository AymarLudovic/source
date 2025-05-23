import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(followerRef.current, { xPercent: -50, yPercent: -50 });

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-interact') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'LI'
      ) {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(follower, {
          scale: 2,
          borderColor: '#00FFFF',
          backgroundColor: 'rgba(0,255,255,0.2)',
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-interact') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'LI'
      ) {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
        gsap.to(follower, {
          scale: 1,
          borderColor: '#F0F0F0',
          backgroundColor: 'transparent',
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseover', onMouseOver);
    document.body.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-neon-cyan z-[9999] pointer-events-none"
      ></div>
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-off-white z-[9998] pointer-events-none transition-all duration-300 ease-power2-out"
      ></div>
    </>
  );
};

export default CustomCursor;