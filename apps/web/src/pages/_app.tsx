import "../styles/global.css";

// import { createBrawlApi } from "@brawltracker/brawlapi/dist";
import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getCookie, setCookie } from "cookies-next";
import type { NextPage } from "next";
import type { AppContext, AppProps } from "next/app";
import NextApp from "next/app";
import Head from "next/head";
import { useState } from "react";

import { Header } from "../components/Layout/Header";
import { RouterProgress } from "../components/Layout/RouterProgress/RouterProgress";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
    getLayout?: GetLayoutFunction;
};

export type GetLayoutFunction = (
    page: React.ReactElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageProps: Record<string, any>
) => React.ReactNode;

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export default function App(props: AppPropsWithLayout & { colorScheme: ColorScheme }) {
    const { Component, pageProps } = props;
    const getLayout = Component.getLayout ?? ((page) => page);

    const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
        setColorScheme(nextColorScheme);
        setCookie("mantine-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
    };

    return (
        <>
            <Head>
                <title>Mantine next example</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link rel="shortcut icon" href="/favicon.svg" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}
                >
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
                    >
                        <Notifications />
                        <RouterProgress />
                        <Header />

                        {getLayout(<Component {...pageProps} />, pageProps)}
                    </MantineProvider>
                </ColorSchemeProvider>
            </QueryClientProvider>
        </>
    );
}

App.getInitialProps = async (appContext: AppContext) => {
    const appProps = await NextApp.getInitialProps(appContext);
    return {
        ...appProps,
        colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "dark",
    };
};

export function getStaticProps() {
    return {
        props: {},
    };
}
