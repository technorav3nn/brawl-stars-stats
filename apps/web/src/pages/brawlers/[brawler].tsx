import { Time } from "@sapphire/time-utilities";
import { Brawler } from "brawl-api";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import {
    Anchor,
    Box,
    Breadcrumbs,
    Container,
    Grid,
    Group,
    ScrollArea,
    SimpleGrid,
    Space,
    getSize,
} from "@mantine/core";
import Link from "next/link";
import { useRef } from "react";
import { BrawlerTitleSection } from "../../components/Brawlers/Brawler/BrawlerTitleSection";
import { brawlifyApi } from "../../lib/apis";
import { BrawlerInfoCard } from "../../components/Brawlers/Brawler/BrawlerInfoCarousel/BrawlerInfoCard";

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
            <Space h={30} />
            <BrawlerTitleSection brawler={brawler} />
            <Space h={30} />
            {/**
             * Make a horizontal scroll area that houses the cards
             * that display the brawler's stats
             *
             */}
            <div>
                <Box
                    sx={(theme) => ({
                        display: "grid",
                        gridTemplateColumns: "none",
                        gridAutoFlow: "column dense",
                        gridAutoColumns: "minmax(10px, min-content)",
                        overflowX: "auto",
                        [theme.fn.smallerThan("md")]: {
                            gap: 320,
                        },
                        [theme.fn.largerThan("md")]: {
                            gap: 200,
                        },
                        // hide scrollbar
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                        scrollSnapType: "x proximity",
                    })}
                >
                    <BrawlerInfoCard title="Ass" description="Ass" />
                    <BrawlerInfoCard title="Ass" description="Ass" />
                    <BrawlerInfoCard title="Ass" description="Ass" />
                    <BrawlerInfoCard title="Ass" description="Ass" />
                </Box>
            </div>

            {/* <ScrollArea h={350}>
                <div style={{ width: 1250 }}>
                    <Grid
                        sx={{
                            "& > *": {
                                marginLeft: 20,
                                marginTop: 20,
                            },
                        }}
                    >
                        <BrawlerInfoCard title="Attack" description="Ass" />
                        <BrawlerInfoCard title="Super" description="Ass" />
                        <BrawlerInfoCard title="Gadgets" description="Ass" />
                        <BrawlerInfoCard title="Star Powers" description="Ass" />
                        <BrawlerInfoCard title="Gears" description="Ass" />
                    </Grid>
                </div>
            </ScrollArea> */}
        </Container>
    );
}
