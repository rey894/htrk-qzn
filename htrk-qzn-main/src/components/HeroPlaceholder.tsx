/**
 * Lightweight CSS-only hero background placeholder.
 * Zero assets, matches municipal theme. Use for non-homepage heroes to reduce bundle size.
 */
export function HeroPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        background: "linear-gradient(135deg, hsl(95 38% 35% / 0.95) 0%, hsl(95 35% 28% / 0.9) 50%, hsl(35 45% 22% / 0.92) 100%)",
      }}
      aria-hidden
    />
  );
}
