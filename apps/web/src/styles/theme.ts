"use client";

/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createTheme, DEFAULT_THEME, type MantineThemeColors } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exclude = <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
): Omit<T, K> => {
    const newObj = { ...obj };

    for (const key of keys) {
        delete newObj[key];
    }

    return newObj;
};

export const theme = createTheme({
    primaryColor: "blue" satisfies keyof MantineThemeColors,
    colors: {
        ...DEFAULT_THEME.colors,
    },
    primaryShade: { dark: 8, light: 6 },
});

export const vars = themeToVars(theme);
