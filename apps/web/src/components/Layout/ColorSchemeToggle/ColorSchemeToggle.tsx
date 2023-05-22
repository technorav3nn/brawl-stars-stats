/* eslint-disable sort-keys-fix/sort-keys-fix */
import { ActionIcon, ActionIconProps, rem, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ColorSchemeToggle(props: ActionIconProps) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <ActionIcon
            onClick={() => toggleColorScheme()}
            size={30}
            sx={(theme) => ({
                ...theme.fn.focusStyles(),
                alignItems: "center",
                "&:hover": {
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0],
                },
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
                border: `${rem(1)} solid ${
                    theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
                }`,
                borderRadius: theme.radius.md,
                color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[7],
                display: "flex",
                height: rem(34),
                justifyContent: "center",

                width: rem(34),
            })}
            {...props}
        >
            {colorScheme === "dark" ? (
                <IconSun size={18} stroke={1.5} />
            ) : (
                <IconMoon size={18} stroke={1.5} />
            )}
        </ActionIcon>
    );
}
