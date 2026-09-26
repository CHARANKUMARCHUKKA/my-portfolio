import React, { useEffect, useRef } from 'react';
import AmbientGradient from './AmbientGradient';
import SpaceDust from './SpaceDust';
import EngineeringGrid from './EngineeringGrid';
import CursorSpotlight from './CursorSpotlight';
import FilmGrain from './FilmGrain';
import Vignette from './Vignette';

export default function GlobalEnvironment() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // Buttery smooth cursor tracking via direct DOM mutation
    // This avoids triggering React re-renders 60 times a second
    const updateCursor = () => {
      if (containerRef.current) {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
        containerRef.current.style.setProperty('--mouse-x', `${currentX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${currentY}px`);
      }
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#141414]"
      style={{
        // Fallback default coordinates
        '--mouse-x': '50vw',
        '--mouse-y': '50vh',
      } as React.CSSProperties}
    >
      <AmbientGradient />
      <EngineeringGrid />
      <CursorSpotlight />
      <SpaceDust />
      <Vignette />
      <FilmGrain />
    </div>
  );
}
