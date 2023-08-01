import { Title } from "@mantine/core";

import { getBrawlersNamesToIdsMemo } from "~/lib/util/brawlers";

export default async function BrawlerPage({ params }: { params: { brawler: number } }) {
    const brawlersNamesToIds = await getBrawlersNamesToIdsMemo();
    const brawlerId = brawlersNamesToIds[params.brawler];

    return <div>PENILE</div>;
}

export const revalidate = 100;
export const fetchCache = "only-no-store";
