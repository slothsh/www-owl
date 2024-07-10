import autoprefixer from "autoprefixer";
import { sveltePreprocess } from "svelte-preprocess";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    preprocess: sveltePreprocess({
        postcss: {
            plugins: [autoprefixer()],
        },
        scss: {
            includePaths: [resolve(__dirname, "src/styles")],
            prependData: `@import "${resolve(__dirname, "src/styles/global.scss").replace(/\\/g, '/')}";`
        }
    }),
};
