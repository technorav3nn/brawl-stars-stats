/* eslint-disable sort-keys-fix/sort-keys-fix */
import "./global.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";

import { Shell } from "~/components/Shell";
import { greycliffCfBold, greycliffCfHeavy, lexend } from "~/styles/fonts";
import { theme } from "~/styles/theme";

export const metadata: Metadata = {
    title: {
        default: "Brawl Stars Stats",
        template: "%s | Brawl Stars Stats",
    },
    description: "The best way to view your Brawl Stars stats!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
                <style>{`
                :root {
                    --mantine-font-family-headings: var(--${lexend.variable});
                }
            `}</style>
            </head>
            <body
                className={`${lexend.variable} ${greycliffCfBold.variable} ${greycliffCfHeavy.variable}`}
            >
                <MantineProvider
                    theme={{
                        ...theme,
                        headings: {
                            fontFamily: `${greycliffCfBold.style.fontFamily}`,
                            fontWeight: "semibold",
                        },
                    }}
                >
                    <Shell>{children}</Shell>
                </MantineProvider>
            </body>
        </html>
    );
}
