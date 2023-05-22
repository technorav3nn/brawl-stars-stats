/* eslint-disable sort-keys-fix/sort-keys-fix */
import { rem, Tabs, TabsProps } from "@mantine/core";

export function StyledTabs(props: TabsProps) {
    return (
        <Tabs
            unstyled
            styles={(theme) => ({
                tab: {
                    ...theme.fn.focusStyles(),
                    "&:disabled": {
                        cursor: "not-allowed",
                        opacity: 0.5,
                    },
                    alignItems: "center",
                    "&:first-of-type": {
                        borderBottomLeftRadius: theme.radius.md,
                        borderTopLeftRadius: theme.radius.md,
                    },
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
                    "&:last-of-type": {
                        borderBottomRightRadius: theme.radius.md,
                        borderTopRightRadius: theme.radius.md,
                    },

                    border: `${rem(1)} solid ${
                        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
                    }`,
                    "&:not(:first-of-type)": {
                        borderLeft: 0,
                    },

                    color:
                        theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[9],
                    "&[data-active]": {
                        backgroundColor: theme.colors.blue[7],
                        borderColor: theme.colors.blue[7],
                        color: theme.white,
                    },

                    cursor: "pointer",

                    display: "flex",

                    fontFamily: theme.fontFamily,

                    fontSize: theme.fontSizes.sm,

                    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                },

                tabIcon: {
                    alignItems: "center",
                    display: "flex",
                    marginRight: theme.spacing.xs,
                },

                tabsList: {
                    display: "flex",
                },
            })}
            {...props}
        />
    );
}
