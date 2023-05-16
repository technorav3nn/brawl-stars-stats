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
    selectedRarity: "All",
    selectedClass: "All",

    setSearchQuery: (searchQuery: string) => set({ searchQuery }),
    setSelectedRarity: (selectedRarity: string) => set({ selectedRarity }),
    setSelectedClass: (selectedClass: string) => set({ selectedClass }),
}));
