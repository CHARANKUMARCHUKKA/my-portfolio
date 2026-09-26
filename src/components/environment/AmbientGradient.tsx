export default function AmbientGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 
        This div is oversized so we can translate it around slowly.
        Colors: Midnight blue/violet mixing into the dark charcoal base.
      */}
      <div 
        className="absolute -inset-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#141414] to-[#0a0a0a] opacity-80"
        style={{
          animation: 'ambient-shift 60s ease-in-out infinite alternate'
        }}
      />
    </div>
  );
}
