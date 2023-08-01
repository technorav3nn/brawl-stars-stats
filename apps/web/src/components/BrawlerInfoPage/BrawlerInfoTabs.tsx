/* eslint-disable sort-keys-fix/sort-keys-fix */
"use client";

import { Box, NativeSelect, Tabs } from "@mantine/core";
import { IconChartBar, IconInfoCircle, IconShirt } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useMemo } from "react";

import * as classes from "~/components/StyledTabs/StyledTabs.styles";

interface BrawlerInfoTabsProps {
    brawlerName: string;
}

interface DropdownNavProps {
    currentTab: string;
    handleTabChange: (value: string) => void;
}

interface TabsComponentProps extends DropdownNavProps {
    brawlerName: string;
}

const TABS = [
    { value: "info", label: "Info", Icon: IconInfoCircle },
    { value: "stats", label: "Stats", Icon: IconChartBar },
    { value: "cosmetics", label: "Cosmetics", Icon: IconShirt },
];

export function BrawlerInfoTabs({ brawlerName }: BrawlerInfoTabsProps) {
    const router = useRouter();
    const pathname = usePathname();

    const currentTab = useMemo(() => pathname.split("/").pop(), [pathname]);

    const handleTabChange = (value: string) => {
        startTransition(() => {
            router.push(`/brawlers/${brawlerName}/${value}`);
        });
    };

    return (
        <>
            <Box visibleFrom="xs">
                <TabsVersion
                    brawlerName={brawlerName}
                    currentTab={currentTab!}
                    handleTabChange={handleTabChange}
                />
            </Box>
            <Box hiddenFrom="xs">
                <DropdownVersion currentTab={currentTab!} handleTabChange={handleTabChange} />
            </Box>
        </>
    );
}

function DropdownVersion({ currentTab, handleTabChange }: DropdownNavProps) {
    return (
        <NativeSelect
            data={[
                { value: "info", label: "Info" },
                { value: "stats", label: "Stats" },
                { value: "cosmetics", label: "Cosmetics" },
            ]}
            value={currentTab}
            onChange={(event) => handleTabChange(event.currentTarget.value)}
        />
    );
}

function TabsVersion({ brawlerName, currentTab, handleTabChange }: TabsComponentProps) {
    return (
        <Tabs
            variant="unstyled"
            classNames={classes}
            defaultValue={currentTab}
            onChange={handleTabChange}
        >
            <Tabs.List>
                {TABS.map(({ ...tab }) => (
                    <Tabs.Tab
                        key={tab.value}
                        value={tab.value}
                        leftSection={<tab.Icon size={18} />}
                        rightSection={<Box />}
                    >
                        {tab.label}
                        <Link href={`/brawlers/${brawlerName}/${tab.value}`} />
                    </Tabs.Tab>
                ))}
            </Tabs.List>
        </Tabs>
    );
}
