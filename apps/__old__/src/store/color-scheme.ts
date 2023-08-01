import type { ColorScheme } from "@mantine/core";
import { create } from "zustand";

interface ColorSchemeStore {
    colorScheme: ColorScheme;
    setColorScheme: (scheme: ColorScheme) => void;
}

export const useColorSchemeStore = create<ColorSchemeStore>((set) => ({
    colorScheme: "light",
    setColorScheme: (scheme: ColorScheme) => set({ colorScheme: scheme }),
}));
