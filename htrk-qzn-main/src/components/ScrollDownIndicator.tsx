import { ChevronDown } from "lucide-react";

interface ScrollDownIndicatorProps {
  /** Optional target selector to scroll to (e.g. "#content"). If not provided, scrolls by viewport height. */
  targetSelector?: string;
  className?: string;
}

export function ScrollDownIndicator({ targetSelector, className = "" }: ScrollDownIndicatorProps) {
  const handleClick = () => {
    if (targetSelector) {
      const el = document.querySelector(targetSelector);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-0.5 text-[#8DC87B] hover:text-[#5F9A4E] transition-colors cursor-pointer group ${className}`}
      aria-label="Scroll down to next section"
    >
      <span className="text-xs font-medium tracking-wider uppercase text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Scroll</span>
      <div className="flex flex-col items-center -space-y-3">
        <ChevronDown className="h-8 w-8 animate-bounce drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform [animation-delay:0ms]" />
        <ChevronDown className="h-8 w-8 animate-bounce drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform [animation-delay:150ms]" />
      </div>
    </button>
  );
}
