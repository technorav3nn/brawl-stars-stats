import { fetch } from "@sapphire/fetch";

import { CSV_URL } from "./constants";
import type { CsvBrawler } from "./types";

export async function getCsvBrawlers() {
    return fetch<Record<string, CsvBrawler>>(`${CSV_URL}/characters`);
}
