"use client";

/* eslint-disable sort-keys-fix/sort-keys-fix */
import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";

import { css, cva } from "~/styled-system/css";

import { ColorSchemeSelector } from "./ColorSchemeSelector";

const toggleIcon = cva({
    base: {
        width: "rem(18px)",
        height: "rem(18px)",
    },
    variants: {
        icon: {
            // sun: {
            //     display: {
            //         _dark: "block",
            //         _light: "none",
            //     },
            // },
            // moon: {
            //     display: {
            //         _dark: "none",
            //         _light: "block",
            //     },
            // },
            sun: {
                hideWhenLightMode: true,
            },
            moon: {
                hideWhenDarkMode: true,
            },
        },
    },
});

export function ColorSchemeToggle() {
    const [opened, { close, open, toggle }] = useDisclosure(false);

    const handleClick = () => {
        toggle();
    };

    return (
        <ColorSchemeSelector opened={opened} open={open} close={close}>
            <ActionIcon
                // remove the push effect
                className={css({
                    "&:active": {
                        transform: "none",
                    },
                })}
                variant="default"
                size="lg"
                radius="md"
                onClick={handleClick}
            >
                <IconSun className={toggleIcon({ icon: "sun" })} stroke={1.5} />
                <IconMoon
                    className={toggleIcon({
                        icon: "moon",
                    })}
                    stroke={1.5}
                />
            </ActionIcon>
        </ColorSchemeSelector>
    );
}
