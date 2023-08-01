import { Card, Text } from "@mantine/core";

import { useStyles } from "./BrawlerListCard.styles";

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
