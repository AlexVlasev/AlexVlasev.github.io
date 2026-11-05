import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        // public/ and legacy/ hold the old site until the migration replaces it.
        ignores: ["build/", ".react-router/", "public/", "legacy/"],
    },
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    jsxA11y.configs.recommended,
    {
        languageOptions: {
            globals: { ...globals.browser },
        },
        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            // React Router's generated route types can only be imported relatively.
                            regex: "^\\.\\.?/(?!\\+types/)",
                            message:
                                'Use an absolute import from "~/" instead.',
                        },
                    ],
                },
            ],
        },
    },
    prettier,
);
