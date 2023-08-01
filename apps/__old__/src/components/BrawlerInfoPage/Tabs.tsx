import { Tabs } from "@mantine/core";
import { IconChartBar, IconInfoCircle, IconShirt } from "@tabler/icons-react";

import type { TabsType } from "~/store/brawler-info-tabs";
import { useBrawlerTabStore } from "~/store/brawler-info-tabs";

import { StyledTabs } from "../Shared/StyledTabs";

export function BrawlerTabs() {
    const [currentTab, setCurrentTab] = useBrawlerTabStore((state) => [
        state.currentTab,
        state.setCurrentTab,
    ]);

    return (
        <StyledTabs
            mt="lg"
            defaultValue="info"
            value={currentTab}
            onTabChange={(value) => {
                setCurrentTab(value as TabsType);
            }}
            variant="pills"
        >
            <Tabs.List>
                <Tabs.Tab icon={<IconInfoCircle size={18} />} value="info">
                    Overview
                </Tabs.Tab>
                <Tabs.Tab icon={<IconChartBar size={18} />} value="stats">
                    Statistics
                </Tabs.Tab>
                <Tabs.Tab icon={<IconShirt size={18} />} value="cosmetics">
                    Cosmetics
                </Tabs.Tab>
            </Tabs.List>
        </StyledTabs>
    );
}
