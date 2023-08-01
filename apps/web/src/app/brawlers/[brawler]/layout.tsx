import { brawlApi } from "@brawltracker/brawlapi";
import { Box, Divider, Space } from "@mantine/core";

import { BrawlerHero } from "~/components/BrawlerInfoPage/BrawlerHero";
import { BrawlerInfoTabs } from "~/components/BrawlerInfoPage/BrawlerInfoTabs";
import { getBrawlersNamesToIdsMemo, resolveBrawlerName } from "~/lib/util/brawlers";

interface LayoutProps extends React.PropsWithChildren {
    params: {
        brawler: string;
        tab: string;
    };
}

export default async function BrawlerLayout({ params, children }: LayoutProps) {
    const brawlersNamesToIds = await getBrawlersNamesToIdsMemo();
    const brawlerId = brawlersNamesToIds[params.brawler];

    const brawler = await brawlApi.brawlers.getBrawlerById(brawlerId);
    const brawlerName = resolveBrawlerName(brawler.name);

    return (
        <>
            <BrawlerHero brawler={brawler} />
            <Space h="md" />
            <BrawlerInfoTabs brawlerName={brawlerName} />
            <Space h="md" />
            <Divider size="sm" />
            {/** loading.tsx handles loading state */}
            <Box mt="md" p={0}>
                {children}
            </Box>
        </>
    );
}

export const revalidate = 100;
export const fetchCache = "only-no-store";
