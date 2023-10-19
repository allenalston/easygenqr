import type { Options } from "tsup";

const config: Options = {
    entry: {
        easygenqr: "./src/index.ts"
    },
    dts: true,
    clean: true,
    format: ["cjs", "iife", "esm"],
    globalName: "easygenqr",
    outExtension: ({ format }) => {
        const extension = format === "iife" ? ".js" : `.${format}.js`;
        return {
            js: extension,
        };
    }
};

export default config;
