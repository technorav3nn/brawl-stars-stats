import type { MantineColor } from "@mantine/core";

export function getColorName(hex: string): MantineColor | null {
    const colors: Record<string, MantineColor> = {
        // super rare
        "#5ab3ff": "blue",

        // rare
        "#68fd58": "lime",

        // epic
        "#d850ff": "violet",

        // chromatic
        "#f88f25": "orange",

        // mythic
        "#fe5e72": "red",

        // legendary
        "#fff11e": "yellow",
    };

    return colors[hex];
}
