import { fileURLToPath } from "node:url";

import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import rehypeKatex from "rehype-katex";
import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

const mathMacros = {
    "\\mc": "\\mathrm{\\mathcal{#1}}",
    "\\inn": "\\langle #1 \\!\\; \\rangle",
    "\\dd": "\\; \\mathrm{d}",
    "\\delpt": "\\nabla_{pt}",
    "\\delz": "\\nabla_z",
    "\\del": "\\partial",
    "\\ve": "\\vec{\\mc{E}}",
    "\\vh": "\\vec{\\mc{H}}",
    "\\vE": "\\vec{E}",
    "\\vH": "\\vec{H}",
    "\\e": "\\epsilon",
    "\\om": "\\omega",
    "\\Om": "\\Omega",
};

export default defineConfig({
    plugins: [
        {
            enforce: "pre",
            ...mdx({
                remarkPlugins: [
                    remarkFrontmatter,
                    remarkMdxFrontmatter,
                    remarkMath,
                ],
                rehypePlugins: [[rehypeKatex, { macros: mathMacros }]],
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
