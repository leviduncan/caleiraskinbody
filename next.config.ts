import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for shared hosting. Run `npm run build`, upload the `out` folder.
  output: "export",
  // Hides the round Next.js badge shown in the corner during development.
  devIndicators: false,
  images: {
    // The default image optimizer needs a server, which a static export does not have.
    // Instead this loader names resized WebP files that `npm run build` writes after the export.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // Fewer widths than the defaults, so each photo needs fewer files.
    deviceSizes: [640, 828, 1080, 1280, 1640, 2048],
    imageSizes: [256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: [
          {
            loader: "@tailwindcss/turbopack",
            // Without an explicit base the loader found no class names in this project
            // and emitted no utility classes, leaving the page unstyled.
            options: { base: process.cwd() },
          },
        ],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
