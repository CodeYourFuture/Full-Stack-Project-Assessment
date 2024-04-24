/* eslint-env node */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const serverPort = process.env.SERVER_PORT ?? "3100";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "../server/static",
		// adding this by netlify suggestion AI to resolve th deploying error
		rollupOptions: {
			external: ["localforage"],
		},
	},
	plugins: [react()],
	server: {
		port: process.env.PORT,
		proxy: {
			"/api": `http://localhost:${serverPort}`,
			"/healthz": `http://localhost:${serverPort}`,
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["src/tests/setupTests.js"],
	},
});
