/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { TabsProps } from "@mantine/core";
import { rem, Tabs } from "@mantine/core";

// const tabStyles: Styles<TabsStylesNames, TabsStylesParams> = (theme) => ({
//     tab: {
//         position: "relative",
//         // border: `rem(1px) solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))`,
//         // backgroundColor: "light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))",

//         border: `${rem(1)} solid ${
//             theme.colorScheme === "light" ? theme.colors.gray[2] : theme.colors.dark[4]
//         }`,

//         backgroundColor: theme.colorScheme === "light" ? theme.white : theme.colors.dark[6],

//         "&:first-of-type": {
//             borderRadius: `${rem(4)} 0 0 ${rem(4)}`,
//         },

//         "&:last-of-type": {
//             borderRadius: `0 ${rem(4)} ${rem(4)} 0`,
//         },

//         "& + &": {
//             borderLeftWidth: 0,
//         },

//         "&:hover": {
//             backgroundColor:
//                 theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[5],
//         },

//         "&[data-active]": {
//             zIndex: 1,
//             backgroundColor: theme.colors.blue[6],
//             borderColor: theme.colors.blue[6],
//             color: theme.white,
//         },
//     },

//     tabIcon: {
//         alignItems: "center",
//         display: "flex",
//         marginRight: theme.spacing.xs,
//     },

//     tabsList: {
//         display: "flex",
//         alignItems: "center",
//     },
// });

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
                    "&:first-of-type": {
                        borderBottomLeftRadius: theme.radius.md,
                        borderTopLeftRadius: theme.radius.md,
                    },
                    "&:last-of-type": {
                        borderBottomRightRadius: theme.radius.md,
                        borderTopRightRadius: theme.radius.md,
                    },
                    "&:not(:first-of-type)": {
                        borderLeft: 0,
                    },
                    "&[data-active]": {
                        backgroundColor: theme.colors.blue[8],
                        borderColor: theme.colors.blue[8],
                        color: theme.white,
                    },

                    alignItems: "center",
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,

                    border: `${rem(1)} solid ${
                        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
                    }`,
                    color:
                        theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[9],
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

/**
 * (theme) => ({
                tab: {
                    ...theme.fn.focusStyles(),
                    "&:disabled": {
                        cursor: "not-allowed",
                        opacity: 0.5,
                    },
                    "&:first-of-type": {
                        borderBottomLeftRadius: theme.radius.md,
                        borderTopLeftRadius: theme.radius.md,
                    },
                    "&:last-of-type": {
                        borderBottomRightRadius: theme.radius.md,
                        borderTopRightRadius: theme.radius.md,
                    },
                    "&:not(:first-of-type)": {
                        borderLeft: 0,
                    },
                    "&[data-active]": {
                        backgroundColor: theme.colors.blue[8],
                        borderColor: theme.colors.blue[8],
                        color: theme.white,
                    },

                    alignItems: "center",
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,

                    border: `${rem(1)} solid ${
                        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
                    }`,
                    color:
                        theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[9],
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
            })
 */
