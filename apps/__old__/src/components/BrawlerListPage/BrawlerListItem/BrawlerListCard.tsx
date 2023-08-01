/* eslint-disable react/no-children-prop */
import type { BrawlApiBrawler } from "@brawltracker/brawlapi";
import { Box, Card, Text, Tooltip } from "@mantine/core";
import { motion } from "framer-motion";
import { Link } from "rakkasjs";
//import { Image } from "img-optimizer-react";
import { Image } from "remix-image";

import { useStyles } from "./BrawlerListCard.styles";

export function BrawlerListCard({
    brawler,
}: {
    brawler: BrawlApiBrawler & { resolvedName: string };
}) {
    const { classes } = useStyles();
    return (
        <Tooltip label={`View ${brawler.name}`}>
            <Card
                component={Link}
                href={`/brawlers/${brawler.id}`}
                radius="md"
                p={0}
                className={classes.card}
                withBorder
                shadow="xl"
            >
                <Image
                    src={brawler.imageUrl2!}
                    style={{ height: "auto", width: "100%" }}
                    decoding="async"
                    alt="Brawler avatar"
                    // responsive={[
                    //     {
                    //         maxWidth: 200,
                    //         size: {
                    //             height: 100,
                    //             width: 100,
                    //         },
                    //     },
                    // ]}
                    loading="eager"
                    width={100}
                    height={100}
                />
                <div className={classes.body}>
                    <Box py="xs">
                        <Text fw="bold" fz="lg">
                            {brawler.name}
                        </Text>
                        <Text truncate color="dimmed" fz="xs">
                            {brawler.class.name}
                        </Text>
                    </Box>
                </div>
            </Card>
        </Tooltip>
    );
}

/**
 * <picture>
                    <source srcSet={srcSet} type="image/webp" />
                    <img
                        src={brawler.imageUrl2}
                        alt={`Image of ${brawler.name} avatar`}
                        width={110}
                        height={105}
                        style={{ height: "auto", width: "100%" }}
                    />
                </picture>
 */
