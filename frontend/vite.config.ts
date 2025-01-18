import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@assets": path.resolve(__dirname, "src/assets"),
            "@components": path.resolve(__dirname, "src/components"),
            "@interfaces": path.resolve(__dirname, "src/interfaces"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@styles": path.resolve(__dirname, "src/styles"),
        },
    },
    build: {
        outDir: path.resolve(__dirname, "dist"), // This will specify the output folder as 'dist'
    },
});
