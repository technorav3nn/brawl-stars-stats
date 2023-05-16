import { Stack, Select, Button } from "@mantine/core";
import { useFiltersStore } from "../../../store/all-brawlers-filter-store";

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
                    { value: "All", label: "All" },
                    { value: "Rare", label: "Rare" },
                    { value: "Super Rare", label: "Super Rare" },
                    { value: "Epic", label: "Epic" },
                    { value: "Mythic", label: "Mythic" },
                    { value: "Legendary", label: "Legendary" },
                    { value: "Chromatic", label: "Chromatic" },
                ]}
            />
            <Select
                label="Class"
                placeholder="Select class"
                onChange={(value) => filterStore.setSelectedClass(value!)}
                value={filterStore.selectedClass}
                data={[
                    { value: "All", label: "All" },
                    { value: "Damage Dealer", label: "Damage Dealer" },
                    {
                        value: "Tank",
                        label: "Tank",
                    },
                    { value: "Support", label: "Support" },
                    { value: "Controller", label: "Controller" },
                    { value: "Artillery", label: "Artillery" },
                    { value: "Assassin", label: "Assassin" },
                ]}
            />
            <Button onClick={resetFilters}>Reset Filters</Button>
        </Stack>
    );
}
