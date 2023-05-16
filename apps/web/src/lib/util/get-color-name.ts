import { MantineColor } from "@mantine/core";

export function getColorName(hex: string): MantineColor | null {
    const colors: Record<string, MantineColor> = {
        // epic
        "#d850ff": "violet",
        // super rare
        "#5ab3ff": "blue",
        // rare
        "#68fd58": "lime",
        // mythic
        "#fe5e72": "red",
        // legendary
        "#fff11e": "yellow",
        // chromatic
        "#f88f25": "orange",
    };

    return colors[hex];
}
