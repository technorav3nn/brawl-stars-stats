import type { BrawlApiBrawler } from "@brawltracker/brawlapi";
import { create } from "zustand";

interface BrawlerToIdStore {
    brawlerNameToIds: Map<number, BrawlApiBrawler>;
    setBrawlerNameToIds: (brawlerNameToIds: Map<number, BrawlApiBrawler>) => void;
}

export const brawlerToIdStore = create<BrawlerToIdStore>(() => {
    return {
        brawlerNameToIds: new Map(),
        setBrawlerNameToIds: (brawlerNameToIds) => {
            return { brawlerNameToIds };
        },
    };
});
