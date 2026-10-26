import { existsSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

const publicDir = path.join(process.cwd(), "public");

// El botón "Descargar CV" solo se activa si existe public/cv.pdf al compilar.
const cvAvailable = existsSync(path.join(publicDir, "cv.pdf"));

// La foto del inicio se usa si existe public/images/perfil.(png|jpg|jpeg|webp).
const photoFile = ["perfil.png", "perfil.jpg", "perfil.jpeg", "perfil.webp"].find((file) =>
  existsSync(path.join(publicDir, "images", file)),
);

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  env: {
    CV_AVAILABLE: cvAvailable ? "true" : "false",
    PROFILE_PHOTO_SRC: photoFile ? `/images/${photoFile}` : "",
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
