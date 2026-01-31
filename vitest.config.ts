/// <reference types="vitest/config" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    update: true,
    globals: true,
    environment: "node",
  },
});
