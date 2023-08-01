import "~/styles/global.css";

import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useServerSideQuery } from "rakkasjs";
import { runServerSideMutation } from "rakkasjs";
import { useState } from "react";

import { cache } from "./lib/emotion/cache";
import { GlobalStyles } from "./styles/Global";

const Root = ({ children }: React.PropsWithChildren) => {
    const { data: colorSchemeResult } = useServerSideQuery((ctx) => {
        return ctx.cookie.colorScheme || "dark";
    });
    const [colorScheme, setColorScheme] = useState<ColorScheme>(colorSchemeResult as ColorScheme);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
        setColorScheme(nextColorScheme);
        runServerSideMutation((ctx) => {
            ctx.setCookie("colorScheme", nextColorScheme, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });
        });
    };

    return (
        <>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <GlobalStyles />
                <MantineProvider
                    emotionCache={cache}
                    theme={{
                        colorScheme,
                        colors: {
                            lighterWhite: ["#fbfbfb"],
                        },
                        headings: {
                            fontFamily: "Greycliff CF, sans-serif",
                        },
                    }}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    {children}
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
};

export default Root;
