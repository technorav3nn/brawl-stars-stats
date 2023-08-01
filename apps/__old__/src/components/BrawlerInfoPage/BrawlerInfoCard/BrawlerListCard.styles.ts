import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    card: {
        display: "flex",
        flex: "0 0 auto",
        flexDirection: "column",
        height: rem(300),
        justifyContent: "flex-start",
        marginRight: theme.spacing.md,
        [theme.fn.smallerThan("sm")]: {
            width: rem(235),
        },
        [theme.fn.largerThan("sm")]: {
            width: rem(350),
        },
    },

    category: {
        color: theme.white,
        fontWeight: 700,
        opacity: 0.7,
    },

    title: {
        color: theme.white,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(32),
        fontWeight: 900,
        lineHeight: 1.2,
        marginTop: theme.spacing.xs,
    },
}));
