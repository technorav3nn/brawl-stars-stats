/* eslint-disable sort-keys-fix/sort-keys-fix */
import { brawlApi } from "@brawltracker/brawlapi";
import { Group, SimpleGrid, Skeleton, Title } from "@mantine/core";
import { cache, Suspense } from "react";

import { resolveBrawlerName } from "~/lib/util/brawlers";

import { BrawlerListCardPage } from "./rsc-client";

const getBrawlersRequestCached = cache(brawlApi.brawlers.getAllBrawlers);

export const revalidate = 25;
export const metadata = {
    title: "Brawlers In Brawl Stars",
    description: "List of brawlers in Brawl Stars. View them and their stats and more.",
    openGraph: {
        images: ["/og/brawlers"],
        title: "Brawl Stars Stats",
        description: "List of brawlers in Brawl Stars. View them and their stats and more.",
        siteName: "Brawl Stars Stats",
    },
};

export async function generateStaticParams() {
    const { list: brawlers } = await getBrawlersRequestCached();
    return brawlers.map((brawler) => ({
        brawler: resolveBrawlerName(brawler.name),
    }));
}

export default function BrawlerPage() {
    return (
        <>
            <Title>Brawlers</Title>
            <Title size="h5" mb="xl">
                List of brawlers in Brawl Stars. Click or tap on one to learn more about one.
            </Title>
            <Suspense fallback={<LoadingFallback />}>
                <BrawlerCardsData />
            </Suspense>
        </>
    );
}

async function BrawlerCardsData() {
    const { list: brawlers } = await getBrawlersRequestCached();

    return <BrawlerListCardPage brawlers={brawlers} />;
}

function LoadingFallback() {
    return (
        <>
            <Skeleton width="100%" animate height={50} mb="md" />
            <Group gap="md" mb="md">
                <Skeleton animate height={20} w="5%" />
                <Skeleton animate height={20} w="5%" />
                <Skeleton animate height={20} w="5%" />
            </Group>
            <SimpleGrid
                cols={{
                    base: 3,
                    sm: 4,
                    md: 6,
                    lg: 8,
                    xl: 9,
                    "2xl": 10,
                }}
                mb="lg"
            >
                {Array.from({ length: 9 * 3 }).map((_, index) => (
                    <Skeleton key={index} height={150} animate />
                ))}
            </SimpleGrid>
        </>
    );
}
