import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { createLogger, defineConfig } from "vite";

// Custom visual & session editor plugins
import inlineEditPlugin from "./plugins/visual-editor/vite-plugin-react-inline-editor.js";
import editModeDevPlugin from "./plugins/visual-editor/vite-plugin-edit-mode.js";
import selectionModePlugin from "./plugins/selection-mode/vite-plugin-selection-mode.js";
import iframeRouteRestorationPlugin from "./plugins/vite-plugin-iframe-route-restoration.js";
import pocketbaseAuthPlugin from "./plugins/vite-plugin-pocketbase-auth.js";
import sessionJournalPlugin from "./plugins/session-journal/vite-plugin-session-journal.js";

// Define __dirname for ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));
const allDeps = Object.keys(pkg.dependencies || {});
const isDev = process.env.NODE_ENV !== "production";

// --- REQUIRED VARIABLES (Ensure these strings are populated with your project's logic) ---
const configHorizonsViteErrorHandler = ``;
const configHorizonsRuntimeErrorHandler = ``;
const configHorizonsConsoleErrorHandler = ``;
const configWindowFetchMonkeyPatch = ``;
const configNavigationHandler = ``;
// ------------------------------------------------------------------------------------------

const addTransformIndexHtml = {
  name: "add-transform-index-html",
  transformIndexHtml(html) {
    const tags = [
      {
        tag: "script",
        attrs: { type: "module" },
        children: configHorizonsRuntimeErrorHandler,
        injectTo: "head",
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configHorizonsViteErrorHandler,
        injectTo: "head",
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configHorizonsConsoleErrorHandler,
        injectTo: "head",
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configWindowFetchMonkeyPatch,
        injectTo: "head",
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configNavigationHandler,
        injectTo: "head",
      },
    ];
    return { html, tags };
  },
};

console.warn = () => {};
const logger = createLogger();
const loggerError = logger.error;
logger.error = (msg, options) => {
  if (options?.error?.toString().includes("CssSyntaxError: [postcss]")) return;
  loggerError(msg, options);
};

export default defineConfig({
  optimizeDeps: { include: allDeps },
  customLogger: logger,
  plugins: [
    ...(isDev
      ? [
          inlineEditPlugin(),
          editModeDevPlugin(),
          selectionModePlugin(),
          iframeRouteRestorationPlugin(),
          pocketbaseAuthPlugin(),
          sessionJournalPlugin(),
        ]
      : []),
    react(),
    addTransformIndexHtml,
  ],
  server: {
    port: 3000,
    cors: true,
    proxy: {
      "/wp-json": {
        target: "https://dev.dziregifts.com",
        changeOrigin: true,
        secure: false,
      },
    },
    // COMMENTED OUT TO ALLOW THIRD-PARTY PAYMENT IFRAMES (RAZORPAY):
    // headers: {
    //   "Cross-Origin-Embedder-Policy": "credentialless",
    // },
    // Standard allowed hosts for development
    allowedHosts: [".app-preview.com", ".app-preview.io"],
    fs: {
      strict: true,
      allow: [
        path.resolve(__dirname),
        path.join(path.resolve(__dirname, "../.."), "node_modules"),
      ],
    },
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      external: [
        "@babel/parser",
        "@babel/traverse",
        "@babel/generator",
        "@babel/types",
      ],
    },
  },
});
