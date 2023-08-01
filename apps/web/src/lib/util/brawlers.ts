import { brawlApi } from "@brawltracker/brawlapi";
import { Time } from "@sapphire/time-utilities";
import memoizee from "memoizee";

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const BRAWLER_LEVEL_DIVISOR = 22;
const MAX_LEVEL = 11;
const SPACES_REGEX = / +/g;

export const getAllBrawlersMemo = memoizee(brawlApi.brawlers.getAllBrawlers, {
    async: true,
    maxAge: Time.Minute * 5,
});

export const getBrawlersNamesToIdsMemo = memoizee(getBrawlersNamesToIds, {
    async: true,
    maxAge: Time.Minute,
});

export function resolveBrawlerName(brawlerName: string) {
    return brawlerName.toLowerCase().replace(SPACES_REGEX, "_").replace(".", "_");
}

export function calculateBrawlerLevelStat(base: number, level: Level) {
    return base + level * (base / BRAWLER_LEVEL_DIVISOR);
}

export function getCalculatedBrawlerStats(base: number) {
    return Array(MAX_LEVEL)
        .fill(0)
        .map((_, i) => calculateBrawlerLevelStat(base, i as Level));
}

export async function getBrawlersNamesToIds() {
    const { list: brawlers } = await brawlApi.brawlers.getAllBrawlers();

    return brawlers.reduce((acc, brawler) => {
        const resolvedName = resolveBrawlerName(brawler.name);
        acc[resolvedName] = brawler.id;
        return acc;
    }, {} as Record<string, number>);
}
