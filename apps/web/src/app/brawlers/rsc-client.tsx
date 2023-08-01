"use client";

/* eslint-disable sort-keys-fix/sort-keys-fix */
/**
 * IF GETTING STARTTRANSTION ERRORS:
 * Edit Appshell.js in Mantine core source and set useResizing = false
 */
import type { BrawlApiBrawler } from "@brawltracker/brawlapi";
import type { StyleProp } from "@mantine/core";
import { Chip, Divider, Group, Stack, Text } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Title, Tooltip } from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { memo, startTransition, useCallback, useMemo } from "react";

import { BrawlerGroupedItem } from "~/components/BrawlerListPage/BrawlerGroupedItem";
import { BrawlerListCard } from "~/components/BrawlerListPage/BrawlerListCard";
import { groupBy } from "~/lib/util/arrays";
import { resolveBrawlerName } from "~/lib/util/brawlers";
import { useFiltersStore } from "~/store/brawler-list-filter";
import { flex } from "~/styled-system/patterns";

type ToggleStates = "rarity" | "class" | "none";

const GRID_COLS: StyleProp<number> = {
    base: 3,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 9,
    "2xl": 10,
};

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
                        <div
                            className={flex({
                                direction: "row",
                                wrap: "wrap",
                            })}
                        >
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
                        </div>
                    </div>
                ))}
            </AnimatePresence>
        </>
    );
}

export const BrawlerListCardPage = memo(function BrawlerListPage({
    brawlers,
}: {
    brawlers: BrawlApiBrawler[];
}) {
    const [grouped, setGrouped] = useToggle<ToggleStates>(["none", "rarity", "class"]);
    const filterStore = useFiltersStore();

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
            <TextInput
                label="Search Brawlers"
                w={{
                    base: "100%",
                    sm: "45%",
                }}
                mb="xs"
                size="md"
                leftSection={<IconSearch size={18} stroke={1.5} />}
                placeholder={`Search Brawlers`}
                value={filterStore.searchQuery}
                onChange={(event) => filterStore.setSearchQuery(event.currentTarget.value)}
            />

            <Stack gap="0.25rem">
                <Text mb="0.25rem" size="1rem" fw={500}>
                    Group by
                </Text>
                <Chip.Group
                    multiple={false}
                    value={grouped}
                    onChange={(value) => startTransition(() => setGrouped(value as ToggleStates))}
                >
                    <Group mb="md" gap="xs">
                        {TOGGLE_STATES.map((state) => (
                            <Chip key={state} onClick={() => setGrouped(state)} value={state}>
                                {upperFirst(state)}
                            </Chip>
                        ))}
                    </Group>
                </Chip.Group>
            </Stack>

            <Divider mb="md" size="sm" />

            {grouped === "rarity" && <GroupedBrawlerList brawlers={groupedByRarity} />}
            {grouped === "class" && <GroupedBrawlerList brawlers={groupedByClass} />}
            {grouped === "none" && (
                <SimpleGrid cols={GRID_COLS} mb="lg">
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
        </>
    );
});
