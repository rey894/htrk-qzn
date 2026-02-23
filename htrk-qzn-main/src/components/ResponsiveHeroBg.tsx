/**
 * Responsive hero background - uses mobile image on small screens, web image on desktop.
 * Reduces bandwidth on mobile by serving smaller optimized images.
 */
interface ResponsiveHeroBgProps {
  mobileSrc: string;
  webSrc: string;
  className?: string;
  children?: React.ReactNode;
}

export function ResponsiveHeroBg({ mobileSrc, webSrc, className = "" }: ResponsiveHeroBgProps) {
  return (
    <>
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden ${className}`}
        style={{ backgroundImage: `url(${mobileSrc})` }}
      />
      <div
        className={`absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block ${className}`}
        style={{ backgroundImage: `url(${webSrc})` }}
      />
    </>
  );
}
