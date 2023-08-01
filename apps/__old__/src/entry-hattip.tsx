import { cookie } from "@hattip/cookie";
import { type ColorScheme } from "@mantine/core";
import { createStylesServer } from "@mantine/ssr";
import { createRequestHandler } from "rakkasjs";
import type { FilledContext } from "react-helmet-async";
import { HelmetProvider } from "react-helmet-async";
import remixImageStyles from "remix-image/remix-image.css?url";

import { cache } from "./lib/emotion/cache";
import { injectStyles } from "./lib/emotion/inject-styles";
import Root from "./root";

declare module "rakkasjs" {
    interface PageLocals {
        colorScheme?: ColorScheme;
    }
}

export default createRequestHandler({
    createPageHooks() {
        const server = createStylesServer(cache);

        return {
            emitToDocumentHead() {
                return `
                <!-- Begin head -->

                <!-- Links -->
                <link rel="stylesheet" href="${remixImageStyles}">
                
                <!-- End head -->
                `;
            },

            wrapApp(app) {
                return <Root>{app}</Root>;
            },

            wrapSsrStream: (stream) => injectStyles(stream, cache, server),
        };
    },
    middleware: {
        beforeAll: [cookie(), async () => {}],
    },
});

// emitToDocumentHead: () => {
//     const entries = Object.entries(cache.inserted);
//     const toSend = new Map(
//         entries.filter(([k]) => {
//             return {
//                 a: k,
//             };
//         })
//     );
//     let newTags = "";
//     toSend.forEach((style) => {
//         newTags += `<style data-emotion="${cache.key}">${style}</style>`;
//     });
//     console.log("newTags", newTags);
//     return newTags;
// },

// (ctx) => {
//     // set caching headers for static assets
//     if (ctx.url.pathname.startsWith("/assets/")) {
//         return new Response(null, {
//             headers: {
//                 "cache-control": "public, max-age=31536000, immutable",
//             },
//         });
//     }
// },
