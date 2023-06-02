import {
    ActionIcon,
    Container,
    Group,
    Popover,
    SimpleGrid,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { Time } from "@sapphire/time-utilities";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import type { GetStaticProps } from "next";

import { BrawlerCard } from "../../components/Brawlers/AllBrawlersCard";
import { AllBrawlersFilter } from "../../components/Brawlers/AllBrawlersFiltering/AllBrawlersFilter";
import { brawlifyApi } from "../../lib/apis";
import type { BrawlerWithLess } from "../../lib/types";
import { resolveBrawlerName } from "../../lib/util/brawlers";
import { useFiltersStore } from "../../store/all-brawlers-filter";

const SIX_HOURS = Time.Hour * 6;

export const getStaticProps: GetStaticProps = async () => {
    const brawlers = await brawlifyApi.brawlers.getAllBrawlers();

    return {
        props: {
            brawlers: brawlers.map((brawler) => ({
                class: brawler.class,
                description: brawler.description,
                id: brawler.id,
                imageUrl: brawler.imageUrl,
                name: brawler.name,
                rarity: brawler.rarity,
                resolvedName: resolveBrawlerName(brawler.name),
            })),
        },
        revalidate: SIX_HOURS,
    };
};

export default function AllBrawlers({ brawlers }: { brawlers: BrawlerWithLess[] }) {
    const filterStore = useFiltersStore((state) => ({
        searchQuery: state.searchQuery,
        selectedClasses: state.selectedClass,
        selectedRarities: state.selectedRarity,
        setSearch: state.setSearchQuery,
    }));

    return (
        <Container size="lg">
            <SimpleGrid cols={2} breakpoints={[{ cols: 1, maxWidth: "sm" }]} mb="lg">
                <TextInput
                    label="Search Brawlers"
                    size="md"
                    placeholder={`Search ${brawlers.length} Brawlers`}
                    value={filterStore.searchQuery}
                    onChange={(event) => filterStore.setSearch(event.currentTarget.value)}
                    icon={<IconSearch size={18} />}
                    rightSection={
                        <Group noWrap spacing="xs">
                            <Popover width={300} position="bottom-end" withArrow>
                                <Popover.Target>
                                    <Tooltip label="Filter and sort" position="left">
                                        <ActionIcon>
                                            <IconFilter size={18} opacity={0.9} />
                                        </ActionIcon>
                                    </Tooltip>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <AllBrawlersFilter />
                                </Popover.Dropdown>
                            </Popover>
                        </Group>
                    }
                />
            </SimpleGrid>

            <SimpleGrid
                cols={9}
                breakpoints={[
                    { cols: 3, maxWidth: 400 },
                    { cols: 4, maxWidth: "sm" },
                    { cols: 6, maxWidth: "md" },
                    { cols: 8, maxWidth: "lg" },
                    { cols: 9, maxWidth: "xl" },
                    { cols: 10, minWidth: "2xl" },
                    { cols: 8, maxWidth: "lg" },
                    { cols: 9, maxWidth: "xl" },
                ]}
                mb="lg"
            >
                <Tooltip.Group openDelay={200} closeDelay={400}>
                    {brawlers
                        .filter((brawler) => {
                            if (filterStore.selectedRarities.length === 0) return true;
                            if (filterStore.selectedRarities.includes("All")) return true;

                            return filterStore.selectedRarities.includes(brawler.rarity.name);
                        })
                        .filter((brawler) => {
                            if (filterStore.searchQuery === "") return true;
                            return brawler.resolvedName
                                .toLowerCase()
                                .includes(filterStore.searchQuery.toLowerCase());
                        })
                        .filter((brawler) => {
                            if (filterStore.selectedClasses.includes("All")) return true;
                            if (filterStore.selectedClasses.length === 0) return true;

                            return filterStore.selectedClasses.includes(brawler.class.name);
                        })
                        .map((brawler) => (
                            <BrawlerCard key={brawler.id} brawler={brawler} />
                        ))}
                </Tooltip.Group>
            </SimpleGrid>
        </Container>
    );
}
