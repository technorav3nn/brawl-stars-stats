import type { BrawlApiBrawler } from "@brawltracker/brawlapi";
import { ActionIcon, Box, Group, Text, Tooltip } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { IconExternalLink, IconSparkles, IconSwords } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Image } from "remix-image";

import { useStyles } from "./BrawlerHero.styles";

export function BrawlerHero({ brawler }: { brawler: BrawlApiBrawler }) {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const os = "android";

    useEffect(() => {
        if (os === "android" || os === "ios") {
            setOpened(true);
            setTimeout(() => setOpened(false), 2000);
        }
    }, [os]);

    return (
        <Box
        // sx={{
        //     position: "sticky",
        //     top: "calc(var(--mantine-header-height) + 10px)",
        //     zIndex: 1,
        // }}
        >
            <Group noWrap>
                <Tooltip position="bottom" label="Tap to open in Brawl Stars" opened={opened}>
                    <Image
                        src={brawler.imageUrl}
                        style={{
                            borderRadius: "5%",
                        }}
                        width={110}
                        height={110}
                        alt={`An image of ${brawler.name}, a ${brawler.rarity} brawler.`}
                    />
                </Tooltip>
                <div>
                    <Text fz={35} fw={700} className={classes.name}>
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
        </Box>
    );
}
