import type { Options } from "tsup";
import { defineConfig } from "tsup";
import type { Awaitable } from "vitest";

type TsupOptions = Omit<Options, "tsconfig"> & Required<Pick<Options, "tsconfig">>;

export function defineTsupConfig(
    options: TsupOptions,
    override = false
): Options | Options[] | ((overrideOptions: Options) => Awaitable<Options | Options[]>) {
    if (override) return defineConfig(options);
    return defineConfig({
        bundle: false,
        clean: true,
        dts: true,
        entry: ["src/index.ts"],
        format: ["esm", "cjs"],
        keepNames: true,
        minify: false,
        shims: false,
        sourcemap: true,
        splitting: false,
        target: "esnext",
        treeshake: true,
        ...options,
    });
}
