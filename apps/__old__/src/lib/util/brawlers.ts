const BRAWLER_LEVEL_DIVISOR = 22;
const MAX_LEVEL = 11;

const kSpaces = / +/g;

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export function resolveBrawlerName(brawlerName: string) {
    return brawlerName.toLowerCase().replace(kSpaces, "_").replace(".", "_");
}

export function calculateBrawlerLevelStat(base: number, level: Level) {
    return base + level * (base / BRAWLER_LEVEL_DIVISOR);
}

export function getCalculatedBrawlerStats(base: number) {
    return Array(MAX_LEVEL)
        .fill(0)
        .map((_, i) => calculateBrawlerLevelStat(base, i as Level));
}
