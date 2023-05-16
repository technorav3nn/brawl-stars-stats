module.exports = {
    extends: [
        "plugin:@next/next/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "prettier",
        "mantine",
    ],
    overrides: [],
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    rules: {
        "react/react-in-jsx-scope": "off",
        // disable indent
        "react/jsx-indent-props": "off",
        quotes: "off",
        "@typescript-eslint/quotes": 0,
        "import/extensions": "off",
    },
};
