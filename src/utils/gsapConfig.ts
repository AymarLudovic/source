import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'; // Inclure si vous avez le plugin du club

/**
 * Fichier de configuration globale de GSAP.
 * Enregistre les plugins et définit des valeurs par défaut pour les easings.
 */

export const setupGsap = () => {
  // Enregistrement des plugins essentiels
  gsap.registerPlugin(ScrollTrigger, Flip, MorphSVGPlugin); // Ajoutez d'autres plugins si nécessaire

  // Définir des valeurs par défaut pour les tweens
  gsap.defaults({
    ease: 'power2.out', // Un easing par défaut fluide et agréable
    duration: 0.8, // Durée par défaut pour la plupart des animations
  });

  // Définir des valeurs par défaut pour ScrollTrigger
  ScrollTrigger.defaults({
    // markers: true, // Activez pour le débogage visuel des triggers
    start: 'top 80%', // Déclenche quand le haut de l'élément est à 80% du haut du viewport
    toggleActions: 'play none none reverse', // play, pause, resume, reverse, restart, reset, complete, none
    // play: joue l'animation quand le trigger entre dans le viewport
    // none: ne fait rien quand le trigger quitte le viewport (vers le haut)
    // none: ne fait rien quand le trigger entre dans le viewport (vers le bas)
    // reverse: inverse l'animation quand le trigger quitte le viewport (vers le bas)
  });

  // Easings personnalisés (définis dans tailwind.config.js sous transitionTimingFunction)
  // GSAP peut utiliser des béziers personnalisés directement :
  // ease: "cubic-bezier(0.76, 0, 0.24, 1)"
  // Vous pouvez aussi les nommer et les réutiliser si vous le souhaitez.
  // Exemple: CustomEase.create("myCustomEase", "M0,0 C0.76,0 0.24,1 1,1");
  // Puis utilisez: ease: "myCustomEase"
};

// Appelez setupGsap une fois au démarrage de votre application (par exemple, dans main.tsx)