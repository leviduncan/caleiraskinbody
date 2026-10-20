// Bakes the page backdrop's blur into a tiny image, so phones never run a full-screen CSS blur.
// Run it again after changing the backdrop photo:
//   node scripts/blur-backdrop.mjs src/assets/light-hero.jpg src/assets/backdrop-blurred.jpg
import sharp from "sharp";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node scripts/blur-backdrop.mjs <photo> <output.jpg>");
  process.exit(1);
}

// PageBackdrop stretches this about 12x to cover the screen, so a 4px blur here
// matches the 50px CSS blur it replaces.
await sharp(input).resize({ width: 160 }).blur(4).jpeg({ quality: 70 }).toFile(output);
console.log(`Wrote ${output}`);
