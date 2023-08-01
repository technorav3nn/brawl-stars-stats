/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DEFAULT_THEME } from "@mantine/core";
import { defineConfig } from "@pandacss/dev";
import { preset as defaultPandaPreset } from "@pandacss/preset-panda";

import { theme, vars } from "./src/styles/theme";

if (!theme.primaryColor) {
    console.error("pandas: theme.primaryColor is not set");
    process.exit();
}

interface ColorValue {
    value: string;
    description: string;
}

function convertMantineColorsToPandas() {
    const { colors } = vars;
    const newColors: { [key: string]: { [key: string]: ColorValue } } = {};
    for (const [colorKey, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === "object") {
            const newColorValue: { [shade: string]: ColorValue } = {};
            for (const [shadeKey, shadeValue] of Object.entries(colorValue)) {
                newColorValue[shadeKey] = {
                    value: shadeValue,
                    description: `${colorKey} ${shadeKey}`,
                };
            }
            newColors[colorKey] = newColorValue;
        }
    }
    return newColors;
}

function getPrimaryColorAndShade():
    | { primaryColor: string; lightShade: number; darkShade: number }
    | undefined {
    if (!theme.primaryColor || !theme.primaryShade) {
        console.error("pandas: theme.primaryColor or theme.primaryShade is not set");
        process.exit();
    }
    if (typeof theme.primaryShade === "number") {
        return {
            primaryColor: theme.primaryColor,
            lightShade: theme.primaryShade,
            darkShade: theme.primaryShade,
        };
    }
    if (typeof theme.primaryShade === "object") {
        const { light, dark } = theme.primaryShade;
        if (!light || !dark) {
            console.error("pandas: theme.primaryShade.light or theme.primaryShade.dark is not set");
            process.exit();
        }
        return { primaryColor: theme.primaryColor, lightShade: light, darkShade: dark };
    }
}

function convertMantineFontSizesToPandas() {
    const newTextFontSizes: { [key: string]: ColorValue } = {};
    const newHeadingFontSizes: { [key: string]: ColorValue } = {};

    for (const [fontSizeKey, fontSizeValue] of Object.entries(vars.fontSizes)) {
        newTextFontSizes[fontSizeKey] = {
            value: fontSizeValue,
            description: ` Normal ${fontSizeKey}`,
        };
    }

    for (const [headingName, heading] of Object.entries(DEFAULT_THEME.headings.sizes)) {
        const { fontSize: headingFontSize } = heading;
        newHeadingFontSizes[headingName] = {
            value: headingFontSize,
            description: `Heading ${headingName}`,
        };
    }

    return { textFontSizes: newTextFontSizes, headingFontSizes: newHeadingFontSizes };
}

function convertBorderRadiusToPandas() {
    const newBorderRadius: { [key: string]: ColorValue } = {};
    for (const [borderRadiusKey, borderRadiusValue] of Object.entries(vars.radius)) {
        newBorderRadius[borderRadiusKey] = {
            value: borderRadiusValue,
            description: borderRadiusKey,
        };
    }
    return { borderRadius: newBorderRadius };
}

function convertMantineShadowsToPandas() {
    const newShadows: { [key: string]: ColorValue } = {};
    for (const [shadowKey, shadowValue] of Object.entries(vars.shadows)) {
        newShadows[shadowKey] = {
            value: shadowValue,
            description: shadowKey,
        };
    }
    return { shadows: newShadows };
}

const { primaryColor, darkShade, lightShade } = getPrimaryColorAndShade()!;
const { textFontSizes, headingFontSizes } = convertMantineFontSizesToPandas()!;
const { shadows } = convertMantineShadowsToPandas()!;
const { borderRadius } = convertBorderRadiusToPandas()!;

export default defineConfig({
    preflight: false,
    jsxFramework: "react",
    include: ["./src/**/*.{ts,tsx,js,jsx}", "./src/app/**/*.{ts,tsx,js,jsx}"],
    exclude: [],
    theme: {
        tokens: {
            colors: {
                ...convertMantineColorsToPandas(),
                white: {
                    value: vars.colors.white,
                    description: "White mantine color",
                },
            },
            fontSizes: {
                text: textFontSizes,
                heading: headingFontSizes,
            },
            fonts: {
                body: { value: vars.fontFamily },
                heading: { value: vars.fontFamilyHeadings },
                greycliff: {
                    bold: {
                        value: "var(--fonts-greycliff-cf-bold)",
                    },
                    heavy: {
                        value: "var(--fonts-greycliff-cf-heavy)",
                    },
                },
                lexend: { value: "var(--fonts-lexend)" },
            },
            shadows,
            spacing: defaultPandaPreset.theme.tokens.spacing,
            fontWeights: defaultPandaPreset.theme.tokens.fontWeights,
            radii: borderRadius,
        },
        semanticTokens: {
            colors: {
                primary: {
                    value: {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        _dark: (vars.colors as any)[primaryColor]![darkShade],
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        _light: (vars.colors as any)[primaryColor]![lightShade],
                    },
                },
            },
        },
        breakpoints: {
            xs: "30em",
            sm: "48em",
            md: "64em",
            lg: "74em",
            xl: "90em",
            "2xl": "120em",
        },
        keyframes: defaultPandaPreset.theme.keyframes,
    },
    conditions: {
        extend: {
            groupHover: "[role=group]:where(:hover, [data-hover]) &",
            dark: "html[data-mantine-color-scheme='dark'] &",
            light: "[data-mantine-color-scheme='light'] &",
        },
    },
    utilities: {
        extend: {
            hideWhenLightMode: {
                className: "light-mode-hide",
                values: { type: "boolean" },
                transform(value: string) {
                    if (!value) return;
                    return {
                        "html[data-mantine-color-scheme='light'] &": {
                            display: "none",
                        },
                        "html[data-mantine-color-scheme='dark'] &": {
                            display: "block",
                        },
                    };
                },
            },
            hideWhenDarkMode: {
                values: { type: "boolean" },
                transform(value: string) {
                    if (!value) return;
                    return {
                        "html[data-mantine-color-scheme='dark'] &": {
                            display: "none",
                        },
                        "html[data-mantine-color-scheme='light'] &": {
                            display: "block",
                        },
                    };
                },
            },
        },
    },
    outdir: "styled-system",
});
