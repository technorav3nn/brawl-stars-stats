import { create } from "zustand";

export type Tabs = "info" | "stats" | "cosmetics";

interface BrawlerTabStore {
    currentTab: Tabs | null;
    setCurrentTab: (tab: Tabs) => void;
}

export const useBrawlerTabStore = create<BrawlerTabStore>((set) => ({
    currentTab: "info",
    setCurrentTab: (tab) => set({ currentTab: tab }),
}));
