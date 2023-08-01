import type { BrawlApiBrawler } from "@brawltracker/brawlapi";
import { brawlApi } from "@brawltracker/brawlapi";
import type { SimpleGridBreakpoint } from "@mantine/core";
import { Flex } from "@mantine/core";
import { Chip, Divider, Group, Stack, Text } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Title, Tooltip } from "@mantine/core";
import { Container, SimpleGrid, useMantineTheme } from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import cache from "memoizee";
import type { PreloadFunction } from "rakkasjs";
import { useServerSideQuery } from "rakkasjs";
import { Suspense, useCallback, useMemo } from "react";

import { BrawlerGroupedItem } from "~/components/BrawlerListPage/BrawlerGroupedItem";
import { BrawlerListCard } from "~/components/BrawlerListPage/BrawlerListItem";
import { groupBy } from "~/lib/util/arrays";
import { resolveBrawlerName } from "~/lib/util/brawlers";
import { useFiltersStore } from "~/store/brawler-list-filter";

type ToggleStates = "rarity" | "class" | "none";

const GRID_BREAKPOINTS: SimpleGridBreakpoint[] = [
    { cols: 3, maxWidth: 400 },
    { cols: 4, maxWidth: "sm" },
    { cols: 6, maxWidth: "md" },
    { cols: 8, maxWidth: "lg" },
    { cols: 9, maxWidth: "xl" },
    { cols: 10, minWidth: "2xl" },
    { cols: 8, maxWidth: "lg" },
    { cols: 9, maxWidth: "xl" },
];

const TOGGLE_STATES: ToggleStates[] = ["none", "rarity", "class"];

function GroupedBrawlerList({ brawlers }: { brawlers: Record<string, BrawlApiBrawler[]> }) {
    const filterStore = useFiltersStore();

    const filterBrawlers = useCallback(
        (brawlers: BrawlApiBrawler[]) =>
            brawlers.filter((brawler) =>
                brawler.name.toLowerCase().includes(filterStore.searchQuery)
            ),

        [filterStore.searchQuery]
    );

    return (
        <>
            <AnimatePresence initial={false}>
                {Object.entries(brawlers).map(([key, group]) => (
                    <div key={key}>
                        {filterBrawlers(group).length !== 0 && (
                            <Title size="h3" mb="xs">
                                {key}
                            </Title>
                        )}
                        <Flex direction="row" wrap="wrap">
                            <Tooltip.Group openDelay={250} closeDelay={100}>
                                {filterBrawlers(group).map((brawler) => (
                                    <motion.div
                                        key={brawler.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ bounce: 0.1, duration: 0.4, type: "spring" }}
                                    >
                                        <BrawlerGroupedItem
                                            brawler={{
                                                ...brawler,
                                                resolvedName: resolveBrawlerName(brawler.name),
                                            }}
                                            key={brawler.id}
                                            borderColor={brawler.rarity.color}
                                        />
                                    </motion.div>
                                ))}
                            </Tooltip.Group>
                        </Flex>
                    </div>
                ))}
            </AnimatePresence>
        </>
    );
}

function BrawlerListPage() {
    const [grouped, setGrouped] = useToggle<ToggleStates>(["none", "rarity", "class"]);
    const theme = useMantineTheme();
    const filterStore = useFiltersStore();

    const { data: brawlers } = useServerSideQuery(async () => {
        console.log("fetching brawlers");
        return (await brawlApi.brawlers.getAllBrawlers()).list;
    });

    const groupedByRarity = useMemo(
        () => groupBy(brawlers, (brawler) => brawler.rarity.name),
        [brawlers]
    );
    const groupedByClass = useMemo(
        () => groupBy(brawlers, (brawler) => brawler.class.name),
        [brawlers]
    );

    const filterBrawlers = useCallback(
        (brawlers: BrawlApiBrawler[]) =>
            brawlers.filter((brawler) =>
                brawler.name.toLowerCase().includes(filterStore.searchQuery)
            ),

        [filterStore.searchQuery]
    );

    return (
        <>
            <Container size="lg">
                <Title>Brawlers</Title>
                <Title size="h5" mb="xl">
                    List of brawlers in Brawl Stars. Click or tap on one to learn more about one.
                </Title>
                <TextInput
                    label="Search Brawlers"
                    w={400}
                    mb="xs"
                    size="md"
                    icon={<IconSearch size={18} stroke={1.5} />}
                    placeholder={`Search ${brawlers.length} Brawlers`}
                    value={filterStore.searchQuery}
                    onChange={(event) => filterStore.setSearchQuery(event.currentTarget.value)}
                />

                <Stack spacing="0.25rem">
                    <Text size="1rem" fw={500}>
                        Group by
                    </Text>
                    <Chip.Group
                        multiple={false}
                        value={grouped}
                        onChange={(value) => setGrouped(value as ToggleStates)}
                    >
                        <Group mb="md" spacing="xs">
                            {TOGGLE_STATES.map((state) => (
                                <Chip key={state} onClick={() => setGrouped(state)} value={state}>
                                    {upperFirst(state)}
                                </Chip>
                            ))}
                        </Group>
                    </Chip.Group>
                </Stack>

                <Divider mb="md" size="md" />

                {grouped === "rarity" && <GroupedBrawlerList brawlers={groupedByRarity} />}
                {grouped === "class" && <GroupedBrawlerList brawlers={groupedByClass} />}
                {grouped === "none" && (
                    <SimpleGrid cols={9} breakpoints={GRID_BREAKPOINTS} mb="lg">
                        <AnimatePresence initial={false}>
                            {filterBrawlers(brawlers).map((brawler) => (
                                <motion.div
                                    key={brawler.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ bounce: 0.1, duration: 0.4, type: "spring" }}
                                >
                                    <BrawlerListCard
                                        brawler={{
                                            ...brawler,
                                            resolvedName: resolveBrawlerName(brawler.name),
                                        }}
                                        key={brawler.name}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </SimpleGrid>
                )}
            </Container>
        </>
    );
}

const preload: PreloadFunction = async () => {
    return {
        head: {
            title: "Brawlers in Brawl Stars",
        },
    };
};

export default function Test() {
    return (
        <Suspense fallback="Loading...">
            <BrawlerListPage />
        </Suspense>
    );
}

/* <Select
data={[
    { label: "None", value: "none" },
    { label: "Rarity", value: "rarity" },
    { label: "Class", value: "class" },
]}
value={grouped}
onChange={(value) => setGrouped(value as ToggleStates)}
label="Group by"
placeholder="Group by"
mb="md"
width={300}
/> */
