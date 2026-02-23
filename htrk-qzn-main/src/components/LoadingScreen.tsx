import { useEffect, useState, useRef, useCallback } from "react";

export const INTRO_SEEN_KEY = "quezon-intro-seen";

// logo-intro.mp4 from public/assets - video-driven timing
const LOGO_INTRO_SRC = "/assets/logo-intro.mp4";
const LOGO_LINGER_MS = 2000;
const FADEOUT_DURATION_MS = 900; // Subtle fade before page opens

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"playing" | "linger" | "fadeout" | "done">("playing");
  const [opacity, setOpacity] = useState(1);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const complete = useCallback(() => {
    setPhase("done");
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // ignore
    }
    onComplete();
  }, [onComplete]);

  const handleVideoEnded = useCallback(() => {
    setPhase("linger");
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
    setTimeout(() => complete(), 800);
  }, [complete]);

  const handleSkip = useCallback(() => {
    complete();
  }, [complete]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_SEEN_KEY) === "1") {
        complete();
        return;
      }
    } catch {
      // ignore
    }

    if (typeof window !== "undefined") {
      const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      const navigatorWithConnection = navigator as Navigator & { connection?: { saveData?: boolean } };
      const saveData = Boolean(navigatorWithConnection.connection?.saveData);
      if (reducedMotion || saveData) {
        complete();
        return;
      }
    }

    const video = videoRef.current;
    const canPlay = () => {
      video?.play().catch(() => setVideoError(false));
    };
    if (video) {
      video.addEventListener("canplay", canPlay, { once: true });
    }

    return () => {
      video?.removeEventListener("canplay", canPlay);
    };
  }, [complete]);

  // Phase timing: video plays -> onEnded -> linger -> fadeout -> complete
  useEffect(() => {
    if (phase === "done") return;

    if (phase === "linger") {
      const t = setTimeout(() => setPhase("fadeout"), LOGO_LINGER_MS);
      return () => clearTimeout(t);
    }

    if (phase === "fadeout") {
      setOpacity(0);
      const t = setTimeout(complete, FADEOUT_DURATION_MS);
      return () => clearTimeout(t);
    }

    return undefined;
  }, [phase, complete]);

  // Prevent body scroll during loading
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden min-h-screen w-screen"
      style={{
        isolation: "isolate",
        opacity,
        transition: `opacity ${FADEOUT_DURATION_MS}ms ease-out`,
      }}
    >
      <video
        ref={videoRef}
        src={LOGO_INTRO_SRC}
        className="absolute inset-0 w-full h-full object-contain bg-white"
        style={{ objectFit: "contain" }}
        playsInline
        muted
        autoPlay
        onEnded={handleVideoEnded}
        onError={handleVideoError}
      />
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="animate-pulse text-primary text-sm">Loading...</div>
        </div>
      )}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 px-4 py-2 text-sm text-primary/90 hover:text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors backdrop-blur-sm border border-primary/20 z-10"
        type="button"
      >
        Skip
      </button>
    </div>
  );
}
