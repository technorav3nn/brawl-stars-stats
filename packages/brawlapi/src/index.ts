import { fetch } from "@sapphire/fetch";

import { API_URL } from "./constants";
import { getCsvBrawlers } from "./csv-data";
import type {
    BrawlApiBrawler,
    BrawlApiEvents,
    BrawlApiGameMode,
    BrawlApiGameModes,
    BrawlApiGetAllBrawlersResponse,
    BrawlApiIconsResponse,
    BrawlApiMap,
    BrawlApiMaps,
} from "./types";

// Brawlers
function getBrawlerById(id: number) {
    return fetch<BrawlApiBrawler>(`${API_URL}/brawlers/${id}`);
}

async function getAllBrawlers() {
    return fetch<BrawlApiGetAllBrawlersResponse>(`${API_URL}/brawlers`);
}

// Events
async function getEvents() {
    return fetch<BrawlApiEvents>(`${API_URL}/events`);
}

// Maps
async function getMapById(id: number) {
    return fetch<BrawlApiMap>(`${API_URL}/maps/${id}`);
}

async function getAllMaps() {
    return fetch<BrawlApiMaps>(`${API_URL}/maps`);
}

// Game Modes
async function getGameModeById(id: number) {
    return fetch<BrawlApiGameMode>(`${API_URL}/gamemodes/${id}`);
}

async function getAllGameModes() {
    return fetch<BrawlApiGameModes>(`${API_URL}/gamemodes`);
}

// Icons
async function getAllIcons() {
    return fetch<BrawlApiIconsResponse>(`${API_URL}/icons`);
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

export * from "./types";
