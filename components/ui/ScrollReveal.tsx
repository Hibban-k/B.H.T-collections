'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  staggerChildren?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 40,
  duration = 0.8,
  staggerChildren = false,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 });
      if (staggerChildren) {
        gsap.set(containerRef.current.children, { opacity: 1 });
      }
      return;
    }

    let x = 0;
    let y = 0;

    switch (direction) {
      case 'up': y = distance; break;
      case 'down': y = -distance; break;
      case 'left': x = distance; break;
      case 'right': x = -distance; break;
    }

    if (staggerChildren) {
      const elements = containerRef.current.children;
      gsap.set(elements, { x, y, opacity: 0 });
      
      gsap.to(elements, {
        x: 0,
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      });
    } else {
      gsap.set(containerRef.current, { x, y, opacity: 0 });
      
      gsap.to(containerRef.current, {
        x: 0,
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      });
    }
  }, { scope: containerRef, dependencies: [direction, distance, duration, delay, staggerChildren] });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
