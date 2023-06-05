import { createEmotionCache, MantineProvider } from "@mantine/core";
import { ColorSchemeProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { StylesPlaceholder } from "@mantine/remix";
import type { HeadersFunction, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useFetcher,
    useLoaderData,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import remixImageStyles from "remix-image/remix-image.css";

import { Header } from "./components/Layout/Header";
import { RouterProgress } from "./components/Layout/RouterProgress/RouterProgress";
import { emotionCache } from "./lib/emotion-cache";
import { getColorSchemeSession } from "./lib/util/color-scheme.server";

export const meta: V2_MetaFunction = () => [
    {
        charset: "utf-8",
        title: "New Remix App",
        viewport: "width=device-width,initial-scale=1",
    },
];

export const links = () => [{ href: remixImageStyles, rel: "stylesheet" }];
export const loader = async ({ request }: LoaderArgs) => {
    const session = await getColorSchemeSession(request);
    const colorScheme = session.getColorScheme();

    return {
        colorScheme: colorScheme ?? "dark",
    };
};

export default function App() {
    createEmotionCache({ key: "mantine" });

    const [queryClient] = useState(() => new QueryClient());
    const [hasSetColorScheme, setHasSetColorScheme] = useState(false);
    const { colorScheme } = useLoaderData<typeof loader>();

    const colorSchemeFetcher = useFetcher();

    useEffect(() => {
        console.log("loaderData", colorScheme);
    }, [colorScheme]);

    const toggleColorScheme = () => {
        const newColorScheme = colorScheme === "light" ? "dark" : "light";
        colorSchemeFetcher.submit(
            { colorScheme: newColorScheme },
            {
                action: "actions/set-color-scheme",
                method: "post",
            }
        );
        setHasSetColorScheme(true);
    };

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{
                    colorScheme,
                    colors: {
                        lighterWhite: ["#fbfbfb"],
                    },
                    primaryColor: "blue",
                }}
                withGlobalStyles
                withNormalizeCSS
                emotionCache={emotionCache}
            >
                <html lang="en">
                    <head>
                        <Meta />
                        <Links />
                        <StylesPlaceholder />
                    </head>
                    <body>
                        <QueryClientProvider client={queryClient}>
                            <ReactQueryDevtools initialIsOpen={false} />

                            <Notifications />
                            <RouterProgress />
                            <Header />
                        </QueryClientProvider>
                        <Outlet />
                        <ScrollRestoration />
                        <Scripts />
                        <LiveReload />
                    </body>
                </html>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
