import type { fetch as nodeFetch } from "undici";

import { API_URL } from "./constants";
import { getCsvBrawlers } from "./csv-data";
import type {
    BrawlApiBrawler,
    BrawlApiEvents,
    BrawlApiGameMode,
    BrawlApiGameModes,
    BrawlApiIconsResponse,
    BrawlApiMap,
    BrawlApiMaps,
} from "./types";

let fetchFn: typeof fetch | typeof nodeFetch;

// Brawlers
async function getBrawlerById(id: number) {
    const response = await fetchFn(`${API_URL}/brawlers/${id}`);
    return (await response.json()) as BrawlApiBrawler;
}

async function getAllBrawlers() {
    const response = await fetchFn(`${API_URL}/brawlers`);
    return (await response.json()) as BrawlApiBrawler[];
}

// Events
async function getEvents() {
    const response = await fetchFn(`${API_URL}/events`);
    return (await response.json()) as BrawlApiEvents;
}

// Maps
async function getMapById(id: number) {
    const response = await fetchFn(`${API_URL}/maps/${id}`);
    return (await response.json()) as BrawlApiMap;
}

async function getAllMaps() {
    const response = await fetchFn(`${API_URL}/maps`);
    return (await response.json()) as BrawlApiMaps[];
}

// Game Modes
async function getGameModeById(id: number) {
    const response = await fetchFn(`${API_URL}/gamemodes/${id}`);
    return (await response.json()) as BrawlApiGameMode;
}

async function getAllGameModes() {
    const response = await fetchFn(`${API_URL}/gamemodes`);
    return (await response.json()) as BrawlApiGameModes[];
}

// Icons
async function getAllIcons() {
    const response = await fetchFn(`${API_URL}/icons`);
    return (await response.json()) as BrawlApiIconsResponse[];
}

export const brawlApi = {
    brawlers: {
        getAllBrawlers,
        getBrawlerById,
    },
    csvData: {
        getCsvBrawlers,
    },
    events: {
        getEvents,
    },
    gameModes: {
        getAllGameModes,
        getGameModeById,
    },
    icons: {
        getAllIcons,
    },
    maps: {
        getAllMaps,
        getMapById,
    },
};

export function createBrawlApi(isBrowser: boolean) {
    if (isBrowser) {
        fetchFn = fetch;
    } else {
        import("undici").then(({ fetch }) => {
            fetchFn = fetch;
        });
    }

    return brawlApi;
}
