/* eslint-disable simple-import-sort/imports, sort-keys-fix/sort-keys-fix */
import { defineConfig } from "vite";

import rakkas from "rakkasjs/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import { cjsInterop } from "vite-plugin-cjs-interop";

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        rakkas(),
        cjsInterop({
            dependencies: ["@mantine/core", "@brawltracker/brawlapi"],
        }),
    ],
    optimizeDeps: {
        include: ["@mantine/core"],
    },
    ssr: {
        // noExternal: ["@mantine/core", "@brawltracker/brawlapi"],
    },
    resolve: {
        preserveSymlinks: true,
    },
    server: {
        port: 5000,
    },
});
