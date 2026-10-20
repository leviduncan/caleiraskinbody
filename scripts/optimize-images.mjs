// Runs after `next build`. The static export has no image server, so this writes the
// resized WebP files that src/lib/image-loader.ts points every <Image> at.
// It makes exactly the files the built pages ask for: name.w640.webp, name.w1080.webp, ...
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT = "out";
const VARIANT = /\/_next\/static\/media\/([^"'\s,?]+)\.w(\d+)\.webp/g;

async function* builtPages(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") yield* builtPages(full);
    } else if (/\.(html|txt)$/.test(entry.name)) {
      yield full;
    }
  }
}

// "hero.3xg.jpg" -> width -> output file
const wanted = new Map();
for await (const file of builtPages(OUT)) {
  for (const [, stem, width] of (await readFile(file, "utf8")).matchAll(VARIANT)) {
    if (!wanted.has(stem)) wanted.set(stem, new Set());
    wanted.get(stem).add(Number(width));
  }
}

const media = path.join(OUT, "_next", "static", "media");
const sources = await readdir(media);
let written = 0;
for (const [stem, widths] of wanted) {
  const source = sources.find((name) => name.startsWith(`${stem}.`) && /\.(jpe?g|png|webp)$/i.test(name));
  if (!source) throw new Error(`No source image in ${media} for ${stem}`);
  for (const width of widths) {
    const target = path.join(media, `${stem}.w${width}.webp`);
    if (existsSync(target)) continue;
    await sharp(path.join(media, source))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(target);
    written++;
  }
}
console.log(`optimize-images: ${written} files for ${wanted.size} images`);
