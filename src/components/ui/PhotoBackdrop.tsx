import Image, { getImageProps, type StaticImageData } from "next/image";
import { ParallaxLayer, type ParallaxOptions } from "./ParallaxLayer";

interface PhotoBackdropProps {
  photo: StaticImageData;
  /** More photos. Each page load shows one of them or `photo`, picked at random. */
  alternates?: StaticImageData[];
  /** object-position classes, for example "object-[100%_30%] lg:object-center". */
  position: string;
  /** Height of the photo band below 1024px. */
  bandHeight?: string;
  /**
   * Lets the photo drift slower than the page as the section scrolls past.
   * true is slight; pass options for more (see ParallaxLayer).
   */
  parallax?: boolean | ParallaxOptions;
  priority?: boolean;
}

/**
 * A photo behind a deep section, under a near-black brown scrim so text never sits on bare photo.
 * Below 1024px it is a band across the top with the copy underneath;
 * from 1024px it fills the section and the scrim covers the left side, where the copy sits.
 */
export function PhotoBackdrop({
  photo,
  alternates = [],
  position,
  bandHeight = "h-72 md:h-96",
  parallax = false,
  priority = false,
}: PhotoBackdropProps) {
  const photos = [photo, ...alternates];
  const random = photos.length > 1;

  // Off screen at load, a blur placeholder would only add weight to the page.
  const placeholder = priority ? "blur" : "empty";

  // With several photos all are in the page and CSS hides all but one. They stay lazy so the
  // hidden ones are never downloaded; for a priority backdrop the inline script below
  // preloads the one it picks, so that one still arrives early.
  const image = random ? (
    photos.map((src, index) => (
      <Image
        key={src.src}
        src={src}
        alt=""
        fill
        fetchPriority={priority ? "high" : undefined}
        placeholder={placeholder}
        sizes="100vw"
        className={`object-cover ${position}`}
        data-photo={index}
      />
    ))
  ) : (
    <Image
      src={photo}
      alt=""
      fill
      priority={priority}
      placeholder={placeholder}
      sizes="100vw"
      className={`object-cover ${position}`}
    />
  );

  // The same srcset each <Image> above renders, so the preload and the image fetch one file.
  const srcSets = photos.map(
    (src) => getImageProps({ src, alt: "", fill: true, sizes: "100vw" }).props.srcSet,
  );
  const preload = priority
    ? `var l=document.createElement("link");l.rel="preload";l.as="image";l.imageSizes="100vw";` +
      `l.fetchPriority="high";l.imageSrcset=${JSON.stringify(srcSets)}[p];document.head.appendChild(l);`
    : "";

  return (
    <div className="absolute inset-0 bg-scrim">
      {/* The site is a static export, so the photo is picked in the browser. Running inline,
          ahead of the photos, the script settles the choice before any of them is shown.
          Without it the first photo shows. */}
      {random && (
        <>
          <style>
            {`[data-photo]:not([data-photo="0"]){display:none}` +
              alternates
                .map((_, i) => {
                  const picked = `html[data-photo-pick="${i + 1}"]`;
                  return `${picked} [data-photo="0"]{display:none}${picked} [data-photo="${i + 1}"]{display:block}`;
                })
                .join("")}
          </style>
          <script
            dangerouslySetInnerHTML={{
              __html:
                `(function(){var p=Math.floor(Math.random()*${photos.length});` +
                `document.documentElement.setAttribute("data-photo-pick",p);${preload}})()`,
            }}
          />
        </>
      )}
      <div
        className={`absolute inset-x-0 top-0 overflow-hidden ${bandHeight} lg:inset-0 lg:h-auto lg:min-h-0`}
      >
        {parallax ? (
          <ParallaxLayer {...(parallax === true ? {} : parallax)}>{image}</ParallaxLayer>
        ) : (
          image
        )}
        <div className="absolute inset-0 bg-linear-to-t from-scrim via-scrim/20 to-transparent lg:bg-linear-to-r lg:from-scrim/95 lg:via-scrim/75 lg:via-40% lg:to-transparent lg:to-75%" />
      </div>
    </div>
  );
}
