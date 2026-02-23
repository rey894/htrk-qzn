import { useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  title?: string;
}

/**
 * Optimized video popup: loads video only when open, pauses on close.
 * Use /assets/we-are-quezon.mp4 for the "We Are Quezon" video.
 */
export function VideoPopup({ open, onOpenChange, src, title = "Video" }: VideoPopupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next && videoRef.current) {
        videoRef.current.pause();
      }
      onOpenChange(next);
    },
    [onOpenChange]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-4xl w-[95vw] p-0 gap-0 overflow-hidden bg-black"
        onEscapeKeyDown={() => handleOpenChange(false)}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="relative aspect-video w-full">
          {open && (
            <video
              ref={videoRef}
              src={src}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
              aria-label={title}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
