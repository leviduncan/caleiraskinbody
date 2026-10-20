import Image from "next/image";
import { site } from "@/content/site";

/**
 * A soft, blurred photo pinned behind the whole page. The light sections are
 * slightly see-through (see Section.tsx), so it glows through them as warm color.
 * Decorative only: too blurred to read as a picture.
 * The blur is baked into a tiny file (scripts/blur-backdrop.mjs), so the browser
 * only stretches it; a live CSS blur this size is slow to paint on phones.
 */
export function PageBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Scaled up to match the framing of the original full-size photo. */}
      <Image
        src={site.backdrop}
        alt=""
        fill
        unoptimized
        loading="eager"
        className="scale-125 object-cover"
      />
    </div>
  );
}
