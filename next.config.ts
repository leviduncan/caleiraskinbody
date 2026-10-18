import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for shared hosting. Run `npm run build`, upload the `out` folder.
  output: "export",
  // Hides the round Next.js badge shown in the corner during development.
  devIndicators: false,
  images: {
    // The default image optimizer needs a server, which a static export does not have.
    unoptimized: true,
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
