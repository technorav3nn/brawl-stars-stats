import { Card, createStyles, rem, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
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

interface BrawlerInfoCarouselProps {
    title: string;
    description?: string;
}

export function BrawlerInfoCard({
    title,
    description,
    children,
}: BrawlerInfoCarouselProps & React.PropsWithChildren) {
    const { classes } = useStyles();

    return (
        <Card withBorder shadow="md" radius="md" className={classes.card}>
            <Card.Section withBorder inheritPadding py="xs">
                <Text className={classes.category} size="lg">
                    {title}
                </Text>
            </Card.Section>
            {description && (
                <>
                    <Text fz="sm" mt="xs" italic>
                        {description}
                    </Text>
                </>
            )}
            <Card.Section mt="xs" px="md">
                {children}
            </Card.Section>
        </Card>
    );
}
