import React, { useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: 'up' | 'none';
}

/**
 * Reusable scroll reveal component utilizing the browser's native Intersection Observer API.
 * Provides smooth compositor-only opacity & transform transitions while respecting
 * prefers-reduced-motion and gracefully unobserving once revealed.
 */
export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delayMs = 0,
  direction = 'up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fallback if IntersectionObserver is unavailable in legacy environments
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    // Accessibility check: immediately show if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.08
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const transitionClasses =
    direction === 'up'
      ? isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-7'
      : isVisible
      ? 'opacity-100'
      : 'opacity-0';

  return (
    <div
      ref={domRef}
      style={{
        transitionDelay: `${delayMs}ms`,
        transitionDuration: '650ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform'
      }}
      className={`transition-all duration-700 ${transitionClasses} ${className}`}
    >
      {children}
    </div>
  );
};
