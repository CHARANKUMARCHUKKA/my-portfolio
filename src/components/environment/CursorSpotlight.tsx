

export default function CursorSpotlight() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-[2]"
      style={{
        background: 'radial-gradient(circle 400px at var(--mouse-x) var(--mouse-y), rgba(239, 238, 233, 0.02) 0%, transparent 100%)'
      }}
    />
  );
}
