import { Burger, Group, Text } from "@mantine/core";
import React from "react";

import { BrawlStarsLogo } from "../../../Icons/BrawlStarsLogo";
import { ColorSchemeToggle } from "../../ColorSchemeToggle";
import { useStyles } from "./HeaderMobile.styles";

interface HeaderProps {
    navbarOpened: boolean;
    toggleNavbar(): void;
}

export function HeaderMobile({ navbarOpened, toggleNavbar }: HeaderProps) {
    const { classes } = useStyles();

    return (
        <div className={classes.header}>
            <div className={classes.inner}>
                <Burger
                    opened={navbarOpened}
                    size="sm"
                    onClick={toggleNavbar}
                    aria-label="Toggle navbar"
                />
                <div className={classes.logo}>
                    <Group sx={{ gap: "0.5rem" }}>
                        <BrawlStarsLogo height={35} width={35} />
                        <Text fw="bolder" fz="lg">
                            Brawl Stars Stats
                        </Text>
                    </Group>
                </div>
                <ColorSchemeToggle />
            </div>
        </div>
    );
}
