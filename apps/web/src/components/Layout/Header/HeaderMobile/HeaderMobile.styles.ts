import { createStyles, rem } from "@mantine/core";

const HEADER_HEIGHT = rem(60);

export const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2]
        }`,
        height: rem(HEADER_HEIGHT),
        left: 0,
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 6,

        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    inner: {
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },

    logo: {
        alignItems: "center",
        display: "flex",
        height: rem(HEADER_HEIGHT),
        paddingTop: rem(6),
    },

    logoWrapper: {
        alignItems: "center",
        display: "flex",
        pointerEvents: "all",
    },

    mainSection: {
        alignItems: "center",
        display: "flex",
    },

    version: {
        ...theme.fn.focusStyles(),
        fontWeight: 700,
        marginTop: rem(2),
        textDecoration: "none",

        [theme.fn.smallerThan(860)]: {
            display: "none",
        },
    },
}));
