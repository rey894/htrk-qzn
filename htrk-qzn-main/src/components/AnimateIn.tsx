import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  /** Animation variant */
  variant?: "fade-in" | "fade-in-up";
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Threshold for intersection (0-1). Default 0.1 = animate when 10% visible */
  threshold?: number;
  /** Root margin for intersection observer (e.g. "0px 0px -40px 0px" to trigger earlier) */
  rootMargin?: string;
}

export function AnimateIn({
  children,
  className,
  variant = "fade-in-up",
  delay = 0,
  threshold = 0.08,
  rootMargin = "0px 0px -24px 0px",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const animationClass = isVisible
    ? variant === "fade-in-up"
      ? "animate-fade-in-up"
      : "animate-fade-in"
    : "opacity-0";

  return (
    <div
      ref={ref}
      className={cn(animationClass, className)}
      style={isVisible && delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
