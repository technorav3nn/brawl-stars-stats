import type { BrawlApiBrawler } from "@brawltracker/brawlapi";
import { Group, Text } from "@mantine/core";
import { IconSparkles, IconSwords } from "@tabler/icons-react";
import Image from "next/image";

import { css } from "~/styled-system/css";

interface BrawlerHeroProps {
    brawler: BrawlApiBrawler;
}

const name = css({
    fontFamily: "greycliff.bold",
});

export function BrawlerHero({ brawler }: BrawlerHeroProps) {
    return (
        <Group wrap="nowrap">
            <Image
                src={brawler.imageUrl}
                width={110}
                height={110}
                alt={`An image of ${brawler.name}, a ${brawler.rarity} brawler.`}
            />
            <div>
                <Text fz={30} fw={700} className={name}>
                    {brawler.name}
                </Text>

                <Group wrap="nowrap" gap={5}>
                    <IconSparkles stroke={2} size="1.1rem" />
                    <Text fz="lg">{brawler.rarity.name}</Text>
                </Group>

                <Group wrap="nowrap" gap={5}>
                    <IconSwords stroke={2} size="1.1rem" />
                    <Text fz="lg">{brawler.class.name}</Text>
                </Group>
            </div>
        </Group>
    );
}
