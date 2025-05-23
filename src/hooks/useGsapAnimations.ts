import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Un hook personnalisé pour gérer les animations GSAP avec nettoyage automatique
// Il est conçu pour être réutilisable et encapsuler la logique GSAP.

// Enregistre les plugins globalement si ce n'est pas déjà fait dans main.tsx
gsap.registerPlugin(ScrollTrigger, Flip);

interface GsapAnimationOptions {
  trigger?: React.RefObject<HTMLElement>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  // Ajoutez d'autres options ScrollTrigger ou des propriétés GSAP ici
}

/**
 * Hook to apply a GSAP animation to an element with automatic cleanup.
 *
 * @param elementRef A React ref to the DOM element to animate.
 * @param animationProps The GSAP animation properties (e.g., { x: 100, duration: 1 }).
 * @param scrollTriggerOptions Optional ScrollTrigger options.
 * @returns A ref object for the element.
 */
export const useGsapAnimation = <T extends HTMLElement>(
  elementRef: React.RefObject<T>,
  animationProps: gsap.TweenVars,
  scrollTriggerOptions?: GsapAnimationOptions
) => {
  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      let animation: gsap.core.Tween | gsap.core.Timeline;
      let st: ScrollTrigger | undefined;

      const baseAnimation = gsap.to(elementRef.current, {
        ...animationProps,
        // willChange: 'transform, opacity', // Encourage browser optimization
      });

      if (scrollTriggerOptions) {
        st = ScrollTrigger.create({
          trigger: scrollTriggerOptions.trigger?.current || elementRef.current,
          start: scrollTriggerOptions.start || 'top center',
          end: scrollTriggerOptions.end || 'bottom center',
          scrub: scrollTriggerOptions.scrub || false,
          once: scrollTriggerOptions.once || false,
          animation: baseAnimation,
          onEnter: scrollTriggerOptions.onEnter,
          onLeave: scrollTriggerOptions.onLeave,
          onEnterBack: scrollTriggerOptions.onEnterBack,
          onLeaveBack: scrollTriggerOptions.onLeaveBack,
          // markers: true, // Pour le débogage, à désactiver en production
        });
        animation = baseAnimation; // ScrollTrigger controls it
      } else {
        animation = baseAnimation; // Direct animation
      }

    }, elementRef); // Scope for GSAP context

    return () => ctx.revert(); // Cleanup all animations created within this context
  }, [elementRef, animationProps, scrollTriggerOptions]);

  return elementRef;
};

/**
 * Hook to create a GSAP Timeline with automatic cleanup.
 *
 * @param timelineRef A React ref to store the timeline instance.
 * @param setupTimeline A function to define the timeline animations.
 * @param dependencies Dependencies for the useEffect hook.
 */
export const useGsapTimeline = (
  timelineRef: React.MutableRefObject<gsap.core.Timeline | null>,
  setupTimeline: (tl: gsap.core.Timeline) => void,
  dependencies: React.DependencyList = []
) => {
  const scope = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // We create a new context for each timeline to ensure proper isolation and cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      setupTimeline(tl);
      timelineRef.current = tl;
    }, scope.current || undefined); // Use a ref to attach context to a DOM element if needed, or undefined for global context

    return () => ctx.revert(); // Cleanup the timeline and its tweens
  }, dependencies);

  return scope; // Return scope ref if you need to attach it to a DOM element
};


// Exemple d'utilisation (pas exporté pour être utilisé directement dans d'autres composants)
/*
import React, { useRef } from 'react';
import { useGsapAnimation } from '@/hooks/useGsapAnimations'; // Assurez-vous du chemin correct

const MyAnimatedComponent: React.FC = () => {
  const myElementRef = useRef<HTMLDivElement>(null);

  useGsapAnimation(
    myElementRef,
    { x: 200, opacity: 0.5, duration: 2 },
    {
      trigger: myElementRef,
      start: "top center",
      end: "bottom top",
      scrub: 1,
      once: false,
    }
  );

  return (
    <div ref={myElementRef} style={{ width: 100, height: 100, background: 'blue' }}>
      Animated Div
    </div>
  );
};
*/