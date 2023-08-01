"use client";

/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { MantineColorScheme } from "@mantine/core";
import { Group, Popover, Stack, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useCallback, useState } from "react";

import { css } from "~/styled-system/css";

interface OptionButtonProps {
    active?: boolean;
    label: string;
    icon: React.ReactNode;
    onClick?: (...args: unknown[]) => unknown;
}

interface ColorSchemeSelectorProps {
    children: React.ReactNode;
    opened: boolean;
    close: () => void;
    open: () => void;
}

const button = css({
    display: "block",
    padding: "4px 4px",
    borderRadius: "sm",
    fontWeight: 500,
    _hover: {
        bg: {
            _light: "gray.0",
            _dark: "dark.5",
        },
    },
    _active: {
        color: {
            _light: "blue.6",
            _dark: "blue.4",
        },
    },
});

function OptionButton({ active, label, icon, onClick }: OptionButtonProps) {
    return (
        <UnstyledButton
            data-active={active ? "true" : undefined}
            onClick={onClick}
            className={button}
        >
            <Group py={1} px={2} gap={8}>
                {icon}
                {label}
            </Group>
        </UnstyledButton>
    );
}

export function ColorSchemeSelector({ children, opened, open, close }: ColorSchemeSelectorProps) {
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const [selectedOption, setSelectedOption] = useState<MantineColorScheme>(colorScheme);

    const handleClick = (newScheme: MantineColorScheme) => {
        return () => {
            setColorScheme(newScheme);
            setSelectedOption(newScheme);
            // used to keep the transition effect
            setTimeout(() => {
                close();
            }, 1);
        };
    };

    const getActiveState = useCallback(
        (scheme: MantineColorScheme) => {
            return scheme === selectedOption;
        },
        [selectedOption]
    );

    const iconProps = {
        size: 18,
        stroke: 2,
        style: {
            justifySelf: "center",
        },
    };

    return (
        <Popover
            onChange={(state) => (state ? open : close)()}
            opened={opened}
            width={128}
            offset={10}
            position="bottom-end"
            shadow="md"
        >
            <Popover.Target>{children}</Popover.Target>
            <Popover.Dropdown p={4}>
                <Stack gap={0}>
                    <OptionButton
                        label="Light"
                        icon={<IconSun {...iconProps} />}
                        active={getActiveState("light")}
                        onClick={handleClick("light")}
                    />
                    <OptionButton
                        label="Dark"
                        icon={<IconMoon {...iconProps} />}
                        active={getActiveState("dark")}
                        onClick={handleClick("dark")}
                    />
                    <OptionButton
                        label="System"
                        icon={<IconDeviceDesktop {...iconProps} />}
                        active={getActiveState("auto")}
                        onClick={handleClick("auto")}
                    />
                </Stack>
            </Popover.Dropdown>
        </Popover>
    );
}
