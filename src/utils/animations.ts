
import { useEffect, useState } from 'react';

export const useInView = (ref: React.RefObject<HTMLElement>, options = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isInView;
};

export const staggeredEntrance = (delay: number = 50) => {
  return (index: number) => {
    return {
      animationDelay: `${index * delay}ms`,
    };
  };
};

export const springTransition = {
  type: 'spring',
  damping: 20,
  stiffness: 300,
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUpVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const scaleVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

// Usage example:
// const variants = slideUpVariants;
// const style = { ...variants.hidden };
// const animationClass = "animate-slide-up";
