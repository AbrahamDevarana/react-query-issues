import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // add alias
    resolve: {
        alias: {
            "@": "/src",
        }
    }
});
