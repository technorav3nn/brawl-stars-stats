import { ActionIcon, ActionIconProps, rem, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function ColorSchemeToggle(props: ActionIconProps) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <ActionIcon
            onClick={() => toggleColorScheme()}
            size={30}
            sx={(theme) => ({
                ...theme.fn.focusStyles(),
                width: rem(34),
                height: rem(34),
                borderRadius: theme.radius.md,
                border: `${rem(1)} solid ${
                    theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
                }`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[7],
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,

                "&:hover": {
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0],
                },
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
