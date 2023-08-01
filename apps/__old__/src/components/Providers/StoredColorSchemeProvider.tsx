import { type ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { runServerSideMutation, useServerSideQuery } from "rakkasjs";
import { useState } from "react";

import { useColorSchemeStore } from "~/store/color-scheme";

// const [colorScheme, setColorScheme] = useState<ColorScheme>(colorSchemeResult as ColorScheme);

export function StoredColorSchemeProvider({ children }: React.PropsWithChildren) {
    const { data: colorSchemeResult } = useServerSideQuery((ctx) => {
        return ctx.cookie.colorScheme || "dark";
    });
    const { colorScheme, setColorScheme } = useColorSchemeStore();
    const [firstTime, setFirstTime] = useState(true);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
        setFirstTime(false);
        setColorScheme(nextColorScheme);

        runServerSideMutation((ctx) => {
            ctx.setCookie("colorScheme", nextColorScheme, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });
        });
    };

    return (
        <ColorSchemeProvider
            colorScheme={firstTime ? (colorSchemeResult as ColorScheme) : colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            {children}
        </ColorSchemeProvider>
    );
}
