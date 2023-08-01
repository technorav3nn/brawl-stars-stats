import { brawlApi } from "@brawltracker/brawlapi";
import { Anchor, Breadcrumbs, Container, Group, Rating, Space, Text } from "@mantine/core";
import { Link, type PageProps, useServerSideQuery } from "rakkasjs";

import { BrawlerHero } from "~/components/BrawlerInfoPage/BrawlerHero/BrawlerHero";
import { BrawlerInfoCard } from "~/components/BrawlerInfoPage/BrawlerInfoCard";
import { BrawlerTabs } from "~/components/BrawlerInfoPage/Tabs";
import { ScrollableGroup } from "~/components/Shared/ScrollableGroup";
import { findBrawlerById } from "~/lib/csv-data";

export default function BrawlerPage({ params }: PageProps) {
    const {
        data: [brawler, brawlerCsvData],
    } = useServerSideQuery(async () => {
        const { id } = params;
        const brawler = await brawlApi.brawlers.getBrawlerById(id as unknown as number);

        const allBrawlerCsvData = await brawlApi.csvData.getCsvBrawlers();
        const brawlerCsvData = findBrawlerById(allBrawlerCsvData, brawler.id as number)!;

        return [brawler, brawlerCsvData];
    });

    const breadcrumbItems = [
        {
            href: "/brawlers",
            name: "Brawlers",
        },
        {
            href: `/brawlers/${brawler.id}`,
            name: brawler.name,
        },
    ].map((item) => (
        <Anchor component={Link} href={item.href} key={item.name}>
            {item.name}
        </Anchor>
    ));

    return (
        <Container size="lg">
            <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
            <Space h={30} />

            <BrawlerHero brawler={brawler} />
            <BrawlerTabs />
            <Space h="lg" />

            <ScrollableGroup>
                <BrawlerInfoCard title="Overview">
                    <Text color="dimmed" size="sm" italic>
                        &quot;{brawler.description}&quot;
                    </Text>

                    <Group mt="lg" position="apart">
                        <Text weight={600}>Movement Speed</Text>
                        <Text>{brawlerCsvData.Speed}</Text>
                    </Group>
                </BrawlerInfoCard>
                <BrawlerInfoCard title="Rating">
                    <Group position="apart">
                        <Text>Defense Rating</Text>
                        <Rating readOnly value={brawlerCsvData.DefenseRating} />
                    </Group>
                    <Group position="apart">
                        <Text>Offense Rating</Text>
                        <Rating readOnly value={brawlerCsvData.OffenseRating} />
                    </Group>
                    <Group position="apart">
                        <Text>Utility Rating</Text>
                        <Rating readOnly value={brawlerCsvData.UtilityRating} />
                    </Group>
                </BrawlerInfoCard>
            </ScrollableGroup>
            <Space h="lg" />
        </Container>
    );
}

/* <div>
<h1>{brawler?.name}</h1>
<motion.div layout="position" layoutId={`brawler-${brawler.id}-image`}>
    <Image
        alt={`Image of ${brawler.name} avatar`}
        src={brawler.imageUrl2!}
        placeholder="blur"
        responsive={[
            {
                maxWidth: 200,
                size: {
                    height: 100,
                    width: 100,
                },
            },
        ]}
    />
</motion.div>
</div> */
