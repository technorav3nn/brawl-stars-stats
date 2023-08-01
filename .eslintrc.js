module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    overrides: [
        {
            files: ["*.jsx", "*.tsx", "*.ts"],
            rules: {
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/no-non-null-assertion": "off",
                "no-console": ["error", { allow: ["warn", "error", "debug", "log"] }],
                "react-hooks/exhaustive-deps": "warn",
                "react-hooks/rules-of-hooks": "error",
                "react/prop-types": "off",
                "react/react-in-jsx-scope": "off",
            },
        },
        {
            files: ["*.config.js", ".eslintrc.js", "*.config.ts"],
            rules: {
                "@typescript-eslint/no-var-requires": "off",
                "import/no-commonjs": "off",
                "sort-keys": "off",
                "unicorn/prefer-module": "off",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
    },
    plugins: ["@typescript-eslint", "simple-import-sort", "prettier", "sort-keys-fix", "react"],
    root: true,
    rules: {
        "@typescript-eslint/consistent-type-imports": "error",
        "import/no-unresolved": "off",
        "import/no-useless-path-segments": "off",
        "no-console": "off",
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": "error",
        "sort-keys-fix/sort-keys-fix": "warn",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
