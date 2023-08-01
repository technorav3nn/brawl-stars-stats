import crypto from "node:crypto";
import { mkdirSync } from "node:fs";
import { access, readFile, rmdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type { RequestContext } from "rakkasjs";
import type { CacheStatus } from "remix-image/server";
import {
    Cache,
    type CacheConfig,
    fetchResolver,
    fsResolver,
    imageLoader,
    type Resolver,
} from "remix-image/server";
import { sharpTransformer } from "remix-image-sharp";

export const fetchImage: Resolver = async (asset, url, options, basePath) => {
    if (url.startsWith("/") && (url.length === 1 || url[1] !== "/")) {
        return fsResolver(asset, url, options, basePath);
    } else {
        return fetchResolver(asset, url, options, basePath);
    }
};

type DiskCacheConfig = CacheConfig & {
    path: string;
};

function createHash(input: string) {
    const hash = crypto.createHash("sha256");
    hash.update(input);
    return hash.digest("hex");
}

export class DiskCache extends Cache {
    public config: DiskCacheConfig;

    public constructor(config: Partial<DiskCacheConfig> | undefined = {}) {
        super();
        this.config = {
            path: config.path ?? ".cache/remix-image",
            tbd: config.tbd ?? 365 * 24 * 60 * 60,
            ttl: config.ttl ?? 24 * 60 * 60,
        };

        mkdirSync(this.config.path, { recursive: true });
    }

    public async has(key: string): Promise<boolean> {
        try {
            await access(`${this.config.path}/${createHash(key)}`);
            return true;
        } catch {
            return false;
        }
    }

    public status(key: string): Promise<CacheStatus> {
        // this code never gets called, not sure why.
        key;
        throw new Error("Method not implemented.");
    }
    public async get(key: string): Promise<Uint8Array | null> {
        try {
            return await readFile(`${this.config.path}/${createHash(key)}`);
        } catch {
            return null;
        }
    }
    public set(key: string, resultImg: Uint8Array): Promise<void> {
        return writeFile(`${this.config.path}/${createHash(key)}`, resultImg);
    }
    public clear(): Promise<void> {
        return rmdir(this.config.path, { recursive: true });
    }
}

// const vercelUrl = process.env.VERCEL_URL || "";
// const fixedVercelUrl = vercelUrl.startsWith("https") ? vercelUrl : `https://${vercelUrl}`;

const config = {
    basePath: process.env.NODE_ENV === "development" ? "public" : "/",
    cache: new DiskCache({
        path: path.join(os.tmpdir(), "img"),
    }),
    redirectOnFail: true,
    resolver: fetchImage,
    // selfUrl: process.env.NODE_ENV === "development" ? "http://localhost:3000" : fixedVercelUrl,
    selfUrl: "http://localhost:3000",
    transformer: sharpTransformer,
    verbose: false,
};

export async function get(ctx: RequestContext) {
    return imageLoader(config, ctx.request);
}
