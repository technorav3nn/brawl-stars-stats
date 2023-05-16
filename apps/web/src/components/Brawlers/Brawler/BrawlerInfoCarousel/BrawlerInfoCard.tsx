import { createStyles, Paper, Text, Title, Button, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    card: {
        height: rem(330),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",

        backgroundColor: theme.colors.dark[6],
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: rem(32),
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
    },
}));

interface BrawlerInfoCarouselProps {
    title: string;
    description: string;
}

export function BrawlerInfoCard({ title, description }: BrawlerInfoCarouselProps) {
    const { classes } = useStyles();

    return (
        <Paper w={300} shadow="md" p="xl" radius="md" className={classes.card}>
            <div>
                <Text mb={5} className={classes.category} size="lg">
                    {title}
                </Text>
                <Text color="dimmed" italic>
                    {description}
                </Text>
            </div>
        </Paper>
    );
}
