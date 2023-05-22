import { create } from "zustand";

interface FiltersStore {
    searchQuery: string;
    selectedRarity: string;
    selectedClass: string;
    setSearchQuery: (searchQuery: string) => void;
    setSelectedRarity: (selectedRarities: string) => void;
    setSelectedClass: (selectedClasses: string) => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
    searchQuery: "",
    selectedClass: "All",
    selectedRarity: "All",

    setSearchQuery: (searchQuery: string) => set({ searchQuery }),
    setSelectedClass: (selectedClass: string) => set({ selectedClass }),
    setSelectedRarity: (selectedRarity: string) => set({ selectedRarity }),
}));
