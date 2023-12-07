import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    // Specify the path to your CSS file
    preprocessorOptions: {
      // Assuming it's a plain CSS file
      include: ["./src/assets/Styles/*.css"],
    },
  },
});
