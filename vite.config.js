import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
        showcase: resolve(__dirname, "showcase.html"),
        discord: resolve(__dirname, "discord.html"),
      },
    },
  },
  server: {
    allowedHosts: true,
  },
});
