/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { CsvBrawler } from "@brawltracker/brawlapi";
import { Group, Rating, Skeleton, Space, Text } from "@mantine/core";
import { Time } from "@sapphire/time-utilities";
import { useQuery } from "@tanstack/react-query";
import type { Brawler } from "brawl-api";
import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";

import { BrawlerInfoCard } from "../../components/Brawlers/Brawler/BrawlerInfoCarousel/BrawlerInfoCard";
import { BrawlerPageLayout } from "../../components/Layout/BrawlerPageLayout";
import { ScrollableGroup } from "../../components/Layout/ScrollableGroup";
import { brawlifyApi } from "../../lib/apis";
import { findBrawlerById } from "../../lib/csv-data";
import { useBrawlerTabStore } from "../../store/brawler-tabs";

const SIX_HOURS = Time.Hour * 6;

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
    const brawler = await brawlifyApi.brawlers.getBrawlerById(
        ctx.params?.brawler as unknown as number
    );
    return {
        props: {
            brawler,
        },
        // Re-generate the page after 1 hour
        revalidate: SIX_HOURS,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const brawlers = await brawlifyApi.brawlers.getAllBrawlers();

    const paths = brawlers.map((brawler) => ({
        params: { brawler: brawler.id.toString() },
    }));

    return {
        fallback: "blocking",
        paths,
    };
};

export default function Brawler({ brawler }: { brawler: Brawler }) {
    const tabStore = useBrawlerTabStore();
    const { data, isLoading } = useQuery({
        queryKey: ["brawlerCsvData"],
        queryFn: () => brawlifyApi.csvData.getCsvBrawlers(),
        staleTime: SIX_HOURS,
        cacheTime: SIX_HOURS,
    });
    const [brawlerData, setBrawlerData] = useState<CsvBrawler | null>(null);

    useEffect(() => {
        if (data) {
            const brawlerDataToSet = findBrawlerById(data, brawler.id as number);
            setBrawlerData(brawlerDataToSet!);
        }
    }, [brawler.id, data]);

    return (
        <>
            <BrawlerPageLayout brawler={brawler}>
                {tabStore.currentTab === "info" && brawlerData && (
                    <>
                        <Space h="lg" />
                        <ScrollableGroup>
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton mr="md" height={300} key={i} />
                                ))
                            ) : (
                                <>
                                    <BrawlerInfoCard title="Overview">
                                        <Text color="dimmed" size="sm" italic>
                                            &quot;{brawler.description}&quot;
                                        </Text>

                                        <Group mt="lg" position="apart">
                                            <Text weight={600}>Movement Speed</Text>
                                            <Text>{brawlerData.Speed}</Text>
                                        </Group>
                                    </BrawlerInfoCard>
                                    <BrawlerInfoCard title="Rating">
                                        <Group position="apart">
                                            <Text>Defense Rating</Text>
                                            <Rating readOnly value={brawlerData.DefenseRating} />
                                        </Group>
                                        <Group position="apart">
                                            <Text>Offense Rating</Text>
                                            <Rating readOnly value={brawlerData.OffenseRating} />
                                        </Group>
                                        <Group position="apart">
                                            <Text>Utility Rating</Text>
                                            <Rating readOnly value={brawlerData.UtilityRating} />
                                        </Group>
                                    </BrawlerInfoCard>
                                </>
                            )}
                        </ScrollableGroup>
                        <Space h="lg" />
                    </>
                )}
                {tabStore.currentTab === "stats" && (
                    <div>
                        <h1>Stats {}</h1>
                    </div>
                )}
                {tabStore.currentTab === "cosmetics" && (
                    <div>
                        <h1>Cosmetics</h1>
                    </div>
                )}
            </BrawlerPageLayout>
        </>
    );
}
