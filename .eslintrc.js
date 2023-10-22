module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true
    },
    extends: ["eslint:recommended", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["@typescript-eslint"],
    rules: {
        indent: "off",
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"]
    }
};
