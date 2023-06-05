import type { CsvBrawler } from "@brawltracker/brawlapi";

export type BrawlerRating = 1 | 2 | 3 | 4 | 5;

let characterData: Record<string, CsvBrawler> = {};
const elapsed = Date.now();

async function setCsvData() {
    const res = await fetch("https://api.brawlapi.com/game/csv_logic/characters");
    const data = await res.json();

    characterData = data;
}

export async function getCsvData() {
    if (Object.keys(characterData).length === 0) {
        await setCsvData();
    }

    if (Date.now() - elapsed > 1000 * 60 * 60 * 24) {
        await setCsvData();
    }

    return characterData;
}

export function findBrawlerById(data: Record<string, CsvBrawler>, id: number) {
    let brawler: CsvBrawler | undefined;
    // eslint-disable-next-line no-restricted-syntax
    for (const character of Object.values(data)) {
        if (character.id === id) {
            brawler = character;
            break;
        }
    }

    return brawler;
}
