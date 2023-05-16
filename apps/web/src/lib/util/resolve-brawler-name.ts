const kSpaces = / +/g;

export function resolveBrawlerName(brawlerName: string) {
    return brawlerName.toLowerCase().replace(kSpaces, "_").replace(".", "_");
}
