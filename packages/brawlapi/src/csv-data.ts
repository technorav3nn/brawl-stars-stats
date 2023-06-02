import { CSV_URL } from "./constants";
import type { CsvBrawler } from "./types";

export async function getCsvBrawlers() {
    const response = await fetch(`${CSV_URL}/characters`);

    return (await response.json()) as CsvBrawler[];
}
