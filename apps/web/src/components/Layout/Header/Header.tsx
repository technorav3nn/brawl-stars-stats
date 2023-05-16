import {
    Container,
    Group,
    Header as MantineHeader,
    Paper,
    Text,
    Transition,
    createStyles,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CssUnit, extractUnitValue } from "../../../lib/util/extract-unit-value";
import { BrawlStarsLogo } from "../../Icons/BrawlStarsLogo";
import { ColorSchemeToggle } from "../ColorSchemeToggle";
import { HeaderMobile } from "./HeaderMobile";
import { Searchbar } from "./Searchbar";

interface NavLink {
    link: string;
    label: string;
}

const HEADER_HEIGHT = rem(60);
const LINKS: NavLink[] = [
    { link: "/", label: "Home" },
    {
        link: "/brawlers",
        label: "Brawlers",
    },
    {
        link: "/events",
        label: "Events",
    },
    {
        link: "/maps",
        label: "Maps",
    },
];

const useStyles = createStyles((theme) => ({
    root: {
        position: "relative",
        zIndex: 1,
    },

    dropdown: {
        position: "absolute",
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: "hidden",

        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan("sm")]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor })
                .background,
            color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
        },
    },

    leftOrRight: {
        flexGrow: 1,
        flexBasis: 0,
    },
}));

export function Header() {
    const router = useRouter();
    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(router.pathname);
    const { classes, cx } = useStyles();
    const theme = useMantineTheme();

    const showSearchbar = useMediaQuery(
        `(min-width: ${extractUnitValue(theme.breakpoints.md, CssUnit.Em)}em)`,
        true,
        {
            getInitialValueInEffect: false,
        }
    );
    const showDesktopHeader = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, true, {
        getInitialValueInEffect: false,
    });

    const items = LINKS.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={cx(classes.link, { [classes.linkActive]: active === link.link })}
            onClick={() => {
                setActive(link.link);
                close();
            }}
            passHref
        >
            {link.label}
        </Link>
    ));

    return (
        <>
            <HeaderMobile navbarOpened={opened} toggleNavbar={toggle} />
            <MantineHeader height={HEADER_HEIGHT} mb={40} className={classes.root}>
                <Container className={classes.header} size="lg">
                    {showDesktopHeader && (
                        <>
                            <Group sx={{ gap: "0.5rem" }} className={classes.leftOrRight}>
                                <BrawlStarsLogo height={35} width={35} />
                                <Text
                                    fw="bold"
                                    fz="lg"
                                    sx={{
                                        color:
                                            theme.colorScheme === "dark"
                                                ? theme.white
                                                : theme.black,
                                    }}
                                >
                                    Brawl Stars Stats
                                </Text>
                            </Group>
                            <Group spacing={10} className={classes.links}>
                                {items}
                            </Group>
                            <Group
                                spacing={14}
                                className={classes.leftOrRight}
                                sx={{ justifyContent: "flex-end" }}
                            >
                                {showSearchbar && <Searchbar onClick={() => {}} />}
                                <ColorSchemeToggle />
                            </Group>
                        </>
                    )}

                    <Transition transition="slide-down" duration={200} mounted={opened}>
                        {(styles) => (
                            <Paper className={classes.dropdown} withBorder style={styles}>
                                {items}
                            </Paper>
                        )}
                    </Transition>
                </Container>
            </MantineHeader>
        </>
    );
}
