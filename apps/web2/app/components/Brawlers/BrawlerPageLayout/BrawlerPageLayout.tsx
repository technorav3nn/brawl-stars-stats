import { Anchor, Breadcrumbs, Container, Space, Tabs } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import type { Brawler } from "brawl-api";
import Link from "next/link";
import type { PropsWithChildren } from "react";

import type { Tabs as TabsType } from "../../../store/brawler-tabs";
import { useBrawlerTabStore } from "../../../store/brawler-tabs";
import { StyledTabs } from "../../Styled/StyledTabs";
import { BrawlerTitleSection } from "../BrawlerInfo/BrawlerTitleSection";

export function BrawlerPageLayout({ brawler, children }: { brawler: Brawler } & PropsWithChildren) {
    const brawlerTabStore = useBrawlerTabStore();
    const navigate = useNavigate();

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
        <>
            <Container size="lg">
                <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
                <Space h={30} />
                <BrawlerTitleSection brawler={brawler} />

                <StyledTabs
                    mt="lg"
                    defaultValue="info"
                    value={brawlerTabStore.currentTab}
                    onTabChange={(value) => {
                        brawlerTabStore.setCurrentTab(value as TabsType);
                        navigate(`/brawlers/${brawler.id}/${value}`);
                    }}
                >
                    <Tabs.List>
                        <Tabs.Tab value="info">Overview</Tabs.Tab>
                        <Tabs.Tab value="stats">Statistics</Tabs.Tab>
                        <Tabs.Tab value="cosmetics">Cosmetics</Tabs.Tab>
                    </Tabs.List>
                </StyledTabs>
                {children}
            </Container>
        </>
    );
}
