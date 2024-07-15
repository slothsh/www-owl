import alias from "@rollup/plugin-alias";
import autoprefixer from "autoprefixer";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import nodeResolve from "@rollup/plugin-node-resolve";
import scss from "rollup-plugin-scss";
import svelte from "rollup-plugin-svelte";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { sveltePreprocess } from "svelte-preprocess";
import { type RollupOptions } from "rollup";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("__filename:", __filename);
console.log("__dirname:", __dirname);

const production = !process.env.ROLLUP_WATCH && (process.env.ENVIRONMENT === "PRODUCTION" || process.env.ENVIRONMENT === "PROD");
const tsConfig = JSON.parse(readFileSync("./tsconfig.json").toString());

const outputDirectory = (!production) ? "build/dev" : "build/dist";

export default <RollupOptions>{
    input: "src/main.ts",
    output: {
        sourcemap: !production,
        format: "iife",
        name: "app",
        file: `${outputDirectory}/bundle.js`
    },

    plugins: [
        alias({
            entries: [
                { find: "@api", replacement: resolve(__dirname, "src/api") },
                { find: "@utilities", replacement: resolve(__dirname, "src/utilities") },
                { find: "@styles", replacement: resolve(__dirname, "src/styles") },
                { find: "@store", replacement: resolve(__dirname, "src/stores") },
                { find: "@components", replacement: resolve(__dirname, "src/components") },
            ],
        }),

        copy({
            targets: [
                { src: "public/index.html", dest: outputDirectory },
                { src: "public/assets", dest: outputDirectory },
            ]
        }),

        svelte({
            preprocess: sveltePreprocess({
                sourceMap: !production,
                postcss: {
                    plugins: [autoprefixer()],
                },
                scss: {
                    includePaths: [resolve(__dirname, "src/styles")],
                    prependData: `@import "src/styles/global.scss";`,
                },
            }),

            emitCss: true,

            compilerOptions: {
                dev: !production,
            },
        }),

        css({
            output: "bundle.css",
        }),

        scss({
            includePaths: ["src/styles"],
        }),

        nodeResolve({
            browser: true,
            dedupe: ["svelte"],
        }),

        typescript({
            sourceMap: !production,
            inlineSources: !production,
            rootDir: "./src",
            strict: true,
            paths: tsConfig.compilerOptions.paths,
        }),

        commonjs(),

        production && terser(),
    ],

    watch: {
        clearScreen: false
    }
};
