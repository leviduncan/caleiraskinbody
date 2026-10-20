import type { ImageLoaderProps } from "next/image";

/**
 * Points each <Image> width at a resized WebP, for example hero.abc.jpg -> hero.abc.w828.webp.
 * scripts/optimize-images.mjs writes those files after `next build`; they do not exist in
 * development, so there the original photo is served at every width.
 */
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const resizable = /^\/_next\/static\/media\/.+\.(jpe?g|png|webp)$/i.test(src);
  if (process.env.NODE_ENV !== "production" || !resizable) return `${src}?w=${width}`;
  return src.replace(/\.[a-z]+$/i, `.w${width}.webp`);
}
