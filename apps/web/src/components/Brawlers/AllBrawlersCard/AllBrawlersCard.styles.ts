import { createStyles, keyframes, rem } from "@mantine/core";

const gradientKeyframes = keyframes({
    "0%": {
        backgroundPosition: "0% 50%",
    },
    "50%": {
        backgroundPosition: "100% 50%",
    },
    "100%": {
        backgroundPosition: "0% 50%",
    },
});

export const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        borderRadius: theme.radius.sm,
        overflow: "hidden",
        transition: "box-shadow 300ms ease 0s, transform 200ms ease 0s",
        boxShadow: theme.shadows.md,

        "&:hover": {
            boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.2)",
        },
    },

    imageSection: {
        padding: theme.spacing.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    modelImage: {
        objectFit: "contain",
    },

    chromaticBadge: {
        background: "linear-gradient(220deg, #FFD700, #FFA500, #FF6347, #FF69B4, #8A2BE2, #4B0082)",
        backgroundSize: "300% 300%",
        animation: `${gradientKeyframes} 5s ease infinite`,
    },
}));
