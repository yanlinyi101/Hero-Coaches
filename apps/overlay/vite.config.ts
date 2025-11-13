import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        postmatch: resolve(__dirname, "src/postmatch.html"),
      },
    },
  },
  server: {
    port: 5173,
  },
});

