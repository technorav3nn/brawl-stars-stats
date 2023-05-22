import { Card, createStyles, Tooltip } from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";

import { BrawlerWithLess } from "../../../lib/types";

const useStyles = createStyles((theme) => ({
    body: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },

    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.lighterWhite[0],
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1.2,
    },
}));

export function AllBrawlersCard({ brawler }: { brawler: BrawlerWithLess }) {
    const { classes } = useStyles();
    return (
        <Tooltip label={`View ${brawler.name}`}>
            <Card
                component={Link}
                href={`/brawlers/${brawler.id}?activeTab=info`}
                radius="md"
                p={0}
                className={classes.card}
            >
                <NextImage
                    alt={`Image of ${brawler.name} avatar`}
                    src={brawler.imageUrl}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ height: "auto", width: "100%" }} // optional
                />
            </Card>
        </Tooltip>
    );
}
