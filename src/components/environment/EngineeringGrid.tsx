

export default function EngineeringGrid() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(239, 238, 233, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 238, 233, 0.08) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        WebkitMaskImage: 'radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
        maskImage: 'radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)'
      }}
    />
  );
}
