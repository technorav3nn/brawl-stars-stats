import { GetStaticProps } from "next";
import { Time } from "@sapphire/time-utilities";
import {
    ActionIcon,
    Container,
    Group,
    Popover,
    SimpleGrid,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { brawlifyApi } from "../../lib/apis";
import { resolveBrawlerName } from "../../lib/util/resolve-brawler-name";
import { BrawlerWithLess } from "../../lib/types";
import { BrawlerCard } from "../../components/Brawlers/AllBrawlersCard";
import { AllBrawlersFilter } from "../../components/Brawlers/AllBrawlersFiltering/AllBrawlersFilter";
import { useFiltersStore } from "../../store/all-brawlers-filter-store";

const SIX_HOURS = Time.Hour * 6;

export const getStaticProps: GetStaticProps = async () => {
    const brawlers = await brawlifyApi.brawlers.getAllBrawlers();

    return {
        props: {
            brawlers: brawlers.map((brawler) => ({
                imageUrl: brawler.imageUrl,
                id: brawler.id,
                name: brawler.name,
                resolvedName: resolveBrawlerName(brawler.name),
                rarity: brawler.rarity,
                description: brawler.description,
                class: brawler.class,
            })),
        },
        revalidate: SIX_HOURS,
    };
};

export default function AllBrawlers({ brawlers }: { brawlers: BrawlerWithLess[] }) {
    const filterStore = useFiltersStore((state) => ({
        selectedRarities: state.selectedRarity,
        selectedClasses: state.selectedClass,
        searchQuery: state.searchQuery,
        setSearch: state.setSearchQuery,
    }));

    return (
        <Container size="lg">
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]} mb="lg">
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
                    { maxWidth: 400, cols: 3 },
                    { maxWidth: "sm", cols: 4 },
                    { maxWidth: "md", cols: 6 },
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
