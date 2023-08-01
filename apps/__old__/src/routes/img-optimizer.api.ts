import { createOptimizer } from "img-optimizer/server";
import type { RequestContext } from "rakkasjs";

const optimize = createOptimizer({
    domains: ["cdn-old.brawlify.com", "cdn.brawlify.com", "media.brawltime.ninja"],
});

export async function get(ctx: RequestContext) {
    const result = await optimize({
        headers: ctx.request.headers,
        url: ctx.url,
    });

    return new Response(result.body, {
        headers: result.headers,
        status: result.status,
    });
}
