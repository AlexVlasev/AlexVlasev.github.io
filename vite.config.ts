import { fileURLToPath } from "node:url";

import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        {
            enforce: "pre",
            ...mdx({
                remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
            }),
        },
        reactRouter(),
    ],
    resolve: {
        alias: {
            // Must match "paths" in tsconfig.json. Vite's tsconfigPaths option skips .mdx files.
            "~": fileURLToPath(new URL("./app", import.meta.url)),
        },
    },
});
