import { Tuple, DefaultMantineColor } from "@mantine/core";

declare module NodeJS {
    export interface ProcessEnv {
        BRAWL_STARS_API_TOKEN: string;
    }
}

type ExtendedCustomColors = "lighterWhite" | DefaultMantineColor;

declare module "@mantine/core" {
    export interface MantineThemeColorsOverride {
        colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
    }
}
