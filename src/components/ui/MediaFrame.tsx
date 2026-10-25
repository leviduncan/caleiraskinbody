import Image from "next/image";
import type { ImageSlot } from "@/content/site";
import { ImagePlaceholder } from "./ImagePlaceholder";

export interface MediaFrameProps {
  /** Placeholder label and optional real image. */
  slot: ImageSlot;
  /** CSS aspect-ratio value, for example "4 / 5". */
  ratio: string;
  /** Rounds the top into the signature arch, with a champagne inner hairline. */
  arch?: boolean;
  sizes?: string;
  priority?: boolean;
  /** Print the slot's label on the placeholder block. It is always the accessible name. */
  showPlaceholderLabel?: boolean;
  className?: string;
}

/** A fixed-ratio frame that shows a real image or the placeholder. */
export function MediaFrame({
  slot,
  ratio,
  arch = false,
  sizes = "(min-width: 1024px) 480px, 100vw",
  priority = false,
  showPlaceholderLabel = true,
  className = "",
}: MediaFrameProps) {
  const { image } = slot;
  return (
    <div
      className={`relative overflow-hidden bg-tone-4 ${arch ? "arch" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          // Below the fold the frame's own color is placeholder enough; a blur only adds page weight.
          placeholder={priority && typeof image.src !== "string" ? "blur" : "empty"}
          className="object-cover"
          style={{ objectPosition: image.position }}
        />
      ) : (
        <ImagePlaceholder label={slot.label} showLabel={showPlaceholderLabel} />
      )}
      {arch ? (
        <span
          aria-hidden="true"
          className="arch pointer-events-none absolute inset-x-3.5 top-3.5 bottom-0 border border-b-0 border-champagne"
        />
      ) : null}
    </div>
  );
}
