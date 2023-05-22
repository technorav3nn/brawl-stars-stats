import "../styles/global.css";

import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { getCookie, setCookie } from "cookies-next";
import { NextPage } from "next";
import NextApp, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

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
