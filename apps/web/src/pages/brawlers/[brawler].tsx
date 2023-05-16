import { useRouter } from "next/router";
import { Time } from "@sapphire/time-utilities";
import { Brawler } from "brawl-api";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { brawlifyApi } from "../../lib/apis";
import { Anchor, Breadcrumbs, Container } from "@mantine/core";
import Link from "next/link";

const ONE_HOUR = Time.Hour;

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
    const brawler = await brawlifyApi.brawlers.getBrawlerById(ctx.params?.brawler as string);

    return {
        props: {
            brawler,
        },
        // Re-generate the page after 1 hour
        revalidate: ONE_HOUR,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const brawlers = await brawlifyApi.brawlers.getAllBrawlers();

    const paths = brawlers.map((brawler) => ({
        params: { brawler: brawler.name },
    }));

    return {
        paths,
        fallback: "blocking",
    };
};

export default function Brawler({ brawler }: { brawler: Brawler }) {
    const router = useRouter();
    const { brawler: brawlerId } = router.query as { brawler: string };

    const breadcrumbItems = [
        {
            name: "Brawlers",
            href: "/brawlers",
        },
        {
            name: brawler.name,
            href: `/brawlers/${brawler.id}`,
        },
    ].map((item) => (
        <Anchor component={Link} href={item.href} key={item.name}>
            {item.name}
        </Anchor>
    ));

    return (
        <Container size="lg">
            <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
            <h1>
                {brawlerId}, {brawler.name}
            </h1>
        </Container>
    );
}
