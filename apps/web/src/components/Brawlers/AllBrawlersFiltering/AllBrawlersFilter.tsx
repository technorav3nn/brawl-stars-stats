import { Button,Select, Stack } from "@mantine/core";

import { useFiltersStore } from "../../../store/all-brawlers-filter";

export function AllBrawlersFilter() {
    const filterStore = useFiltersStore();

    const resetFilters = () => {
        filterStore.setSelectedRarity("All");
        filterStore.setSelectedClass("All");
    };

    return (
        <Stack>
            <Select
                label="Rarity"
                placeholder="Select rarity"
                onChange={(value) => filterStore.setSelectedRarity(value!)}
                value={filterStore.selectedRarity}
                data={[
                    { label: "All", value: "All" },
                    { label: "Rare", value: "Rare" },
                    { label: "Super Rare", value: "Super Rare" },
                    { label: "Epic", value: "Epic" },
                    { label: "Mythic", value: "Mythic" },
                    { label: "Legendary", value: "Legendary" },
                    { label: "Chromatic", value: "Chromatic" },
                ]}
            />
            <Select
                label="Class"
                placeholder="Select class"
                onChange={(value) => filterStore.setSelectedClass(value!)}
                value={filterStore.selectedClass}
                data={[
                    { label: "All", value: "All" },
                    { label: "Damage Dealer", value: "Damage Dealer" },
                    {
                        label: "Tank",
                        value: "Tank",
                    },
                    { label: "Support", value: "Support" },
                    { label: "Controller", value: "Controller" },
                    { label: "Artillery", value: "Artillery" },
                    { label: "Assassin", value: "Assassin" },
                ]}
            />
            <Button onClick={resetFilters}>Reset Filters</Button>
        </Stack>
    );
}
