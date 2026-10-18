import Image from "next/image";
import { site } from "@/content/site";

/**
 * A soft, blurred photo pinned behind the whole page. The light sections are
 * slightly see-through (see Section.tsx), so it glows through them as warm color.
 * Decorative only: too blurred to read as a picture.
 */
export function PageBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Scaled up so the blur never shows a soft edge at the screen borders. */}
      <Image
        src={site.backdrop}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="scale-125 object-cover blur-2xl"
      />
    </div>
  );
}
