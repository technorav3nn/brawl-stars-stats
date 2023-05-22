import { createStyles,Group, Text } from "@mantine/core";
import { IconSparkles, IconSwords } from "@tabler/icons-react";
import { Brawler } from "brawl-api";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

export function BrawlerTitleSection({ brawler }: { brawler: Brawler }) {
    // a component that displays the brawler's name and image
    // looks like:
    /**
     * {IMAGE HERE} {BRAWLER NAME HERE}
     *              {BRAWLER RARITY HERE}
     *              {BRAWLER TYPE HERE}
     */

    const { classes } = useStyles();

    return (
        <Group noWrap>
            <Image
                src={brawler.imageUrl}
                width={110}
                height={110}
                alt={`An image of ${brawler.name}, a ${brawler.rarity} brawler.`}
            />
            <div>
                <Text fz={30} fw={700} className={classes.name}>
                    {brawler.name}
                </Text>

                <Group noWrap spacing={5}>
                    <IconSparkles stroke={2} size="1.1rem" />
                    <Text fz="lg">{brawler.rarity.name}</Text>
                </Group>

                <Group noWrap spacing={5}>
                    <IconSwords stroke={2} size="1.1rem" />
                    <Text fz="lg">{brawler.class.name}</Text>
                </Group>
            </div>
        </Group>
    );
}
