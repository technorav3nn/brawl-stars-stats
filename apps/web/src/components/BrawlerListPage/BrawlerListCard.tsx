"use client";

/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { BrawlApiBrawler } from "@brawltracker/brawlapi";
import { Box, Paper, Text, Tooltip } from "@mantine/core";
import Image from "next/image";
import { memo } from "react";

import { resolveBrawlerName } from "~/lib/util/brawlers";
import { css, cx } from "~/styled-system/css";
import { token } from "~/styled-system/tokens";

import { DynamicLink } from "../Shared/DynamicLink";

const card = css({
    bg: {
        _dark: "dark.6",
        _light: "white",
    },
    position: "relative",
    overflow: "hidden",
    shadow: {
        _light: "md",
        _dark: "none",
    },
});

const cardSection = css({
    display: "block",
    borderTop: `rem(1) solid ${token("colors.dark.4")}`,
    borderBottom: `rem(1) solid ${token("colors.dark.4")}`,

    "& + &": {
        borderTop: 0,
    },

    "&[data-first]": {
        marginTop: "-0.5",
        borderTop: 0,
        borderBottom: `rem(1) solid ${token("colors.dark.4")}`,
    },

    "&[data-last]": {
        borderBottom: 0,
    },
});

const cardBody = css({
    overflow: "hidden",
    paddingLeft: "10px",
    paddingRight: "10px",
});

function BrawlerListCardM({ brawler }: { brawler: BrawlApiBrawler & { resolvedName: string } }) {
    return (
        <Tooltip label={`View ${brawler.name}`}>
            <Paper
                component={DynamicLink}
                href={`/brawlers/${resolveBrawlerName(brawler.name)}/info`}
                radius="md"
                p={0}
                className={card}
                withBorder
            >
                <Image
                    className={cardSection}
                    data-first
                    src={brawler.imageUrl2!}
                    style={{ height: "auto", width: "100%" }}
                    alt="Brawler avatar"
                    width={100}
                    height={100}
                    loading="eager"
                />
                <div data-last className={cx(cardBody, cardSection)}>
                    <Box py="xs">
                        <Text
                            className={css({
                                color: {
                                    _light: "black",
                                    _dark: "dark.0",
                                },
                            })}
                            fw="bold"
                            fz="lg"
                        >
                            {brawler.name}
                        </Text>
                        <Text truncate c="dimmed" fz="xs">
                            {brawler.class.name}
                        </Text>
                    </Box>
                </div>
            </Paper>
        </Tooltip>
    );
}

export const BrawlerListCard = memo(BrawlerListCardM);
