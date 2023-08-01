import type { BrawlApiBrawler } from "@brawltracker/brawlapi";
import { Box, Tooltip } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export function BrawlerGroupedItem({
    brawler,
    borderColor,
}: {
    brawler: BrawlApiBrawler & { resolvedName: string };
    borderColor?: string;
}) {
    return (
        <Tooltip label={brawler.name} offset={25}>
            <Box component={Link} href={`/brawlers/${brawler.resolvedName}/info`}>
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
