import { BrawlerWithLess } from "../../../lib/types";
import { createStyles, Card, Tooltip } from "@mantine/core";
import Link from "next/link";
import NextImage from "next/image";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.lighterWhite[0],
    },

    title: {
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,
    },

    body: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },
}));

export function AllBrawlersCard({ brawler }: { brawler: BrawlerWithLess }) {
    const { classes } = useStyles();
    return (
        <Tooltip label={`View ${brawler.name}`}>
            <Card
                component={Link}
                href={`/brawlers/${brawler.id}`}
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
                    style={{ width: "100%", height: "auto" }} // optional
                />
            </Card>
        </Tooltip>
    );
}
