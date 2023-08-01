import type { BrawlApiBrawler } from "@brawltracker/brawlapi";
import { Box, Tooltip } from "@mantine/core";
import { Link } from "rakkasjs";
import Image from "remix-image";

export function BrawlerGroupedItem({
    brawler,
    borderColor,
}: {
    brawler: BrawlApiBrawler & { resolvedName: string };
    borderColor?: string;
}) {
    return (
        <Tooltip label={brawler.name} offset={25}>
            <Box component={Link} href={`/brawlers/${brawler.resolvedName}`}>
                <Image
                    alt={`Image of ${brawler.name} avatar`}
                    src={brawler.imageUrl2!}
                    width={75}
                    height={75}
                    style={{
                        border: `2px solid ${borderColor}`,
                        borderRadius: 5,
                        marginBottom: 5,
                        marginRight: 5,
                    }}
                />
            </Box>
        </Tooltip>
    );
}

/**
 *  <Anchor
            component={Image}
            alt={`Image of ${brawler.name} avatar`}
            src={brawler.imageUrl2!}
            width={50}
            height={50}
            placeholder="blur"
            sx={{
                border: `1px solid ${getColorName(brawler.rarity.color)}`,
                marginRight: 5,
                marginBottom: 5,
                borderRadius: 5,
            }}
        >
            <Link href={`/brawlers/${brawler.resolvedName}`} />
        </Anchor>
 */
