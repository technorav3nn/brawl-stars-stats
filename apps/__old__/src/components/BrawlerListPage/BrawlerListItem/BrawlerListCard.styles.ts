import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    body: {
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        overflow: "hidden",
    },

    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.lighterWhite[0],
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1.2,
    },
}));

// const gradientKeyframes = keyframes({
//     "0%": {
//         backgroundPosition: "0% 50%",
//     },
//     "100%": {
//         backgroundPosition: "0% 50%",
//     },
//     "50%": {
//         backgroundPosition: "100% 50%",
//     },
// });

// export const useStyles = createStyles((theme) => ({
//     card: {
//         "&:hover": {
//             boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.2)",
//         },
//         backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
//         borderRadius: theme.radius.sm,
//         boxShadow: theme.shadows.md,
//         overflow: "hidden",
//         position: "relative",

//         transition: "box-shadow 300ms ease 0s, transform 200ms ease 0s",
//     },

//     chromaticBadge: {
//         animation: `${gradientKeyframes} 5s ease infinite`,
//         background: "linear-gradient(220deg, #FFD700, #FFA500, #FF6347, #FF69B4, #8A2BE2, #4B0082)",
//         backgroundSize: "300% 300%",
//     },

//     imageSection: {
//         alignItems: "center",
//         borderTop: `${rem(1)} solid ${
//             theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
//         }`,
//         display: "flex",
//         justifyContent: "center",
//         padding: theme.spacing.md,
//     },

//     modelImage: {
//         objectFit: "contain",
//     },
// }));
