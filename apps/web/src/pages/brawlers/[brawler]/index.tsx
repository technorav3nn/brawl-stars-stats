/* eslint-disable no-console */
import { Group, Rating, Space, Text } from "@mantine/core";
import { Time } from "@sapphire/time-utilities";
import type { Brawler } from "brawl-api";
import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { BrawlerInfoCard } from "../../../components/Brawlers/Brawler/BrawlerInfoCarousel/BrawlerInfoCard";
import { BrawlerPageLayout } from "../../../components/Layout/BrawlerPageLayout";
import { ScrollableGroup } from "../../../components/Layout/ScrollableGroup";
import { brawlifyApi } from "../../../lib/apis";
import { type CsvBrawler, findBrawlerById, getCsvData } from "../../../lib/csv-data";
import { useBrawlerTabStore } from "../../../store/brawler-tabs";

const ONE_HOUR = Time.Hour;

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
    const brawler = await brawlifyApi.brawlers.getBrawlerById(ctx.params?.brawler as string);
    return {
        props: {
            brawler,
        },
        // Re-generate the page after 1 hour
        revalidate: ONE_HOUR,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const brawlers = await brawlifyApi.brawlers.getAllBrawlers();

    const paths = brawlers.map((brawler) => ({
        params: { brawler: brawler.name },
    }));

    return {
        fallback: "blocking",
        paths,
    };
};

export default function Brawler({ brawler }: { brawler: Brawler }) {
    const tabStore = useBrawlerTabStore();
    const { data, isLoading } = useQuery("csvData", () => getCsvData(), {
        cacheTime: Time.Hour * 6,
        staleTime: Time.Hour * 6,
    });
    const [brawlerData, setBrawlerData] = useState<CsvBrawler | null>(null);

    useEffect(() => {
        if (data) {
            const brawlerDataToSet = findBrawlerById(data, brawler.id as number);
            console.log(brawlerDataToSet);
            setBrawlerData(brawlerDataToSet!);
        }
    }, [brawler.id, data, isLoading]);

    return (
        <>
            <BrawlerPageLayout brawler={brawler}>
                {tabStore.currentTab === "info" && brawlerData && (
                    <>
                        <Space h="lg" />
                        <ScrollableGroup>
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
