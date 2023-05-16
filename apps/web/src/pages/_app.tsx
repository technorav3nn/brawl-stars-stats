import { useState } from "react";
import NextApp, { AppProps, AppContext } from "next/app";
import { getCookie, setCookie } from "cookies-next";
import Head from "next/head";
import { MantineProvider, ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Header } from "../components/Layout/Header";
import { RouterProgress } from "../components/Layout/RouterProgress/RouterProgress";
import "../styles/global.css";

// define Component as a Next.js component with a layout prop
type AppPropsWithLayout = AppProps & {
    Component: { layout?: React.ComponentType<{ children: React.ReactNode }> };
};

export default function App(props: AppPropsWithLayout & { colorScheme: ColorScheme }) {
    const { Component, pageProps } = props;
    const Layout = Component.layout || ((children) => <>{children}</>);

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

            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider
                    theme={{
                        colorScheme,
                        primaryColor: "yellow",
                        colors: {
                            lighterWhite: ["#fbfbfb"],
                        },
                    }}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    <Notifications />
                    <RouterProgress />
                    <Header />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </MantineProvider>
            </ColorSchemeProvider>
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
