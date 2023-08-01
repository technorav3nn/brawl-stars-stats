import {
    Container,
    createStyles,
    Group,
    Header as MantineHeader,
    Paper,
    rem,
    Text,
    Transition,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "rakkasjs";
import { useState } from "react";

import { BrawlStarsLogo } from "../../Shared/Icons/BrawlStarsLogo";
import { ColorSchemeToggle } from "../ColorSchemeToggle";
import { HeaderMobile } from "./HeaderMobile";

interface NavLink {
    link: string;
    label: string;
}

const HEADER_HEIGHT = rem(60);
const LINKS: NavLink[] = [
    { label: "Home", link: "/" },
    {
        label: "Brawlers",
        link: "/brawlers",
    },
    {
        label: "Events",
        link: "/events",
    },
    {
        label: "Maps",
        link: "/maps",
    },
];

const useStyles = createStyles((theme) => ({
    dropdown: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopWidth: 0,
        left: 0,
        overflow: "hidden",
        position: "absolute",
        right: 0,
        top: HEADER_HEIGHT,
        zIndex: 0,

        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    header: {
        "@media (max-width: 768px)": {
            display: "none",
        },
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
    },

    leftOrRight: {
        flexBasis: 0,
        flexGrow: 1,
    },

    link: {
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        // eslint-disable-next-line sort-keys-fix/sort-keys-fix
        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },
        display: "block",
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,

        textDecoration: "none",

        [theme.fn.smallerThan("sm")]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({ color: theme.primaryColor, variant: "light" })
                .background,
            color: theme.fn.variant({ color: theme.primaryColor, variant: "light" }).color,
        },
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    root: {
        position: "relative",
        zIndex: 1,
    },
}));

export function Header() {
    const location = useLocation();

    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(location.current.pathname);
    const { classes, cx } = useStyles();
    const theme = useMantineTheme();

    // const showSearchbar = useMediaQuery(
    //     `(min-width: ${extractUnitValue(theme.breakpoints.md, CssUnit.Em)}em)`,
    //     true,
    //     {
    //         getInitialValueInEffect: false,
    //     }
    // );

    const shouldSetActiveClass = (link: string) => {
        // i.e. -> /brawlers -> true
        // i.e. -> /brawlers/ -> true
        // i.e. -> /brawlers/leon -> true
        // i.e. -> /brawlers/leon/ -> true
        // i.e. -> /brawlers/leon/skins -> true
        // i.e. -> /brawlers/leon/skins/ -> true
        // etc.
        // BUT, -> / -> true, but check if its only /, not /brawlers since /brawlers is also /, but we dont want to highlight it

        if (link === "/") {
            return active === "/";
        }

        return active.startsWith(link);
    };

    const items = LINKS.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={cx(classes.link, { [classes.linkActive]: shouldSetActiveClass(link.link) })}
            onClick={() => {
                setActive(link.link);
                close();
            }}
        >
            {link.label}
        </Link>
    ));

    return (
        <>
            <HeaderMobile navbarOpened={opened} toggleNavbar={toggle} />
            <MantineHeader height={HEADER_HEIGHT} mb={40} className={classes.root}>
                <Container className={classes.header} size="lg">
                    <Group sx={{ gap: "0.5rem" }} className={classes.leftOrRight}>
                        <BrawlStarsLogo height={35} width={35} />
                        <Text
                            fw="bold"
                            fz="lg"
                            sx={{
                                color: theme.colorScheme === "dark" ? theme.white : theme.black,
                                fontFamily: "Lexend",
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
                        {/* {showSearchbar && <Searchbar onClick={() => {}} />} */}
                        <ColorSchemeToggle />
                    </Group>
                </Container>
            </MantineHeader>

            <Transition transition="slide-down" duration={200} mounted={opened}>
                {(styles) => (
                    <Paper className={classes.dropdown} withBorder style={styles}>
                        {items}
                    </Paper>
                )}
            </Transition>
        </>
    );
}
