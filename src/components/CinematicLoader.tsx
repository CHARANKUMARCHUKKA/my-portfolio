import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const geomRef = useRef<HTMLDivElement>(null);
  const wireframeRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 6-point polygons for smooth CSS clip-path morphing
    const polys = {
      triangle: "polygon(50% 0%, 100% 100%, 100% 100%, 50% 100%, 0% 100%, 0% 100%)",
      square: "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%)",
      pentagon: "polygon(50% 0%, 100% 38%, 81% 100%, 19% 100%, 0% 38%, 0% 38%)",
      hexagon: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      circleApprox: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)" // Base for border-radius morph
    };

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        onComplete();
      }
    });

    // 1. Black Background (Initial State)
    gsap.set(containerRef.current, { backgroundColor: '#141414' });
    gsap.set(geomRef.current, { scale: 0, opacity: 0, borderRadius: '50%' });
    gsap.set(wireframeRef.current, { scale: 0, opacity: 0, borderRadius: '50%', border: '2px solid #efeee9' });

    // 2. Center Energy Dot (Pulse and Bloom)
    tl.to(dotRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
      boxShadow: '0 0 20px 5px rgba(239, 238, 233, 0.4)'
    })
    .to(dotRef.current, {
      scale: 1.2,
      boxShadow: '0 0 40px 10px rgba(239, 238, 233, 0.6)',
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    })
    
    // 3. Dot Expands into glowing circle
    .to(dotRef.current, { scale: 0, opacity: 0, duration: 0.2 }, "+=0.1")
    .to(geomRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.7)',
      boxShadow: '0 0 60px rgba(239, 238, 233, 0.3)'
    }, "<")

    // 4. Circle morphs smoothly (Square -> Triangle -> Hexagon -> Circle)
    // We achieve this by zeroing border-radius and using clip-path
    .to(geomRef.current, {
      borderRadius: '0%',
      clipPath: polys.square,
      duration: 0.6,
      ease: 'power3.inOut'
    })
    .to(geomRef.current, {
      clipPath: polys.triangle,
      rotation: 90,
      duration: 0.6,
      ease: 'power3.inOut'
    })
    .to(geomRef.current, {
      clipPath: polys.hexagon,
      rotation: 180,
      duration: 0.6,
      ease: 'power3.inOut'
    })
    .to(geomRef.current, {
      clipPath: polys.circleApprox,
      borderRadius: '50%',
      rotation: 270,
      duration: 0.6,
      ease: 'power3.inOut'
    })

    // 5. Wireframe Transformation
    .to(geomRef.current, { opacity: 0, scale: 0.8, duration: 0.4, ease: 'power2.in' }, "+=0.2")
    .to(wireframeRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 360,
      duration: 0.6,
      ease: 'back.out(1.5)',
      boxShadow: '0 0 30px rgba(239, 238, 233, 0.8), inset 0 0 30px rgba(239, 238, 233, 0.8)'
    }, "<")

    // 6. Emit Particles (Energy Ripple)
    .add(() => {
      if (!particleContainerRef.current) return;
      for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'absolute w-2 h-2 bg-cream rounded-full';
        particleContainerRef.current.appendChild(p);
        
        const angle = (i / 12) * Math.PI * 2;
        gsap.fromTo(p, 
          { x: 0, y: 0, opacity: 1, scale: 1 },
          { 
            x: Math.cos(angle) * 150, 
            y: Math.sin(angle) * 150, 
            opacity: 0, 
            scale: 0, 
            duration: 1, 
            ease: 'power3.out',
            onComplete: () => p.remove()
          }
        );
      }
    })

    // 7. Expands into Portal
    .to(wireframeRef.current, {
      scale: 50,
      borderWidth: '100px', // Thickens as it expands to act as a solid wipe
      opacity: 0,
      duration: 1.2,
      ease: 'power4.inOut'
    }, "+=0.3")

    // 8. Container fades out
    .to(containerRef.current, {
      backgroundColor: 'transparent',
      duration: 0.5
    }, "<0.5");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
    >
      {/* Energy Dot */}
      <div 
        ref={dotRef}
        className="absolute w-4 h-4 bg-cream rounded-full opacity-0 scale-0"
      />

      {/* Solid Geometry Morph */}
      <div 
        ref={geomRef}
        className="absolute w-32 h-32 bg-cream opacity-0"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%)" }} // initial shape prevents jump
      />

      {/* Wireframe Portal */}
      <div 
        ref={wireframeRef}
        className="absolute w-40 h-40 opacity-0"
      />

      {/* Particle Container */}
      <div 
        ref={particleContainerRef}
        className="absolute inset-0 flex items-center justify-center"
      />
    </div>
  );
}
