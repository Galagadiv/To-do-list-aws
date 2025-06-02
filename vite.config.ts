import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// const repoName = "To-do-list-aws";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/`,
  build: {
    outDir: "docs",
    sourcemap: false,
  },
});
