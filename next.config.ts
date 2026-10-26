import { existsSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// El botón "Descargar CV" solo se activa si existe public/cv.pdf al compilar.
const cvAvailable = existsSync(path.join(process.cwd(), "public", "cv.pdf"));

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  env: {
    CV_AVAILABLE: cvAvailable ? "true" : "false",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
