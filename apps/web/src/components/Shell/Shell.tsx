"use client";

/* eslint-disable sort-keys-fix/sort-keys-fix */
import {
    AppShell,
    Box,
    Burger,
    Container,
    Divider,
    Group,
    Stack,
    Text,
    UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";

import { css, cva } from "~/styled-system/css";
import { token } from "~/styled-system/tokens";

import { ColorSchemeToggle } from "../ColorSchemeToggle";
import { BrawlStarsLogo } from "../Icons/BrawlStarsLogo";
import { SHELL_LINKS } from "./Shell.data";

const ACTIVE_BG_DARK_VAR = "--_active-link-dark-bg" as const;
const ACTIVE_BG_LIGHT_VAR = "--_active-link-light-bg" as const;

const ACTIVE_COLOR_DARK_VAR = "--_active-link-dark-color" as const;
const ACTIVE_COLOR_LIGHT_VAR = "--_active-link-light-color" as const;

const LIGHT_BG_COLORS = {
    textColor: "#228be6",
    bgColor: "rgba(231, 245, 255, 1)",
} as const;

const DARK_BG_COLORS = {
    textColor: "#a5d8ff",
    bgColor: "rgba(25, 113, 194, 0.2)",
} as const;

const control = cva({
    base: {
        display: "block",
        padding: "8px 14px",

        fontWeight: 500,
        fontSize: "text.sm",

        _hover: {
            bg: {
                _light: "gray.0",
                _dark: "dark.6",
            },
        },
        "&[data-link-active]": {
            bg: {
                _light: `var(${ACTIVE_BG_LIGHT_VAR})`,
                _dark: `var(${ACTIVE_BG_DARK_VAR})`,
            },
            color: {
                _light: `var(${ACTIVE_COLOR_LIGHT_VAR})`,
                _dark: `var(${ACTIVE_COLOR_DARK_VAR})`,
            },
            _hover: {
                bg: {
                    _light: `var(${ACTIVE_BG_LIGHT_VAR})`,
                    _dark: `var(${ACTIVE_BG_DARK_VAR})`,
                },
            },
        },
    },
    variants: {
        variant: {
            mobile: {
                borderRadius: "md",
            },
            desktop: {
                borderRadius: "md",
            },
        },
    },
});

const leftOrRight = css({
    flexBasis: 0,
    flexGrow: 1,
});

export function Shell({ children }: React.PropsWithChildren) {
    const pathname = usePathname();

    const [opened, { toggle, close }] = useDisclosure();
    const [activeLink, setActiveLink] = useState(pathname);
    const [, startTransition] = useTransition();

    const shouldSetActiveClass = (link: string) => {
        if (link === "/") {
            return activeLink === "/";
        }
        return activeLink.startsWith(link);
    };

    const handleClick = (link: string) => {
        startTransition(() => setActiveLink(link));
        close();
    };

    const mobileLinks = SHELL_LINKS.map((link) => (
        <UnstyledButton
            component={Link}
            key={link.href}
            className={control({ variant: "mobile" })}
            style={{
                // @ts-expect-error mantine style type cant handle css vars
                "--_active-link-dark-bg": DARK_BG_COLORS.bgColor,
                "--_active-link-light-bg": LIGHT_BG_COLORS.bgColor,
                "--_active-link-dark-color": DARK_BG_COLORS.textColor,
                "--_active-link-light-color": LIGHT_BG_COLORS.textColor,
            }}
            href={link.href}
            onClick={() => handleClick(link.href)}
            {...(shouldSetActiveClass(link.href) ? { "data-link-active": true } : {})}
        >
            {link.label}
        </UnstyledButton>
    ));

    const desktopLinks = SHELL_LINKS.map((link) => (
        <UnstyledButton
            component={Link}
            key={link.href}
            className={control({ variant: "desktop" })}
            style={{
                // @ts-expect-error mantine style type cant handle css vars
                "--_active-link-dark-bg": DARK_BG_COLORS.bgColor,
                "--_active-link-light-bg": LIGHT_BG_COLORS.bgColor,
                "--_active-link-dark-color": DARK_BG_COLORS.textColor,
                "--_active-link-light-color": LIGHT_BG_COLORS.textColor,
            }}
            href={link.href}
            onClick={() => handleClick(link.href)}
            {...(shouldSetActiveClass(link.href) ? { "data-link-active": true } : {})}
        >
            {link.label}
        </UnstyledButton>
    ));

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header
                style={{
                    // @ts-expect-error Mantine problem
                    "--color": token("colors.dark.8"),
                }}
            >
                {/** Desktop and Tablet Header */}
                <Container
                    style={{
                        alignItems: "center",
                        display: "flex",
                        height: "100%",
                        justifyContent: "space-between",
                    }}
                    size="lg"
                    visibleFrom="sm"
                    px={{ lg: 0 }}
                >
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Group
                            ml={{ xs: "xs" }}
                            wrap="nowrap"
                            gap="xs"
                            style={{ whiteSpace: "nowrap" }}
                            className={leftOrRight}
                        >
                            <BrawlStarsLogo height={35} width={35} />
                            <Text
                                fz="md"
                                className={css({
                                    color: { _light: "black", _dark: "gray.2" },
                                    fontWeight: "semibold",
                                    fontFamily: "lexend",
                                })}
                                component={Link}
                                href="/"
                                onClick={() => handleClick("/")}
                            >
                                Brawl Stars Stats
                            </Text>
                        </Group>
                        <Group gap="xs" visibleFrom="sm">
                            {desktopLinks}
                        </Group>
                        <Group
                            gap={14}
                            className={leftOrRight}
                            style={{ justifyContent: "flex-end" }}
                        >
                            <ColorSchemeToggle />
                        </Group>
                    </Group>
                </Container>
                {/** Mobile Header */}
                <Box
                    className={css({
                        alignItems: "center",
                        display: "flex",
                        height: "100%",
                        justifyContent: "space-between",
                        paddingLeft: "3",
                        paddingRight: "3",
                    })}
                    hiddenFrom="sm"
                >
                    <Burger opened={opened} size="sm" onClick={toggle} aria-label="Toggle navbar" />
                    <div
                        className={css({
                            alignItems: "center",
                            display: "flex",
                        })}
                    >
                        <Group style={{ gap: "0.5rem" }}>
                            <BrawlStarsLogo height={30} width={30} />
                            <Text
                                fw="semibold"
                                fz="md"
                                className={css({
                                    color: { _light: "black", _dark: "gray.2" },
                                    fontWeight: "semibold",
                                    fontFamily: "lexend",
                                })}
                                component={Link}
                                href="/"
                                onClick={() => handleClick("/")}
                            >
                                Brawl Stars Stats
                            </Text>
                        </Group>
                    </div>
                    <ColorSchemeToggle />
                </Box>
            </AppShell.Header>

            <AppShell.Navbar
                className={css({ bg: { _light: "gray.1", _dark: "dark.8" } })}
                py="md"
                px={6}
            >
                <Stack gap={2}>{mobileLinks}</Stack>
            </AppShell.Navbar>

            <AppShell.Main>
                <Container mt={35} size="lg">
                    {children}
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
