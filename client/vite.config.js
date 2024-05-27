/* eslint-env node */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const serverPort = process.env.SERVER_PORT ?? "3100";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "../server/static",
	},
	plugins: [react()],
	server: {
		port: process.env.PORT,
		proxy: {
			"/api": `http://localhost:${serverPort}`,
			"/health": `http://localhost:${serverPort}`,
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["src/tests/setupTests.js"],
	},
});
